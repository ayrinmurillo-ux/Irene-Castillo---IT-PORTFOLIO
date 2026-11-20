export interface EducationItem {
  level: string;
  program: string;
  status: string;
  focus: string;
  coursework: string;
  highlights: string;
}

export interface PersonalProfile {
  name: string;
  course: string;
  yearLevel: string;
  location: string;
  languages: string;
  focusTrack: string;
  interests: string;
  availability: string;
  email: string;
  bio: string;
  heroImage: string;
  heroImageAlt: string;
  educationBackground: EducationItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Design & Tools';
  level: string;
  summary: string;
  appliedIn: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  role: string;
  year: string;
  shortDescription: string;
  whatIDid: string[];
  tools: string[];
  screenshot: string;
  screenshotAlt: string;
  imageFit?: 'cover' | 'contain';
  liveUrl: string;
  linkLabel?: string;
  repoUrl?: string;
  interactivePreviewNote: string;
}

export const DEFAULT_PROFILE: PersonalProfile = {
  name: 'Irene Castillo',
  course: 'Bachelor of Science in Information Technology',
  yearLevel: '3rd Year Student',
  location: 'Philippines',
  languages: 'English, Filipino',
  focusTrack: 'Front-End Web & UI/UX Design',
  interests: 'Interface Prototyping · Clean Web Apps · Tactile UX',
  availability: 'Open for IT Internships & Web Projects',
  email: 'ayrinmurillo@gmail.com',
  bio: 'I am an Information Technology student passionate about creating simple, aesthetic, and responsive web applications. I enjoy combining structured code with calm visual hierarchy so every interface feels clear, personal, and effortless to navigate.',
  heroImage: '/assets/aistudio/dceea642-9127-4622-8c54-0547b3c6ea24_900a75f0.jfif',
  heroImageAlt: 'Portrait photo of Irene Castillo in formal attire',
  educationBackground: [
    {
      level: 'College / Tertiary',
      program: 'Bachelor of Science in Information Technology (BSIT)',
      status: 'Current Program',
      focus: 'Web Systems Development, Database Management & Mobile UI/UX Prototyping',
      coursework:
        'Web Systems & Technologies · Human-Computer Interaction · Database Management (MySQL) · Systems Integration & Architecture',
      highlights:
        'Built Cozy Corner Cafe Web-based Ordering System (PHP & MySQL) and designed LIKHA: CCC Interactive Memory-Sharing App in Figma.',
    },
    {
      level: 'Core IT Competencies',
      program: 'Front-End Engineering & Smart-Device Interface Design',
      status: 'Applied Track',
      focus: 'Responsive Web Layouts, Interactive User Flows & Clean Visual Hierarchy',
      coursework:
        'HTML5 & CSS3 Layout Systems · JavaScript & TypeScript · React & Tailwind CSS · Figma Mobile Prototyping',
      highlights:
        'Focused on crafting intuitive, student-ready digital products with clear navigation and reliable functionality.',
    },
  ],
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'Technical',
    level: 'Core',
    summary:
      'Semantic markup, accessible landmark structure, Flexbox/Grid layouts, and responsive breakpoints.',
    appliedIn: 'Cozy Corner Cafe & Personal Portfolio',
  },
  {
    id: 'javascript-ts',
    name: 'JavaScript & TypeScript',
    category: 'Technical',
    level: 'Core',
    summary:
      'Interactive DOM logic, cart and filter state management, clean typed interfaces, and client-side validation.',
    appliedIn: 'Cozy Corner Cafe & Personal Portfolio',
  },
  {
    id: 'react-tailwind',
    name: 'React & Tailwind CSS',
    category: 'Technical',
    level: 'Primary Stack',
    summary:
      'Modular reusable UI components, hook-driven state flows, and disciplined design token systems.',
    appliedIn: 'Personal Portfolio',
  },
  {
    id: 'php-backend',
    name: 'PHP Web Development',
    category: 'Technical',
    level: 'Project Stack',
    summary:
      'Server-rendered web pages, customer authentication sessions, order submission handling, and order tracking flows.',
    appliedIn: 'Cozy Corner Cafe Ordering System',
  },
  {
    id: 'sql-databases',
    name: 'MySQL & Data Modeling',
    category: 'Technical',
    level: 'Foundational',
    summary:
      'Relational table design for menu items, customer carts, order histories, and structured database queries.',
    appliedIn: 'Cozy Corner Cafe Ordering System',
  },
  {
    id: 'git-deploy',
    name: 'Git, GitHub & Web Hosting',
    category: 'Technical',
    level: 'Daily Workflow',
    summary:
      'Version control branching and deploying live web applications via web hosting, GitHub Pages, and Cloudflare Pages.',
    appliedIn: 'All Web Projects',
  },
  {
    id: 'figma-wireframing',
    name: 'Figma & Mobile Prototyping',
    category: 'Design & Tools',
    level: 'Primary Design',
    summary:
      'Smart-device UI layouts, interactive click-through prototypes, navigation bars, and user journey flows.',
    appliedIn: 'LIKHA Mobile App & Cozy Corner Cafe',
  },
  {
    id: 'interaction-design',
    name: 'Tactile Interaction Design',
    category: 'Design & Tools',
    level: 'Specialty',
    summary:
      'Satisfying button press states, clear visual feedback, keyboard focus rings, and calm motion timing.',
    appliedIn: 'Personal Portfolio & LIKHA Mobile App',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'cozy-corner-cafe',
    number: '01',
    title: 'Cozy Corner Cafe Web-based Ordering System',
    role: 'Web Developer & UI Designer',
    year: '2026',
    shortDescription:
      'Built a web-based cafe ordering platform where customers can browse Coffee, Non-Coffee, and Pastries, add drinks to their cart, sign in, and track their orders online.',
    whatIDid: [
      'Designed and coded the warm cafe menu interface with category filter buttons (All, Coffee, Non-Coffee, Pastries) and featured beverage cards.',
      'Implemented interactive "View & Add" product controls, shopping cart management, and customer login and sign-up pages.',
      'Built order tracking functionality powered by PHP and MySQL so customers can follow their order status in real time.',
    ],
    tools: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    screenshot: '/assets/aistudio/Screenshot_2026-11-20_085828_7ac8ae3d.png',
    screenshotAlt:
      'Cozy Corner Cafe Web-based Ordering System menu page showing iced coffee drinks like Americano, Classic Cappuccino, Cozy Caramel Latte, and Iced Spanish Latte',
    imageFit: 'cover',
    liveUrl: 'https://cozycorner.site.je/cozycorner/index.php',
    linkLabel: 'Visit Site',
    interactivePreviewNote:
      'Live deployed web ordering system with menu filtering, cart checkout, user accounts, and order tracking.',
  },
  {
    id: 'likha-app',
    number: '02',
    title: 'LIKHA: CCC Interactive Memory-Sharing App',
    role: 'Mobile UI/UX Designer & Prototyper',
    year: '2026',
    shortDescription:
      'Designed an interactive mobile memory-sharing application exclusively for smart devices where CCC students share campus moments, react to posts, browse event albums, and stay connected.',
    whatIDid: [
      'Designed the mobile-first "For You" social feed featuring student posts, event tags (such as DCI Week 2026), media embeds, reactions, comments, and sharing.',
      'Crafted a thumb-friendly bottom navigation bar with Timeline, Album, Create (+), Premium, and Profile destinations.',
      'Linked interactive screens into a clickable smart-device prototype in Figma for seamless user flow testing.',
    ],
    tools: ['Figma', 'Mobile UI/UX', 'Interactive Prototyping', 'Smart Devices'],
    screenshot: '/assets/aistudio/Screenshot_2026-11-20_090248_33a6401a.png',
    screenshotAlt:
      'LIKHA CCC Interactive Memory-Sharing App mobile screen mockup showing the For You feed, event tag, media post, and bottom navigation bar',
    imageFit: 'contain',
    liveUrl:
      'https://www.figma.com/proto/erQsvGe07erwdzIXs975Ox/Likha-App?node-id=16-43&starting-point-node-id=5%3A20&scaling=contain',
    linkLabel: 'Open Prototype',
    interactivePreviewNote:
      'Designed exclusively for smart devices with a mobile-first feed, event memory tagging, and clickable Figma flows.',
  },
];
