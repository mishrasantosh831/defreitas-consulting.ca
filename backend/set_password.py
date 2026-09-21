#!/usr/bin/env python3
"""
CLI Utility to safely set or reset the Admin Password for DeFreitas & Associates CMS.
Usage:
    python3 set_password.py "YourNewSecurePasswordHere"
    or interactively:
    python3 set_password.py
"""
import sys
import os
import getpass

# Ensure app package is importable
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SCRIPT_DIR)

from app.auth import hash_password
from app.database import set_admin_password_hash, init_db

def main():
    # Ensure tables exist
    init_db()

    if len(sys.argv) > 1:
        new_pwd = sys.argv[1]
    else:
        print("--- DeFreitas & Associates: Admin Password Reset ---")
        new_pwd = getpass.getpass("Enter new admin password: ")
        confirm_pwd = getpass.getpass("Confirm new admin password: ")
        if new_pwd != confirm_pwd:
            print("[ERROR] Passwords do not match.")
            sys.exit(1)

    if not new_pwd or len(new_pwd) < 6:
        print("[ERROR] Password must be at least 6 characters.")
        sys.exit(1)

    # Hash with PBKDF2 HMAC SHA-256
    pwd_hash = hash_password(new_pwd)
    set_admin_password_hash(pwd_hash)
    print("[SUCCESS] Admin password updated successfully in database.db!")

if __name__ == "__main__":
    main()
