---
title: "The Significant Prompt: An AI-Driven Journey from Problem to Delivery"
date: 2026-09-13
type: article
series: Connected SDLC
topic: Significant Prompt
tags: [ai, sdlc, as-code, gitops, prompting]
summary: "A problem narrative, reusable instructions and doctrine, notation and DSL let AI turn a real problem into a connected, reviewable delivery baseline, from journey mapping to walking skeleton and MVP."
---

# The Significant Prompt: An AI-Driven Journey from Problem to Delivery

## Abstract

AI-driven software development often begins with a ticket and ends with generated code. That starting point gives AI too little of the reasoning that makes an implementation correct. The user outcome, domain behaviour, business rules, ownership boundaries, architecture constraints, and intended evidence may exist only in conversations or disconnected documents.

A stronger journey begins with a significant prompt grounded in a narrative or a consistent problem specification. The prompt asks AI to study the problem before designing a solution. It also defines the artefacts to generate, the instructions that govern each modelling practice, the relationships that must connect the artefacts, and the human decisions required before the result becomes accepted intent.

The output is a reviewable documentation baseline spanning journey discovery, Event Storming, Story Mapping, Example Mapping, Context Mapping, Domain Modelling, architecture, technical contracts, and proposed delivery packs. Git records the accepted baseline. GitOps automation then distributes and reconciles its projections across ticketing, testing, architecture, delivery, and production evidence.

Software Intent as Code provides the integration layer that lets AI boost the entire SDLC.

## Start with a meaningful account of the problem

The initial input determines how much useful work AI can perform. A one-line feature request encourages the model to fill gaps with plausible assumptions. A meaningful problem narrative gives it evidence to analyse.

The narrative should explain:

- Who experiences the problem
- What those people are trying to achieve
- How the current journey works
- Where delay, risk, cost, or frustration occurs
- Which business outcomes matter
- Which systems, policies, and constraints already exist
- Which facts have evidence and which points remain uncertain

A formal specification can serve the same purpose when one already exists. The important property is coherence. The source material should give AI enough context to distinguish observed facts, stakeholder claims, hypotheses, decisions, and open questions.

UX research contributes essential evidence at this stage. Interviews, service blueprints, journey maps, usability findings, accessibility constraints, and observed workarounds describe the experience that the software must support. Domain experts explain why the organisation behaves as it does. Engineers contribute current-system constraints. Product leaders state the outcomes they want to improve.

AI studies this material before generating models. Its first output should be an analysis containing the actors, goals, constraints, vocabulary, conflicts, assumptions, and questions that need human attention.

## The significant prompt is a lifecycle contract

A significant prompt does more than request a solution design. It defines the work AI must perform across the lifecycle.

It specifies:

- The source narrative or problem specification
- The artefacts expected from each discipline
- The doctrine, notation, and DSL that govern generation
- The identifiers and relationships required for traceability
- The validation and review gates
- The delivery packs to propose
- The Git structure and change description to produce

This makes the prompt an orchestration contract. Each generated model becomes an input to the next activity while retaining its connection to the original problem.

A useful core instruction is:

> From the supplied narrative or problem specification, study the problem and propose a solution design expressed as a coherent, connected, and reviewable set of as-code artefacts. Generate journey, Event Storming, Story Mapping, Example Mapping, Context Mapping, Domain Modelling, architecture, and delivery-pack artefacts. Follow the applicable doctrine, notation, and DSL. Preserve assumptions and open questions. Maintain stable identifiers and traceability. Submit the result as a validated proposal for human review.

The prompt can then add organisation-specific constraints, existing architecture, policies, target outcomes, repositories, and required evidence.

## Relax the prompt with reusable instructions

The complete orchestration policy does not need to appear in every prompt. Stable guidance belongs in versioned Markdown files that live beside the software-intent artefacts.

```text
docs/
└── ai/
    ├── 00-ai-driven-sdlc-orchestration.md
    ├── 10-artifact-contract.md
    └── 20-review-and-delivery-policy.md
```

The orchestration file explains how AI studies the source problem and sequences the modelling work. The artefact contract defines the expected models, repository locations, stable identifiers, and traceability. The review and delivery policy defines human authority, validation, walking-skeleton and MVP content, Git review, and GitOps projections.

The problem-specific prompt can then remain short:

> Study the supplied problem narrative or specification. Follow the AI-driven SDLC instructions in `docs/ai/`. Produce a connected solution-design proposal, including the appropriate as-code artefacts, a walking-skeleton pack, an MVP pack, a validation report, and a pull-request description. Preserve assumptions and open questions.

This separation improves reuse and governance. Teams review changes to their AI instructions through Git. A generated proposal records the instruction revisions it used. The prompt focuses on the problem instead of repeating a large operating manual.

## Doctrine, notation, and DSL instruct the LLM

Machine-readable input does not guarantee useful output. AI can create a syntactically valid model that weakens the practice behind it. Each modelling discipline therefore supplies a three-part instruction set.

### Doctrine

Doctrine explains the purpose and quality criteria of the practice. It tells AI what to preserve, what to question, and what it must not decide without evidence.

Event Storming doctrine protects chronology, causality, hotspots, and disagreement. Story Mapping doctrine protects the journey, release coherence, and unscheduled work. Example Mapping doctrine protects concrete examples and unanswered questions. DDD doctrine protects honest boundaries, relationship power, language seams, and invariants.

### Notation

Notation explains the modelling vocabulary and the meaning of the visual elements. It teaches AI how cards, lanes, activities, stories, rules, examples, contexts, and aggregates represent the practice.

### DSL

The DSL defines the exact grammar and file format. It allows a parser to reject malformed output and enables the visual tool to keep the source synchronized with the board.

The instruction sets are available here:

| Practice | Doctrine | Notation | DSL |
| --- | --- | --- | --- |
| Event Storming | [Doctrine](https://doc-es.obya.ch/doctrine) | [Notation](https://doc-es.obya.ch/notation) | [DSL](https://doc-es.obya.ch/dsl) |
| Story Mapping | [Doctrine](https://doc-sm.obya.ch/doctrine) | [Notation](https://doc-sm.obya.ch/notation) | [DSL](https://doc-sm.obya.ch/dsl) |
| Example Mapping | [Doctrine](https://doc-em.obya.ch/doctrine) | [Notation](https://doc-em.obya.ch/notation) | [DSL](https://doc-em.obya.ch/dsl) |
| Context Mapping and Domain Modelling | [Doctrine](https://ba-cm.obya.ch/doctrine) | [Notation](https://ba-cm.obya.ch/notation) | [DSL](https://ba-cm.obya.ch/dsl) |

Notation protects syntax. Doctrine protects the practice. The DSL makes the generated proposal testable by tooling.

## Stage 1: problem analysis and journey mapping

AI first produces a structured reading of the problem. It identifies the primary actors, their goals, the current journey, important touchpoints, pain points, policies, and systems. It links every conclusion to the supplied source and marks inferences as hypotheses.

Journey Mapping keeps the user experience visible. It describes what the person tries to accomplish, what happens at each stage, where evidence comes from, and which moments deserve further investigation. The journey must not become a decorative summary. It supplies the outside-in view that guides product and domain exploration.

When no dedicated as-code notation governs the journey map, the source narrative, research evidence, and stable journey identifiers remain authoritative inputs. Those identifiers can still connect to the downstream models.

## Stage 2: Event Storming reveals domain behaviour

AI uses the journey and problem analysis to propose an Event Storming model. The model begins as a hypothesis for experts to challenge.

Big Picture Event Storming describes the wider domain landscape, temporal flow, pivotal events, hotspots, actors, and external systems. Process Modelling develops the important outcomes through commands, events, policies, alternate paths, and exceptions. System Design introduces software responsibility where the team needs more precision.

The [Event Storming as Code tool](https://doc-es.obya.ch) renders the `.eventstorm` source as a visual board. Workshop participants can correct the visual model while Git, validators, and AI consume the same structured source.

AI may organise evidence and propose missing questions. The doctrine prevents it from resolving hotspots or inventing facts to make the model appear complete.

## Stage 3: Story Mapping shapes delivery

Pivotal events connect domain discovery to the Story Map backbone. AI proposes activities, user steps, stories, alternatives, and release slices while preserving the user journey.

The Story Map becomes the source for product and release meaning. It identifies coherent slices across the journey and retains work that has not yet been scheduled. Ticketing consumes selected stories and their context. The ticketing system continues to own assignments, workflow state, comments, and delivery timestamps.

The [Story Mapping as Code tool](https://doc-sm.obya.ch) keeps `.storymap` source synchronized with the visual map. Stable story identifiers allow generated tickets to retain their journey position, release objective, pivotal events, examples, context references, and source revision.

AI can propose slices and detect gaps. People decide which outcome matters and what the organisation will deliver.

## Stage 4: Example Mapping defines correct behaviour

Selected stories move into Example Mapping. AI proposes rules, representative cases, boundary conditions, and questions based on the accepted source material.

The [Example Mapping as Code tool](https://doc-em.obya.ch) records the conversation in `.examplemap` files. Product, domain, QA, UX, and development participants review the model together. Accepted examples can later generate executable scenarios, fixtures, mocks, and test data.

The doctrine keeps open questions visible. AI cannot answer them without evidence, invent accepted examples, or turn a discovery conversation into premature automation. The `.examplemap` file remains the behavioural source. Test artefacts remain traceable projections and evidence.

## Stage 5: Context Mapping establishes semantic ownership

AI analyses the language, decisions, events, and responsibilities revealed by the earlier models. It proposes subdomains, bounded contexts, ownership, relationships, language seams, and areas that need tactical modelling.

The [Context Mapping and Domain Modelling as Code tool](https://ba-cm.obya.ch) keeps `.ddd` context maps and `.ddm` domain models synchronized with their visual views.

The strategic model makes power and integration relationships explicit. Tactical models describe aggregates, entities, value objects, events, policies, and invariants inside a context. AI can identify inconsistencies and candidate boundaries. Domain experts and engineers decide whether those boundaries support the business.

## Stage 6: architecture connects intent to implementation

Architecture Mapping translates accepted product and domain intent into system responsibility.

LikeC4 can represent systems, containers, components, and relationships as a shared model. PlantUML can describe important sequences, states, classes, components, and deployment scenarios. OpenAPI, AsyncAPI, GraphQL, and WSDL artefacts can describe technical integration contracts where the design requires them.

Each architecture element should reference the bounded context it supports and the stories or scenarios that justify it. A technical interface should retain a connection to the behaviour and domain language that explain why it exists.

AI proposes the architecture and highlights decisions. Architects and developers review feasibility, coupling, security, operability, and compatibility.

## Stage 7: delivery packs turn the models into increments

The connected specification enables AI to propose delivery packs with much more context than a flat backlog provides.

### Walking skeleton

The walking skeleton is the smallest end-to-end implementation that proves the delivery path. It should exercise critical components, interfaces, deployment, contract validation, testing, observability, and production feedback.

Its goal is technical learning. It can use limited business behaviour as long as the slice proves that the architecture and delivery system work together.

### MVP

The MVP is the smallest coherent Story Map slice that delivers a meaningful user outcome and tests an important product or business hypothesis.

Its scope should reference accepted examples, affected contexts, required components, interfaces, test evidence, and operational measures. A collection of high-priority tickets does not automatically form an MVP. The pack needs a coherent journey and a measurable outcome.

Each delivery pack should record its objective, included stories, excluded scope, examples, architecture impact, dependencies, risks, open questions, tests, observability expectations, and completion evidence.

## Traceability keeps the documentation consistent

Consistency does not mean forcing every model to tell the same simplified story. Each discipline answers a different question. Consistency means that their relationships are explicit and contradictions receive attention.

A traceability manifest can connect the lifecycle:

```yaml
objective: OBJ-01
journey: JRN-ONBOARDING
pivotal_event: EVT-APPLICATION-SUBMITTED
story: STORY-SUBMIT-APPLICATION
example_map: EXMAP-SUBMISSION
bounded_context: CTX-APPLICATION
component: CMP-SUBMISSION-API
delivery_pack: MVP-01
evidence: EVIDENCE-SUBMISSION-SLO
```

Stable identifiers allow AI and validation tools to find missing relationships, conflicting terminology, examples without stories, components without context ownership, and delivery items without evidence.

## Git and GitOps complete the operating loop

AI writes its proposal to a branch. The pull request contains the generated artefacts, validation report, open-question ledger, impact analysis, and a description of the instruction versions used.

Reviewers evaluate the parts that require human authority. Automated checks validate grammar, references, semantic rules, and compatibility. Merge records the accepted state in Git.

GitOps automation can then generate or reconcile downstream projections:

- Contextualised tickets from selected Story Map items
- Executable scenarios from accepted examples
- Architecture views and documentation portals
- Interface mocks and compatibility tests
- Deployment configuration and policy checks
- Links to runtime signals and production evidence

Production evidence can reveal drift or invalidate an assumption. The resulting change flows back through the same review process.

## Human review remains part of the model

The journey needs explicit human gates. Domain experts own domain truth. Product and UX participants own user outcomes and research interpretation. QA and development participants agree on behavioural examples. Architects and engineers own consequential design decisions. Delivery and operations participants define acceptable runtime evidence.

AI accelerates analysis, transformation, generation, and impact assessment. It should produce proposals with provenance rather than silently replace accepted meaning.

## Conclusion

The significant prompt gives AI enough structure to participate in the whole lifecycle. The problem narrative supplies evidence. Doctrine and notation shape the reasoning. DSLs make the output valid and automatable. Connected artefacts preserve intent across discovery, product work, behaviour, domain design, architecture, delivery, and operations.

As-Code makes every stage of the lifecycle machine-readable, allowing AI to participate continuously from discovery through production evidence.

The result is more than generated documentation. It is a governed path from a problem worth solving to a delivery baseline that people, engineering tools, and AI can share.

## References

- [Prompt and guidance instructions](https://github.com/vondacho/ai-driven-sdlc)
- [AI-driven SDLC](https://vondacho.github.io/portfolio/article.html?id=ai-driven-sdlc-article)
