# ClearStance — Batch 2 Content Plan

## Executive summary

The current site already has a coherent visual system, a credible operational point of view and complete Polish and English paths. Batch 2 therefore does not require a redesign or a new marketing funnel. It requires clearer division of responsibility between pages, less repetition on the Home page, more concrete practitioner language and a small number of navigation and article-discovery improvements.

The principal content issues are:

- Home currently repeats the same operational background in `Experience` and `How we work`, while `Approach`, `Readiness` and `How we work` partly describe the same process.
- Services mixes service scope, working method and readiness philosophy; its final contextual CTA is immediately followed by another CTA to the same destination.
- About is the right place for the full maritime, aviation and crisis-readiness background, but parts of that story are currently repeated almost verbatim on Home.
- Several high-visibility lines use compressed slogans or the recurring “not X, but Y” construction instead of explaining an operational consequence.
- Primary navigation behaves differently on Home and on inner pages for Services and About/Experience, which makes destinations less predictable.
- A reader landing directly on an article can discover related content, but receives very little contextual explanation of who publishes the material and where to find relevant services or contact.
- The Insights listing is well structured but omits reading time even though that information is available elsewhere.

The proposed implementation is a bounded evolution:

- keep the existing information architecture, layouts, components and visual language;
- make Home a concise synthesis and route detail to Services and About;
- reserve Services for scope, engagement logic and expected outputs;
- reserve About for experience and trust;
- keep Insights editorial and non-promotional;
- refine CTAs and navigation so that labels describe destinations;
- add only small, content-led micro-UX improvements;
- preserve all Batch 1 infrastructure, accessibility and content-contract work.

## Page roles

| Page | Current role | Target role | Main issue |
|---|---|---|---|
| Home | Brand introduction, philosophy, service summary, readiness model, experience, working method, insights and contact | A concise synthesis: what ClearStance does, for whom, which operational problems it addresses, why it is credible and what the visitor should do next | Several adjacent sections compete to explain the same idea; the experience story is too detailed for a synthesis page |
| Services | Detailed offer, service activities, engagement context and two adjacent contact prompts | Practical scope: what can be worked on, how an engagement is shaped and what useful result it should produce | Closing language is slogan-like and two CTAs lead to the same place |
| About | Founder/practice background, sector context and perspective | Primary trust page: maritime, aviation, operational-safety and crisis-readiness context, with a clear link between experience and advisory work | Some copy is repeated on Home; one key statement uses an abstract “not only on paper” contrast |
| Insights | Editorial listing with category, date, teaser and article links | Evidence of subject expertise and a calm route into deeper material | Scan information is slightly weaker than on Home because reading time is absent |
| Article | Long-form expertise, table of contents, sharing, related articles and return link | Standalone expert resource that also explains the publisher and offers quiet routes to more content, Services and Contact | A direct visitor has little context about ClearStance beyond global navigation and footer |
| Contact | Contact form, email alternative and response expectations | Simple conversion endpoint: form primary, email secondary | Role is already clear; only regression verification is required |
| 404 | Bilingual recovery page with routes back into the site | Clear recovery with language-aware Home and Insights choices | Already appropriate; only responsive and link verification is required |

## Communication map

| Page / section | Current purpose | Main message | Overlap with other sections | Recommended action | Action type |
|---|---|---|---|---|---|
| Home / Hero | Establish brand promise and introduce crisis-readiness work | Clear decisions under incomplete information | Light overlap with Approach and closing brand statement | Keep structure and core headline; retain one clear in-page CTA | NO CHANGE / COPY ONLY |
| Home / Featured insight | Surface one current expert article | ClearStance publishes practical analysis | Repeats the listing by design, not by message | Keep | NO CHANGE |
| Home / Approach | Explain readiness philosophy and three principles | Context, decision clarity and action matter more than documents alone | Overlaps with Readiness lifecycle and How we work | Rewrite as principles and decision criteria, not delivery steps | COPY ONLY |
| Home / Services summary | Show the practical scope of support | Four bounded ways to strengthen readiness | Intentionally summarises Services; perspective line also acts as a trust signal | Keep summary, make the trust line more explicit and factual, retain route to full Services | COPY ONLY |
| Home / Readiness | Show readiness over time | Readiness develops from assessment through improvement | Current first-person descriptions resemble a service process | Rewrite as an organisational lifecycle/state model | COPY ONLY |
| Home / Experience | Establish credibility and route to About | Operational and strategic experience informs the work | Repeats About closely and partly repeats How we work | Shorten to one synthesis paragraph, retain factual sector tracks and route to About | COPY ONLY |
| Home / How we work | Describe engagement behaviour | Work starts in the client’s operating context and ends in usable decisions or improvements | Current bullets repeat sector experience and general brand attributes | Focus copy and bullets on delivery method: context, collaboration, proportional scope and usable outcomes | COPY ONLY |
| Home / Brand statement | Close the narrative with a memorable readiness principle | Uncertainty is inevitable; chaos is optional | Repeats the abstract uncertainty language used elsewhere | Replace with a concrete description of what readiness lets a team do | COPY ONLY |
| Home / Insights | Route to editorial content | Analysis is grounded in operational practice | No material overlap | Tighten generic introductory wording; preserve editorial tone | COPY ONLY |
| Home / Contact band | Primary route to Contact | Discuss the organisation’s readiness | Reused appropriately across key pages | Keep | NO CHANGE |
| Services / Hero | Define the offer | Readiness support must fit the operating environment | Light overlap with Home service summary | Keep role; refine only if needed for plainness and PL/EN parity | COPY ONLY |
| Services / Four service areas | Explain practical work packages | Crisis systems, exercises, facilitation and reviews address different readiness needs | Summary cards on Home are an intentional preview | Keep detail and bullets; do not add claims or invented deliverables | NO CHANGE |
| Services / Engagement context | Explain how scope is chosen | The problem and operating model determine the engagement | Overlaps slightly with Home How we work | Replace slogan heading with a concrete scope heading; state how expected outcomes are agreed | COPY ONLY |
| Services / Context CTA | Route to Contact | Discuss scope | Immediately duplicated by the global Contact band | Remove the adjacent duplicate CTA and let the Contact band remain primary | STRUCTURE |
| About / Hero and story | Tell the full operational background | Maritime, aviation, safety and crisis-readiness experience shape the practice | Repeated in Home Experience | Keep the full account here; make lead less fragmentary | COPY ONLY |
| About / Operational perspective | Connect experience to advisory value | Operational constraints shape useful preparedness work | One sentence uses a familiar “under pressure, not only on paper” contrast | Replace contrast with a concrete description of team use during an event | COPY ONLY |
| About / Contact band | Route to Contact after trust-building content | Start a conversation | No material overlap | Keep | NO CHANGE |
| Insights / Header | Frame the editorial section | Observations, analysis and practical materials | No material overlap | Keep non-marketing tone | NO CHANGE |
| Insights / Article teasers | Support scanning and selection | Category, date, title and abstract help readers choose | Home cards already show reading time | Add reading time to the main listing; retain current hierarchy and full-card behaviour | MICRO-UX |
| Article / Header | Establish topic, context and authorship | What the article covers and why it matters | No material overlap | Keep metadata and hierarchy | NO CHANGE |
| Article / Body and TOC | Deliver expert analysis | Practical reasoning, models and implications | Some individual passages use recurring contrast formulas | Edit only clearly mechanical constructions; preserve substance and authorial meaning | COPY ONLY |
| Article / Share | Enable accessible sharing | Copy or share the canonical article URL | No material overlap | Verify URL encoding, labels, focus and status announcements in both languages | NO CHANGE / MICRO-UX |
| Article / Publisher context | Currently absent | Explain who ClearStance is and provide calm next routes | Global header/footer provide links but not context | Add one compact, non-promotional publisher block with links to Services, About and Contact | STRUCTURE |
| Article / Related and back links | Continue editorial exploration | Read related material or return to Insights | No material overlap | Keep | NO CHANGE |
| Contact / Intro | Set expectations | Use the form or email directly | No material overlap | Keep form primary and email secondary | NO CHANGE |
| Contact / Form | Collect a concise enquiry | Name, email, organisation, subject and message are sufficient | No material overlap | Keep Batch 1 submission, timeout and accessibility behaviour untouched | NO CHANGE |
| 404 | Recover from a missing route | Return Home or browse Insights in the current language | No material overlap | Keep | NO CHANGE |

## Section overlap matrix

| Section pair | Degree | Why it overlaps | Resolution |
|---|---:|---|---|
| Home Experience ↔ About story | High | The same maritime-to-strategic career history and sector context appear in both | Keep the full story on About; reduce Home to a short trust synthesis and factual sector tracks |
| Home Approach ↔ Home Readiness | Medium | Both describe how readiness is built and applied | Approach will state principles; Readiness will describe the organisational lifecycle |
| Home Approach ↔ Home How we work | Medium | Both refer to context, structures, exercises and improvement | Approach will explain evaluation principles; How we work will explain engagement behaviour |
| Home Readiness ↔ Services | Medium | Readiness steps resemble service activities | Readiness will describe client capability states; Services will retain concrete scopes of work |
| Home How we work ↔ Services closing | Medium | Both start with the operating context and tailored scope | Home will describe delivery behaviour; Services will describe scope agreement and expected result |
| Home Services ↔ Services page | Low / intentional | Home previews the same four service families | Preserve summary/detail relationship and clear route to Services |
| Home Insights ↔ Insights listing | Low / intentional | Home previews editorial content | Preserve preview/listing relationship |
| Services context CTA ↔ Services Contact band | High | Two adjacent buttons lead to Contact | Remove the first button; retain the stronger page-level Contact band |

## AI-like copy findings

| Location | Current text | Problem | Proposed direction |
|---|---|---|---|
| Services closing PL | “Najpierw kontekst. Potem rozwiązanie.” | Compressed campaign formula; generic sentence fragments | Use a descriptive heading about fitting scope to the actual challenge |
| Services closing EN | “Context first. Then the solution.” | Literal slogan pattern rather than practitioner explanation | Use natural English that names how scope is shaped |
| About perspective PL | “...użyteczne pod presją, a nie tylko poprawne na papierze.” | Familiar “not only X” contrast and abstract claim | Explain that solutions must fit operational conditions and be usable by the team during an event |
| About perspective EN | “...useful under pressure, not merely correct on paper.” | Formulaic contrast; “not merely” sounds editorialised | Describe concrete use in the operating environment |
| Home brand statement PL | “Niepewność jest częścią środowiska. Chaos nie musi nią być.” | Abstract antithesis and slogan cadence | State what good readiness gives a team when events move quickly |
| Home brand statement EN | “Uncertainty is part of the operating environment. Chaos need not be.” | High-level campaign line; repeated uncertainty framing | State the observable decisions and escalation clarity created by readiness |
| About lead PL/EN | “Doświadczenie operacyjne. Perspektywa strategiczna.” / “Operational experience. Strategic perspective.” | Paired fragments sound like a campaign strapline | Join into one factual sentence |
| Published exercise article title PL/EN | “Dobre ćwiczenie kryzysowe nie jest spektaklem” / “A good crisis exercise is not a performance” | Prominent “not X” construction foregrounds rhetoric over the practical question | Reframe around what makes an exercise useful |
| First-hour communication description PL/EN | Wording built around what the hardest task “is not” | Contrast construction is unnecessary in metadata | State the key first-hour task directly |
| Draft exercise-design passages PL/EN | Repeated “scenario is important, but...” and “not only...” phrasing | Several nearby contrast formulas create a synthetic rhythm | Start with learning objectives and observable behaviours directly |
| Home hero | “Clarity when it matters most.” | A brand line, but concise and distinctive | Keep as the central brand promise; avoid multiplying similar slogans elsewhere |
| About title | “From the bridge to the boardroom.” | A metaphorical brand line, but grounded in the stated career path | Keep on About; remove repetition from the Home section eyebrow |

Edits to articles will be selective. Natural analytical uses of negation will remain where they carry substantive meaning; this is not a global phrase replacement.

## CTA map

| Location | Current action | Destination | Assessment | Planned decision |
|---|---|---|---|---|
| Header / Services | “Oferta” / “Services” | Home section when on Home; Services page elsewhere | Same label has inconsistent destination | Always route to the Services page |
| Header / Experience | “Doświadczenie” / “Experience” | Home section or About depending on context | Label and destination are not fully aligned | Rename to “O ClearStance” / “About” and always route to About |
| Header / Approach | “Podejście” / “Approach” | Home Approach anchor | Clear | Keep |
| Header / How we work | “Jak pracujemy” / “How we work” | Home Practice anchor | Clear | Keep |
| Header / Insights | “Publikacje” / “Insights” | Insights listing | Clear | Keep |
| Header / Contact | “Kontakt” / “Contact” | Contact form anchor | Clear and primary | Keep |
| Home Hero | Explore the approach | Home Approach anchor | Clear next step for orientation | Keep |
| Home Services | Full offer | Services | Clear summary-to-detail transition | Keep |
| Home Experience | About ClearStance | About | Clear synthesis-to-trust transition | Keep and make more important after shortening copy |
| Home Insights | All Insights | Insights | Clear | Keep; refine wording only if needed |
| Contact band | Start a conversation | Contact form | Clear page-level conversion | Keep |
| Services context | Discuss the scope | Contact | Duplicates the immediately following Contact band | Remove |
| Insights teaser | Read article | Article | Clear | Keep |
| Article share | Copy, LinkedIn, X, email, native share | External/native sharing | Clear if labels and encoding remain correct | Verify; no promotional change |
| Article publisher block | Not present | Services, About, Contact | Direct visitor lacks quiet orientation | Add text links, not a large conversion banner |
| 404 | Home / Insights | Corresponding routes | Clear recovery | Keep |

## User journey issues

### Home → Services → Contact

- Current issue: the primary navigation’s Services destination changes depending on the current page.
- Change: make Services a stable page destination; retain the Home summary and its explicit full-offer CTA.
- Expected result: the visitor can scan the scope on Home, inspect detail on Services and use one clear Contact band.

### Search or external link → Article

- Current issue: article content, related reading and sharing are available, but the publisher’s role is not explained in the article flow.
- Change: add a compact publisher context after the article/share area with calm links to Services, About and Contact.
- Expected result: a direct visitor can understand ClearStance, continue reading or inspect the practice without an aggressive CTA.

### Home → About

- Current issue: Home provides too much of the same career narrative, so About expands the story less than it should.
- Change: shorten Home Experience and make About the canonical location for the full background.
- Expected result: Home establishes trust; About substantiates it.

### Language switch

- Current issue: no material content-path defect is currently evident.
- Change: preserve route-pair switching, test parity after copy and article-title edits, and verify all affected anchors and canonical routes.
- Expected result: visitors remain on the equivalent PL/EN page or article.

### Insights browsing

- Current issue: listing cards do not show reading time although article and Home cards do.
- Change: add localised reading time to the listing metadata.
- Expected result: improved scanning without adding filters, search, pagination or interface complexity.

## Proposed changes

### COPY ONLY

- Separate the roles of Home Approach, Readiness and How we work.
- Shorten Home Experience and route the full narrative to About.
- Make the existing Home service perspective a clearer, factual trust signal.
- Replace the Home uncertainty/chaos statement with concrete readiness behaviour.
- Replace the Services “Context first” slogan with a descriptive scope heading.
- Clarify the result-setting language in the Services closing section.
- Turn the About lead into a natural sentence.
- Replace the About “under pressure / on paper” contrast with an operational explanation.
- Refine generic Home Insights copy while preserving its editorial role.
- Selectively revise the most prominent or repeated “not X” constructions in article titles, descriptions and drafts.
- Maintain semantic PL/EN parity without forcing literal sentence structure.

### STRUCTURE

- Remove the duplicate Services context button directly before the Contact band.
- Add a compact publisher context to the article template.
- Keep all existing page and Home sections; no new marketing section or funnel is planned.

### MICRO-UX

- Make primary navigation destinations predictable: Services always opens Services; About always opens About.
- Rename the Experience navigation label to About while retaining the Home Experience section and its contextual CTA.
- Add localised reading time to Insights listing cards.
- Verify share-link encoding, accessible names, keyboard focus, copied/shared status announcements and target security.
- Verify responsive behaviour at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 pixels for all required PL/EN paths and the 404 page.

### NO CHANGE

- Hero structure and central “Clarity when it matters most.” brand line.
- Four service families and their substantive scope.
- Full factual experience narrative on About.
- Contact form fields, email alternative, consent and Batch 1 submission/timeout behaviour.
- Article table of contents, author/date/category metadata, related content and sharing options.
- Current design system, typography, visual hierarchy and responsive layout model.
- Search, filtering and pagination remain out of scope.
- Client logos, named clients, certificates, case studies and unsupported claims will not be added.
- Batch 1 infrastructure, route policy, CMS, JSON-LD serialization, CI, Worker and Turnstile implementation.
- Cloudflare, DNS, OVH, OAuth and external dashboard configuration.

## Planned content regression checks

The existing content validation will be extended only where a deterministic check is useful:

- prohibited high-visibility phrases removed in both languages;
- navigation and primary CTA labels remain non-empty;
- affected PL/EN translation structures retain parity;
- article translation pairs and public URLs remain valid;
- generated article share URLs contain correctly encoded canonical URLs.

No AI detector, stylistic scoring system or broad prose linter will be added.
