export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
  category: "Invisalign" | "Oral Hygiene" | "Dental Awareness" | "Orthodontics" | "Smile Care" | "Patient Education";
  author: string;
  readingTime: string;
  publishedAt: string;
  isPublished: boolean;
}

export const blogsData: BlogPostItem[] = [
  {
    id: "blog-1",
    title: "The Adult Guide to Invisalign: Discreet Orthodontics in Everyday Life",
    slug: "adult-guide-to-invisalign-discreet-orthodontics",
    excerpt: "Discover why more working professionals and adults are choosing clear aligners to improve their smile alignment without metal brackets.",
    content: [
      "For decades, orthodontic treatment was viewed almost exclusively as a teenage milestone. Today, advancements in clear aligner technology have made smile correction discreet, comfortable, and seamlessly compatible with professional careers.",
      "Invisalign aligners are custom-engineered from smooth, medical-grade polyurethane. Because they are removable, patients enjoy their favourite foods without restrictions and maintain normal brushing and flossing routines.",
      "Whether addressing mild crowding, relapse from childhood braces, or bite alignment, a digital 3D intraoral assessment with an experienced orthodontist provides complete visibility of your anticipated treatment trajectory before you begin.",
    ],
    featuredImage: "/aligner-presentation.png",
    category: "Invisalign",
    author: "Dr. Preethi Subramanian",
    readingTime: "4 min read",
    publishedAt: "2026-10-18",
    isPublished: true,
  },
  {
    id: "blog-2",
    title: "Beyond Brushing: Why Interdental Cleaning is Essential for Gum Health",
    slug: "beyond-brushing-why-interdental-cleaning-is-essential",
    excerpt: "Toothbrush bristles only reach approximately 60% of tooth surfaces. Here is why interdental brushes and flossing prevent unseen gum inflammation.",
    content: [
      "While brushing twice daily with fluoride toothpaste is fundamental, toothbrush bristles cannot penetrate the tight contact zones between adjacent teeth where food debris and plaque accumulate.",
      "Left undisturbed, bacteria in these interproximal areas produce toxins that trigger gingival inflammation, chronic bad breath, and eventually irreversible bone loss.",
      "Incorporating dental floss or calibrated interdental brushes into your nightly routine dramatically improves gum health and protects against hidden decay.",
    ],
    featuredImage: "/Clinic2.png",
    category: "Oral Hygiene",
    author: "Dr. Preethi Subramanian",
    readingTime: "3 min read",
    publishedAt: "2026-10-28",
    isPublished: true,
  },
  {
    id: "blog-3",
    title: "Understanding Malocclusion: How Teeth Alignment Affects Chewing & Jaw Health",
    slug: "understanding-malocclusion-teeth-alignment-chewing-jaw-health",
    excerpt: "Orthodontics is not only about aesthetics; proper occlusion protects teeth from abnormal wear and promotes balanced temporomandibular joint function.",
    content: [
      "A harmonious smile is built on the foundation of functional harmony. When upper and lower teeth do not meet in balanced contact, chewing forces become unevenly distributed across individual teeth.",
      "Over time, untreated malocclusion can lead to chipped enamel, premature tooth wear, muscular headaches, and clicking or strain in the jaw joints (TMJ).",
      "Specialised orthodontic evaluation assesses the entire facial profile, bone structure, and dental arches to deliver long-term stability and functional chewing comfort.",
    ],
    featuredImage: "/aligner-isolated-tray.png",
    category: "Orthodontics",
    author: "Dr. Preethi Subramanian",
    readingTime: "5 min read",
    publishedAt: "2026-11-04",
    isPublished: true,
  },
];
