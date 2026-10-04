#!/usr/bin/env python3
"""
CLI Utility to safely set or reset the Admin Password for DeFreitas & Associates CMS.
Works with standard Python 3 library without requiring any virtual environment.
Usage:
    python3 set_password.py "YourNewSecurePasswordHere"
    or interactively:
    python3 set_password.py
"""
import sys
import os
import getpass
import hashlib
import sqlite3
from pathlib import Path

SALT = b"defreitas_secure_salt_2026"

def hash_password(password: str) -> str:
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), SALT, 100000).hex()

def find_db():
    script_dir = Path(__file__).resolve().parent
    candidates = [
        script_dir.parent / "database.db",
        script_dir / "database.db",
        Path.cwd() / "database.db",
    ]
    for p in candidates:
        if p.exists():
            return p
    return script_dir.parent / "database.db"

def main():
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

    db_path = find_db()
    conn = sqlite3.connect(str(db_path))
    conn.execute("""
        CREATE TABLE IF NOT EXISTS site_meta (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
    """)
    pwd_hash = hash_password(new_pwd)
    conn.execute("INSERT OR REPLACE INTO site_meta (key, value) VALUES ('admin_password_hash', ?)", (pwd_hash,))
    conn.commit()
    print(f"[SUCCESS] Admin password updated successfully in {db_path}!")

if __name__ == "__main__":
    main()
