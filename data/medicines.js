// ========================================================
// INDIAN MEDICINES DATABASE
// Schema based on INDIAN_MEDICINE_MCP_SERVER
// Brand Names, Generic Compositions, Symptoms & Pricing
// ========================================================

const MEDICINES_DATABASE = [
  // --- FEVER & PAIN ---
  {
    id: "med-001",
    brand_name: "Dolo 650",
    jan_aushadhi_name: "Paracetamol Tablets IP 650mg",
    generic_name: "Paracetamol (650mg)",
    active_ingredients: ["Paracetamol"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Micro Labs Ltd",
    brand_mrp: 34.00,
    jan_aushadhi_price: 6.50,
    savings_percent: 81,
    prescription_required: false,
    category: "fever",
    category_label: "Fever & Pain",
    symptoms: ["fever", "headache", "body ache", "mild pain", "viral fever", "toothache", "cold"],
    description: "Antipyretic and analgesic used for fast relief from high fever and mild to moderate body pain."
  },
  {
    id: "med-002",
    brand_name: "Crocin 650",
    jan_aushadhi_name: "Paracetamol Tablets IP 650mg",
    generic_name: "Paracetamol (650mg)",
    active_ingredients: ["Paracetamol"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "GlaxoSmithKline",
    brand_mrp: 33.50,
    jan_aushadhi_price: 6.50,
    savings_percent: 81,
    prescription_required: false,
    category: "fever",
    category_label: "Fever & Pain",
    symptoms: ["fever", "headache", "body pain", "temperature", "chills"],
    description: "Reliable fever reducer and pain reliever."
  },
  {
    id: "med-003",
    brand_name: "Calpol 500",
    jan_aushadhi_name: "Paracetamol Tablets IP 500mg",
    generic_name: "Paracetamol (500mg)",
    active_ingredients: ["Paracetamol"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "GlaxoSmithKline",
    brand_mrp: 20.00,
    jan_aushadhi_price: 4.80,
    savings_percent: 76,
    prescription_required: false,
    category: "fever",
    category_label: "Fever & Pain",
    symptoms: ["fever", "headache", "mild pain", "body ache", "malaise"],
    description: "Standard dose paracetamol for adults and teens for fever control."
  },
  {
    id: "med-004",
    brand_name: "Combiflam",
    jan_aushadhi_name: "Ibuprofen & Paracetamol Tablets IP",
    generic_name: "Ibuprofen (400mg) + Paracetamol (325mg)",
    active_ingredients: ["Ibuprofen", "Paracetamol"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Sanofi India Ltd",
    brand_mrp: 47.00,
    jan_aushadhi_price: 11.00,
    savings_percent: 77,
    prescription_required: false,
    category: "fever",
    category_label: "Fever & Pain",
    symptoms: ["severe headache", "muscle pain", "joint pain", "fever", "dental pain", "sprain"],
    description: "Dual-action analgesic and anti-inflammatory combination for stubborn body pain and fever."
  },
  {
    id: "med-005",
    brand_name: "Voveran SR 100",
    jan_aushadhi_name: "Diclofenac Sodium Prolonged-release Tablets IP 100mg",
    generic_name: "Diclofenac Sodium (100mg)",
    active_ingredients: ["Diclofenac"],
    dosage_form: "Sustained Release Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Novartis India Ltd",
    brand_mrp: 185.00,
    jan_aushadhi_price: 24.00,
    savings_percent: 87,
    prescription_required: true,
    category: "fever",
    category_label: "Fever & Pain",
    symptoms: ["arthritis", "severe joint pain", "back pain", "inflammation", "rheumatism"],
    description: "Potent NSAID for chronic joint pain, osteoarthritis, and inflammatory muscle pain."
  },

  // --- DIABETES ---
  {
    id: "med-006",
    brand_name: "Glycomet 500",
    jan_aushadhi_name: "Metformin Hydrochloride Tablets IP 500mg",
    generic_name: "Metformin Hydrochloride (500mg)",
    active_ingredients: ["Metformin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "USV Ltd",
    brand_mrp: 45.00,
    jan_aushadhi_price: 7.20,
    savings_percent: 84,
    prescription_required: true,
    category: "diabetes",
    category_label: "Diabetes Care",
    symptoms: ["diabetes", "high blood sugar", "type 2 diabetes", "insulin resistance", "sugar"],
    description: "First-line oral anti-diabetic medication that controls blood glucose levels."
  },
  {
    id: "med-007",
    brand_name: "Glycomet GP 1",
    jan_aushadhi_name: "Glimepiride & Metformin Hydrochloride Tablets IP (1mg + 500mg)",
    generic_name: "Glimepiride (1mg) + Metformin (500mg)",
    active_ingredients: ["Glimepiride", "Metformin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "USV Ltd",
    brand_mrp: 110.00,
    jan_aushadhi_price: 18.00,
    savings_percent: 83,
    prescription_required: true,
    category: "diabetes",
    category_label: "Diabetes Care",
    symptoms: ["diabetes", "high sugar", "type 2 diabetes", "glycemic control"],
    description: "Combination therapy for patients whose blood sugar is uncontrolled on single medicine."
  },
  {
    id: "med-008",
    brand_name: "Januvia 100",
    jan_aushadhi_name: "Sitagliptin Phosphate Tablets IP 100mg",
    generic_name: "Sitagliptin (100mg)",
    active_ingredients: ["Sitagliptin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 7 tablets",
    manufacturer: "MSD Pharmaceuticals",
    brand_mrp: 320.00,
    jan_aushadhi_price: 45.00,
    savings_percent: 86,
    prescription_required: true,
    category: "diabetes",
    category_label: "Diabetes Care",
    symptoms: ["diabetes", "high blood sugar", "type 2 diabetes"],
    description: "DPP-4 inhibitor that boosts insulin secretion after meals without causing hypoglycemia."
  },
  {
    id: "med-009",
    brand_name: "Galvus 50",
    jan_aushadhi_name: "Vildagliptin Tablets IP 50mg",
    generic_name: "Vildagliptin (50mg)",
    active_ingredients: ["Vildagliptin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Novartis India Ltd",
    brand_mrp: 295.00,
    jan_aushadhi_price: 36.00,
    savings_percent: 88,
    prescription_required: true,
    category: "diabetes",
    category_label: "Diabetes Care",
    symptoms: ["diabetes", "type 2 diabetes", "high blood sugar"],
    description: "Modern oral antidiabetic medicine for glycemic management."
  },

  // --- HYPERTENSION & HEART ---
  {
    id: "med-010",
    brand_name: "Telma 40",
    jan_aushadhi_name: "Telmisartan Tablets IP 40mg",
    generic_name: "Telmisartan (40mg)",
    pmbi_code: "300",
    active_ingredients: ["Telmisartan"],
    dosage_form: "Tablet",
    pack_size: "10 tablets",
    image: "assets/Telmisartan 40mg.png",
    manufacturer: "Glenmark Pharmaceuticals",
    brand_mrp: 106.00,
    jan_aushadhi_price: 18.00,
    savings: 88.00,
    savings_percent: 83,
    prescription_required: true,
    category: "hypertension",
    category_label: "Hypertension / BP",
    symptoms: ["high bp", "hypertension", "blood pressure", "heart", "cardiac"],
    kendra_info: "Available in 3 Kendra near 462039",
    tags: ["WHO GMP Certified", "NABL Tested", "3k people ordered"],
    description: "Telma 40 Tablet is an Angiotensin Receptor Blocker (ARB) prescribed for high blood pressure, prevention of heart attack/stroke, and kidney preservation in diabetes.",
    product_info: "Telma 40 Tablet contains Telmisartan (40mg), an Angiotensin II Receptor Blocker (ARB) widely prescribed to treat essential hypertension (high blood pressure) and to reduce the risk of cardiovascular events such as heart attacks and strokes in high-risk patients. It is also clinically proven to preserve renal function and delay diabetic nephropathy in type 2 diabetic patients.",
    uses: [
      "Treatment of Hypertension (High Blood Pressure)",
      "Prevention of Heart Attack and Stroke in high-risk patients",
      "Management of Heart Failure and cardiac workload reduction",
      "Protection of kidney function in type 2 diabetic patients (Diabetic Nephropathy)"
    ],
    benefits: "Telma 40 relaxes and widens the blood vessels by inhibiting angiotensin II. This decreases systemic vascular resistance, making it significantly easier for the heart to pump oxygenated blood throughout the body. Controlled blood pressure directly reduces the long-term danger of fatal cardiovascular events, coronary artery disease, and stroke.",
    side_effects: [
      "Dizziness or lightheadedness (especially when standing up)",
      "Back pain and muscle cramps",
      "Sinus inflammation or nasal congestion",
      "Diarrhea or mild gastrointestinal discomfort",
      "Fatigue and general weakness"
    ],
    usage: "Take Telma 40 Tablet orally in the exact dosage and duration advised by your physician. Swallow the tablet whole with a glass of water—do not chew, crush, or break it. It can be taken with or without meals, but should ideally be taken at the same time each day (preferably every morning). Do not discontinue treatment abruptly even if you feel healthy.",
    how_it_works: "Telmisartan is a selective Angiotensin II receptor type 1 (AT1) antagonist. Angiotensin II is a naturally occurring peptide hormone that binds to vascular receptors causing potent vasoconstriction (narrowing of vessels) and aldosterone release. By selectively blocking the AT1 receptors, Telmisartan prevents vasoconstriction, allowing blood vessels to remain relaxed and dilated.",
    safety_advice: [
      { topic: "Pregnancy", status: "Unsafe", text: "Telma 40 Tablet is strictly contraindicated during pregnancy (especially 2nd and 3rd trimesters) as it can cause serious injury or fetal death. Stop taking immediately and consult your doctor if pregnancy is suspected." },
      { topic: "Breastfeeding", status: "Caution", text: "Telma 40 Tablet is not recommended during breastfeeding. Discuss with your physician for safer alternative antihypertensive therapy." },
      { topic: "Alcohol", status: "Avoid", text: "Avoid consuming alcohol while taking Telma 40. Alcohol causes additive vasodilation and can dangerously drop blood pressure, causing acute dizziness or fainting." },
      { topic: "Driving", status: "Caution", text: "Telma 40 may cause dizziness, vertigo, or fatigue during early days of therapy. Avoid driving or operating machinery until you know how the medication affects you." },
      { topic: "Kidney & Liver", status: "Monitoring Required", text: "Use with caution in patients with renal impairment or biliary obstructive disorders. Periodic monitoring of serum potassium and creatinine levels is recommended." }
    ],
    faqs: [
      { q: "Can I take Telma 40 in the morning or at night?", a: "Telma 40 is typically taken once daily in the morning with or without food. Taking it at the same time each day ensures consistent 24-hour blood pressure control." },
      { q: "How long does it take for Telma 40 to show results?", a: "Noticeable blood pressure reduction begins within 2 weeks of regular therapy, with optimal therapeutic stabilization reached after 4 to 8 weeks." },
      { q: "Is Jan Aushadhi Telmisartan 40mg equivalent to branded Telma 40?", a: "Yes, 100%. Under the PMBJP scheme, Jan Aushadhi generic medicines are manufactured in WHO-GMP compliant facilities using identical active pharmaceutical ingredients (Telmisartan IP 40mg), batch-tested by NABL accredited laboratories, delivering exact therapeutic efficacy at ₹18 instead of ₹106." },
      { q: "Do I need to take this medicine for life?", a: "High blood pressure is usually a chronic condition. Even when blood pressure normalizes, you should continue medication as prescribed because uncontrolled hypertension often presents no obvious warning symptoms." }
    ]
  },
  {
    id: "med-011",
    brand_name: "Telma H",
    jan_aushadhi_name: "Telmisartan & Hydrochlorothiazide Tablets IP (40mg + 12.5mg)",
    generic_name: "Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)",
    active_ingredients: ["Telmisartan", "Hydrochlorothiazide"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Glenmark Pharmaceuticals",
    brand_mrp: 180.00,
    jan_aushadhi_price: 22.00,
    savings_percent: 88,
    prescription_required: true,
    category: "hypertension",
    category_label: "Hypertension / BP",
    symptoms: ["high blood pressure", "hypertension", "bp", "water retention"],
    description: "Dual medicine for high blood pressure combining an ARB with a mild diuretic."
  },
  {
    id: "med-012",
    brand_name: "Amlong 5",
    jan_aushadhi_name: "Amlodipine Besilate Tablets IP 5mg",
    generic_name: "Amlodipine (5mg)",
    active_ingredients: ["Amlodipine"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Micro Labs Ltd",
    brand_mrp: 42.00,
    jan_aushadhi_price: 5.50,
    savings_percent: 87,
    prescription_required: true,
    category: "hypertension",
    category_label: "Hypertension / BP",
    symptoms: ["high bp", "hypertension", "chest pain", "angina"],
    description: "Calcium channel blocker that relaxes blood vessels to improve blood flow."
  },
  {
    id: "med-013",
    brand_name: "Atorva 10",
    jan_aushadhi_name: "Atorvastatin Tablets IP 10mg",
    generic_name: "Atorvastatin (10mg)",
    active_ingredients: ["Atorvastatin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Zydus Cadila",
    brand_mrp: 115.00,
    jan_aushadhi_price: 15.00,
    savings_percent: 87,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cholesterol & Heart",
    symptoms: ["high cholesterol", "heart health", "lipid disorder", "blockage prevention"],
    description: "Statin medicine used to reduce bad cholesterol (LDL) and lower stroke risks."
  },

  // --- ASTHMA & RESPIRATORY ---
  {
    id: "med-014",
    brand_name: "Asthalin Inhaler",
    jan_aushadhi_name: "Salbutamol Inhaler IP 100mcg",
    generic_name: "Salbutamol (100mcg per puff)",
    active_ingredients: ["Salbutamol"],
    dosage_form: "Inhaler (200 MD)",
    pack_size: "1 Inhaler Canister",
    manufacturer: "Cipla Ltd",
    brand_mrp: 168.00,
    jan_aushadhi_price: 48.00,
    savings_percent: 71,
    prescription_required: true,
    category: "asthma",
    category_label: "Asthma Care",
    symptoms: ["asthma", "breathing difficulty", "wheezing", "shortness of breath", "bronchospasm"],
    description: "Fast-acting rescue bronchodilator inhaler for sudden asthma attacks and breathlessness."
  },
  {
    id: "med-015",
    brand_name: "Budecort 200 Inhaler",
    jan_aushadhi_name: "Budesonide Inhalation Aerosol IP 200mcg",
    generic_name: "Budesonide (200mcg per puff)",
    active_ingredients: ["Budesonide"],
    dosage_form: "Inhaler (200 MD)",
    pack_size: "1 Inhaler Canister",
    manufacturer: "Cipla Ltd",
    brand_mrp: 380.00,
    jan_aushadhi_price: 85.00,
    savings_percent: 78,
    prescription_required: true,
    category: "asthma",
    category_label: "Asthma Care",
    symptoms: ["asthma", "chronic cough", "lung inflammation", "copd", "wheezing"],
    description: "Inhaled corticosteroid controller to prevent asthma attacks and reduce airway swelling."
  },
  {
    id: "med-016",
    brand_name: "Montair LC",
    jan_aushadhi_name: "Montelukast & Levocetirizine Dihydrochloride Tablets IP",
    generic_name: "Montelukast (10mg) + Levocetirizine (5mg)",
    active_ingredients: ["Montelukast", "Levocetirizine"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Cipla Ltd",
    brand_mrp: 185.00,
    jan_aushadhi_price: 26.00,
    savings_percent: 86,
    prescription_required: true,
    category: "asthma",
    category_label: "Asthma & Allergy",
    symptoms: ["allergic asthma", "sneezing", "runny nose", "cough", "allergic rhinitis", "sinus"],
    description: "Dual therapy for nighttime allergic cough, seasonal allergic rhinitis, and asthma prophylaxis."
  },
  {
    id: "med-017",
    brand_name: "Ascoril LS Syrup",
    jan_aushadhi_name: "Levosalbutamol, Ambroxol HCl & Guaiphenesin Syrup",
    generic_name: "Levosalbutamol + Ambroxol + Guaifenesin",
    active_ingredients: ["Levosalbutamol", "Ambroxol", "Guaifenesin"],
    dosage_form: "Syrup (100ml)",
    pack_size: "100ml Bottle",
    manufacturer: "Glenmark Pharmaceuticals",
    brand_mrp: 125.00,
    jan_aushadhi_price: 28.00,
    savings_percent: 78,
    prescription_required: false,
    category: "asthma",
    category_label: "Cough & Cold",
    symptoms: ["wet cough", "chest congestion", "mucus", "phlegm", "bronchitis"],
    description: "Mucolytic expectorant that clears heavy chest phlegm and opens blocked bronchial airways."
  },

  // --- ACIDITY & DIGESTION ---
  {
    id: "med-018",
    brand_name: "Pan 40",
    jan_aushadhi_name: "Pantoprazole Gastro-resistant Tablets IP 40mg",
    generic_name: "Pantoprazole (40mg)",
    active_ingredients: ["Pantoprazole"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Alkem Laboratories",
    brand_mrp: 155.00,
    jan_aushadhi_price: 18.00,
    savings_percent: 88,
    prescription_required: false,
    category: "acidity",
    category_label: "Acidity & Digestion",
    symptoms: ["acidity", "heartburn", "gerd", "stomach burning", "acid reflux", "gastritis"],
    description: "Proton pump inhibitor that reduces stomach acid production for fast relief from burning sensation."
  },
  {
    id: "med-019",
    brand_name: "Pan D",
    jan_aushadhi_name: "Pantoprazole & Domperidone Prolonged-release Capsules IP",
    generic_name: "Pantoprazole (40mg) + Domperidone (30mg SR)",
    active_ingredients: ["Pantoprazole", "Domperidone"],
    dosage_form: "Capsule",
    pack_size: "Strip of 10 capsules",
    manufacturer: "Alkem Laboratories",
    brand_mrp: 195.00,
    jan_aushadhi_price: 24.00,
    savings_percent: 87,
    prescription_required: true,
    category: "acidity",
    category_label: "Acidity & Nausea",
    symptoms: ["acidity with nausea", "vomiting feeling", "bloating", "acid reflux", "belching"],
    description: "Prevents reflux and nausea while neutralizing severe gastro-esophageal acidity."
  },
  {
    id: "med-020",
    brand_name: "Omez 20",
    jan_aushadhi_name: "Omeprazole Gastro-resistant Capsules IP 20mg",
    generic_name: "Omeprazole (20mg)",
    active_ingredients: ["Omeprazole"],
    dosage_form: "Capsule",
    pack_size: "Strip of 10 capsules",
    manufacturer: "Dr. Reddy's Laboratories",
    brand_mrp: 75.00,
    jan_aushadhi_price: 10.50,
    savings_percent: 86,
    prescription_required: false,
    category: "acidity",
    category_label: "Acidity & Digestion",
    symptoms: ["stomach ulcer", "acid reflux", "heartburn", "indigestion", "gas"],
    description: "Standard therapy for peptic ulcers and long-term acid suppression."
  },

  // --- ANTIBIOTICS & INFECTION ---
  {
    id: "med-021",
    brand_name: "Augmentin 625 Duo",
    jan_aushadhi_name: "Amoxicillin & Potassium Clavulanate Tablets IP 625mg",
    generic_name: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    active_ingredients: ["Amoxicillin", "Clavulanic Acid"],
    dosage_form: "Tablet",
    pack_size: "Strip of 6 tablets",
    manufacturer: "GlaxoSmithKline",
    brand_mrp: 205.00,
    jan_aushadhi_price: 45.00,
    savings_percent: 78,
    prescription_required: true,
    category: "antibiotics",
    category_label: "Antibiotics",
    symptoms: ["bacterial infection", "throat infection", "ear infection", "tooth infection", "chest infection"],
    description: "Broad-spectrum penicillin antibiotic combined with beta-lactamase inhibitor."
  },
  {
    id: "med-022",
    brand_name: "Azithral 500",
    jan_aushadhi_name: "Azithromycin Tablets IP 500mg",
    generic_name: "Azithromycin (500mg)",
    active_ingredients: ["Azithromycin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 3 tablets",
    manufacturer: "Alembic Pharmaceuticals",
    brand_mrp: 120.00,
    jan_aushadhi_price: 22.00,
    savings_percent: 81,
    prescription_required: true,
    category: "antibiotics",
    category_label: "Antibiotics",
    symptoms: ["throat pain", "tonsillitis", "bronchitis", "typhoid", "skin infection"],
    description: "Convenient once-daily macrolide antibiotic for upper and lower respiratory tract infections."
  },

  // --- ALLERGIES ---
  {
    id: "med-023",
    brand_name: "Allegra 120",
    jan_aushadhi_name: "Fexofenadine Hydrochloride Tablets IP 120mg",
    generic_name: "Fexofenadine (120mg)",
    active_ingredients: ["Fexofenadine"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Sanofi India Ltd",
    brand_mrp: 198.00,
    jan_aushadhi_price: 28.00,
    savings_percent: 85,
    prescription_required: false,
    category: "allergies",
    category_label: "Allergy Care",
    symptoms: ["skin allergy", "itching", "hives", "sneezing", "allergic rash", "dust allergy"],
    description: "Non-drowsy second-generation antihistamine for rapid 24-hour allergy relief."
  },
  {
    id: "med-024",
    brand_name: "Cetzine 10",
    jan_aushadhi_name: "Cetirizine Hydrochloride Tablets IP 10mg",
    generic_name: "Cetirizine Hydrochloride (10mg)",
    active_ingredients: ["Cetirizine"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Dr. Reddy's Laboratories",
    brand_mrp: 22.00,
    jan_aushadhi_price: 3.50,
    savings_percent: 84,
    prescription_required: false,
    category: "allergies",
    category_label: "Allergy Care",
    symptoms: ["runny nose", "sneezing", "watery eyes", "cold allergy", "itching"],
    description: "Affordable antihistamine for immediate control of allergy and cold symptoms."
  },
  // --- CARDIOVASCULAR & BLOOD THINNERS (Matching Clopidogrel / Cart series) ---
  {
    id: "med-025",
    brand_name: "Clopilet A 75",
    jan_aushadhi_name: "Clopidogrel & Aspirin Capsules (75mg + 75mg)",
    generic_name: "Clopidogrel (75mg) + Aspirin (75mg)",
    active_ingredients: ["Clopidogrel", "Aspirin"],
    dosage_form: "Capsule",
    pack_size: "Strip of 10 capsules",
    manufacturer: "Sun Pharmaceutical Industries",
    brand_mrp: 85.00,
    jan_aushadhi_price: 21.00,
    savings_percent: 75,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cardiovascular Care",
    symptoms: ["blood clots", "heart stroke prevention", "chest pain", "angina"],
    description: "Antiplatelet combination medicine to prevent blood clots in blood vessels and reduce the risk of heart attacks."
  },
  {
    id: "med-026",
    brand_name: "Clopilet 75 mg",
    jan_aushadhi_name: "Clopidogrel Tablets IP 75mg",
    generic_name: "Clopidogrel (75mg)",
    active_ingredients: ["Clopidogrel"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Sun Pharmaceutical Industries",
    brand_mrp: 72.00,
    jan_aushadhi_price: 18.00,
    savings_percent: 75,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cardiovascular Care",
    symptoms: ["blood clot", "heart attack prevention", "stroke prevention"],
    description: "Antiplatelet blood thinner medication prescribed to lower the risk of heart attack or stroke in high-risk patients."
  },
  {
    id: "med-027",
    brand_name: "Clopitab 75",
    jan_aushadhi_name: "Clopidogrel Tablets IP 75mg",
    generic_name: "Clopidogrel (75mg)",
    active_ingredients: ["Clopidogrel"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Lupin Ltd",
    brand_mrp: 70.00,
    jan_aushadhi_price: 18.00,
    savings_percent: 74,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cardiovascular Care",
    symptoms: ["blood clot", "angina", "post-stent prevention"],
    description: "Effective antiplatelet therapy preventing harmful blood clots after heart procedures or stent placement."
  },
  {
    id: "med-028",
    brand_name: "Clopivas 75",
    jan_aushadhi_name: "Clopidogrel Tablets IP 75mg",
    generic_name: "Clopidogrel (75mg)",
    active_ingredients: ["Clopidogrel"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Cipla Ltd",
    brand_mrp: 75.00,
    jan_aushadhi_price: 18.00,
    savings_percent: 76,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cardiovascular Care",
    symptoms: ["blood clot", "arterial thrombosis", "stroke"],
    description: "Cardiovascular blood thinner tablet preventing platelet aggregation and arterial thrombosis."
  },
  {
    id: "med-029",
    brand_name: "Nikoran 5mg",
    jan_aushadhi_name: "Nicorandil Tablets IP 5mg",
    generic_name: "Nicorandil (5mg)",
    active_ingredients: ["Nicorandil"],
    dosage_form: "Tablet",
    pack_size: "Strip of 20 tablets",
    manufacturer: "Torrent Pharmaceuticals",
    brand_mrp: 480.00,
    jan_aushadhi_price: 82.00,
    savings_percent: 83,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cardiovascular Care",
    symptoms: ["angina pectoris", "chest pain", "ischemic heart disease"],
    description: "Potassium-channel activator and nitrate vasodilator for prevention and long-term treatment of chronic stable angina pectoris."
  },
  {
    id: "med-030",
    brand_name: "Rosuvas 20mg",
    jan_aushadhi_name: "Rosuvastatin Tablets IP 20mg",
    generic_name: "Rosuvastatin (20mg)",
    active_ingredients: ["Rosuvastatin"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Sun Pharmaceutical Industries",
    brand_mrp: 420.00,
    jan_aushadhi_price: 29.00,
    savings_percent: 93,
    prescription_required: true,
    category: "hypertension",
    category_label: "Cholesterol & Heart Care",
    symptoms: ["high cholesterol", "hyperlipidemia", "cardiac risk prevention"],
    description: "Potent HMG-CoA reductase inhibitor (statin) used to significantly lower LDL cholesterol and triglycerides in blood."
  },
  {
    id: "med-031",
    brand_name: "Nebicard 2.5 mg",
    jan_aushadhi_name: "Nebivolol Tablets IP 2.5mg",
    generic_name: "Nebivolol (2.5mg)",
    active_ingredients: ["Nebivolol"],
    dosage_form: "Tablet",
    pack_size: "Strip of 10 tablets",
    manufacturer: "Torrent Pharmaceuticals",
    brand_mrp: 239.00,
    jan_aushadhi_price: 25.00,
    savings_percent: 90,
    prescription_required: true,
    category: "hypertension",
    category_label: "Blood Pressure Care",
    symptoms: ["high blood pressure", "hypertension", "heart failure"],
    description: "Cardioselective beta-blocker with nitric oxide-mediated vasodilatory properties for treatment of essential hypertension."
  }
];

// Common search suggestions pool matching Google-style autocomplete (per Figma screenshots)
const COMMON_SEARCH_SUGGESTIONS = [
  // Clopidogrel / Clopilet series (matching user screenshots)
  { text: "clopilet", isHistory: true },
  { text: "clopilet a 75", isHistory: true },
  { text: "clopitab 75", isHistory: false },
  { text: "clopidogrel", isHistory: false },
  { text: "clopilet 75 mg", isHistory: false },
  { text: "clopitab", isHistory: false },
  { text: "clopitab a 150", isHistory: false },
  { text: "clopivas 75", isHistory: false },
  { text: "clopitab cv 10", isHistory: false },
  { text: "clopidogrel 75 mg uses", isHistory: false },
  { text: "clopilet tablet", isHistory: false },
  { text: "clopilet 75 use", isHistory: false },
  { text: "clopilet tablet uses", isHistory: false },
  { text: "clopilet a 75 uses in marathi", isHistory: false },
  { text: "clopilet 75 mg uses", isHistory: false },
  { text: "clopilet a 150 uses in hindi", isHistory: false },
  { text: "clopilet a", isHistory: false },

  // Paracetamol / Dolo series
  { text: "dolo 650", isHistory: true },
  { text: "dolo 650 tablet", isHistory: false },
  { text: "dolo 650 mg", isHistory: false },
  { text: "paracetamol", isHistory: true },
  { text: "paracetamol 650mg", isHistory: false },
  { text: "paracetamol 500mg", isHistory: false },
  { text: "paracetamol tablets ip", isHistory: false },
  { text: "crocin 650", isHistory: false },
  { text: "calpol 500", isHistory: false },
  { text: "combiflam", isHistory: false },

  // Cardiovascular & Cholesterol series
  { text: "nikoran 5mg", isHistory: false },
  { text: "nicorandil 5mg", isHistory: false },
  { text: "rosuvas 20mg", isHistory: false },
  { text: "rosuvastatin", isHistory: false },
  { text: "rosuvastatin 20mg", isHistory: false },
  { text: "nebicard 2.5 mg", isHistory: false },
  { text: "nebivolol", isHistory: false },
  { text: "atorva 10", isHistory: false },
  { text: "atorvastatin", isHistory: false },
  { text: "telma 40", isHistory: false },
  { text: "telmisartan", isHistory: false },
  { text: "amlong 5", isHistory: false },
  { text: "amlodipine", isHistory: false },

  // Diabetes & Gastro
  { text: "glycomet 500", isHistory: false },
  { text: "metformin", isHistory: false },
  { text: "metformin 500mg", isHistory: false },
  { text: "pan 40", isHistory: false },
  { text: "pantoprazole", isHistory: false },
  { text: "pan d", isHistory: false },
  { text: "omez 20", isHistory: false },
  { text: "omeprazole", isHistory: false },
  { text: "cetzine 10", isHistory: false },
  { text: "cetirizine", isHistory: false }
];

// Helper Functions
function searchMedicines(query) {
  if (!query || query.trim() === '') return { results: [], isGenericQuery: false };
  const q = query.trim().toLowerCase();

  // First check if the query matches a generic composition / active ingredient
  const isGenericQuery = MEDICINES_DATABASE.some(med => 
    med.generic_name.toLowerCase().includes(q) || 
    med.active_ingredients.some(ing => ing.toLowerCase().includes(q))
  );

  const matchedItems = MEDICINES_DATABASE.map(med => {
    let matchType = null;
    let score = 0;

    // Check Generic Match
    const genericMatched = med.generic_name.toLowerCase().includes(q) || 
      med.active_ingredients.some(ing => ing.toLowerCase().includes(q));

    // Check Brand Match
    const brandMatched = med.brand_name.toLowerCase().includes(q);

    // Check Symptom Match
    const matchedSymptom = med.symptoms.find(sym => sym.toLowerCase().includes(q) || q.includes(sym.toLowerCase()));

    // Check Category Match
    const categoryMatched = med.category.toLowerCase().includes(q) || med.category_label.toLowerCase().includes(q);

    if (genericMatched) {
      matchType = "generic";
      score += 100;
      if (med.generic_name.toLowerCase().startsWith(q)) score += 30;
    } else if (brandMatched) {
      matchType = "brand";
      score += 80;
      if (med.brand_name.toLowerCase().startsWith(q)) score += 20;
    } else if (matchedSymptom) {
      matchType = `symptom: ${matchedSymptom}`;
      score += 70;
    } else if (categoryMatched) {
      matchType = "category";
      score += 50;
    }

    return { medicine: med, matchType, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score);

  // If searching by generic name, deduplicate records with identical generic composition
  let finalResults = [];
  if (isGenericQuery) {
    const seenGenerics = new Set();
    matchedItems.forEach(item => {
      if (item.matchType === 'generic') {
        const key = item.medicine.jan_aushadhi_name || item.medicine.generic_name;
        if (!seenGenerics.has(key)) {
          seenGenerics.add(key);
          finalResults.push({ ...item.medicine, matchType: 'generic' });
        }
      }
    });
  } else {
    finalResults = matchedItems.map(item => ({ ...item.medicine, matchType: item.matchType }));
  }

  return { results: finalResults, isGenericQuery };
}

function getMedicinesByCategory(category) {
  if (!category) return MEDICINES_DATABASE;
  return MEDICINES_DATABASE.filter(med => med.category.toLowerCase() === category.toLowerCase());
}

function findBestMatchingMedicine(text) {
  if (!text) return MEDICINES_DATABASE[0];
  const query = text.toLowerCase().trim();

  // 1. Exact brand match
  let found = MEDICINES_DATABASE.find(m => m.brand_name.toLowerCase() === query);
  if (found) return found;

  // 2. Exact generic match
  found = MEDICINES_DATABASE.find(m => {
    const cleanGen = m.generic_name.replace(/\(.*?\)/g, '').trim().toLowerCase();
    return cleanGen === query || m.generic_name.toLowerCase() === query;
  });
  if (found) return found;

  // 3. Starts with brand name or brand starts with query
  found = MEDICINES_DATABASE.find(m => 
    query.startsWith(m.brand_name.toLowerCase()) || 
    m.brand_name.toLowerCase().startsWith(query)
  );
  if (found) return found;

  // 4. Starts with generic or active ingredient
  found = MEDICINES_DATABASE.find(m => {
    const cleanGen = m.generic_name.replace(/\(.*?\)/g, '').trim().toLowerCase();
    return query.startsWith(cleanGen) || cleanGen.startsWith(query) ||
      (m.active_ingredients && m.active_ingredients.some(ing => query.startsWith(ing.toLowerCase()) || ing.toLowerCase().startsWith(query)));
  });
  if (found) return found;

  // 5. General search fallback
  const sr = searchMedicines(query);
  if (sr.results && sr.results.length > 0) return sr.results[0];

  return MEDICINES_DATABASE[0];
}

function getSearchSuggestions(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];

  const results = [];
  const seenTexts = new Set();

  function pushItem(text, medicine, isHistory = false) {
    const key = text.toLowerCase().trim();
    if (!seenTexts.has(key)) {
      seenTexts.add(key);
      results.push({
        text,
        medicine: medicine || findBestMatchingMedicine(text),
        isHistory
      });
    }
  }

  // 1. Check COMMON_SEARCH_SUGGESTIONS matching the query
  COMMON_SEARCH_SUGGESTIONS.forEach(item => {
    if (item.text.toLowerCase().includes(q) || q.includes(item.text.toLowerCase())) {
      pushItem(item.text, null, item.isHistory);
    }
  });

  // 2. Check MEDICINES_DATABASE brand names
  MEDICINES_DATABASE.forEach(med => {
    const brand = med.brand_name.toLowerCase();
    if (brand.startsWith(q) || brand.includes(q)) {
      pushItem(med.brand_name, med, false);
      if (med.dosage_form) {
        pushItem(`${med.brand_name} ${med.dosage_form.toLowerCase()}`, med, false);
      }
    }
  });

  // 3. Check MEDICINES_DATABASE generic names
  MEDICINES_DATABASE.forEach(med => {
    const cleanGen = med.generic_name.replace(/\(.*?\)/g, '').trim().toLowerCase();
    const gen = med.generic_name.toLowerCase();
    if (cleanGen.startsWith(q) || gen.startsWith(q) || cleanGen.includes(q)) {
      pushItem(cleanGen, med, false);
      pushItem(med.generic_name, med, false);
      pushItem(`${cleanGen} ${med.dosage_form.toLowerCase()}`, med, false);
      pushItem(`${cleanGen} uses`, med, false);
    }
    if (med.active_ingredients) {
      med.active_ingredients.forEach(ing => {
        if (ing.toLowerCase().startsWith(q) || ing.toLowerCase().includes(q)) {
          pushItem(ing.toLowerCase(), med, false);
        }
      });
    }
  });

  return results.slice(0, 10);
}

