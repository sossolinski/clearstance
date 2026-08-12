import type { CommercialContent } from './types';

const capabilities: CommercialContent['capabilities'] = [
  {
    id: 'crisis-management',
    anchor: 'crisis-management',
    title: 'Crisis management',
    text: 'We design and strengthen the crisis management team operating model: mandate, roles, activation, escalation, operating rhythm, information flow and the tools that support decisions.',
    scope: ['CMT mandate, membership and operating model', 'roles, responsibilities and decision rights', 'activation, escalation and operating rhythm', 'shared situational picture and information flow', 'plans, checklists, role cards and decision tools'],
    outputs: ['an agreed operating model and roles', 'escalation and information-flow principles', 'tools that support the team', 'a prioritised action plan']
  },
  {
    id: 'crisis-communication',
    anchor: 'crisis-communication',
    title: 'Crisis communication readiness',
    text: 'We prepare organisations to communicate through the first hours and later phases of an incident. The scope covers roles, approval paths, stakeholder needs, holding statements and cooperation between the CMT and communication team.',
    scope: ['communication roles and responsibilities', 'CMT and communication-team cooperation', 'message drafting and approval', 'holding statements and practical tools', 'readiness for information pressure'],
    outputs: ['a cooperation model and approval paths', 'first-hour templates and tools', 'stakeholder and channel arrangements', 'improvement priorities']
  },
  {
    id: 'affected-people',
    anchor: 'affected-people',
    title: 'Affected people and family assistance',
    text: 'We design organisational arrangements for providing information and practical support to people affected by an incident, their families and the personnel involved in the response.',
    scope: ['structures, roles and activation principles', 'people information and confidentiality', 'contact with families and people awaiting information', 'reception locations, helplines and practical assistance', 'cooperation with authorities, responders and partners'],
    outputs: ['an organisational model and responsibilities', 'an assistance and information-flow concept', 'procedures, role cards and tools', 'exercise and readiness priorities']
  }
];

const exercisePhases: CommercialContent['exercisePhases'] = [
  { id: 'frame', title: 'Frame', text: 'We agree the context, objectives, participants, boundaries and the questions the exercise should answer.', output: 'An agreed Exercise Brief, objectives and scope.' },
  { id: 'design', title: 'Design', text: 'We build the scenario logic, decision moments, inputs, control arrangements and observation framework.', output: 'An exercise plan, participant information and agreed assumptions.' },
  { id: 'exercise', title: 'Exercise', text: 'We brief participants, facilitate the session, control its progress and capture observations against the agreed objectives.', output: 'The session, hot debrief and structured observation material.' },
  { id: 'improve', title: 'Improve', text: 'We bring observations together in an After Action Review and help define priority actions and how they will be retested.', output: 'An After Action Review and prioritised improvement register.' }
];

export const commercialEn: CommercialContent = {
  capabilities,
  exercisePhases,
  home: {
    meta: {
      title: 'ClearStance | Crisis readiness advisory and exercises',
      description: 'ClearStance helps organisations design and test the structures, decisions, communication and people support needed during serious incidents.'
    },
    hero: {
      eyebrow: 'Boutique crisis readiness advisory',
      title: 'Clarity when',
      titleAccent: 'it matters most.',
      copy: 'ClearStance helps organisations design and test how they manage serious incidents, from the crisis team operating model and communication to arrangements for affected people and their families.',
      primaryCta: 'See how we can help',
      secondaryCta: 'Explore exercises'
    },
    capabilities: { eyebrow: 'Capabilities', title: 'Three areas of crisis readiness.', intro: 'We work across three connected areas of readiness. Each involves structures, accountability, information and decisions that must work together during a serious incident.' },
    ways: {
      eyebrow: 'Ways of working', title: 'Advisory and exercises.', intro: 'We develop the same capabilities through advisory work and exercises. The right route depends on whether the organisation needs to assess and design an arrangement or test it in action.',
      advisory: { title: 'Advisory', text: 'We assess existing arrangements, design operating models and help set improvement priorities. The outcome may include agreed roles, processes, tools, an executive report or a wider readiness plan.', link: 'Explore Advisory' },
      exercises: { title: 'Exercises', text: 'We design and facilitate exercises that reveal decisions, coordination, escalation and information flow. Findings are structured through an After Action Review and improvement actions.', link: 'Explore Exercises' }
    },
    engagements: {
      eyebrow: 'A place to start', title: 'Where we can begin.', intro: 'Work can begin with a bounded review of existing readiness or with an exercise designed around specific objectives.',
      review: { type: 'Advisory · review', title: 'Crisis Readiness Review', text: 'A structured, clearly bounded review of existing arrangements. It combines document review, selected interviews and a workshop, concluding with a concise executive report and prioritised actions.', link: 'Explore the review' },
      tabletop: { type: 'Exercises · flagship', title: 'Executive Tabletop Exercise', text: 'A facilitated exercise for senior leadership and the CMT, designed around agreed objectives, decisions and interfaces. It includes preparation, the exercise session, observation, hot debrief and After Action Review.', link: 'See how the exercise works' }
    },
    readiness: {
      eyebrow: 'Readiness and approach', title: 'From understanding to improvement.', quote: ['Know where you are.', 'Understand what is changing.', 'Decide where to go.'],
      stages: [
        { title: 'Understand', text: 'Risks, dependencies and the current response model establish the starting point.' },
        { title: 'Prepare', text: 'Roles, authority, escalation thresholds and information flow are agreed and understood.' },
        { title: 'Exercise', text: 'A scenario tests assumptions, decisions and how the team works together.' },
        { title: 'Respond', text: 'The organisation applies its prepared model during a real incident.' },
        { title: 'Improve', text: 'Findings have owners, priorities and a point at which they will be tested again.' }
      ],
      note: 'Advisory work supports understanding, preparation and improvement. Exercises connect the testing of readiness with improvement activity. Response remains an organisational capability used during a real incident.',
      approachTitle: 'Work grounded in the real operating model.',
      approachLead: 'The starting point is how the organisation actually works: its accountabilities, dependencies, constraints and decisions. The scope stays proportionate to the problem and leads to arrangements that can be used in a plan, operating model or later exercise.',
      principles: [
        { title: 'Operational context', text: 'Assessment reflects the organisation’s actual roles, dependencies and constraints.' },
        { title: 'Roles and interfaces', text: 'The work clarifies accountability, information, decisions and escalation.' },
        { title: 'Work with accountable people', text: 'The process involves the roles that make decisions and carry out the work.' },
        { title: 'Usable outcomes', text: 'Findings lead to concrete changes, tools or improvement actions.' }
      ]
    },
    experience: {
      eyebrow: 'Experience', title: 'Operational experience and strategic perspective.',
      paragraphs: ['ClearStance is a founder-led practice combining experience from maritime and aviation operations with work in operational safety, strategy and crisis management.'],
      closing: 'The full journey from operational accountability to advisory work is set out on the About ClearStance page.',
      tracks: [{ title: 'Maritime', text: 'watchkeeping officer · operations · safety' }, { title: 'Aviation', text: 'analytics · projects · strategy · crisis management' }],
      link: 'About ClearStance'
    },
    insights: { eyebrow: 'Insights', title: 'ClearStance Insights', copy: 'Writing on organisational readiness, team performance, exercises and decisions made with incomplete information.', all: 'View all insights' },
    contact: { eyebrow: 'Contact', title: 'Let’s discuss what the organisation needs.', text: 'We can start with a planned exercise, a readiness review or a specific area that needs to be clarified.', cta: 'Discuss your organisation’s needs' }
  },
  advisory: {
    meta: { title: 'Crisis management advisory | ClearStance', description: 'Advisory for organisations developing their crisis management operating model, communication and affected-people arrangements.' },
    hero: { eyebrow: 'Advisory', title: 'Advisory for organisations preparing for serious incidents.', lead: 'ClearStance assesses and designs structures, roles, escalation principles, information flow and tools that support an organisation during a crisis.' },
    intro: {
      title: 'When advisory work is useful', text: 'The scope can cover the full crisis management model or a specific interface such as communication or affected-people support. The starting point is how the organisation actually works and the decisions that need to be made.',
      triggers: [
        { title: 'The model developed in stages', text: 'Roles, documents and tools were created at different times. They now need to be brought into one coherent way of working.' },
        { title: 'The organisation has changed', text: 'A new structure, leadership team or set of responsibilities requires the crisis model to be realigned.' },
        { title: 'Group requirements need local translation', text: 'A local company needs an arrangement that meets group expectations and can be applied in practice.' },
        { title: 'An important exercise is planned', text: 'Roles, decisions or key response assumptions need to be clarified before the scenario is designed.' }
      ]
    },
    capabilities: { eyebrow: 'Advisory capabilities', title: 'Three connected areas of readiness.', intro: 'Advisory work can address one area or the interfaces between them. The scope and intended outcomes are agreed before work begins.' },
    review: {
      eyebrow: 'Crisis Readiness Review', title: 'A structured view of crisis readiness.', descriptor: 'Clearly scoped advisory review · executive report · prioritised actions',
      lead: 'A Crisis Readiness Review gives leadership a structured view of current arrangements and improvement priorities. It covers an agreed organisational scope, selected documents, interviews with key roles and a shared examination of how the model works.',
      triggerTitle: 'When to begin with a review',
      triggers: ['the practical usefulness of existing documents needs to be tested', 'roles, authority and escalation principles need to be realigned', 'a local organisation is implementing group requirements', 'an exercise, incident or organisational change left a dispersed set of actions', 'a credible baseline is needed before an important exercise'],
      audienceTitle: 'Sponsor and participants', audience: 'The review is usually sponsored by an executive, operations director or the person accountable for risk, resilience, BCM or crisis management. Selected role holders contribute their knowledge of the operating model.',
      scopeTitle: 'Assessment areas', scope: ['governance, mandate and activation', 'roles, responsibilities and decision rights', 'escalation, the shared situational picture and information flow', 'CMT rhythm, decisions and action tracking', 'interfaces with communication and people-support functions', 'plans, tools, exercises and improvement management'],
      includesTitle: 'The engagement includes', includes: ['agreeing the management question and review boundaries', 'reviewing selected documents and tools', 'interviews with people in key roles', 'a workshop to test the operating model and interfaces', 'analysis and an executive-level summary'],
      receivesTitle: 'The organisation receives', receives: ['an agreed assessment framework', 'a concise view of current readiness', 'findings connected to their operational significance', 'an executive report', 'a prioritised action plan'],
      outcomeTitle: 'Outcome', outcome: 'Leadership knows which elements are useful, where the material gaps lie and which changes should be made before the next exercise or further work on the CMT model.',
      nextTitle: 'A possible next step', next: 'The review may lead to focused work on the CMT operating model, communication or affected-people arrangements, followed by an Executive Tabletop Exercise.',
      cta: 'Discuss a readiness review'
    },
    cmt: {
      eyebrow: 'Focused advisory scope', title: 'CMT operating model', text: 'A focused engagement to agree how the crisis management team works and which tools should support decisions during a serious incident.',
      points: ['mandate, membership and roles', 'decision rights and deputies', 'activation and escalation', 'meeting rhythm and shared situational picture', 'decisions, actions and record keeping', 'interfaces with communication and operational functions']
    },
    process: {
      eyebrow: 'How we work', title: 'From the question to useful arrangements.', intro: 'The work responds to a specific problem and draws on documents, tools and the experience of people in key roles.',
      items: [
        { title: 'Frame the question and scope', text: 'We identify the decision, problem or model that needs to be assessed or designed.' },
        { title: 'Gather the material', text: 'We review agreed documents, tools and the perspectives of people in key roles.' },
        { title: 'Work through the model', text: 'Together we test accountabilities, information, decisions, constraints and interfaces.' },
        { title: 'Agree the outcomes', text: 'We structure findings, intended changes and next steps for leadership and the people responsible for delivery.' }
      ]
    },
    outputs: {
      title: 'What remains after the engagement', intro: 'The set of outcomes depends on the agreed scope. It may include:',
      items: ['executive findings and priorities', 'an operating model and role descriptions', 'activation, escalation and information-flow principles', 'role cards, checklists and decision tools', 'an improvement action plan']
    },
    insights: { eyebrow: 'Related insights', title: 'Writing on organisational readiness.', copy: 'Selected insights explore issues that often emerge in reviews and work on the CMT operating model.' },
    contact: { title: 'Let’s discuss what the organisation needs.', text: 'A short description of the current model, issue or planned change is enough to frame an initial conversation.', cta: 'Discuss your organisation’s needs' }
  },
  exercises: {
    meta: { title: 'Crisis exercises for organisations | ClearStance', description: 'Design and facilitation of crisis exercises for senior leadership, CMTs, communication and affected-people functions.' },
    hero: { eyebrow: 'Crisis exercises', title: 'Exercises designed around decisions, coordination and information.', lead: 'ClearStance designs and facilitates exercises for senior leadership, CMTs and the functions responsible for communication and affected-people support.' },
    intro: { title: 'The objectives shape the scenario and observation.', text: 'Before design begins, we define the roles, decisions, interfaces and behaviours that need to be observed. The scenario creates the conditions for work; findings are then structured against the agreed objectives.' },
    focus: {
      eyebrow: 'Observation areas', title: 'What an exercise can reveal.', intro: 'The observation scope is selected before design and remains proportionate to the time, participants and objectives.',
      items: ['activation and the point of escalation', 'clarity of roles and decision rights', 'shared situational picture', 'decisions and prioritisation', 'team operating rhythm', 'information flow', 'coordination across functions', 'communication and affected-people support']
    },
    formats: {
      eyebrow: 'Exercise formats', title: 'A scope matched to the objective.', intro: 'The Executive Tabletop is the principal format for senior leadership and CMTs. Specialist simulations can focus on communication or people support, while an exercise programme connects several stages of readiness development.',
      items: [
        { id: 'executive-tabletop', title: 'Executive Tabletop Exercise', text: 'A strategic, facilitated session for senior leadership, the CMT or both. It focuses on the situational picture, escalation, decisions, coordination and organisational priorities.', link: '/en/exercises/executive-tabletop/', linkLabel: 'Explore the Executive Tabletop' },
        { id: 'communication-simulation', title: 'Crisis communication simulation', text: 'An exercise of approval paths, stakeholder needs, initial messages and cooperation between the CMT and communication team.' },
        { id: 'affected-people-exercise', title: 'Affected People Exercise', text: 'A test of activation, people information, family contact, assistance arrangements and cooperation with partners and authorities.' },
        { id: 'exercise-programme', title: 'Exercise programme', text: 'A sequence of connected exercises or a wider scope that brings several teams and functions together across successive stages of readiness development.' }
      ]
    },
    methodology: { eyebrow: 'Method', title: 'From framing to improvement action.', intro: 'Four phases structure the project, clarify responsibilities and maintain the connection between objectives, observation and later action.' },
    inclusion: {
      title: 'Engagement scope and outcomes', engagementTitle: 'The engagement includes', engagement: ['agreeing the scope and objectives', 'exercise and scenario design', 'participant information', 'facilitation and exercise control', 'observation', 'hot debrief', 'an executive summary'],
      clientTitle: 'The organisation receives', client: ['an agreed Exercise Brief and objectives', 'an After Action Review', 'a prioritised improvement action register', 'other documents agreed within the project scope']
    },
    insights: { eyebrow: 'Related insights', title: 'Writing on exercise design and observation.', copy: 'Selected insights explore objectives, decisions, scenarios and how teams work during an exercise.' },
    contact: { title: 'Let’s discuss the planned exercise.', text: 'The context, participant group and the main area the organisation wants to test are enough to begin.', cta: 'Discuss a planned exercise' }
  },
  executive: {
    meta: { title: 'Executive Tabletop Exercise | ClearStance', description: 'A facilitated tabletop exercise for senior leadership and CMTs, including design, observation, After Action Review and improvement actions.' },
    hero: { eyebrow: 'Crisis exercises', title: 'Executive Tabletop Exercise', lead: 'A facilitated exercise for senior leadership and the crisis management team. Participants work through an evolving situation, structure information, set priorities and make decisions within the organisation’s real roles.' },
    snapshot: {
      title: 'Exercise at a glance',
      items: [{ term: 'Format', description: 'Facilitated tabletop exercise' }, { term: 'Participants', description: 'Senior leadership, CMT or both' }, { term: 'Focus', description: 'Decisions, coordination and information' }, { term: 'Outcomes', description: 'AAR and priority actions' }, { term: 'Readiness cycle', description: 'Exercise → Improve' }]
    },
    useful: {
      eyebrow: 'Use cases', title: 'When this format is useful.', intro: 'An Executive Tabletop tests the strategic layer of response without requiring a full operational exercise.',
      items: [{ title: 'Annual readiness test', text: 'The organisation or group requires a periodic test of the CMT and senior leadership.' }, { title: 'A changed operating model', text: 'A new structure, plan, team or set of responsibilities needs to be exercised together.' }, { title: 'A new or infrequently exercised CMT', text: 'The team needs a safe setting in which to work through roles, information and decisions.' }, { title: 'Validation of priorities', text: 'A readiness review or earlier incident identified areas that now need to be tested in action.' }]
    },
    participation: {
      title: 'Objectives determine participation and scope.', text: 'Participants are selected against the decisions and interfaces covered by the objectives. The format can involve senior leadership, an established CMT or both levels working together.',
      coreTitle: 'Core roles', core: ['exercise sponsor', 'CMT leader', 'people holding the relevant decision authority', 'CMT coordinator or secretary'],
      optionalTitle: 'According to the objectives', optional: ['operations', 'communication', 'HR and people response', 'legal', 'business continuity', 'security', 'customer or guest support']
    },
    observationAreas: { eyebrow: 'Observation areas', title: 'What the exercise can reveal.', intro: 'The scope is agreed before scenario design begins and is limited to elements that can be observed credibly.', items: ['the timing and quality of escalation', 'activation and role clarity', 'the shared situational picture', 'decision authority and process', 'priorities for protecting people and operations', 'information flow and operating rhythm', 'coordination across functions', 'communication approval and affected-people support'] },
    design: {
      eyebrow: 'Exercise design', title: 'A scenario built around the objectives.',
      paragraphs: ['The scenario reflects the operational context, dependencies, important roles, stakeholder needs and credible consequences of the incident.', 'The critical points are moments when the team must assess a change, set a priority, use its authority or coordinate a decision. Successive inputs create the conditions in which those elements can be observed.'],
      sequence: ['Objective', 'Decision moment', 'Input', 'Observation']
    },
    methodology: { eyebrow: 'Project flow', title: 'From framing to improvement action.', intro: 'Four phases maintain the connection between the exercise objectives, design, observation and the outcomes provided to the organisation.' },
    session: { title: 'How the session works.', text: 'Information is released in a controlled sequence. The facilitator maintains the conditions and pace; participants determine the course of action. Decisions, questions and material changes are recorded for later analysis.', items: ['participant briefing', 'introduction of the initial situation', 'successive information and decision moments', 'facilitated team work', 'recording decisions and actions', 'hot debrief'] },
    observation: {
      eyebrow: 'Observation method', title: 'Observation grounded in agreed objectives.', text: 'Observers record events and what they mean for team performance. This example shows how observations connect to the exercise objectives.',
      labels: ['What happened', 'When', 'Based on what information', 'Roles involved', 'Effect on decisions or coordination'],
      example: ['The issue was escalated after the impact on people was confirmed.', 'Following the second situation update.', 'An operations report and an unconfirmed signal from a partner.', 'CMT leader, operations, communication.', 'The team agreed the priority but did not assign ownership of the next update.']
    },
    outputs: {
      eyebrow: 'Scope and outcomes', title: 'What the engagement includes and what the organisation receives.', intro: 'The delivery of the session, design work and final documents serve different purposes. The scope is agreed before the project begins.',
      engagementTitle: 'The engagement includes', engagement: ['agreeing the scope and objectives', 'exercise design', 'participant information', 'facilitation', 'observation', 'hot debrief', 'an executive summary'],
      clientTitle: 'The organisation receives', client: ['an agreed Exercise Brief and objectives', 'an After Action Review', 'a prioritised improvement action register', 'other documents agreed within the project scope']
    },
    aar: { title: 'After Action Review', text: 'The hot debrief captures participants’ initial perspectives. Observation material is then analysed against the objectives and developed into an After Action Review.', items: ['observations linked to objectives', 'elements that supported effective performance', 'gaps and points that hindered the team', 'contributing factors supported by the material', 'the significance of each finding', 'recommendations and priorities', 'a proposed responsible function', 'an improvement action'] },
    preparation: {
      title: 'Scope and preparation.', clientTitle: 'The organisation provides', client: ['an exercise sponsor and coordinator', 'agreed objectives', 'selected plans and tools', 'confirmed participants and authority', 'agreed confidentiality and constraints']
    },
    related: { eyebrow: 'Related scopes', title: 'Work before and after the exercise.', links: [{ label: 'Crisis Readiness Review', route: 'services', hash: 'readiness-review' }, { label: 'Advisory', route: 'services' }, { label: 'Other exercise formats', route: 'exercises' }] },
    insights: { eyebrow: 'Related insights', title: 'Writing on exercise value and design.', copy: 'Selected insights explore objectives, scenarios, decisions and observation.' },
    contact: { title: 'Let’s discuss the planned exercise.', text: 'The context, participant group and primary objective are enough to begin. The detailed scope can be agreed during an initial conversation.', cta: 'Discuss a planned exercise' }
  }
};
