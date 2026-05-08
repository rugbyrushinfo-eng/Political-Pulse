import { format } from 'date-fns';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  content: string;
  excerpt: string;
  image: {
    url: string;
    alt: string;
    caption: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  keyTakeaways: string[];
  faq: { question: string; answer: string }[];
  internalLinks: { text: string; url: string }[];
  externalSources: { text: string; url: string }[];
}

export const CATEGORIES = [
  "National Elections",
  "Parliamentary Affairs",
  "Economic Policy",
  "Social Justice",
  "Provincial Watch",
  "Global ZAR"
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The State of the GNU: Successes and Roadblocks in the ZAR Political Landscape",
    slug: "state-of-the-gnu-2026-south-africa",
    category: "National Elections",
    date: new Date('2026-05-07T10:00:00Z').toISOString(),
    author: "Zahin van der Merwe",
    excerpt: "As the Government of National Unity (GNU) approaches its two-year anniversary, we examine the structural integrity of South Africa's most ambitious political project.",
    image: {
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200",
      alt: "South African Parliament building in Cape Town",
      caption: "The Cape Town Parliament remains the focal point of GNU negotiations."
    },
    meta: {
      title: "South Africa GNU Progress Report 2026 | Political Pulse",
      description: "A detailed analysis of the South African Government of National Unity. Successes, failures, and the 2026 political outlook for the ANC, DA, and IFP coalition.",
      keywords: ["South Africa Politics", "GNU 2026", "ANC DA Coalition", "ZAR News", "Cyril Ramaphosa"]
    },
    keyTakeaways: [
      "The GNU has provided unexpected currency stability for the ZAR.",
      "Infrastructure reform remains the primary point of friction between DA and ANC ministers.",
      "Voter sentiment indicates a shift towards centralized moderate policies."
    ],
    internalLinks: [
      { text: "Economic Policy Outlook", url: "#category-Economic Policy" },
      { text: "The Land Question 2026", url: "/posts/land-reform-legislation" }
    ],
    externalSources: [
      { text: "Electoral Commission of South Africa (IEC)", url: "https://www.elections.org.za" },
      { text: "SABC News Political Archive", url: "https://www.sabcnews.com" }
    ],
    faq: [
      { question: "What is the GNU?", answer: "The Government of National Unity is the multi-party coalition governing South Africa following the 2024 elections." },
      { question: "Is the coalition stable?", answer: "While tensions exist over policy implementation, the major partners have reaffirmed their commitment to the 2026 roadmap." }
    ],
    content: `
# The State of the GNU: Successes and Roadblocks in the ZAR Political Landscape

Introduction: South Africa stands at a crossroads. As the Government of National Unity (GNU) navigates its second year, the political landscape of 2026 is vastly different from the polarized halls of 2024. The coalition, once dismissed as a desperate marriage of convenience, has evolved into a complex, functioning administrative machine. But is it delivering for the average South African?

## The Legislative Hurdles of 2026

The primary challenge facing President Cyril Ramaphosa's grand coalition is the 'Legislative Fog.' While broad statements of intent are common, translating these into acts of Parliament has proven difficult. The DA-led public works initiatives have often clashed with traditional ANC labor stances, leading to a stalemate in several key industrial sectors.

### Successes in Infrastructure and Energy

The brightness in the room comes from the Ministry of Electricity and Energy. Load shedding, the ghost of South Africa's past, has been largely exorcised through a combination of private sector integration and streamlined Eskom management.

- **Private Grid Access:** New laws have allowed independent power producers (IPPs) to feed directly into the municipal grids without the previous red tape.
- **Renewable Surge:** The Northern Cape solar projects are now contributing 15% of the national peak demand.

## Economic Impact and the Rand's Performance

Global markets have reacted with cautious optimism. The Rand (ZAR) has found a stable trading range, a phenomenon rarely seen in the past decade. Financial analysts attribute this to the 'Check and Balance' system inherent in the GNU—no single party can pass radical, un-costed economic policies.

## Looking Ahead: The 2027 Horizon

As we approach the mid-term reviews, the question of provincial governance looms large. With the Western Cape and Gauteng under complex multi-party arrangements, the national GNU serves as a blueprint—or a warning—for what's to come.

Conclusion: The GNU is not a silver bullet, but it is a necessary evolution. For the South African voter, the emphasis has shifted from 'who' governs to 'how' accurately they manage the collective treasury. 
    `
  },
  {
    id: "2",
    title: "South Africa's BRICS Expansion: Navigating the 2026 Geopolitical Shift",
    slug: "south-africa-brics-expansion-2026",
    category: "Global ZAR",
    date: new Date('2026-05-08T08:00:00Z').toISOString(),
    author: "Zahin van der Merwe",
    excerpt: "With the inclusion of new member states, South Africa finds itself at the heart of a shifting global order. How is Pretoria balancing Western trade with Eastern alliances?",
    image: {
      url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200",
      alt: "Global trade map and flags",
      caption: "Pretoria's position in BRICS remains central to its foreign policy strategy."
    },
    meta: {
      title: "BRICS Expansion 2026: South Africa's Role | Political Pulse",
      description: "South Africa's geopolitical strategy within the expanded BRICS+ framework. Analysis of trade relations with China, Russia, and the G7.",
      keywords: ["BRICS 2026", "South Africa Foreign Policy", "Pretoria Diplomatic News", "ZAR Global Trade"]
    },
    keyTakeaways: [
      "South Africa has successfully mediated trade disputes between new BRICS members.",
      "The 'de-dollarization' narrative is gaining traction in Johannesburg's financial district.",
      "Balancing AGOA trade benefits with BRICS obligations remains a high-wire act for the GNU."
    ],
    internalLinks: [
      { text: "Parliamentary Affairs Update", url: "#category-Parliamentary Affairs" },
      { text: "Provincial Watch", url: "#category-Provincial Watch" }
    ],
    externalSources: [
      { text: "Department of International Relations and Cooperation (DIRCO)", url: "https://www.dirco.gov.za" }
    ],
    faq: [
      { question: "Who are the new BRICS members?", answer: "The expansion includes nations like Egypt, Ethiopia, Iran, and the UAE, joining the original five." },
      { question: "Is SA leaving Western trade blocs?", answer: "No, the GNU policy is one of 'Active Non-Alignment,' maintaining ties with both G7 and BRICS." }
    ],
    content: `
# South Africa's BRICS Expansion: Navigating the 2026 Geopolitical Shift

Introduction: The world is no longer unipolar. In the halls of Pretoria's Union Buildings, the conversation has shifted from asking for inclusion to dictating terms. South Africa's role in the 2026 BRICS summit has solidified its position as the 'Gateway to the Global South.'

## The New Financial Architecture

One of the most significant developments this year is the further operationalization of the New Development Bank (NDB). Johannesburg is becoming a hub for NDB-funded infrastructure projects across the sub-continent.

### Strategic Autonomy or Diplomatic Risk?

Critics of the GNU's foreign policy argue that the tilt toward BRICS+ might alienate traditional Western partners. However, the numbers tell a different story. Trade with the EU remains robust, even as exports to China and India hit record highs.

## Conclusion: The Multi-Polar Reality

South Africa's foreign policy in 2026 is defined by pragmatism. By leveraging its position in both the G20 and BRICS, the country is carving out a unique middle-power status that prioritizes national economic interest over ideological purity.
    `
  },
  {
    id: "3",
    title: "Provincial Power Play: How Gauteng's 2026 Metro Stability Affects National Growth",
    slug: "gauteng-metro-stability-2026",
    category: "Provincial Watch",
    date: new Date('2026-05-08T12:00:00Z').toISOString(),
    author: "Zahin van der Merwe",
    excerpt: "Gauteng remains the economic heartbeat of South Africa. We look at how the latest metro coalition agreements in Joburg and Tshwane are impacting business confidence.",
    image: {
      url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200",
      alt: "Sandton skyline, Johannesburg",
      caption: "Sandton continues to drive the provincial GDP despite administrative shifts."
    },
    meta: {
      title: "Gauteng Metro Stability 2026 Analysis | Political Pulse",
      description: "A deep dive into the political stability of Johannesburg and Tshwane metros in 2026. Impact on ZAR business growth and public service delivery.",
      keywords: ["Gauteng Politics", "Joburg Metro 2026", "Tshwane Coalition", "SA Economic Hub", "ZAR Business News"]
    },
    keyTakeaways: [
      "New revenue collection strategies in Joburg have reduced the city's deficit by 20%.",
      "Tshwane's clean audit trend is attracting fresh continental investment.",
      "The relationship between the Premier and Metro Mayors remains the critical success factor."
    ],
    internalLinks: [
      { text: "National GNU Roadmap", url: "/posts/state-of-the-gnu-2026-south-africa" }
    ],
    externalSources: [
      { text: "Gauteng Provincial Government", url: "https://www.gauteng.gov.za" }
    ],
    faq: [
      { question: "Is Joburg safe for investment?", answer: "Current municipal indicators show a marked improvement in infrastructure reliability, boosting investor confidence scores." }
    ],
    content: `
# Provincial Power Play: How Gauteng's 2026 Metro Stability Affects National Growth

Introduction: As goes Gauteng, so goes South Africa. In 2026, the 'Province of Gold' is proving that local coalition stability is the bedrock of national economic recovery.

## The Metro Renaissance

After years of fluctuating leadership, the major metros of Johannesburg, Tshwane, and Ekurhuleni have entered a period of relative calm. The 2026 Metro Accords have created a framework for long-term planning that transcends individual party interests.

### Infrastructure First: The New Priority

The shift from 'Political Theater' to 'Pipe and Pavement' politics has seen a massive increase in local service delivery. The Gauteng Broadband project is now 90% complete, connecting townships with high-speed fiber for the first time.

## Conclusion: A Blueprint for the Future

The success of Gauteng's metros in 2026 provides a compelling argument for decentralized multi-party governance. If this stability holds, Gauteng will not only remain the economic heart of Africa but will become its most innovative administrative laboratory.
    `
  }
];
