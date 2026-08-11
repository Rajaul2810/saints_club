export type Member = {
  id: string
  name: string
  role: string
  profession: string
  joined: string
  image: string
  bio: string
  email: string
}

export type EventItem = {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: "Dinner" | "Lecture" | "Sport" | "Salon" | "Philanthropy"
  image: string
  gallery: string[]
  description: string
  featured?: boolean
}

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  image: string
  tag: string
}

export type Notice = {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  tag: string
}

export type Activity = {
  id: string
  title: string
  description: string
  schedule: string
  image: string
  icon: "lecture" | "sport" | "salon" | "philanthropy" | "wine" | "letters"
}

export type CommitteeMember = {
  id: string
  name: string
  position: string
  image: string
  email: string
  year: number
}

export type CommitteeYear = {
  year: number
  theme: string
  members: CommitteeMember[]
}

export const clubInfo = {
  name: "Saints Club",
  tagline: "A private society for professional life",
  founded: 2012,
  email: "secretary@saintsclub.org",
  phone: "+1 (555) 214-9080",
  address: "18 St. James Place, Springfield",
  hours: "Tue–Sat 11:00–22:00",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
}

export const members: Member[] = [
  {
    id: "m1",
    name: "Amina Rahman",
    role: "Fellow",
    profession: "Constitutional Law",
    joined: "2018",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    bio: "Partner at Hale & Rahman. Chairs the club’s legal salon.",
    email: "amina@saintsclub.org",
  },
  {
    id: "m2",
    name: "Daniel Okoye",
    role: "Member",
    profession: "Cardiology",
    joined: "2016",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
    bio: "Consultant physician. Convenes the health policy breakfasts.",
    email: "daniel@saintsclub.org",
  },
  {
    id: "m3",
    name: "Sofia Chen",
    role: "Fellow",
    profession: "Architecture",
    joined: "2019",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    bio: "Principal at Chen Studio. Curates the built-environment series.",
    email: "sofia@saintsclub.org",
  },
  {
    id: "m4",
    name: "Marcus Webb",
    role: "Member",
    profession: "Public Finance",
    joined: "2015",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    bio: "Investment director. Advises the philanthropy committee.",
    email: "marcus@saintsclub.org",
  },
  {
    id: "m5",
    name: "Priya Nair",
    role: "Fellow",
    profession: "Literature",
    joined: "2020",
    image:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=500&fit=crop",
    bio: "Professor of English. Leads the monthly reading table.",
    email: "priya@saintsclub.org",
  },
  {
    id: "m6",
    name: "Leo Martins",
    role: "Member",
    profession: "Technology",
    joined: "2021",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    bio: "Founder of Northline. Hosts the digital economy briefings.",
    email: "leo@saintsclub.org",
  },
  {
    id: "m7",
    name: "Hana Suzuki",
    role: "Member",
    profession: "Diplomacy",
    joined: "2017",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    bio: "Former cultural attaché. Arranges visiting speaker dinners.",
    email: "hana@saintsclub.org",
  },
  {
    id: "m8",
    name: "James Porter",
    role: "Fellow",
    profession: "Political Economy",
    joined: "2014",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    bio: "Think-tank director. Moderates the Friday policy hour.",
    email: "james@saintsclub.org",
  },
]

export const events: EventItem[] = [
  {
    id: "e1",
    title: "Autumn Members’ Dinner",
    date: "2026-09-12",
    time: "19:00",
    location: "Great Hall",
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop",
    ],
    description:
      "The season opening dinner. Formal dress. Address by the incoming President, followed by conversation in the library.",
    featured: true,
  },
  {
    id: "e2",
    title: "Lecture: Cities After Capital",
    date: "2026-09-28",
    time: "18:30",
    location: "Lecture Room",
    category: "Lecture",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    ],
    description:
      "An evening with visiting economist Dr. Lila Moreau on urban form, civic trust, and the next decade of city-making.",
  },
  {
    id: "e3",
    title: "Saints Cup — Golf Day",
    date: "2026-10-05",
    time: "08:30",
    location: "Riverside Links",
    category: "Sport",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop",
    ],
    description:
      "Annual invitation day for members and guests. Lunch in the clubhouse; prizes at four.",
  },
  {
    id: "e4",
    title: "Salon: The Craft of Judgment",
    date: "2026-10-18",
    time: "17:30",
    location: "West Library",
    category: "Salon",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    ],
    description:
      "A closed conversation on professional ethics, with short remarks from law, medicine, and the civil service.",
  },
  {
    id: "e5",
    title: "Foundation Benefit Evening",
    date: "2026-11-02",
    time: "19:00",
    location: "Great Hall",
    category: "Philanthropy",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
    ],
    description:
      "Proceeds support the club’s education bursaries. Black tie optional. Music after dinner.",
  },
  {
    id: "e6",
    title: "Winter Reception",
    date: "2026-12-06",
    time: "18:00",
    location: "Drawing Room",
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",
    ],
    description:
      "A quieter close to the year. Members and spouses. Introductions for those elected in autumn.",
  },
]

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Foundation awards twelve bursaries for 2026",
    excerpt:
      "The philanthropy committee has named this year’s scholars across law, medicine, and the arts.",
    content:
      "The Saints Club Foundation will support twelve students in 2026. Awards cover fees and a modest living stipend. Recipients were selected by an independent panel of members drawn from the professions.",
    date: "2026-08-02",
    author: "Secretariat",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=800&fit=crop",
    tag: "Foundation",
  },
  {
    id: "n2",
    title: "Autumn lecture series opens with Cities After Capital",
    excerpt:
      "Dr. Lila Moreau addresses members on urban form, civic trust, and the next decade of city-making.",
    content:
      "The programme chair has confirmed the autumn lecture. Members may reserve a place at the desk. A reception in the library follows the address.",
    date: "2026-07-22",
    author: "Programme Chair",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop",
    tag: "Programme",
  },
  {
    id: "n3",
    title: "Clubhouse dining room restored for the season",
    excerpt:
      "The Great Hall returns to service after summer works, with a revised evening menu.",
    content:
      "House Committee completed the hall refurbishment on schedule. Dinner service resumes on 1 September. Reservations are advised on lecture nights.",
    date: "2026-07-10",
    author: "House Committee",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
    tag: "House",
  },
]

export const notices: Notice[] = [
  {
    id: "nt1",
    title: "Nominations open for the 2026 Executive Committee",
    excerpt:
      "Fellows in good standing may stand for President, Secretary, Treasurer, and programme chairs. Nominations close 12 September.",
    date: "2026-07-28",
    author: "General Secretary",
    tag: "Governance",
  },
  {
    id: "nt2",
    title: "Library hours extended on lecture nights",
    excerpt:
      "The West Library remains open until 22:00 whenever a public lecture is held. Light refreshment at the bar.",
    date: "2026-07-14",
    author: "House Committee",
    tag: "House",
  },
  {
    id: "nt3",
    title: "Guide for newly elected members",
    excerpt:
      "A short briefing on house customs, guest privileges, and how to propose a programme is available at the desk.",
    date: "2026-07-01",
    author: "Secretariat",
    tag: "Members",
  },
  {
    id: "nt4",
    title: "Guest dining: two guests per member",
    excerpt:
      "From September, members may introduce two guests to dinner without prior leave. Larger parties require the House Chair.",
    date: "2026-06-20",
    author: "House Committee",
    tag: "House",
  },
]

export const activities: Activity[] = [
  {
    id: "a1",
    title: "Lecture Series",
    description:
      "Monthly addresses by members and guests on law, letters, science, and public life.",
    schedule: "Last Thursday · 18:30",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=700&fit=crop",
    icon: "lecture",
  },
  {
    id: "a2",
    title: "Golf & Court",
    description:
      "Seasonal fixtures at Riverside Links and indoor tennis by arrangement.",
    schedule: "Saturdays · 08:30",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=900&h=700&fit=crop",
    icon: "sport",
  },
  {
    id: "a3",
    title: "Reading Table",
    description:
      "A single book each month, discussed over dinner in the West Library.",
    schedule: "Second Tuesday · 19:00",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&h=700&fit=crop",
    icon: "letters",
  },
  {
    id: "a4",
    title: "Foundation Work",
    description:
      "Bursary interviews, school partnerships, and the annual benefit evening.",
    schedule: "As convened",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&h=700&fit=crop",
    icon: "philanthropy",
  },
  {
    id: "a5",
    title: "Wine Committee",
    description:
      "Tastings led by members of the cellar, with notes circulated afterwards.",
    schedule: "First Friday · 18:00",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&h=700&fit=crop",
    icon: "wine",
  },
  {
    id: "a6",
    title: "Friday Salon",
    description:
      "An hour of structured conversation on a current professional question.",
    schedule: "Fridays · 17:00",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
    icon: "salon",
  },
]

export const committees: CommitteeYear[] = [
  {
    year: 2026,
    theme: "Continuity & Exchange",
    members: [
      {
        id: "c1",
        name: "Elena Vargas",
        position: "President",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        email: "president@saintsclub.org",
        year: 2026,
      },
      {
        id: "c2",
        name: "Noah Kim",
        position: "General Secretary",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
        email: "secretary@saintsclub.org",
        year: 2026,
      },
      {
        id: "c3",
        name: "Fatima Al-Hassan",
        position: "Treasurer",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        email: "treasurer@saintsclub.org",
        year: 2026,
      },
      {
        id: "c4",
        name: "Owen Blake",
        position: "House Chair",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        email: "house@saintsclub.org",
        year: 2026,
      },
      {
        id: "c5",
        name: "Maya Ortiz",
        position: "Programme Chair",
        image:
          "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop",
        email: "programme@saintsclub.org",
        year: 2026,
      },
      {
        id: "c6",
        name: "Ryan Cole",
        position: "Foundation Chair",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        email: "foundation@saintsclub.org",
        year: 2026,
      },
    ],
  },
  {
    year: 2025,
    theme: "Stewardship",
    members: [
      {
        id: "c7",
        name: "Isabella Cruz",
        position: "President",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
        email: "isabella@saintsclub.org",
        year: 2025,
      },
      {
        id: "c8",
        name: "Theo Lang",
        position: "General Secretary",
        image:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
        email: "theo@saintsclub.org",
        year: 2025,
      },
      {
        id: "c9",
        name: "Aisha Mensah",
        position: "Treasurer",
        image:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop",
        email: "aisha@saintsclub.org",
        year: 2025,
      },
      {
        id: "c10",
        name: "Ben Torres",
        position: "House Chair",
        image:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
        email: "ben@saintsclub.org",
        year: 2025,
      },
    ],
  },
]

export const aboutStats = [
  { label: "Members", value: "180" },
  { label: "Years established", value: "14" },
  { label: "Programmes a year", value: "40+" },
  { label: "Bursaries awarded", value: "96" },
]

export type NavChild = {
  href: string
  label: string
  description: string
}

export type NavLink = {
  href: string
  label: string
  children?: NavChild[]
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      {
        href: "/about",
        label: "The club",
        description: "History, house, and membership",
      },
      {
        href: "/committee",
        label: "Committee",
        description: "Officers elected each year",
      },
      {
        href: "/activities",
        label: "Activities",
        description: "Standing programmes of the house",
      },
    ],
  },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
]

export const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/notices", label: "Notices" },
  { href: "/activities", label: "Activities" },
  { href: "/committee", label: "Committee" },
  { href: "/contact", label: "Contact" },
]

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
