export interface TreatmentItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  isFeatured: boolean;
  isActive: boolean;
}

export const treatmentsData: TreatmentItem[] = [
  {
    id: "invisalign",
    title: "Invisalign & Clear Aligners",
    slug: "invisalign-clear-aligners",
    category: "Orthodontics",
    tagline: "Discreet, modern orthodontic correction with custom aligner series.",
    shortDescription: "Custom-crafted transparent aligners designed to gently align teeth with minimal lifestyle disruption.",
    fullDescription: "Invisalign clear aligners offer a transparent, removable alternative to conventional orthodontic braces. Using precise digital scans, a bespoke sequence of aligners gradually moves your teeth into optimal clinical alignment.",
    heroImage: "/treatments/invisalign.jpg",
    benefits: [
      "Nearly invisible design for confident everyday wear",
      "Removable for effortless eating and thorough oral hygiene",
      "No sharp metal brackets or wires to cause soft-tissue irritation",
      "Digital treatment planning allows visualising anticipated tooth movement",
    ],
    process: [
      { step: "01", title: "Comprehensive Scan & Consultation", description: "Assessment of dental arches, bite alignment, and high-precision digital scan." },
      { step: "02", title: "Custom Aligner Fabrication", description: "Bespoke aligner series fabricated according to doctor-directed treatment parameters." },
      { step: "03", title: "Guided Progress Monitoring", description: "Periodic clinical progress checks to verify tooth movement and issue subsequent aligner stages." },
    ],
    faqs: [
      { question: "How many hours a day should aligners be worn?", answer: "Aligners are typically worn 20 to 22 hours per day, removing them only for meals, hot beverages, and brushing." },
      { question: "Is Invisalign suitable for all orthodontic cases?", answer: "Suitability is determined during clinical examination based on your specific malocclusion and arch alignment." },
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    id: "orthodontics",
    title: "Orthodontic Treatment",
    slug: "orthodontic-treatment",
    category: "Orthodontics",
    tagline: "Expert orthodontic management for balanced dental alignment and bite function.",
    shortDescription: "Specialised alignment of teeth and jaws using modern bracket systems and corrective appliances.",
    fullDescription: "Comprehensive orthodontic care addresses crowded, crooked, or misaligned teeth along with jaw relationship issues to establish optimal chewing function and aesthetic balance.",
    heroImage: "/treatments/orthodontics.jpg",
    benefits: [
      "Corrects deep bites, crossbites, and dental spacing",
      "Improves masticatory efficiency and speech clarity",
      "Facilitates long-term periodontal health by eliminating plaque traps",
    ],
    process: [
      { step: "01", title: "Orthodontic Evaluation", description: "Detailed cephalometric analysis, photographic records, and functional bite assessment." },
      { step: "02", title: "Appliance Placement", description: "Precise bonding of brackets and selection of initial gentle archwires." },
      { step: "03", title: "Active Alignment & Retention", description: "Progressive adjustments followed by retention protocols to stabilise clinical results." },
    ],
    faqs: [
      { question: "Can adults undergo orthodontic treatment?", answer: "Yes, teeth can be orthodontically repositioned at any age provided the supporting bone and periodontal tissues are healthy." },
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    category: "Cosmetic Dentistry",
    tagline: "Professional clinical brightening for a radiant, naturally refreshed smile.",
    shortDescription: "Safe, dentist-supervised bleaching procedures that lighten internal and external enamel stains.",
    fullDescription: "Clinical teeth whitening uses formulated peroxide gels activated under controlled conditions to lift deep dietary discoloration while protecting enamel structure and sensitive gums.",
    heroImage: "/treatments/teeth-whitening.jpg",
    benefits: [
      "Professional supervision ensuring safe application and gum protection",
      "Noticeable brightening in a single controlled session",
      "Customised post-treatment sensitivity management",
    ],
    process: [
      { step: "01", title: "Pre-Whitening Cleaning", description: "Removal of extrinsic plaque and surface calculus." },
      { step: "02", title: "Gingival Barrier Application", description: "Careful isolation of soft tissues and gums." },
      { step: "03", title: "Controlled Whitening Cycle", description: "Precise application of clinical brightening gel." },
    ],
    faqs: [
      { question: "Will whitening cause permanent tooth sensitivity?", answer: "Any transient sensitivity is generally mild and subsides within 24 to 48 hours following clinical protocol." },
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    id: "dental-veneers",
    title: "Dental Veneers",
    slug: "dental-veneers",
    category: "Cosmetic Dentistry",
    tagline: "Ultra-thin porcelain laminates to restore contour, shade, and proportion.",
    shortDescription: "Custom ceramic coverings bonded to front tooth surfaces to correct chipping, staining, or gaps.",
    fullDescription: "Porcelain veneers are crafted with microscopic precision to mirror the natural translucency of dental enamel, harmonising uneven edges and stubborn discolouration.",
    heroImage: "/treatments/dental-veneers.jpg",
    benefits: [
      "Natural optical translucency and lifelike appearance",
      "High stain resistance compared to composite bonding",
      "Conservative tooth preparation respecting biological integrity",
    ],
    process: [
      { step: "01", title: "Aesthetic Design & Shade Matching", description: "Smile analysis and custom shade selection." },
      { step: "02", title: "Micro-Preparation & Impressions", description: "Minimal enamel smoothing and digital scan." },
      { step: "03", title: "Permanent Bonding", description: "Adhesive cementation with light-cure precision." },
    ],
    faqs: [
      { question: "How long do porcelain veneers last?", answer: "With good oral hygiene and routine maintenance, porcelain veneers provide durable aesthetics for many years." },
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    slug: "dental-implants",
    category: "Restorative Dentistry",
    tagline: "Permanent tooth replacement restoring natural root stability and bite strength.",
    shortDescription: "Biocompatible titanium fixtures integrated into the jawbone to support lifelike crowns or bridges.",
    fullDescription: "Implants serve as artificial tooth roots that fuse naturally with surrounding bone tissue, preventing bone resorption and delivering unparalleled chewing stability.",
    heroImage: "/treatments/dental-implants.jpg",
    benefits: [
      "Preserves adjacent healthy tooth structure without crowning adjacent teeth",
      "Maintains alveolar bone density and facial volume",
      "Feels, functions, and cleans just like a natural tooth",
    ],
    process: [
      { step: "01", title: "Diagnostic Bone Imaging", description: "CBCT and radiographic assessment of bone height and density." },
      { step: "02", title: "Precise Implant Placement", description: "Gentle surgical positioning of the titanium implant under local anaesthesia." },
      { step: "03", title: "Custom Crown Restoration", description: "Placement of the final ceramic crown after osseointegration." },
    ],
    faqs: [
      { question: "Is dental implant surgery painful?", answer: "The procedure is carried out under local anaesthesia with minimal discomfort, and post-procedure recovery is typically smooth." },
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    id: "root-canal-treatment",
    title: "Root Canal Treatment",
    slug: "root-canal-treatment",
    category: "Endodontics",
    tagline: "Relieve dental pain and preserve your natural tooth through gentle endodontic care.",
    shortDescription: "Removal of infected pulp tissue, thorough disinfection, and hermetic sealing of root canals.",
    fullDescription: "Root canal therapy salvages deeply decayed or traumatised teeth that would otherwise require extraction, eliminating bacterial infection while preserving your natural tooth structure.",
    heroImage: "/treatments/root-canal.jpg",
    benefits: [
      "Rapid relief from acute toothache and pressure sensitivity",
      "Halts the spread of infection to surrounding jawbone",
      "Allows you to keep your natural tooth for normal chewing",
    ],
    process: [
      { step: "01", title: "Diagnostic Radiography", description: "Identifying root anatomy and the extent of pulp inflammation." },
      { step: "02", title: "Cleaning & Disinfection", description: "Gentle removal of inflamed pulp and rotary shaping of canals." },
      { step: "03", title: "Biocompatible Sealing", description: "Hermetic obturation and crown recommendation for structural longevity." },
    ],
    faqs: [
      { question: "Is a root canal painful?", answer: "Modern local anaesthetics ensure the procedure is virtually painless, with patients experiencing significant relief." },
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    id: "scaling-and-cleaning",
    title: "Scaling and Cleaning",
    slug: "scaling-and-cleaning",
    category: "Preventive Care",
    tagline: "Essential preventive oral prophylaxis to safeguard gums and freshen breath.",
    shortDescription: "Ultrasonic removal of hardened tartar, plaque deposits, and surface staining.",
    fullDescription: "Routine professional prophylaxis removes subgingival and supragingival calculus that daily brushing cannot eliminate, reversing gingivitis and promoting healthy gum attachment.",
    heroImage: "/Clinic2.png",
    benefits: [
      "Prevents gum recession and periodontal bone loss",
      "Eliminates bad breath (halitosis) caused by trapped bacteria",
      "Brightens teeth by removing extrinsic coffee, tea, and food stains",
    ],
    process: [
      { step: "01", title: "Periodontal Examination", description: "Assessment of gum margins and pocket depths." },
      { step: "02", title: "Ultrasonic Scaling", description: "Gentle acoustic vibration to dislodge hardened calculus." },
      { step: "03", title: "Polishing & Fluoride Care", description: "Smooth enamel polishing and protective application." },
    ],
    faqs: [
      { question: "Does scaling loosen natural teeth?", answer: "No, scaling does not loosen teeth. It cleans away harmful tartar that actually weakens bone if left untreated." },
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    id: "dental-fillings",
    title: "Dental Fillings",
    slug: "dental-fillings",
    category: "Restorative Dentistry",
    tagline: "Tooth-coloured composite restorations that blend seamlessly with natural enamel.",
    shortDescription: "Durable composite resin restorations for restoring cavities and repaired tooth margins.",
    fullDescription: "Composite restorations match your natural tooth shade, restoring chewing integrity and preventing further bacterial decay without unsightly silver amalgam.",
    heroImage: "/Clinic3.png",
    benefits: [
      "Matches surrounding enamel colour precisely",
      "Chemically bonds with tooth structure to reinforce weakened walls",
      "100% mercury-free biocompatible material",
    ],
    process: [
      { step: "01", title: "Decay Removal", description: "Gentle excavation of decayed enamel and dentin." },
      { step: "02", title: "Layered Composite Placement", description: "Layering of tooth-shaded resin under blue curing light." },
      { step: "03", title: "Contouring & Bite Check", description: "Fine shaping to replicate natural cusps and groove anatomy." },
    ],
    faqs: [
      { question: "Can I eat immediately after a composite filling?", answer: "Yes, composite fillings are fully cured with light before you leave the clinic, though caution with hot food is advised while numb." },
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    id: "paediatric-dentistry",
    title: "Paediatric Dentistry",
    slug: "paediatric-dentistry",
    category: "Preventive Care",
    tagline: "Gentle, stress-free dental care tailored to children and young smiles.",
    shortDescription: "Specialised preventive checks, fluoride care, and pit-and-fissure sealants for growing smiles.",
    fullDescription: "Creating positive childhood dental memories through empathetic communication, preventive education, and conservative dental treatments for primary and mixed dentition.",
    heroImage: "/Clinic5.png",
    benefits: [
      "Child-friendly environment reducing dental anxiety",
      "Preventive pit and fissure sealants to avert cavities",
      "Habit counselling for thumb-sucking, mouth breathing, and tongue thrusting",
    ],
    process: [
      { step: "01", title: "Comfort Orientation", description: "Fun, gentle familiarisation with the dental chair and instruments." },
      { step: "02", title: "Dental Health Evaluation", description: "Checking developmental milestones and primary dentition." },
      { step: "03", title: "Preventive Application", description: "Fluoride varnish or protective sealant coating." },
    ],
    faqs: [
      { question: "When should a child first visit the dentist?", answer: "A child's first dental checkup is recommended around their first birthday or when their first tooth erupts." },
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    id: "minor-oral-surgery",
    title: "Minor Oral Surgery",
    slug: "minor-oral-surgery",
    category: "Surgical Dentistry",
    tagline: "Precision surgical procedures executed with patient comfort and rapid recovery in mind.",
    shortDescription: "Impacted wisdom tooth extractions, frenectomies, and localized oral surgical procedures.",
    fullDescription: "Modern surgical procedures managed under profound local anaesthesia with minimal trauma protocols to ensure swift tissue healing and patient comfort.",
    heroImage: "/Clinic6.png",
    benefits: [
      "Relieves pain and swelling from impacted wisdom teeth",
      "Protects adjacent molars from decay and resorption",
      "Minimally invasive surgical instruments for comfortable recovery",
    ],
    process: [
      { step: "01", title: "Radiographic Mapping", description: "Detailed evaluation of root morphology and nerve proximity." },
      { step: "02", title: "Atraumatic Extraction", description: "Gentle surgical technique under local anaesthesia." },
      { step: "03", title: "Post-Surgical Care", description: "Clear healing instructions and scheduled recovery check." },
    ],
    faqs: [
      { question: "What is the recovery time for wisdom tooth removal?", answer: "Most patients return to routine non-strenuous activities within 2 to 3 days following postoperative instructions." },
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    id: "prosthodontics",
    title: "Prosthodontics",
    slug: "prosthodontics",
    category: "Restorative Dentistry",
    tagline: "Full mouth rehabilitation, crowns, and bridges restoring complete smile functionality.",
    shortDescription: "Specialised restorative design of zirconia crowns, ceramic bridges, and aesthetic dentures.",
    fullDescription: "Prosthodontic rehabilitation restores severely worn, broken, or missing teeth, re-establishing correct bite height, joint health, and chewing comfort.",
    heroImage: "/Clinic4.png",
    benefits: [
      "Restores natural facial aesthetics and lip support",
      "Prevents remaining teeth from shifting into open spaces",
      "Custom engineered zirconia and e.max ceramics for supreme strength",
    ],
    process: [
      { step: "01", title: "Bite & Occlusal Analysis", description: "Recording jaw relationships and aesthetic smile goals." },
      { step: "02", title: "Digital Impression", description: "High-accuracy optical scans sent to dental ceramists." },
      { step: "03", title: "Precision Fitting", description: "Clinical verification of margins, contact points, and cementation." },
    ],
    faqs: [
      { question: "What is the difference between a crown and a bridge?", answer: "A crown caps a single damaged tooth, while a bridge replaces one or more missing teeth by anchoring to neighbouring teeth." },
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    id: "general-dental-care",
    title: "General Dental Care",
    slug: "general-dental-care",
    category: "General Dentistry",
    tagline: "Comprehensive diagnostic checkups, consultation, and oral health maintenance.",
    shortDescription: "Routine examinations, preventive planning, and individualised dental guidance.",
    fullDescription: "The cornerstone of lifelong oral wellness: thorough clinical assessments that detect early signs of demineralisation, bite changes, and soft tissue health.",
    heroImage: "/Clinic.png",
    benefits: [
      "Early detection prevents complex, costly interventions",
      "Personalised guidance on hygiene products and methods",
      "Regular digital photographic tracking of your oral health",
    ],
    process: [
      { step: "01", title: "Clinical Examination", description: "Visual and diagnostic inspection of all teeth, gums, and oral mucosa." },
      { step: "02", title: "Discussion & Plan", description: "Clear explanation of findings and transparent treatment options." },
      { step: "03", title: "Preventive Care", description: "Recommendations for maintenance intervals and preventive protection." },
    ],
    faqs: [
      { question: "How often should I have a dental checkup?", answer: "A routine clinical examination every six months is recommended for maintaining optimal oral health." },
    ],
    isFeatured: false,
    isActive: true,
  },
];
