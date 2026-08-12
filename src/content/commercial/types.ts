export interface CommercialMeta {
  title: string;
  description: string;
}

export interface CopyItem {
  title: string;
  text: string;
}

export interface CapabilityContent extends CopyItem {
  id: 'crisis-management' | 'crisis-communication' | 'affected-people';
  anchor: string;
  scope: string[];
  outputs: string[];
}

export interface ExercisePhase extends CopyItem {
  id: 'frame' | 'design' | 'exercise' | 'improve';
  output: string;
}

export interface HomeCommercialContent {
  meta: CommercialMeta;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  ways: {
    eyebrow: string;
    title: string;
    intro: string;
    advisory: CopyItem & { link: string };
    exercises: CopyItem & { link: string };
  };
  engagements: {
    eyebrow: string;
    title: string;
    intro: string;
    review: CopyItem & { type: string; link: string };
    tabletop: CopyItem & { type: string; link: string };
  };
  readiness: {
    eyebrow: string;
    title: string;
    quote: string[];
    stages: CopyItem[];
    note: string;
    approachTitle: string;
    approachLead: string;
    principles: CopyItem[];
  };
  experience: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    closing: string;
    tracks: CopyItem[];
    link: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    copy: string;
    all: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };
}

export interface AdvisoryContent {
  meta: CommercialMeta;
  hero: { eyebrow: string; title: string; lead: string };
  intro: { title: string; text: string; triggers: CopyItem[] };
  capabilities: { eyebrow: string; title: string; intro: string };
  review: {
    eyebrow: string;
    title: string;
    descriptor: string;
    lead: string;
    triggerTitle: string;
    triggers: string[];
    audienceTitle: string;
    audience: string;
    scopeTitle: string;
    scope: string[];
    includesTitle: string;
    includes: string[];
    receivesTitle: string;
    receives: string[];
    outcomeTitle: string;
    outcome: string;
    nextTitle: string;
    next: string;
    cta: string;
  };
  cmt: {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
  };
  process: { eyebrow: string; title: string; intro: string; items: CopyItem[] };
  outputs: { title: string; intro: string; items: string[]; note: string };
  insights: { eyebrow: string; title: string; copy: string };
  contact: { title: string; text: string; cta: string };
}

export interface ExercisesContent {
  meta: CommercialMeta;
  hero: { eyebrow: string; title: string; lead: string };
  intro: { title: string; text: string };
  focus: { eyebrow: string; title: string; intro: string; items: string[] };
  formats: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<CopyItem & { id: string; link?: string; linkLabel?: string }>;
  };
  methodology: { eyebrow: string; title: string; intro: string };
  inclusion: {
    title: string;
    engagementTitle: string;
    engagement: string[];
    clientTitle: string;
    client: string[];
    note: string;
  };
  standard: { title: string; text: string };
  insights: { eyebrow: string; title: string; copy: string };
  contact: { title: string; text: string; cta: string };
}

export interface ExecutiveContent {
  meta: CommercialMeta;
  hero: { eyebrow: string; title: string; lead: string };
  snapshot: { title: string; items: Array<{ term: string; description: string }> };
  useful: { eyebrow: string; title: string; intro: string; items: CopyItem[] };
  participation: {
    title: string;
    text: string;
    coreTitle: string;
    core: string[];
    optionalTitle: string;
    optional: string[];
  };
  observationAreas: { eyebrow: string; title: string; intro: string; items: string[] };
  design: { eyebrow: string; title: string; paragraphs: string[]; sequence: string[] };
  methodology: { eyebrow: string; title: string; intro: string };
  session: { title: string; text: string; items: string[] };
  observation: {
    eyebrow: string;
    title: string;
    text: string;
    labels: string[];
    example: string[];
  };
  outputs: {
    eyebrow: string;
    title: string;
    intro: string;
    engagementTitle: string;
    engagement: string[];
    clientTitle: string;
    client: string[];
    artefactsNote: string;
  };
  aar: { title: string; text: string; items: string[]; note: string };
  preparation: {
    title: string;
    clientTitle: string;
    client: string[];
    scopeTitle: string;
    scope: string;
  };
  related: { eyebrow: string; title: string; links: Array<{ label: string; route: 'services' | 'exercises'; hash?: string }> };
  insights: { eyebrow: string; title: string; copy: string };
  contact: { title: string; text: string; cta: string };
}

export interface CommercialContent {
  capabilities: CapabilityContent[];
  exercisePhases: ExercisePhase[];
  home: HomeCommercialContent;
  advisory: AdvisoryContent;
  exercises: ExercisesContent;
  executive: ExecutiveContent;
}
