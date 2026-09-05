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
  category: "Dinner" | "Family" | "Sport" | "Cultural" | "Reunion"
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

export type FacilityIcon =
  | "restaurant"
  | "tea"
  | "cigar"
  | "pool"
  | "cards"
  | "lounge"

export type ClubActivity = {
  id: string
  title: string
  description: string
  schedule: string
  category: "Sport" | "Social" | "Cultural" | "Family" | "Wellness"
  image: string
}

export type GalleryItem = {
  id: string
  title: string
  category: "Dining" | "Events" | "Facilities" | "Members" | "Sports"
  image: string
  caption: string
}

/** @deprecated Use ClubActivity — kept alias for older imports */
export type Activity = ClubActivity

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
  name: "Saints Club Limited",
  shortName: "Saints Club",
  formerName: "Gregorian Alumni Club Limited",
  tagline:
    "A premier, family-centric social club built on tradition, fraternity, and excellence.",
  legalForm: "Company limited by guarantee under the Companies Act, 1994",
  memberCeiling: "2,318",
  email: "info@saintsclub.com",
  phone: "+880 2 XXX XXXX",
  address: "Dhaka, Bangladesh",
  hours: "Members, spouses, and dependent children · See the notice board for house hours",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
}

export const presidentMessage = {
  title: "A welcome from the President",
  body: "On behalf of the Board of Directors, I welcome you to Saints Club Limited. We exist so that alumni of Bangladesh’s missionary schools — and their families — may share a house of fellowship, sport, dining, and culture. Whether you are considering membership or already among us, you will find a club that values courtesy, heritage, and a genuine place for spouses and children. I look forward to greeting you at the house.",
  signoff: "The President",
  office: "Board of Directors",
}

export const schools = [
  {
    name: "St. Gregory's High School",
    year: 1882,
    location: "Luxmibazar, Dhaka",
  },
  {
    name: "St. Joseph Higher Secondary School",
    year: 1954,
    location: "Mohammadpur, Dhaka",
  },
  {
    name: "Holy Cross Girls' High School",
    year: 1951,
    location: "Tejgaon, Dhaka",
  },
  {
    name: "St. Francis Xavier's Girls High School",
    year: 1912,
    location: "Luxmibazar, Dhaka",
  },
  {
    name: "St. Placid's School",
    year: 1853,
    location: "Patharghata, Chattogram",
  },
  {
    name: "St. Scholastica's Girls' School",
    year: 1883,
    location: "Patharghata, Chattogram",
  },
  {
    name: "S.F.X. Greenherald International School",
    year: 1972,
    location: "Mohammadpur, Dhaka",
  },
]

export const corePrinciples = [
  {
    title: "Family-centric atmosphere",
    body: "Designed as a congenial environment for members, spouses, and children.",
  },
  {
    title: "Shared heritage",
    body: "Rooted in the educational traditions of seven missionary schools across Bangladesh.",
  },
  {
    title: "Comprehensive amenities",
    body: "Premier dining, fitness, sports, lounge, and event facilities under one roof.",
  },
]

export const eligibility = [
  "Be an alumnus or alumna of one of the seven designated missionary schools.",
  "Be at least 24 years of age and of sound mind.",
  "Meet the Club’s ethical and legal conduct guidelines.",
]

export const generalMembership = [
  {
    name: "Founder Members",
    fee: "Recognized at inception",
    subscription: "Exempt from monthly subscriptions",
    quota: "Foundational roll",
    detail:
      "Recognized for foundational contributions during the Club’s inception.",
  },
  {
    name: "Donor Members",
    fee: "BDT 5,00,000",
    subscription: "Exempt from monthly subscriptions",
    quota: "Maximum 300",
    detail: "Entry fee of BDT 5,00,000. Full General Member rights.",
  },
  {
    name: "Life Members",
    fee: "BDT 3,00,000",
    subscription: "Exempt from monthly subscriptions",
    quota: "Maximum 500",
    detail: "Entry fee of BDT 3,00,000. Full General Member rights.",
  },
  {
    name: "Permanent Members",
    fee: "BDT 1,00,000",
    subscription: "BDT 1,000 / month",
    quota: "Maximum 1,500",
    detail:
      "Entry fee of BDT 1,00,000 with a monthly subscription of BDT 1,000.",
  },
  {
    name: "Patron Members",
    fee: "BDT 7,00,000",
    subscription: "Exempt from monthly subscriptions",
    quota: "By admission",
    detail: "Entry fee of BDT 7,00,000. Exempt from monthly subscriptions.",
  },
]

export const useMembership = [
  {
    name: "Corporate Membership",
    fee: "BDT 10,00,000",
    subscription: "BDT 3,000 / month",
    detail:
      "Allows nomination of up to three C-suite executives or Directors. Full facility privileges without voting rights.",
  },
  {
    name: "Foreign / Expatriate Membership",
    fee: "BDT 2,00,000",
    subscription: "BDT 2,000 / month",
    detail: "For eligible persons resident in Bangladesh on expatriate terms.",
  },
  {
    name: "Non-Resident Membership",
    fee: "USD 1,000",
    subscription: "USD 1,000 / year",
    detail: "For eligible alumni residing abroad.",
  },
  {
    name: "Associate Membership",
    fee: "As prescribed",
    subscription: "As prescribed",
    detail:
      "For children of eligible members who turn 24 years of age.",
  },
  {
    name: "Senior Membership",
    fee: "As prescribed",
    subscription: "As prescribed",
    detail:
      "For veteran members (15+ years) surrendering membership to their spouse or children while retaining personal facility rights.",
  },
  {
    name: "Honorary & Diplomat Members",
    fee: "By invitation",
    subscription: "By invitation",
    detail:
      "Offered selectively to dignitaries and diplomats by invitation of the Board.",
  },
]

export const feeSchedule = [
  {
    category: "Permanent",
    admission: "BDT 1,00,000",
    recurring: "BDT 1,000 / month",
  },
  {
    category: "Life",
    admission: "BDT 3,00,000",
    recurring: "Exempt",
  },
  {
    category: "Donor",
    admission: "BDT 5,00,000",
    recurring: "Exempt",
  },
  {
    category: "Patron",
    admission: "BDT 7,00,000",
    recurring: "Exempt",
  },
  {
    category: "Corporate",
    admission: "BDT 10,00,000",
    recurring: "BDT 3,000 / month",
  },
  {
    category: "Foreign / Expatriate",
    admission: "BDT 2,00,000",
    recurring: "BDT 2,000 / month",
  },
  {
    category: "Non-Resident",
    admission: "USD 1,000",
    recurring: "USD 1,000 / year",
  },
]

export const applicationSteps = [
  {
    step: "01",
    title: "Confirm eligibility",
    body: "Applicants for General Membership must be alumni of a designated school, at least 24 years of age, and able to meet the Club’s conduct standards.",
  },
  {
    step: "02",
    title: "Proposal",
    body: "A candidate is nominated and seconded by General Members in good standing, in the form prescribed by the Secretariat.",
  },
  {
    step: "03",
    title: "Scrutiny",
    body: "The Membership Scrutiny Committee reviews the application, supporting papers, and standing of the proposers.",
  },
  {
    step: "04",
    title: "Board decision",
    body: "The Board of Directors considers the Committee’s recommendation and admits members subject to quota and the Articles.",
  },
  {
    step: "05",
    title: "Admission",
    body: "Upon payment of the prescribed fees, the member is entered on the roll and may enjoy the privileges of the house.",
  },
]

export const standingCommittees = [
  "Constitution & Legal Affairs",
  "Disciplinary & Administration",
  "Membership Scrutiny",
  "Finance & Internal Audit",
  "Lounge, Events & Cultural Affairs",
  "Sports, Gym & Indoor Games",
  "Bar & Beverage",
  "IT & Publications",
]

export const conductPoints = [
  "Members, spouses, children, and guests are expected to treat the house, staff, and one another with courtesy.",
  "Derogatory behaviour, misconduct, or abuse of facilities is referred to the Disciplinary Committee.",
  "Financial defaults, including unpaid subscriptions, are administered under the Articles and may affect privileges.",
  "Appeals from disciplinary findings lie to the Appellate Committee. Certain disputes may be referred to Arbitration.",
]

export const facilities = [
  {
    id: "f1",
    title: "Ruchira Restaurant",
    description:
      "The Club’s signature dining room — refined plates, attentive service, and a warm setting for family meals and guest dinners.",
    schedule: "Lunch & dinner",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop",
    icon: "restaurant" as const,
  },
  {
    id: "f2",
    title: "Ispahani Tea Lounge",
    description:
      "An elegant lounge for afternoon tea, quiet conversation, and light refreshments in a calm, polished atmosphere.",
    schedule: "Daytime lounge hours",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=900&fit=crop",
    icon: "tea" as const,
  },
  {
    id: "f3",
    title: "Mercedes Benz Cigar Bar",
    description:
      "A members’ bar for evening conversation — low light, classic pours, and a discreet setting for cigars and company.",
    schedule: "Evening service",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=900&fit=crop",
    icon: "cigar" as const,
  },
  {
    id: "f4",
    title: "Pool Room",
    description:
      "A dedicated billiards space for friendly matches and leisurely play among members and guests.",
    schedule: "Daily house hours",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=900&fit=crop",
    icon: "pool" as const,
  },
  {
    id: "f5",
    title: "Card Room",
    description:
      "A private room for cards and indoor games — quiet, well-kept, and reserved for members’ recreation.",
    schedule: "Daily house hours",
    image:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1200&h=900&fit=crop",
    icon: "cards" as const,
  },
  {
    id: "f6",
    title: "Sapphire Lounge by Bank Asia",
    description:
      "A contemporary lounge for meetings and relaxed hosting — soft seating, calm light, and Club hospitality.",
    schedule: "Members & invited guests",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=900&fit=crop",
    icon: "lounge" as const,
  },
]

export const bookableSpaces = [
  "Lounge",
  "Private dining",
  "Event hall",
  "Meeting room",
  "Indoor games (session)",
]

export const members: Member[] = [
  {
    id: "m1",
    name: "Amina Rahman",
    role: "Life Member",
    profession: "Holy Cross Girls' High School",
    joined: "2018",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    bio: "General Member. Serves on Lounge, Events & Cultural Affairs.",
    email: "amina@saintsclub.com",
  },
  {
    id: "m2",
    name: "Daniel D'Costa",
    role: "Permanent Member",
    profession: "St. Gregory's High School",
    joined: "2016",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
    bio: "General Member. Convenes weekend sport fixtures.",
    email: "daniel@saintsclub.com",
  },
  {
    id: "m3",
    name: "Sofia Gomes",
    role: "Donor Member",
    profession: "St. Francis Xavier's Girls High School",
    joined: "2019",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    bio: "General Member. Supports the Club’s cultural calendar.",
    email: "sofia@saintsclub.com",
  },
  {
    id: "m4",
    name: "Marcus Rozario",
    role: "Permanent Member",
    profession: "St. Joseph Higher Secondary School",
    joined: "2015",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    bio: "General Member. Advises Finance & Internal Audit.",
    email: "marcus@saintsclub.com",
  },
  {
    id: "m5",
    name: "Priya Costa",
    role: "Life Member",
    profession: "St. Scholastica's Girls' School",
    joined: "2020",
    image:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=500&fit=crop",
    bio: "General Member. Assists Membership Scrutiny.",
    email: "priya@saintsclub.com",
  },
  {
    id: "m6",
    name: "Leo Pereira",
    role: "Permanent Member",
    profession: "S.F.X. Greenherald International School",
    joined: "2021",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    bio: "General Member. Serves on IT & Publications.",
    email: "leo@saintsclub.com",
  },
  {
    id: "m7",
    name: "Hana D'Silva",
    role: "Donor Member",
    profession: "Holy Cross Girls' High School",
    joined: "2017",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    bio: "General Member. Arranges visiting family nights.",
    email: "hana@saintsclub.com",
  },
  {
    id: "m8",
    name: "James Gomes",
    role: "Founder Member",
    profession: "St. Placid's School",
    joined: "2014",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    bio: "Founder Member. Counsel to Constitution & Legal Affairs.",
    email: "james@saintsclub.com",
  },
]

export const events: EventItem[] = [
  {
    id: "e1",
    title: "Autumn Family Night",
    date: "2026-09-12",
    time: "18:30",
    location: "Lounge & lawn",
    category: "Family",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    ],
    description:
      "An evening for members, spouses, and children. Dinner, music, and introductions for newly admitted families.",
    featured: true,
  },
  {
    id: "e2",
    title: "Alumni Reunion Dinner",
    date: "2026-09-28",
    time: "19:00",
    location: "Dining hall",
    category: "Reunion",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
    ],
    description:
      "A table for the seven schools. Address by the President, followed by conversation in the lounge.",
  },
  {
    id: "e3",
    title: "Indoor Games Cup",
    date: "2026-10-05",
    time: "10:00",
    location: "Indoor games room",
    category: "Sport",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop",
    ],
    description:
      "A day of fixtures for members and older children. Lunch in the dining room; prizes in the afternoon.",
  },
  {
    id: "e4",
    title: "Cultural Evening",
    date: "2026-10-18",
    time: "18:00",
    location: "Event hall",
    category: "Cultural",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop",
    ],
    description:
      "Music and readings hosted by Lounge, Events & Cultural Affairs. Members and introduced guests.",
  },
  {
    id: "e5",
    title: "Holiday Celebration",
    date: "2026-12-20",
    time: "17:00",
    location: "House",
    category: "Family",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop",
    ],
    description:
      "A family gathering to close the year. Children welcome. Reservations at the Secretariat.",
  },
  {
    id: "e6",
    title: "Members’ Dinner",
    date: "2026-11-07",
    time: "19:30",
    location: "Dining hall",
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop",
    ],
    description:
      "A quieter members’ table. Spouses welcome. Dress as published on the notice board.",
  },
]

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "From Gregorian Alumni Club to Saints Club Limited",
    excerpt:
      "The Club continues as a company limited by guarantee, bringing together alumni of seven missionary schools.",
    content:
      "Originally registered as Gregorian Alumni Club Limited, Saints Club Limited is incorporated under the Companies Act, 1994. The house remains a family-centric society for alumni of Bangladesh’s premier Christian missionary schools.",
    date: "2026-08-02",
    author: "Secretariat",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    tag: "Club",
  },
  {
    id: "n2",
    title: "Autumn family nights return to the calendar",
    excerpt:
      "Lounge, Events & Cultural Affairs has published the season’s family and reunion dates.",
    content:
      "Members may reserve a table at the Secretariat. Spouses and dependent children under 24 are welcome as of right.",
    date: "2026-07-22",
    author: "Lounge, Events & Cultural Affairs",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop",
    tag: "Events",
  },
  {
    id: "n3",
    title: "Gym and indoor games room now on house hours",
    excerpt:
      "Sports, Gym & Indoor Games confirms daily access for members and families during published hours.",
    content:
      "Organised fixtures will be announced on the notice board. Private hire of event spaces remains by booking.",
    date: "2026-07-10",
    author: "Sports, Gym & Indoor Games",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
    tag: "Facilities",
  },
]

export const notices: Notice[] = [
  {
    id: "nt1",
    title: "Nominations for the Board of Directors",
    excerpt:
      "General Members in good standing may nominate and second candidates for the President and Directors. Terms are two years. Particulars from the Secretariat.",
    date: "2026-07-28",
    author: "Secretariat",
    tag: "Governance",
  },
  {
    id: "nt2",
    title: "Membership Scrutiny sitting dates",
    excerpt:
      "The Membership Scrutiny Committee will meet on the last Thursday of each month. Complete papers must reach the Secretariat seven days prior.",
    date: "2026-07-14",
    author: "Membership Scrutiny",
    tag: "Membership",
  },
  {
    id: "nt3",
    title: "Subscriptions and financial standing",
    excerpt:
      "Permanent, Corporate, and Expatriate members are reminded that monthly subscriptions fall due on the first of each month. Defaults are referred under the Articles.",
    date: "2026-07-01",
    author: "Finance & Internal Audit",
    tag: "Finance",
  },
  {
    id: "nt4",
    title: "Code of Conduct — house reminder",
    excerpt:
      "Misconduct or derogatory behaviour may be referred to the Disciplinary Committee, with appeal to the Appellate Committee and, where provided, Arbitration.",
    date: "2026-06-20",
    author: "Disciplinary & Administration",
    tag: "Conduct",
  },
]

export const clubActivities: ClubActivity[] = [
  {
    id: "act1",
    title: "Weekend Badminton Club",
    description:
      "Friendly doubles and mixed sessions for members and families. Rackets available at the games desk.",
    schedule: "Saturdays · 4:00–7:00 pm",
    category: "Sport",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=800&fit=crop",
  },
  {
    id: "act2",
    title: "Members’ Bridge Circle",
    description:
      "Weekly tables in the Card Room. Beginners welcome; partners can be arranged through the Secretariat.",
    schedule: "Wednesdays · 7:00–10:00 pm",
    category: "Social",
    image:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1200&h=800&fit=crop",
  },
  {
    id: "act3",
    title: "Family Movie Night",
    description:
      "A monthly screening in the lounge for members, spouses, and children under 24 — snacks from Ruchira.",
    schedule: "First Friday each month · 7:30 pm",
    category: "Family",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop",
  },
  {
    id: "act4",
    title: "Classical Evening Series",
    description:
      "Intimate performances and alumni talent nights hosted in Sapphire Lounge and the dining hall.",
    schedule: "Quarterly · evenings",
    category: "Cultural",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
  },
  {
    id: "act5",
    title: "Morning Wellness Walk",
    description:
      "A light group walk and stretch session before breakfast — open to all adult members.",
    schedule: "Sundays · 7:00–8:00 am",
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=800&fit=crop",
  },
  {
    id: "act6",
    title: "Billiards League",
    description:
      "Seasonal handicap league in the Pool Room with prizes at the closing dinner.",
    schedule: "Seasonal · weeknights",
    category: "Sport",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop",
  },
  {
    id: "act7",
    title: "Ispahani Afternoon Tea Social",
    description:
      "A standing tea hour for conversation, networking, and welcoming new members.",
    schedule: "Thursdays · 4:00–6:00 pm",
    category: "Social",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=800&fit=crop",
  },
  {
    id: "act8",
    title: "Kids’ Holiday Workshop",
    description:
      "Crafts, games, and storytelling for dependent children during school holidays.",
    schedule: "School holidays · mornings",
    category: "Family",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=800&fit=crop",
  },
]

/** @deprecated Prefer clubActivities */
export const activities = clubActivities

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Ruchira dining room",
    category: "Dining",
    caption: "Evening service at Ruchira Restaurant",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop",
  },
  {
    id: "g2",
    title: "Founders’ dinner",
    category: "Events",
    caption: "Annual founders’ dinner in the main hall",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=900&fit=crop",
  },
  {
    id: "g3",
    title: "Sapphire Lounge",
    category: "Facilities",
    caption: "Sapphire Lounge by Bank Asia",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=900&fit=crop",
  },
  {
    id: "g4",
    title: "Members’ gathering",
    category: "Members",
    caption: "Conversation after a Board reception",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=900&fit=crop",
  },
  {
    id: "g5",
    title: "Pool Room match",
    category: "Sports",
    caption: "Friendly billiards in the Pool Room",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=900&fit=crop",
  },
  {
    id: "g6",
    title: "Ispahani Tea Lounge",
    category: "Facilities",
    caption: "Afternoon light in the tea lounge",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=900&fit=crop",
  },
  {
    id: "g7",
    title: "Cigar Bar evening",
    category: "Dining",
    caption: "Mercedes Benz Cigar Bar",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=900&fit=crop",
  },
  {
    id: "g8",
    title: "Family night",
    category: "Events",
    caption: "Family night at the Club",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=900&fit=crop",
  },
  {
    id: "g9",
    title: "Alumni reunion",
    category: "Members",
    caption: "Seven schools reunion weekend",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=900&fit=crop",
  },
  {
    id: "g10",
    title: "Badminton session",
    category: "Sports",
    caption: "Weekend badminton club",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=900&fit=crop",
  },
  {
    id: "g11",
    title: "Private dining",
    category: "Dining",
    caption: "Private table at Ruchira",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop",
  },
  {
    id: "g12",
    title: "Cultural evening",
    category: "Events",
    caption: "Classical evening series",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=900&fit=crop",
  },
]

export const committees: CommitteeYear[] = [
  {
    year: 2026,
    theme: "President and ten Directors · two-year term",
    members: [
      {
        id: "c1",
        name: "Elena D'Rozario",
        position: "President",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        email: "president@saintsclub.com",
        year: 2026,
      },
      {
        id: "c2",
        name: "Noah Gomes",
        position: "Director, Constitution & Legal Affairs",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
        email: "legal@saintsclub.com",
        year: 2026,
      },
      {
        id: "c3",
        name: "Fatima Rahman",
        position: "Director, Disciplinary & Administration",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        email: "discipline@saintsclub.com",
        year: 2026,
      },
      {
        id: "c4",
        name: "Owen Pereira",
        position: "Director, Membership Scrutiny",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        email: "membership@saintsclub.com",
        year: 2026,
      },
      {
        id: "c5",
        name: "Maya Costa",
        position: "Director, Finance & Internal Audit",
        image:
          "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop",
        email: "finance@saintsclub.com",
        year: 2026,
      },
      {
        id: "c6",
        name: "Ryan D'Silva",
        position: "Director, Lounge, Events & Cultural Affairs",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        email: "events@saintsclub.com",
        year: 2026,
      },
      {
        id: "c7",
        name: "Isabella Cruz",
        position: "Director, Sports, Gym & Indoor Games",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
        email: "sports@saintsclub.com",
        year: 2026,
      },
      {
        id: "c8",
        name: "Theo Lang",
        position: "Director, Bar & Beverage",
        image:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
        email: "bar@saintsclub.com",
        year: 2026,
      },
      {
        id: "c9",
        name: "Aisha Mensah",
        position: "Director, IT & Publications",
        image:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop",
        email: "publications@saintsclub.com",
        year: 2026,
      },
      {
        id: "c10",
        name: "Ben Torres",
        position: "Director",
        image:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
        email: "board@saintsclub.com",
        year: 2026,
      },
      {
        id: "c11",
        name: "Priya Nair",
        position: "Director",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        email: "directors@saintsclub.com",
        year: 2026,
      },
    ],
  },
]

export const aboutStats = [
  { label: "General Member ceiling", value: "2,318" },
  { label: "Eligible schools", value: "7" },
  { label: "Directors, with the President", value: "11" },
  { label: "Standing committees", value: "8" },
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
        label: "Overview & history",
        description: "Identity, mission, and the seven schools",
      },
      {
        href: "/committee",
        label: "Board of Directors",
        description: "President and ten Directors",
      },
      {
        href: "/about#founders",
        label: "Foundational Committee",
        description: "The body that established the Club",
      },
    ],
  },
  {
    href: "/membership",
    label: "Membership",
    children: [
      {
        href: "/membership",
        label: "Member Registration",
        description: "Apply for membership and review eligibility",
      },
      {
        href: "/members",
        label: "Member Directory",
        description: "Find and connect with fellow members",
      },
    ],
  },
  {
    href: "/facilities",
    label: "Club Life",
    children: [
      {
        href: "/facilities",
        label: "Facilities",
        description: "Dining rooms, lounges, and games",
      },
      {
        href: "/gallery",
        label: "Gallery",
        description: "Moments from life at the Club",
      },
      {
        href: "/activities",
        label: "Activities",
        description: "Sports, socials, and family programmes",
      },
    ],
  },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
]

export const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/membership", label: "Membership" },
  { href: "/members", label: "Member Directory" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/activities", label: "Activities" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/governance", label: "Governance" },
  { href: "/notices", label: "Notices" },
  { href: "/committee", label: "Board of Directors" },
  { href: "/contact", label: "Contact" },
]

export const quickLinks = [
  {
    href: "/membership",
    label: "Membership",
    description: "Eligibility, categories, and how to apply",
  },
  {
    href: "/facilities",
    label: "Facilities",
    description: "Dining rooms, lounges, and games",
  },
  {
    href: "/gallery",
    label: "Gallery",
    description: "Moments from life at the Club",
  },
]

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
