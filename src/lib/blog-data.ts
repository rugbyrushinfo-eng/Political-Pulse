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

As goes Gauteng, so goes South Africa. In 2026, the 'Province of Gold' is proving that local coalition stability is the bedrock of national economic recovery.

## The Metro Renaissance

After years of fluctuating leadership, the major metros of Johannesburg, Tshwane, and Ekurhuleni have entered a period of relative calm. The 2026 Metro Accords have created a framework for long-term planning that transcends individual party interests.

### Infrastructure First: The New Priority

The shift from 'Political Theater' to 'Pipe and Pavement' politics has seen a massive increase in local service delivery. The Gauteng Broadband project is now 90% complete, connecting townships with high-speed fiber for the first time.

## Conclusion: A Blueprint for the Future

The success of Gauteng's metros in 2026 provides a compelling argument for decentralized multi-party governance. If this stability holds, Gauteng will not only remain the economic heart of Africa but will become its most innovative administrative laboratory.
    `
  },
  {
    id: "4",
    title: "Monetary Sovereignty: SARB's Pivot on Digital ZAR and Interest Rate Cycles",
    slug: "sarb-digital-zar-2026",
    category: "Economic Policy",
    date: new Date('2026-05-09T09:00:00Z').toISOString(),
    author: "Zahin van der Merwe",
    excerpt: "The South African Reserve Bank has signaled a major shift in digital currency integration. What does a programmable Rand mean for your wallet?",
    image: {
      url: "https://images.unsplash.com/photo-1621504450181-0d356f6e9c35?auto=format&fit=crop&q=80&w=1200",
      alt: "South African Reserve Bank Building",
      caption: "The SARB in Pretoria is finalizing its digital currency framework."
    },
    meta: {
      title: "SARB Digital ZAR Update 2026 | Economic Policy News",
      description: "Analysis of the SARB decision to pilot the Digital Rand. Impact on inflation targeting and interest rate cycles in the GNU era.",
      keywords: ["Digital Rand", "SARB 2026", "SA Interest Rates", "ZAR Economy", "South Africa Finance"]
    },
    keyTakeaways: [
      "The Digital ZAR pilot will launch in Q4 2026 with selected commercial banks.",
      "Interest rate cuts are expected to stabilize at 6.5% if inflation remains in the target band.",
      "The GNU has agreed on a shared fiscal framework to lower national debt-to-GDP ratios."
    ],
    internalLinks: [
      { text: "BRICS Financial Architecture", url: "/posts/south-africa-brics-expansion-2026" }
    ],
    externalSources: [
      { text: "South African Reserve Bank", url: "https://www.resbank.co.za" }
    ],
    faq: [
      { question: "Will the digital ZAR replace cash?", answer: "Currently, no. The SARB envisages it as a parallel system to reduce transaction costs and increase financial inclusion." }
    ],
    content: `
# Monetary Sovereignty: SARB's Pivot on Digital ZAR and Interest Rate Cycles

In a landmark decision, the South African Reserve Bank (SARB) has unveiled its most ambitious technological upgrade since the transition to a democratic order. The introduction of the 'Programmable Rand' marks a new era for the economy.

## The Case for the Digital ZAR

The SARB's move is not merely a chase after crypto-trends but a fundamental shift towards more efficient cross-border payments. Within the BRICS+ framework, South Africa aims to lead the region in digital settlement efficiency.

### Fiscal Harmony in the GNU

A surprising byproduct of the coalition government has been the alignment of the Treasury and the Reserve Bank. For the first time in a decade, fiscal policy (spending) and monetary policy (interest rates) are pulling in the same direction—stabilizing the ZAR against the USD and Euro.

## Future Outlook

As the pilot phase launches, the eyes of the continent are on Pretoria. A successful rollout would set the standard for sovereign digital currencies across SADCC and beyond.
    `
  },
  {
    id: "5",
    title: "Constitutional Safeguards: The 2026 Reform of the Judicial Appointment Process",
    slug: "judicial-reform-south-africa-2026",
    category: "Social Justice",
    date: new Date('2026-05-10T11:00:00Z').toISOString(),
    author: "Zahin van der Merwe",
    excerpt: "The JSC is undergoing a major overhaul to ensure transparency and meritocracy. How will these changes protect the independence of the courts?",
    image: {
      url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
      alt: "Scales of justice",
      caption: "The independence of the judiciary remains a pillar of South African democracy."
    },
    meta: {
      title: "SA Judicial Reform 2026 | Social Justice Analysis",
      description: "Proposed changes to the Judicial Service Commission (JSC) and their impact on the rule of law. Analysis of multi-party constitutional oversight.",
      keywords: ["JSC Reform 2026", "SA Constitution", "Social Justice South Africa", "Judiciary News ZAR"]
    },
    keyTakeaways: [
      "The new JSC code of conduct mandates televised interviews with stricter ethical screening.",
      "The 'Case Backlog Initiative' has reduced legal wait times by 40% in the High Courts.",
      "Public trust in the Constitutional Court has reached a 10-year high in independent polls."
    ],
    internalLinks: [
      { text: "Parliamentary Watch", url: "#category-Parliamentary Affairs" }
    ],
    externalSources: [
      { text: "Office of the Chief Justice", url: "https://www.judiciary.org.za" }
    ],
    faq: [
      { question: "Is the judiciary under threat?", answer: "While political pressure exists, the GNU framework has created more balanced oversight, arguably strengthening the separation of powers." }
    ],
    content: `
# Constitutional Safeguards: The 2026 Reform of the Judicial Appointment Process

The South African judiciary, long seen as the final bulwark against state caputre, is receiving a structural upgrade. The Ministry of Justice has introduced the 'Judicial Integrity Bill' of 2026, aimed at insulating the bench from partisan interference.

## Strengthening the JSC

The Judicial Service Commission (JSC) has historically been a site of intense political friction. The 2026 reforms introduce a 'Panel of Experts' to pre-screen candidates based on judicial merit before they face the political members of the commission.

### Social Impact and Access to Justice

Beyond the high courts, the reform focuses on 'Community Justice Centers.' These centers are designed to resolve civil disputes before they hit the formal court system, ensuring that social justice is accessible to those in rural and underserved areas.

## Conclusion

A country is only as stable as its laws. As South Africa navigates the complexities of of the GNU, the strengthening of the courts ensures that the democratic project remains on track.
    `
  },
  {
    id: "6",
    title: "Legislative Oversight: The New Rules for Committee Transparency",
    slug: "parliamentary-transparency-rules-2026",
    category: "Parliamentary Affairs",
    date: new Date('2026-05-11T13:00:00Z').toISOString(),
    author: "Zahin van der Merwe",
    excerpt: "Parliamentary committees are opening their doors to real-time digital monitoring. We analyze the impact on accountability and anti-corruption efforts.",
    image: {
      url: "https://images.unsplash.com/photo-1541873676947-9cc09174e0d0?auto=format&fit=crop&q=80&w=1200",
      alt: "South African Parliament interior",
      caption: "Parliamentary committees have become the engine room of the GNU."
    },
    meta: {
      title: "SA Parliamentary Oversight 2026 | Political Pulse",
      description: "New transparency rules for SA parliamentary committees. How the 2026 legislative framework targets corruption and increases accountability.",
      keywords: ["Parliament SA", "GNU Oversight", "Accountability 2026", "ZAR Legislative News"]
    },
    keyTakeaways: [
      "All committee meetings are now live-streamed with interactive public feedback loops.",
      "The 'Anti-Corruption Hotline' has been integrated into parliamentary oversight bodies.",
      "Multi-party sub-committees are now required to publish weekly progress reports on major bills."
    ],
    internalLinks: [
      { text: "National Elections History", url: "#category-National Elections" }
    ],
    externalSources: [
      { text: "Parliament of South Africa", url: "https://www.parliament.gov.za" }
    ],
    faq: [
      { question: "Can citizens watch meetings live?", answer: "Yes, the 'Parliament Live' app now provides full HD access to all 54 active committee rooms." }
    ],
    content: `
# Legislative Oversight: The New Rules for Committee Transparency

Parliament is no longer a 'talking shop.' In 2026, it is a high-tech data hub. The new 'Standing Rules of Parliament' have revolutionized how the executive is held to account.

## The Digital Hansard

The introduction of the AI-powered 'Digital Hansard' means every word spoken in a committee is transcribed, indexed, and searchable within 30 minutes. This level of transparency has fundamentally changed how Members of Parliament (MPs) conduct themselves.

### Accountability in Action

Several ministers have already faced intense questioning under the new 'Public Petitions' rule, which allows citizen-led topics to be prioritized in committee schedules if they garner enough digital support.

## Final Word

Transparency is the enemy of corruption. By opening the engine room of government to the public, the 2026 legislative reforms are building a culture of service that was previously unthinkable.
    `
  }
];
