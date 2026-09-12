---
title: "Experience Design as Code: Connecting UX to an AI-Driven SDLC"
date: 2026-09-12
type: article
series: Connected SDLC
topic: Experience Design
tags: [ux, as-code, ai, sdlc, accessibility]
summary: "A normalised experience model preserves user needs, interaction states, accessibility rules and design-system references, with the service blueprint as the bridge to backstage delivery."
---

# Experience Design as Code: Connecting UX to an AI-Driven SDLC

## Abstract

UX work often enters software delivery through research summaries, journey maps, prototypes, design files, and annotated tickets. These artifacts help people understand the intended experience, but their meaning becomes difficult for engineering tools and AI to follow. Important interaction states, accessibility expectations, content decisions, and user evidence can disappear as a design becomes implementation work.

Experience Design as Code gives UX a first-class place in a connected and contract-driven SDLC. Visual design tools remain the collaborative environment for research, journeys, flows, service blueprints, and prototypes. A normalised experience model records the parts that delivery must preserve: user needs, evidence, touchpoints, interaction states, content intent, accessibility rules, design-system references, and stable links to stories, domain behaviour, architecture, and implementation.

The service blueprint becomes a pivotal bridge. It connects the user’s frontstage experience to the business processes, domain events, policies, systems, and teams operating backstage. Git holds the accepted experience contract. GitOps-style automation publishes projections and detects drift. AI can assist continuously, while UX designers retain authority over user evidence and intended experience.

## UX belongs inside the digital SDLC

UX designers already shape decisions across the lifecycle. They research user needs, model journeys, design interactions, define information and content, test prototypes, and evaluate the delivered experience. The problem appears when the organisation treats these outputs as an upstream package that development receives after product decisions have already become tickets.

A static handoff creates several losses:

- Research evidence becomes detached from the story it informed.
- Journey context disappears when work becomes individual tickets.
- A prototype shows the happy path but may not specify every system state.
- Accessibility expectations remain implicit or generic.
- Developers cannot tell which design-system component or revision applies.
- Tests cover business behaviour without checking the intended experience.
- Production evidence rarely reconnects to the original user hypothesis.

Experience Design as Code preserves these relationships. It makes the intended experience available as structured input to product, domain, engineering, quality, AI, and operations.

## The experience digital contract

The contract should describe what delivery depends on without trying to encode every creative design decision.

| Contract element | Meaning | Connected use |
| --- | --- | --- |
| User or segment | Person whose outcome and context matter | Story Map, system context, research evidence |
| Need or outcome | Change the person seeks | Product outcome and release objective |
| Journey step | Position in the end-to-end experience | Story Map backbone and ticket context |
| Touchpoint | Channel or interface through which interaction occurs | Service blueprint and system context |
| User flow | Ordered path through a task | Stories, dynamic design, and tests |
| Interaction state | Loading, empty, error, success, interrupted, or unavailable behaviour | Example Mapping and acceptance evidence |
| Content intent | Meaning, tone, terminology, and localisation requirements | UI content and domain language |
| Accessibility rule | Experience requirement for inclusive use | Components, checks, and tests |
| Design-system reference | Approved component, pattern, and token version | UI implementation and visual validation |
| Prototype reference | Approved visual design node and revision | Ticket context and implementation review |
| Evidence reference | Research observation, test, or experience metric | Decision provenance and feedback |

The visual design remains essential. The digital contract records the semantics that must survive the transition into implementation.

## The user journey is the shared entry point

UX research provides evidence about users, their goals, context, constraints, and friction. Product uses that evidence to select outcomes. Event Storming explores the domain behaviour involved in producing those outcomes. Story Mapping organises delivery around the journey.

The user journey connects those perspectives:

```text
Research evidence
    ↓
User need and desired outcome
    ↓
Journey steps and touchpoints
    ↓
Domain events and business processes
    ↓
Story Map activities and release slices
    ↓
Interaction rules, examples, and system design
```

UX owns the integrity of the experience model and its connection to evidence. Product owns outcome and release decisions. Domain experts own business meaning. The shared identifiers allow the disciplines to collaborate without collapsing their responsibilities.

## The service blueprint bridges experience and domain behaviour

A journey map focuses on what the user experiences. A service blueprint adds the organisation and system behaviour that make the experience possible.

| Blueprint layer | Connected as-code discipline |
| --- | --- |
| User goal and journey | Experience model and Story Mapping |
| Frontstage actions and touchpoints | User flows, content, prototypes, and UI components |
| Visible system feedback | Example Mapping and acceptance evidence |
| Backstage business behaviour | Event Storming Process Modelling |
| Domain decisions and rules | Event Storming System Design and DDD |
| Supporting systems and integrations | C4, LikeC4, PlantUML, and technical contracts |
| Operational evidence | Observability, experience metrics, and GitOps reconciliation |

This bridge helps teams distinguish a user-visible event from a domain event. “Confirmation displayed” describes the experience. “Booking revised” describes a meaningful domain fact. The two connect, but they serve different models and may occur at different times.

AI can propose a first service blueprint from a user journey and an Event Storming model. UX, domain, and engineering participants then correct its assumptions and assign responsibility.

## Connection to Event Storming

Big Picture Event Storming gives UX designers a wider view of the domain landscape, major events, external systems, and organisational hotspots. UX research can add user pain points and moments of uncertainty to that picture.

Process Modelling connects a specific user journey to the commands, events, policies, actors, exceptions, and backstage dependencies involved in producing an outcome. The service blueprint can project the same process through an experience lens.

System Design lets UX and engineering clarify the feedback that a user should receive while the system handles decisions, latency, failure, and recovery. The experience model should reference the domain events that change what the user can see or do.

## Connection to Story Mapping and ticketing

UX and product should collaborate on the Story Map backbone. UX protects the coherence of the journey. Product defines release objectives and makes scope decisions. Pivotal events connect the journey to the domain behaviour discovered through Event Storming.

A contextualised ticket can inherit:

- The journey step and user outcome
- Research or usability evidence
- User-flow and service-blueprint references
- Approved prototype node and revision
- Design-system component and token versions
- Expected interaction states
- Accessibility and content requirements
- Related domain events, rules, examples, and system components

The ticket remains a workflow object. The connected models remain the source for experience, product, domain, and architectural meaning.

## Connection to Example Mapping

Example Mapping creates the conversation in which intended experience becomes testable. UX contributes examples that traditional business-rule discussions often miss:

- Loading and progressive feedback
- Empty and first-use states
- Validation and error presentation
- Partial success and interrupted journeys
- Recovery after a system or network failure
- Permission and availability differences
- Keyboard, screen-reader, contrast, focus, and motion behaviour
- Content changes across language, device, or channel

UX, QA, development, product, and domain participants decide which cases belong to the accepted contract. AI can propose variants and identify missing states. Automated scenarios and visual checks provide evidence against the approved revision.

## Connection to DDD and system design

UX language should align with the bounded context in which the interaction occurs. A familiar word may have different meanings across contexts. Content and component labels should use the published language intended for the user rather than expose internal technical terms.

The architecture model identifies the systems and components responsible for the experience. Technical contracts explain which data and operations support it. Dynamic and sequence diagrams can connect user actions to system interactions. Performance, availability, security, and privacy decisions can then link to the journey steps they affect.

The experience contract does not replace OpenAPI, AsyncAPI, GraphQL, WSDL, or architecture models. It explains the user-facing outcome those technical artifacts must support.

## A practical as-code representation

A small YAML contract can connect a journey step to the other lifecycle artifacts:

```yaml
id: ux.booking-change.select-alternative
journey: booking-change
user_outcome: Find an acceptable alternative

evidence:
  - ref: research.booking-change.07
    insight: Users need price and availability before selecting

prototype:
  tool: figma
  node: "381:2204"
  revision: approved-2026-09

states:
  - loading
  - available
  - unavailable
  - price-changed
  - error
  - success

accessibility:
  keyboard: required
  screen_reader_feedback: required

references:
  eventstorm: booking-change-requested
  storymap: change-booking
  examplemap: alternative-selection
  component: booking-option-selector
```

Figma or another design tool remains the visual authoring surface. The contract in Git records the approved references and delivery obligations. A new visual revision becomes authoritative for delivery only when the corresponding contract change passes review.

## Git repository organisation

Experience artifacts can extend the connected repository structure:

```text
docs/
├── ux/
│   ├── research/
│   │   └── *.insight
│   ├── journeys/
│   │   └── *.uxjourney
│   ├── flows/
│   │   └── *.userflow
│   ├── blueprints/
│   │   └── *.serviceblueprint
│   ├── prototypes/
│   │   └── *.prototype.yaml
│   ├── content/
│   │   └── *.content.yaml
│   └── accessibility/
│       └── *.a11y.yaml
├── domain/
│   ├── *.ddd
│   └── *.ddm
├── system/
│   ├── c4/*.likec4
│   ├── api/{openapi,asyncapi,graphql,wsdl}/
│   └── uml/**/*.puml
├── journeys/*.eventstorm
└── stories/{*.storymap,*.examplemap}
```

The extensions make artifact types visible to tools and AI. Stable identifiers and references matter more than the exact folder names.

## The AI booster for experience design

As-Code makes UX work machine-readable, allowing AI to participate without reducing the work to generated screens.

AI can assist with:

- Structuring research notes into candidate findings with source references
- Producing journey and service-blueprint hypotheses
- Comparing user flows with Story Maps and Process Models
- Suggesting missing interaction states and edge cases
- Generating content variants within approved terminology and tone
- Checking accessibility rules and design-system consistency
- Creating prototype or implementation scaffolds from accepted contracts
- Relating production evidence to the journey and hypothesis it can challenge

Research provenance and privacy require explicit controls. AI-generated findings must remain proposals until a UX researcher validates them against real evidence. Synthetic personas or plausible-sounding insights must never silently acquire the status of user research.

## GitOps-style experience reconciliation

Git provides the source of truth for the accepted experience contract. GitOps-style automation keeps its consumers aligned.

The loop can:

- Validate journey, prototype, component, content, and accessibility references
- Publish service blueprints and experience documentation
- Update governed ticket fields from accepted experience models
- Compare design tokens and component versions with implementation
- Select interaction, accessibility, and visual tests affected by a change
- Detect states specified in the contract but absent from code or tests
- Connect experience telemetry and usability evidence to the applicable journey revision

Automation can regenerate safe projections. It should create a review proposal when a difference affects the intended experience. Runtime behaviour and analytics can challenge the design hypothesis, but they should not rewrite it automatically.

## Responsibilities in the connected lifecycle

| Actor | Responsibility | Benefit |
| --- | --- | --- |
| UX researcher | Own user evidence and research provenance | Findings remain connected to decisions |
| UX or product designer | Own journeys, flows, states, content intent, and prototype references | Implementation preserves the intended experience |
| Product manager | Own outcomes, release decisions, and scope | Experience work connects to delivery value |
| Domain expert | Validate business meaning and domain behaviour | Experience avoids incorrect domain assumptions |
| Developer | Implement against experience and system contracts | Fewer ambiguous design handoffs |
| QA specialist | Turn interaction states into executable evidence | Quality covers experience as well as function |
| Architect | Connect touchpoints to responsible systems and contracts | Experience constraints inform system design |
| Platform team | Provide validation, publication, and reconciliation | UX participates in the normal engineering workflow |
| AI agent | Propose transformations with visible provenance | Assistance remains governed and reviewable |

## Change management

UX integration should begin with one journey where design intent regularly disappears during delivery. Choose one pivotal event and one release slice. Create the service blueprint, connect the relevant prototype and interaction states, and attach those references to the Story Map and Example Map.

Automate one valuable handoff. Generate ticket context, publish a service-blueprint view, check component versions, or create interaction-state scenarios. Let designers work through visual tools while the platform manages the as-code representation behind them.

Avoid requiring every research note or exploratory sketch to become a formal contract. Exploration remains permissive. A design becomes more constrained when the team approves it for a committed release. The enforcement level should follow the maturity of the decision.

Useful measures include design questions raised after development begins, journey steps linked to evidence, committed stories with specified interaction states, accessibility gaps found before implementation, differences between approved components and code, and time spent translating design intent into tickets.

## Conclusion

Experience Design as Code gives UX a durable role in the AI-driven SDLC. Research evidence and intended experience connect to domain behaviour, product work, examples, architecture, implementation, and operational evidence.

The service blueprint provides the bridge between frontstage experience and backstage behaviour. Git records the accepted experience contract. GitOps-style automation publishes it and detects drift. AI accelerates synthesis, modelling, specification, and validation while UX professionals retain authority over evidence and experience decisions.

Software Intent as Code provides the integration layer that lets AI boost the entire SDLC. Experience Design as Code ensures that the lifecycle remains grounded in the people who use the software.

