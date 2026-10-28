export const site = {
  name: "Altix Digital",
  tagline: "Engineering growth for ambitious brands",
  email: "hello@altixdigital.com",
  phone: "+91 98765 43210",
  address: "Level 9, Cyber Hub, Gurugram, India",
  url: "https://altixdigital.com",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  icon: "code" | "smartphone" | "search" | "trending" | "pen" | "cart" | "google" | "meta" | "social";
  features: string[];
  stack: string[];
  outcomes: { value: string; label: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Blazing-fast websites and web apps built on Next.js, React and headless CMS.",
    description:
      "We engineer websites that load in under a second, rank on Google and convert visitors into customers. From marketing sites to complex SaaS platforms, every build is performance-budgeted, accessible and ready to scale.",
    image: "/images/code-screen.jpg",
    icon: "code",
    features: [
      "Custom Next.js & React builds",
      "Headless CMS (Sanity, Strapi, WordPress)",
      "Core Web Vitals optimisation",
      "API & third-party integrations",
      "SaaS dashboards & portals",
      "Ongoing maintenance & support",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Vercel"],
    outcomes: [
      { value: "0.8s", label: "Avg. load time" },
      { value: "98", label: "Lighthouse score" },
      { value: "2.4x", label: "Conversion lift" },
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    short: "Native-feel iOS & Android apps with React Native and Flutter.",
    description:
      "One codebase, two stores, zero compromises. We design and ship mobile apps that users love to open — with offline support, push notifications, payments and analytics wired in from day one.",
    image: "/images/mobile-app.jpg",
    icon: "smartphone",
    features: [
      "iOS & Android with one codebase",
      "React Native & Flutter",
      "Payments, auth & push notifications",
      "Offline-first architecture",
      "App Store & Play Store launch",
      "Crash monitoring & analytics",
    ],
    stack: ["React Native", "Flutter", "Firebase", "Expo", "Swift", "Kotlin"],
    outcomes: [
      { value: "4.8★", label: "Avg. store rating" },
      { value: "40%", label: "Faster to market" },
      { value: "1M+", label: "Downloads shipped" },
    ],
  },
  {
    slug: "seo",
    title: "SEO & Content",
    short: "Technical SEO, content strategy and link building that compounds every month.",
    description:
      "We fix what's holding your site back, then build the content engine that pushes you to page one. Technical audits, schema, programmatic SEO and authority building — all tracked against revenue, not vanity metrics.",
    image: "/images/seo-desk.jpg",
    icon: "search",
    features: [
      "Technical SEO audits & fixes",
      "Keyword & competitor research",
      "Programmatic SEO at scale",
      "Schema & structured data",
      "Content strategy & writing",
      "Digital PR & link building",
    ],
    stack: ["Ahrefs", "Semrush", "Screaming Frog", "GSC", "GA4", "Surfer"],
    outcomes: [
      { value: "312%", label: "Organic traffic" },
      { value: "1,200+", label: "Page-one keywords" },
      { value: "6 mo", label: "Avg. payback" },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    short: "Search, Shopping, YouTube and Performance Max campaigns that capture buyers with intent.",
    description:
      "Be the first result when customers are ready to buy. Our Google Ads Certified team builds tightly structured Search, Shopping, Display, YouTube and Performance Max campaigns, then optimises bids, keywords and creatives daily to drive down cost per acquisition.",
    image: "/images/ads-analytics.jpg",
    icon: "google",
    features: [
      "Search & keyword campaigns",
      "Google Shopping & Merchant Center",
      "Performance Max campaigns",
      "YouTube video ads",
      "Display & remarketing",
      "Conversion tracking with GA4 & GTM",
    ],
    stack: ["Google Ads", "GA4", "Tag Manager", "Merchant Center", "Looker Studio", "YouTube"],
    outcomes: [
      { value: "6.1x", label: "Avg. ROAS" },
      { value: "-42%", label: "Cost per acquisition" },
      { value: "₹25Cr+", label: "Google spend managed" },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    short: "Facebook & Instagram ads with scroll-stopping creatives and full-funnel targeting.",
    description:
      "We turn Facebook and Instagram into your most profitable sales channel. From creative production and audience research to Advantage+ campaigns, Conversions API and retargeting, every rupee is tracked and every creative is tested.",
    image: "/images/social.jpg",
    icon: "meta",
    features: [
      "Facebook & Instagram ad campaigns",
      "Reels & story ad creatives",
      "Advantage+ shopping campaigns",
      "Lookalike & custom audiences",
      "Pixel & Conversions API setup",
      "Lead generation & WhatsApp ads",
    ],
    stack: ["Meta Ads Manager", "Conversions API", "Canva", "CapCut", "Figma", "Triple Whale"],
    outcomes: [
      { value: "5.4x", label: "Avg. ROAS" },
      { value: "-38%", label: "Cost per lead" },
      { value: "1,500+", label: "Creatives tested" },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Content, community and influencer campaigns that build brands people follow.",
    description:
      "Grow an audience that actually buys. We plan, shoot and publish content for Instagram, LinkedIn, YouTube and X, manage your community and run influencer collaborations that turn followers into fans.",
    image: "/images/social-phone.jpg",
    icon: "social",
    features: [
      "Social media strategy & calendar",
      "Reels, shorts & content production",
      "Community management",
      "Influencer & UGC campaigns",
      "LinkedIn personal branding",
      "Monthly analytics reports",
    ],
    stack: ["Instagram", "LinkedIn", "YouTube", "X", "Buffer", "Later"],
    outcomes: [
      { value: "10x", label: "Follower growth" },
      { value: "8.2%", label: "Avg. engagement" },
      { value: "50M+", label: "Organic reach" },
    ],
  },
  {
    slug: "growth-marketing",
    title: "Growth & CRO",
    short: "Funnels, landing pages, CRO and marketing automation that turn traffic into revenue.",
    description:
      "Traffic means nothing if it doesn't convert. We map your funnel, build and A/B test landing pages, set up email and WhatsApp automation and wire up attribution so you know exactly which channel drives revenue.",
    image: "/images/growth-chart.jpg",
    icon: "trending",
    features: [
      "Funnel & landing page design",
      "A/B testing & CRO",
      "Email & WhatsApp automation",
      "LinkedIn & B2B lead generation",
      "Attribution & analytics setup",
      "Weekly growth sprints",
    ],
    stack: ["HubSpot", "Klaviyo", "Hotjar", "VWO", "Mixpanel", "Looker"],
    outcomes: [
      { value: "+58%", label: "Conversion rate" },
      { value: "3.2x", label: "Pipeline growth" },
      { value: "₹40Cr+", label: "Revenue influenced" },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short: "Research-led product design, design systems and interfaces people enjoy.",
    description:
      "Great products start with understanding people. We run research, map journeys, prototype fast and hand over pixel-perfect design systems your developers will thank you for.",
    image: "/images/uiux.jpg",
    icon: "pen",
    features: [
      "User research & journey mapping",
      "Wireframes & interactive prototypes",
      "Design systems in Figma",
      "Usability testing",
      "Brand identity & guidelines",
      "Motion & micro-interactions",
    ],
    stack: ["Figma", "FigJam", "Framer", "Maze", "Spline", "After Effects"],
    outcomes: [
      { value: "+64%", label: "Task completion" },
      { value: "-50%", label: "Support tickets" },
      { value: "120+", label: "Products designed" },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    short: "Shopify and headless storefronts engineered for speed and sales.",
    description:
      "From D2C launches to enterprise catalogues, we build storefronts that sell. Lightning-fast headless builds, frictionless checkout and retention flows that keep customers coming back.",
    image: "/images/ecommerce.jpg",
    icon: "cart",
    features: [
      "Shopify & Shopify Plus",
      "Headless commerce (Hydrogen, Medusa)",
      "Checkout & payment optimisation",
      "Inventory & ERP integrations",
      "Subscription & loyalty programs",
      "Marketplace integrations",
    ],
    stack: ["Shopify", "Hydrogen", "Medusa", "Stripe", "Razorpay", "Algolia"],
    outcomes: [
      { value: "+86%", label: "Revenue per visitor" },
      { value: "-27%", label: "Cart abandonment" },
      { value: "60+", label: "Stores launched" },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Web" | "App" | "SEO" | "Growth" | "Design";
  year: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "finverse-banking",
    title: "Finverse Neo-Banking Platform",
    client: "Finverse",
    category: "Web",
    year: "2026",
    image: "/images/dashboard.jpg",
    summary: "A real-time banking dashboard serving 200k+ users with sub-second loads.",
    challenge:
      "Finverse's legacy dashboard took 7 seconds to load and users were dropping off before seeing their balances.",
    solution:
      "We rebuilt the platform on Next.js with edge rendering, streaming data and a new component system, cutting bundle size by 70%.",
    results: [
      { value: "0.9s", label: "Load time" },
      { value: "+42%", label: "Daily active users" },
      { value: "-61%", label: "Support tickets" },
    ],
    tags: ["Next.js", "Fintech", "Dashboard"],
  },
  {
    slug: "fitpulse-app",
    title: "FitPulse Fitness App",
    client: "FitPulse",
    category: "App",
    year: "2026",
    image: "/images/mobile-app.jpg",
    summary: "A cross-platform fitness app that hit #3 in Health & Fitness in India.",
    challenge:
      "FitPulse needed to launch on iOS and Android in 12 weeks with live classes, payments and wearables sync.",
    solution:
      "A React Native app with offline workouts, Apple Health / Google Fit sync and a subscription engine built on Razorpay.",
    results: [
      { value: "500k", label: "Downloads" },
      { value: "4.8★", label: "Store rating" },
      { value: "#3", label: "Category rank" },
    ],
    tags: ["React Native", "Health", "Subscriptions"],
  },
  {
    slug: "urbannest-seo",
    title: "UrbanNest Organic Growth",
    client: "UrbanNest Realty",
    category: "SEO",
    year: "2025",
    image: "/images/analytics-laptop.jpg",
    summary: "Programmatic SEO that took a real-estate portal from 8k to 340k monthly visits.",
    challenge:
      "UrbanNest had thousands of listings but almost no organic visibility against national portals.",
    solution:
      "We built 18,000 programmatic location pages, fixed crawl budget issues and launched a digital PR campaign.",
    results: [
      { value: "42x", label: "Organic traffic" },
      { value: "3,400", label: "Page-one keywords" },
      { value: "₹2.1Cr", label: "Pipeline from SEO" },
    ],
    tags: ["Programmatic SEO", "Real Estate", "Content"],
  },
  {
    slug: "kraftbrew-growth",
    title: "KraftBrew D2C Scale-up",
    client: "KraftBrew Coffee",
    category: "Growth",
    year: "2025",
    image: "/images/growth-chart.jpg",
    summary: "Full-funnel performance marketing that scaled a coffee brand 6x in a year.",
    challenge:
      "KraftBrew's ad spend was rising while ROAS kept falling below break-even.",
    solution:
      "New creative testing framework, rebuilt landing pages and Klaviyo retention flows driving repeat purchases.",
    results: [
      { value: "6x", label: "Revenue growth" },
      { value: "5.8x", label: "Blended ROAS" },
      { value: "+48%", label: "Repeat purchase" },
    ],
    tags: ["Meta Ads", "D2C", "CRO"],
  },
  {
    slug: "medilink-design",
    title: "MediLink Patient Experience",
    client: "MediLink Hospitals",
    category: "Design",
    year: "2025",
    image: "/images/uiux.jpg",
    summary: "A research-led redesign of a hospital chain's booking journey.",
    challenge:
      "Patients needed 11 steps and 6 minutes to book an appointment; most gave up and called instead.",
    solution:
      "Contextual research with 40 patients, a new design system and a 3-step booking flow tested with real users.",
    results: [
      { value: "3 steps", label: "To book" },
      { value: "+71%", label: "Online bookings" },
      { value: "-45%", label: "Call volume" },
    ],
    tags: ["UX Research", "Healthcare", "Design System"],
  },
  {
    slug: "nimbus-saas",
    title: "Nimbus AI SaaS Launch",
    client: "Nimbus AI",
    category: "Web",
    year: "2026",
    image: "/images/ai.jpg",
    summary: "Brand, website and product UI for an AI startup's Series A launch.",
    challenge:
      "Nimbus had a powerful product but a website that failed to explain it in under 10 seconds.",
    solution:
      "A narrative-driven, animated Next.js site with interactive product demos and a self-serve signup flow.",
    results: [
      { value: "+3.1x", label: "Signups" },
      { value: "98", label: "Lighthouse" },
      { value: "$12M", label: "Series A raised" },
    ],
    tags: ["Next.js", "AI", "Branding"],
  },
];

export const team = [
  { name: "Aarav Mehta", role: "Founder & CEO", image: "/images/p-man1.jpg" },
  { name: "Riya Kapoor", role: "Head of Design", image: "/images/p-woman2.jpg" },
  { name: "Kabir Sharma", role: "CTO", image: "/images/p-man2.jpg" },
  { name: "Ananya Iyer", role: "Head of SEO", image: "/images/p-woman1.jpg" },
  { name: "Vikram Rao", role: "Growth Lead", image: "/images/p-man4.jpg" },
  { name: "Meera Joshi", role: "Lead Engineer", image: "/images/p-woman4.jpg" },
];

export const testimonials = [
  {
    quote:
      "Altix rebuilt our platform and our load time dropped from 7 seconds to under one. Customer complaints basically disappeared overnight.",
    name: "Rohan Malhotra",
    role: "CPO, Finverse",
    image: "/images/p-man3.jpg",
  },
  {
    quote:
      "Their SEO team is the real deal. We went from invisible to owning page one for every city we operate in. The pipeline speaks for itself.",
    name: "Sneha Reddy",
    role: "Marketing Director, UrbanNest",
    image: "/images/p-woman3.jpg",
  },
  {
    quote:
      "Fast, transparent and obsessed with numbers. Altix felt like an in-house growth team, not an agency. Our revenue grew 6x in twelve months.",
    name: "Arjun Nair",
    role: "Co-founder, KraftBrew",
    image: "/images/p-man2.jpg",
  },
  {
    quote:
      "They shipped our app on both stores in 11 weeks. The quality, communication and attention to detail were outstanding.",
    name: "Priya Desai",
    role: "CEO, FitPulse",
    image: "/images/p-woman1.jpg",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    text: "Workshops, audits and research to understand your business, users and competitors.",
  },
  {
    step: "02",
    title: "Strategise",
    text: "A clear roadmap with goals, KPIs, timelines and the right channels and tech.",
  },
  {
    step: "03",
    title: "Design & Build",
    text: "Agile sprints with weekly demos. You see real progress, not slide decks.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    text: "We ship, measure and optimise continuously — growth doesn't stop at launch.",
  },
];

export const stats = [
  { value: 250, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 40, suffix: "+", label: "Specialists" },
  { value: 12, suffix: "", label: "Countries served" },
];

export const clients = [
  "Finverse",
  "FitPulse",
  "UrbanNest",
  "KraftBrew",
  "MediLink",
  "Nimbus AI",
  "Zenvy",
  "Orbitly",
  "Quantix",
  "Lumora",
];

export const plans = [
  {
    name: "Starter",
    price: { monthly: 49999, yearly: 41999 },
    description: "For startups launching their first serious digital presence.",
    features: [
      "5-page Next.js website",
      "On-page SEO setup",
      "Google Analytics 4 & Search Console",
      "Mobile-first responsive design",
      "1 month of support",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: { monthly: 119999, yearly: 99999 },
    description: "For growing brands ready to scale traffic and revenue.",
    features: [
      "Everything in Starter",
      "Up to 15 pages + CMS",
      "Monthly SEO & content (8 articles)",
      "Google Ads & Meta Ads management",
      "12 social media posts / month",
      "CRO testing & monthly reports",
      "Dedicated account manager",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 0, yearly: 0 },
    description: "Custom web apps, mobile apps and full-funnel growth teams.",
    features: [
      "Custom web & mobile apps",
      "Dedicated cross-functional squad",
      "Programmatic SEO at scale",
      "Advanced analytics & attribution",
      "SLA-backed support 24/7",
      "Quarterly strategy workshops",
    ],
    highlight: false,
  },
];

export const faqs = [
  {
    q: "How long does a typical website project take?",
    a: "A marketing website usually takes 4–6 weeks from kickoff to launch. Complex web apps and e-commerce builds range from 8–16 weeks depending on scope.",
  },
  {
    q: "Do you work with startups or only large companies?",
    a: "Both. About half our clients are funded startups and half are established businesses. Our packages scale from launch-ready sites to enterprise squads.",
  },
  {
    q: "How soon will I see SEO results?",
    a: "Technical fixes often show impact within 4–8 weeks. Content-led growth compounds over 3–6 months. We report on rankings, traffic and revenue every month.",
  },
  {
    q: "Will I own the code and design files?",
    a: "Yes, 100%. Once the project is paid for, all source code, design files and accounts are transferred to you.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Every project includes post-launch support, and most clients continue with a monthly retainer for maintenance, SEO and growth.",
  },
];

export const posts = [
  {
    slug: "core-web-vitals-2026",
    title: "Core Web Vitals in 2026: What Actually Moves Rankings",
    excerpt: "INP, LCP and CLS explained with real fixes we use on client sites every week.",
    category: "SEO",
    date: "Oct 12, 2026",
    read: "7 min",
    image: "/images/analytics-laptop.jpg",
  },
  {
    slug: "nextjs-vs-wordpress",
    title: "Next.js vs WordPress: Which Is Right for Your Business?",
    excerpt: "Speed, cost, security and SEO compared — plus when a hybrid headless setup wins.",
    category: "Development",
    date: "Sep 28, 2026",
    read: "9 min",
    image: "/images/code-laptop.jpg",
  },
  {
    slug: "meta-ads-creative-testing",
    title: "The Creative Testing Framework Behind 5x ROAS",
    excerpt: "How we structure Meta Ads tests to find winning creatives in days, not months.",
    category: "Growth",
    date: "Sep 10, 2026",
    read: "6 min",
    image: "/images/strategy.jpg",
  },
  {
    slug: "design-systems-startups",
    title: "Why Every Startup Needs a Design System Early",
    excerpt: "Ship faster and stay consistent — a practical guide to starting small in Figma.",
    category: "Design",
    date: "Aug 22, 2026",
    read: "5 min",
    image: "/images/design-tools.jpg",
  },
  {
    slug: "ai-search-optimisation",
    title: "AI Search Is Here: Optimising for ChatGPT and Google AI Overviews",
    excerpt: "Generative engine optimisation tactics to keep your brand visible in AI answers.",
    category: "SEO",
    date: "Aug 05, 2026",
    read: "8 min",
    image: "/images/ai.jpg",
  },
  {
    slug: "app-launch-checklist",
    title: "The 30-Point Mobile App Launch Checklist",
    excerpt: "Everything we check before submitting an app to the App Store and Play Store.",
    category: "Development",
    date: "Jul 18, 2026",
    read: "10 min",
    image: "/images/mobile-app.jpg",
  },
];
