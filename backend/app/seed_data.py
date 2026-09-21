"""
Default Seed Data for DeFreitas & Associates website.
Extracted and structured from https://defreitas-consulting.ca/ and existing brand materials.
"""

DEFAULT_SITE_DATA = {
    "site_meta": {
        "title": "DeFreitas & Associates — Executive Tax Accountants & Management Consultants",
        "description": "Management Consultants, Business Advisors and Tax Accountants for over 30 years. Serving corporations and individuals across the GTA and Canada.",
        "phone": "647-722-5442",
        "toll_free": "1-855-227-9136",
        "email": "info@defreitas-consulting.com",
        "address": "255 Duncan Mill Road, Suite 409, Toronto, ON, M3B 3H9, Canada",
        "logo_url": "/images/logo.png",
        "footer_logo_url": "/images/footer_logo.png"
    },
    
    "pages": {
        "home": {
            "hero_eyebrow": "Executive Tax Accountants · 30+ Years Legacy",
            "hero_title": "Corporate advisory that builds real growth.",
            "hero_description": "From corporate T2 filings and SR&ED tax credit claims to full-cycle accounting and business financing — DeFreitas & Associates delivers executive financial strategy for businesses across Toronto & Canada. Exceeding expectations for over 30 years.",
            "hero_image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1024&q=80",
            "stat_1_number": "30",
            "stat_1_suffix": "+ Yrs",
            "stat_1_label": "Corporate Advisory Legacy",
            "stat_2_number": "50",
            "stat_2_suffix": "M+",
            "stat_2_label": "Tax & SR&ED Recovered",
            "stat_3_number": "1200",
            "stat_3_suffix": "+",
            "stat_3_label": "Businesses Served",
            "stat_4_number": "100",
            "stat_4_suffix": "%",
            "stat_4_label": "CPA On-Time Compliance",
            "why_title": "Proactive business advisors, not just annual tax filers",
            "why_description": "We don't wait until year-end to examine your balance sheet. Our senior Chartered Professional Accountants provide continuous tax strategies, helping you seize capital opportunities and avoid CRA pitfalls.",
            "why_image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1024&q=80"
        },
        
        "services": {
            "title": "Services & Pricing — DeFreitas & Associates CPAs",
            "hero_eyebrow": "Services & Pricing",
            "hero_title": "Clear plans, fixed fees, no surprise bills",
            "hero_subtitle": "Select a service bundle tailored to your corporate stage, or customize a package with our senior CPA team. Every plan includes dedicated advisory and total CRA compliance.",
            "catalog_eyebrow": "Full Service Catalog",
            "catalog_title": "Pick the exact help you need",
            "catalog_services": [
                {
                    "cat": "tax",
                    "title": "Corporate T2 Tax Returns",
                    "meta": "Tax & Compliance",
                    "desc": "Comprehensive corporate tax filing, tax planning, salary vs. dividend optimization, and active CRA audit representation.",
                    "fee": "From $1,200 / filing",
                    "link": "/tax-advisory"
                },
                {
                    "cat": "tax",
                    "title": "Personal T1 & Executive Tax",
                    "meta": "Tax & Compliance",
                    "desc": "Sole proprietorship and high-net-worth individual tax preparation with optimized deductions and wealth planning.",
                    "fee": "From $250 / filing",
                    "link": "/tax-advisory"
                },
                {
                    "cat": "bookkeeping",
                    "title": "Full-Cycle Cloud Bookkeeping",
                    "meta": "Bookkeeping & Payroll",
                    "desc": "Monthly bank reconciliations, accounts payable/receivable, and QuickBooks/Xero ledger maintenance.",
                    "fee": "From $249 / month",
                    "link": "/accounting"
                },
                {
                    "cat": "bookkeeping",
                    "title": "Payroll & Remittance Filing",
                    "meta": "Bookkeeping & Payroll",
                    "desc": "Direct deposit payroll processing, T4/T5 slip preparation, and monthly CRA source deduction remittances.",
                    "fee": "From $99 / month",
                    "link": "/accounting"
                },
                {
                    "cat": "sred",
                    "title": "SR&ED Refund Claim Preparation",
                    "meta": "SR&ED Claims",
                    "desc": "Technical project identification, financial expenditure tracking, and filing for refundable federal/provincial credits.",
                    "fee": "Success-based 15% fee",
                    "link": "/sred"
                },
                {
                    "cat": "financing",
                    "title": "Bank Loan & Commercial Proposal",
                    "meta": "Business Financing",
                    "desc": "Lender-ready pro-forma statements, cash flow modeling, and direct introductions to financial institutions.",
                    "fee": "From $1,500 one-off",
                    "link": "/financing"
                },
                {
                    "cat": "incorporation",
                    "title": "Federal & Ontario Incorporation",
                    "meta": "Incorporation",
                    "desc": "Name reservation, articles of incorporation, digital minute book, share issuance, and CRA account registration.",
                    "fee": "From $599 package",
                    "link": "/incorporation"
                }
            ],
            "pricing_eyebrow": "Structured Packages",
            "pricing_title": "Predictable monthly pricing, maximum value",
            "pricing_subtitle": "All plans include senior CPA counsel, cloud software integration, and year-round compliance support with no hidden fees.",
            "packages": [
                {
                    "name": "Sole Proprietor",
                    "price": "$199",
                    "period": "/mo",
                    "subtitle": "For freelancers, contractors & consultants",
                    "featured": False,
                    "features": [
                        "Annual T1 Personal Tax Return",
                        "Cloud Bookkeeping & Bank Feeds",
                        "GST/HST Filing & Remittances",
                        "Direct Phone & Email Support"
                    ],
                    "button_text": "Select Plan"
                },
                {
                    "name": "Growth Corporation",
                    "price": "$499",
                    "period": "/mo",
                    "subtitle": "For incorporated companies & CCPCs",
                    "featured": True,
                    "features": [
                        "Everything in Sole Proprietor",
                        "Corporate T2 Tax Return & Financials",
                        "Quarterly Notice to Reader Statements",
                        "Payroll for up to 5 Employees",
                        "Salary vs. Dividend Tax Optimization"
                    ],
                    "button_text": "Select Plan"
                },
                {
                    "name": "Executive Scale",
                    "price": "$999",
                    "period": "/mo",
                    "subtitle": "For high-growth & multi-entity firms",
                    "featured": False,
                    "features": [
                        "Everything in Growth Corporation",
                        "Fractional CFO Advisory Support",
                        "Full SR&ED Claim Management",
                        "Priority CRA Audit Representation"
                    ],
                    "button_text": "Select Plan"
                }
            ],
            "cta_eyebrow": "Not Sure Which Plan You Need?",
            "cta_title": "Let's build a customized solution",
            "cta_subtitle": "Speak directly with our senior CPA partners in Toronto. We will assess your requirements and tailor an exact service plan.",
            "cta_primary_btn": "Book Free Consultation",
            "cta_secondary_btn": "Back to Home"
        },
        
        "sred": {
            "title": "SR&ED Tax Incentive Claims",
            "hero_eyebrow": "Innovation Tax Credits",
            "hero_title": "Turn Canadian Innovation Into a Stronger SR&ED Claim",
            "hero_subtitle": "DeFreitas & Associates helps innovative businesses identify eligible work, assemble defensible technical documentation, calculate qualifying expenditures, and prepare complete SR&ED tax incentive claims.",
            "hero_primary_btn": "Request Free SR&ED Assessment",
            "hero_secondary_btn": "Contact Team",
            "hero_image": "https://defreitas-consulting.ca/wp-content/themes/defreitas/images/sred/sred-hero.jpg",
            "intro_image": "https://defreitas-consulting.ca/wp-content/themes/defreitas/images/sred/sred-turning-innovation.jpg",
            "intro_eyebrow": "Maximize Your Refund",
            "intro_title": "Experienced technical & financial claim support",
            "intro_lead": "Coordinated directly through the accounting professionals you already trust, preventing costly audit disconnects between your technical write-ups and corporate financials.",
            "intro_bullets": [
                "A complete claim approach coordinated by senior CPAs",
                "Technical depth. Financial discipline. Clear documentation.",
                "Initial eligibility screening and technological uncertainty scoping",
                "Technical project interviews & T661 project narratives",
                "Expenditure review, contractor tracking, and calculation optimization",
                "Claim submission coordination directly integrated with your T2 corporate return",
                "CRA review and objection defense support",
                "30+ years of business and tax advisory experience"
            ],
            "services_eyebrow": "End-To-End Practice",
            "services_title": "SR&ED Advisory Services",
            "services_subtitle": "From early technical scoping to full filing and CRA audit defense.",
            "services": [
                {
                    "title": "1. Opportunity Assessment",
                    "description": "We review your projects, technical challenges, experiments, personnel, and costs to identify work that may meet the SR&ED requirements."
                },
                {
                    "title": "2. Technical Claim Preparation",
                    "description": "Structured interviews capture technological uncertainties, hypotheses, experiments, results, and advances for clear project descriptions."
                },
                {
                    "title": "3. Expenditure Analysis",
                    "description": "We work with your accounting records to identify and link eligible salaries, materials, contracts, equipment costs, and applicable overhead."
                },
                {
                    "title": "4. Documentation Improvement",
                    "description": "We help establish practical contemporaneous records so future claims are better supported without burdening your technical team."
                },
                {
                    "title": "5. CRA Review Support",
                    "description": "When questions arise, we help organize responses, clarify the technical work, prepare supporting materials, and participate in review discussions."
                },
                {
                    "title": "6. Previously Denied Claims",
                    "description": "We independently assess a reviewed or denied claim, identify weaknesses, and advise whether further representation or an objection may be appropriate."
                }
            ],
            "qualify_eyebrow": "Eligibility Check",
            "qualify_title": "Could Your Work Qualify?",
            "qualify_description": "SR&ED is not limited to laboratories or research institutions. Eligible work can occur when a Canadian business faces a technological uncertainty that cannot be resolved using readily available knowledge and undertakes systematic experimentation or analysis to find an answer. You do not necessarily need a successful result — learning why an approach did not work still creates valuable technological knowledge.",
            "qualify_indicators_title": "Common Qualification Indicators:",
            "qualify_indicators": [
                "Your team developed or improved a product, process, material, device, or software system.",
                "Experienced personnel could not determine the solution in advance using standard industry knowledge.",
                "You tested alternatives, prototypes, models, formulations, code algorithms, or system configurations.",
                "You encountered technical obstacles, failures, limitations, or unexpected results.",
                "Your work generated new technological knowledge or incremental advancement for your business."
            ],
            "expenditures_title": "Eligible Expenditures:",
            "expenditures_intro": "Under Canadian tax law, qualifying work enables you to claim expenditures directly linked to R&D activities:",
            "expenditures": [
                {
                    "title": "Canadian Salaries & Wages",
                    "desc": "Directly engaged technical staff + proxy overhead allowance (55%)."
                },
                {
                    "title": "Arm's Length Contractors",
                    "desc": "Canadian third-party developer and engineering contract costs (80% rate)."
                },
                {
                    "title": "Consumed Materials",
                    "desc": "Physical prototypes, testing materials, and experimental components."
                }
            ],
            "industries_eyebrow": "Sectors We Serve",
            "industries_title": "Eligible Canadian Industries",
            "industries_subtitle": "SR&ED claims span dozens of commercial fields beyond pure science.",
            "industries": [
                "Manufacturing & Processing",
                "Software & Information Technology",
                "Clean Technology & Renewable Energy",
                "Food & Beverage Formulation",
                "Engineering & Industrial Design",
                "Life Sciences & Pharmaceuticals",
                "Mining & Environmental Engineering",
                "Construction & Building Sciences"
            ],
            "process_eyebrow": "Methodology",
            "process_title": "How We Work With You",
            "process_subtitle": "A disciplined 6-stage process designed to minimize distraction for your technical team.",
            "process_steps": [
                {
                    "step": "1",
                    "title": "Preliminary Discussion",
                    "desc": "Initial consultation to understand your technological operations and identify eligible projects."
                },
                {
                    "step": "2",
                    "title": "Technical Scoping",
                    "desc": "Interviews with your technical leads to document uncertainties, hypotheses, and testing cycles."
                },
                {
                    "step": "3",
                    "title": "Narrative Drafting",
                    "desc": "Preparation of robust, CRA-defensible Form T661 project descriptions and reports."
                },
                {
                    "step": "4",
                    "title": "Cost Identification",
                    "desc": "Quantifying eligible direct wages, contractor expenditures, and proxy overhead calculations."
                },
                {
                    "step": "5",
                    "title": "Filing Integration",
                    "desc": "Seamless filing integration with your corporate T2 tax return with the Canada Revenue Agency."
                },
                {
                    "step": "6",
                    "title": "Post-Filing Support",
                    "desc": "Defending and representing the claim before CRA auditors until tax credits or refunds are issued."
                }
            ],
            "cta_eyebrow": "Maximize Your Refund Today",
            "cta_title": "Ready to discover your eligible SR&ED refund?",
            "cta_subtitle": "Schedule a confidential screening with our senior CPA partners and technical specialists. We evaluate eligibility with no upfront fees.",
            "cta_primary_btn": "Book Free Assessment",
            "cta_secondary_btn": "Contact Toronto Office"
        },
        
        "tax_advisory": {
            "title": "Tax Advisory, Preparation And Filing",
            "hero_eyebrow": "Executive CPA Tax Practice",
            "hero_title": "Tax Advisory, Preparation And Filing",
            "hero_subtitle": "Accurate and professional preparation for both business and personal submissions, backed by decades of CPA audit experience.",
            "hero_banner": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/tax-advisory-banner.png",
            "content_image": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/648.png",
            "section_eyebrow": "Canada Revenue Agency Representation",
            "section_title": "Complete Corporate & Individual Tax Scope",
            "intro": "For individuals (employed or self-employed), proprietorships, partnerships and corporations, our firm is equipped to represent, prepare and/or file the following with the Canada Revenue Agency (CRA):",
            "services_list": [
                "T1 General – personal tax return (employed and self-employed)",
                "T2 Corporate Tax Return with Compilation Engagement financial statements",
                "Personal or Corporate Tax Review or Audit Representation",
                "GST/HST Review or Audit Defense",
                "GST/HST Filings for Self-Employed, Proprietorships, Partnerships and Corporations",
                "T1 Adjustments and Prior Year Reassessments",
                "Notices of Objection and Dispute Resolution with the CRA",
                "Tax Appeals and Tax Court Representation Coordination",
                "T4, T4A, T5 Slips & T4 Summary Filing",
                "GST/HST Rebate Applications (New Housing Rebate - NHR, NRRP Rebate)",
                "Non-Resident Tax Compliance (Employment, Rental, or Investment Income)",
                "Section 116 Certificate of Compliance for Non-Resident Real Estate Dispositions",
                "Commodity Tax Transactions including HST and Cross-Border Withholding",
                "Scientific Research & Experimental Development (SR&ED) Tax Credit Claims",
                "Voluntary Tax Disclosure Program (VDP) Applications"
            ],
            "affiliation_text": "OUR FIRM IS A PROUD MEMBER OF THE CANADIAN TAX FOUNDATION AND THE EFILE ASSOCIATION OF CANADA",
            "card_title": "Need Strategic Tax Advisory?",
            "card_text": "Whether dealing with an overdue corporate T2 return, CRA audit letter, or cross-border asset disposition, speak with our senior partners today.",
            "card_button_text": "Book Tax Strategy Call",
            "cta_eyebrow": "Eliminate CRA Surprises",
            "cta_title": "Proactive tax advisory throughout the entire calendar year",
            "cta_subtitle": "We work closely with Canadian entrepreneurs, incorporated professionals, and multi-entity businesses to minimize tax liabilities legally and reliably.",
            "cta_primary_btn": "Schedule Free Consultation",
            "cta_secondary_btn": "View Pricing Plans"
        },
        
        "accounting": {
            "title": "Accounting and Bookkeeping",
            "hero_eyebrow": "Financial Statement Preparation",
            "hero_title": "Accounting and Bookkeeping",
            "hero_subtitle": "Accurate monthly accounting, cloud integration, and financial statements that empower commercial financing.",
            "hero_banner": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/accounting-bookkeeping-banner.png",
            "content_image": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/658.png",
            "section_eyebrow": "Cloud Precision",
            "section_title": "Tailored Accounting For Canadian Businesses",
            "intro": "Regardless of the size of your business, our firm can provide a bookkeeping solution that fits the unique needs of your business and ultimately provides timely and useful information in the preparation of Notice to Reader / Compilation Engagement financial statements that are used to secure financing arrangements for sole proprietorships, partnerships and Canadian-Controlled Private Corporations (CCPCs) in Canada.",
            "body": "Our firm's network is expansive and can be utilized to locate and manage the right bookkeeping professionals for your business who have the competence to handle any assignment and utilize cutting edge technological solutions and software (i.e. QuickBooks Online, Xero, FreshBooks) to achieve the desired results for our clients.",
            "section_list_title": "Our Continuous Ongoing Support:",
            "services_list": [
                "Comprehensive Full-Cycle Bookkeeping – setup, ledger cleanup, and ongoing consultation",
                "WSIB (Workplace Safety and Insurance Board) filing and monthly remittances",
                "Preparation of Notice to Reader / Compilation Engagement financial statements",
                "Monthly Bank and Credit Card Reconciliations",
                "Payroll Management, Source Deductions, and CRA remittances",
                "Quarterly and Annual Financial Performance Reviews"
            ],
            "card_title": "Get Your Books Up-To-Date",
            "card_text": "Behind on filings or need a clean Notice to Reader package for your banker? Let our team streamline your bookkeeping today.",
            "card_button_text": "Consult Our Bookkeeping Team",
            "cta_eyebrow": "Zero Reconciliation Headaches",
            "cta_title": "Automate your financial records with senior CPA oversight",
            "cta_subtitle": "Gain absolute clarity over cash flows, profit margins, and monthly tax obligations.",
            "cta_primary_btn": "Get Started Today",
            "cta_secondary_btn": "View Monthly Plans"
        },
        
        "financing": {
            "title": "Business Financing Solutions",
            "hero_eyebrow": "Growth Capital Advisory",
            "hero_title": "Business Financing Solutions",
            "hero_subtitle": "Preparation of financial statement packages and direct introductions to qualified Canadian commercial lenders.",
            "hero_banner": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/business-solution-banner.png",
            "content_image": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/668.png",
            "section_eyebrow": "Institutional Access",
            "section_title": "Bank-Ready Commercial Financing Packages",
            "intro": "Our firm's extensive network of institutions enables us to not only introduce your company, but prepare a comprehensive financial package acceptable to chartered banks and financial institutions that will qualify each client for a desired loan or lease to grow and scale your enterprise.",
            "section_list_title": "Our Financing Advisory Services Include:",
            "services_list": [
                "Financial Statement Preparation – Notice to Reader & Compilation Engagements",
                "Multi-Year Financial Projections & Detailed Cash Flow Modeling",
                "Comprehensive Business Plan Preparation for Commercial Lenders",
                "Canada Small Business Financing Program (CSBFP) application packages",
                "Commercial Equipment Lease and Working Capital Financing Support",
                "Advisory on Capital Structure and Debt vs. Equity Optimization"
            ],
            "card_title": "Preparing to Seek Commercial Capital?",
            "card_text": "Lenders review business proposals critically. Ensure your projections and Notice to Reader statements present your corporate capability in the best light.",
            "card_button_text": "Discuss Financing Requirements",
            "cta_eyebrow": "Unlock Your Expansion Capital",
            "cta_title": "Build lender confidence with CPA-certified financial models",
            "cta_subtitle": "Let's prepare your business for commercial loans, equipment leases, or government backed financing.",
            "cta_primary_btn": "Book Financing Strategy Call",
            "cta_secondary_btn": "Contact Us"
        },
        
        "incorporation": {
            "title": "Incorporation and Business Registration",
            "hero_eyebrow": "Enterprise Structuring",
            "hero_title": "Incorporation and Business Registration",
            "hero_subtitle": "Setting up your enterprise for legal protection, tax deferral, and strategic shareholder growth.",
            "hero_banner": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/icoopration-business-banner.png",
            "content_image": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/668.png",
            "section_eyebrow": "Strategic Foundation",
            "section_title": "Incorporate Right From Day One",
            "intro": "We offer full incorporation and business registration services across Canada while advising on the various business structures available (incorporation vs. sole proprietorship or partnership), their benefits and trade-offs, and providing a clear course of action from a business, tax, and accounting standpoint.",
            "section_list_title": "Our Full Incorporation Package Includes:",
            "services_list": [
                "Federal (Canada) & Provincial (Ontario) Incorporation",
                "Name Reservation (NUANS search) and Corporate Articles of Incorporation",
                "Digital Minute Book Setup, Corporate By-laws, and Shareholder Registers",
                "Shareholder Structure, Voting vs. Non-Voting shares, and Dividend Classes",
                "CRA Business Number (BN), Corporate Tax (RC), GST/HST (RT), and Payroll (RP) Registration",
                "Ongoing Corporate Annual Return filings and minute book maintenance"
            ],
            "card_title": "Starting a New Venture?",
            "card_text": "Structuring your corporation properly avoids substantial tax costs down the road. Speak with our incorporation specialists.",
            "card_button_text": "Book Incorporation Consultation",
            "cta_eyebrow": "Launch With Legal & Tax Confidence",
            "cta_title": "Protect your personal assets and unlock small business tax deductions",
            "cta_subtitle": "Get your corporate registration, minute book, and CRA tax accounts setup seamlessly.",
            "cta_primary_btn": "Incorporate Today",
            "cta_secondary_btn": "Explore All Services"
        },
        
        "about": {
            "title": "About Us — DeFreitas & Associates",
            "hero_title": "Exceeding expectations for over 30 years",
            "hero_subtitle": "We are a firm of Chartered Professional Accountants providing a wide array of business consulting and tax advisory services to individuals and business enterprises across Canada.",
            "hero_image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1024&q=80",
            "philosophy_title": "Professionalism delivered with personal commitment",
            "lead_text": "We pride ourselves on the extensive experience our team possesses along with a high level of professionalism extended to all of our clients, delivered at rates that are competitive.",
            "body_text": "Whether managing complex corporate restructures, preparing T2 corporate returns, recovering SR&ED research credits, or securing commercial bank loans, our advisors operate with unwavering diligence.",
            "credentials": [
                "Member, Canadian Tax Foundation (CTF)",
                "Registered EFILE Association of Canada Practice",
                "Decades of CRA audit defense and compilation experience",
                "Toronto Head Office serving clients across GTA and nationwide"
            ]
        },
        
        "contact": {
            "title": "Contact Us — DeFreitas & Associates CPAs",
            "hero_title": "Schedule Your Free Initial Consultation",
            "hero_subtitle": "We look forward to being of service to you. Reach out to our senior management team in Toronto today.",
            "address": "255 Duncan Mill Road, Suite 409, Toronto, ON, M3B 3H9, Canada",
            "phone": "647-722-5442",
            "toll_free": "1-855-227-9136",
            "email": "info@defreitas-consulting.com",
            "hours_weekday": "Monday – Friday: 9:00 AM – 5:00 PM EST",
            "hours_saturday": "Saturday: By Appointment",
            "hours_sunday": "Sunday: Closed",
            "map_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.4672158511629!2d-79.35250192432324!3d43.761437474386454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d290ca474381%3A0xe186bc90507bbbd1!2sUnited%20Center!5e0!3m2!1sen!2sin!4v1676705837626!5m2!1sen!2sin"
        }
    },

    "posts": [
        {
            "id": "1",
            "title": "Tax Time Approaching in Canada: Key Deadlines & Preparation Steps",
            "category": "Tax Strategy",
            "tag": "Tax Season 2026",
            "summary": "This is our usual time of year when our firm reminds all our valuable clients and friends in Canada about the crucial corporate installment deadlines and personal tax filing steps.",
            "content": "TAX TIME APPROACHING IN CANADA.\n\nImportant dates to remember:\n• T1 Personal income tax filing deadline is April 30th (June 15th for self-employed individuals).\n• T2 Corporate tax return is due 6 months following the corporation's fiscal year-end, while corporate taxes owed are payable 2 to 3 months following year-end depending on whether your company qualifies for the small business deduction.\n\nPreparing your corporate documentation early ensures maximum deductions and prevents costly late-filing penalties and CRA interest charges.\n\nContact DeFreitas & Associates today to organize your records and ensure prompt filing.",
            "date": "2026-03-01",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1024&q=80",
            "slug": "tax-time-approaching-in-canada-key-deadlines-preparation-steps",
            "seo_title": "Tax Time Approaching in Canada: Key Deadlines & Preparation Steps",
            "seo_description": "Essential CRA tax deadlines and preparation steps for Canadian corporations and individuals for the 2026 tax year.",
            "seo_keywords": "Canadian Tax Deadlines, T2 Corporate Tax, T1 Personal Tax, CRA Filing 2026, DeFreitas CPAs"
        },
        {
            "id": "2",
            "title": "DeFreitas & Associates Sponsors Dominica Rising Benefit Gala",
            "category": "Firm News",
            "tag": "Corporate Sponsor",
            "summary": "DeFreitas & Associates (D&A) was proud to be a corporate sponsor supporting the Dominica Rising Benefit Gala hosted by Trade & Investment Commissioner Frances Delsol.",
            "content": "DeFreitas & Associates (D&A) was proud to be a corporate sponsor of the Dominica Rising Benefit Gala hosted by the Trade & Investment Commissioner for Dominica (in Canada), Ms. Frances Delsol.\n\nOur team remains committed to community engagement, international business collaboration, and supporting philanthropic economic growth initiatives across the Caribbean diaspora and North America.\n\nWe thank all distinguished guests and community organizers for a memorable and impactful evening.",
            "date": "2025-11-15",
            "image": "https://defreitas-consulting.ca/wp-content/uploads/2023/03/recent-post.jpg",
            "slug": "defreitas-associates-sponsors-dominica-rising-benefit-gala",
            "seo_title": "DeFreitas & Associates Sponsors Dominica Rising Benefit Gala",
            "seo_description": "DeFreitas & Associates proud corporate sponsor of the Dominica Rising Benefit Gala hosted by Trade & Investment Commissioner Frances Delsol.",
            "seo_keywords": "Dominica Rising Gala, Frances Delsol, Corporate Sponsorship, DeFreitas & Associates News"
        },
        {
            "id": "3",
            "title": "DeFreitas & Associates Joins the Canadian Tax Foundation",
            "category": "Affiliation",
            "tag": "CTF Membership",
            "summary": "D&A is proud to announce that the firm's North American affiliated office in Toronto has become a member of the Canadian Tax Foundation (ctf.ca).",
            "content": "DeFreitas & Associates (D&A) is proud to announce that the firm’s North American affiliated office in Toronto, Canada has become a member of the Canadian Tax Foundation (www.ctf.ca).\n\nMembership in the Canadian Tax Foundation further reinforces our capacity to deliver leading-edge tax planning, high-level statutory compliance, and CRA policy insights to our corporate and private wealth clients.\n\nOur clients benefit directly from our firm's ongoing access to specialized national tax jurisprudence, scholarly conferences, and advanced research materials.",
            "date": "2025-08-20",
            "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1024&q=80",
            "slug": "defreitas-associates-joins-canadian-tax-foundation",
            "seo_title": "DeFreitas & Associates Joins the Canadian Tax Foundation",
            "seo_description": "DeFreitas & Associates North American affiliated office in Toronto becomes an active member of the prestigious Canadian Tax Foundation.",
            "seo_keywords": "Canadian Tax Foundation, CTF Member, Canadian Tax Planning, DeFreitas & Associates Toronto"
        }
    ]
}
