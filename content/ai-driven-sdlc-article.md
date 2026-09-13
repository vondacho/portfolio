---
title: "AI-Driven SDLC: Software Intent as the Input to Delivery"
date: 2026-09-12
type: article
series: Connected SDLC
topic: AI-Driven SDLC
tags: [ai, sdlc, as-code, gitops, contract-driven]
summary: "AI-driven development starts before code generation: machine-readable intent from discovery to production evidence lets AI assist at every transition while people keep authority over meaning."
---

# AI-Driven SDLC: Software Intent as the Input to Delivery

## Abstract

AI-driven software development is often presented as faster code generation. That framing begins too late. Before a developer or coding agent can implement the right system, the organisation must discover what the system means, decide which outcomes matter, make rules concrete, assign responsibilities, and express the constraints that implementation must respect.

An AI-driven software development lifecycle connects those decisions through machine-readable specifications. Event Storming, Story Mapping, Example Mapping, Domain-Driven Design, system design, and technical contracts become related as-code models. Visual boards remain the collaborative interfaces through which people explore and decide. Normalised files behind those boards give developers, engineering tools, and AI a shared representation of accepted intent.

Git provides the source of truth. Pull requests expose proposed changes and their impact. Validation enforces digital contracts before merge. GitOps-style automation publishes projections and detects drift across tickets, tests, architecture, code, and the running system. AI can assist at every transition, while people retain authority over meaning and consequential decisions.

This is the foundation of a connected and contract-driven SDLC.

## The strong message pair

> **Strategic message**  
> Software Intent as Code provides the integration layer that lets AI boost the entire SDLC.

> **Technical message**  
> As-Code makes every stage of the lifecycle machine-readable, allowing AI to participate continuously from discovery through production evidence.

The strategic message explains the role of Software Intent as Code. It provides the common integration layer across discovery, product work, behavioural specification, domain design, system design, delivery, and operations.

The technical message explains the mechanism. Normalised, versioned models give AI structured input at every transition. AI can generate and analyse changes against the same accepted intent that guides people, tools, validation, and production evidence.

## AI needs doctrine as well as notation

Machine-readable input is necessary, but it is not sufficient. A model can be syntactically valid and still violate the practice that gives it meaning.

**Notation tells AI what model it may express. Doctrine tells AI what a useful model must mean. The DSL tells AI the exact file it may write.**

The three documents form explicit, versionable instructions for the LLM:

- **Doctrine** defines the intent of the practice, its quality signals, the uncertainty that must be preserved, and the decisions AI must not make.
- **Notation** explains the available modelling elements, relationships, and how they represent the visual practice.
- **DSL** defines the exact grammar and file format that generated output must satisfy.

Together they let an LLM generate a practice-aware proposal, a parser reject malformed output, and a visual tool keep code and board synchronized.

> **Notation protects syntax. Doctrine protects the practice.**

The distinction is concrete across the lifecycle:

| Practice | As-Code source | LLM instruction set |
| --- | --- | --- |
| Event Storming | `.eventstorm` | [Doctrine](https://doc-es.obya.ch/doctrine) · [Notation](https://doc-es.obya.ch/notation) · [DSL](https://doc-es.obya.ch/dsl) |
| Story Mapping | `.storymap` | [Doctrine](https://doc-sm.obya.ch/doctrine) · [Notation](https://doc-sm.obya.ch/notation) · [DSL](https://doc-sm.obya.ch/dsl) |
| Example Mapping | `.examplemap` | [Doctrine](https://doc-em.obya.ch/doctrine) · [Notation](https://doc-em.obya.ch/notation) · [DSL](https://doc-em.obya.ch/dsl) |
| Context Mapping and Domain Modelling | `.ddd`, `.ddm` | [Doctrine](https://ba-cm.obya.ch/doctrine) · [Notation](https://ba-cm.obya.ch/notation) · [DSL](https://ba-cm.obya.ch/dsl) |

The doctrine constrains Event Storming to preserve temporal and causal reasoning, Story Mapping to preserve the journey and coherent slices, Example Mapping to preserve concrete examples and open questions, and DDD to preserve honest boundaries, relationship power, language seams, and invariant-led aggregates.

The generation path therefore needs more than a prompt:

```text
Current model + requested change + notation + doctrine
                         ↓
                    AI proposal
                         ↓
          Parser, schema, and semantic validation
                         ↓
                 Human review and merge
```

AI should normally produce a proposal or diff with provenance, not silently replace accepted truth. Parsers and schemas verify that the proposal is well formed. Semantic rules test enforceable constraints. Reviewers decide whether the model is true, useful, and ready to become the next accepted source revision.

## Code generation starts too late

A coding agent usually receives a repository, a ticket, and perhaps a few documents. It can infer patterns from source code and produce a plausible change. The repository, however, mostly explains what the system has become. A flat ticket compresses product and domain knowledge into a small delivery unit. Wiki pages may describe an earlier understanding that no longer matches the implementation.

Important questions remain implicit:

- Which user outcome justifies the change?
- Which domain event makes the step meaningful?
- Which business rules constrain the result?
- Which bounded context owns the language and decision?
- Which interfaces require compatibility?
- Which examples prove that the implementation is correct?

An AI agent can guess. A dependable delivery system should provide answers.

The quality of AI-generated code depends heavily on the quality of the material that reaches the agent. The organisation therefore gains more leverage by improving the specification path than by optimising the final prompt alone.

## A continuous specification backbone

The core idea is to represent software intent as connected, structured models from discovery onward.

```text
User journey
    ↓
Event Storming
    ↓
Story Mapping and delivery slices
    ↓
Example Mapping
    ↓
Domain boundaries and models
    ↓
System design and technical contracts
    ↓
Implementation, tests, and operational evidence
```

Each discipline keeps its own visual grammar and purpose. Event Storming should still feel like Event Storming. A Story Map should preserve narrative order and release slices. Example Mapping should support a focused conversation around stories, rules, examples, and questions. C4 and PlantUML should answer architecture questions at useful levels of detail.

The connection comes from stable identifiers, explicit relationships, provenance, and versioned transformations. A pivotal event can keep its identity when it anchors a Story Map activity. A story can retain that reference when it becomes a ticket. An example can point to the rule and story it clarifies. A system component can link to the bounded context it realises and the contract it exposes.

This produces a continuous specification rather than a chain of summaries.

## AI begins with the user journey

A prompt expressing a user journey can seed the lifecycle. AI can interpret the narrative and propose an Event Storming Big Picture containing actors, domain events, external systems, hotspots, and questions.

The result is a structured hypothesis. Domain experts and other participants correct its language, challenge its assumptions, and decide where deeper exploration is necessary. AI reduces the effort required to create the first model, but the workshop still produces the shared understanding.

[Event Storming as Code](https://doc-es.obya.ch) supports the progression across three scopes:

### Big Picture

The Big Picture explores the broader domain landscape. It reveals important events, conflicts in language, dependencies, hotspots, and pivotal changes in the journey. AI can organise an initial hypothesis, identify possible omissions, and group related areas for discussion.

### Process Modelling

Process Modelling develops one business outcome in detail. Commands, events, policies, actors, read models, external systems, exceptions, and alternate paths become explicit. AI can propose missing branches or questions, while participants determine which behaviour reflects the domain.

### System Design

System Design adds software responsibility. The model clarifies how the system handles commands, applies policies, produces events, and protects important rules. This gives developers and architects material that can connect to domain models, components, interfaces, and tests.

As-Code preserves continuity across the three scopes. The team can refine one model without repeatedly transcribing its language and decisions.

## Story Mapping becomes the delivery spine

Pivotal events provide a natural bridge from Event Storming into Story Mapping. They identify meaningful transitions around which the product team can organise activities, tasks, stories, and release slices.

[Story Mapping as Code](https://doc-sm.obya.ch) gives the user journey a structured form. The Story Map becomes the source for product and release meaning. Ticketing consumes that meaning without replacing it.

A generated ticket can inherit:

- Its stable story identifier
- The user and outcome
- Its position in the journey
- Its release slice and slice objective
- Related pivotal events
- Rules, examples, and open questions
- Bounded-context and system references
- The source revision that produced it

The ticketing system continues to own assignment, workflow state, sprint data, comments, and delivery timestamps. This ownership boundary lets automation synchronise product context without overwriting operational work.

AI can now plan against a coherent release journey rather than a collection of independently worded tickets. A coding agent can inspect the adjacent steps and the outcome that its change must preserve.

## Example Mapping defines what correct means

A story title cannot express every rule or boundary. [Example Mapping as Code](https://doc-em.obya.ch) turns the refinement conversation into a behavioural digital contract.

The model records:

| Element | Purpose | AI contribution |
| --- | --- | --- |
| Story | Identifies the behaviour under discussion | Recovers connected journey and domain context |
| Rule | States a constraint or acceptance condition | Finds contradictions and missing boundaries |
| Example | Makes a rule concrete | Proposes representative and difficult cases |
| Question | Preserves uncertainty | Identifies blockers and suggests research |
| Evidence link | Connects accepted intent to test results | Reports coverage and drift by source revision |

AI can expand the example space, generate scenario skeletons, propose fixtures, and assist with mocks or assertions. Product, domain, QA, and development participants decide which examples express intended behaviour.

Executable tests remain evidence. They should not silently become the source of business meaning. When a test and an accepted example disagree, the difference requires an explicit decision.

## DDD supplies the semantic contract

Domain-Driven Design determines where language applies and where responsibility belongs. Context Mapping and Domain Modelling as Code can express bounded contexts, context relationships, ubiquitous language, aggregates, entities, value objects, events, policies, and invariants.

[Context Mapping as Code](https://ba-cm.obya.ch) makes strategic boundaries available to delivery and architecture tooling. A story can identify the contexts it changes. An example can use language from the correct context. An architecture rule can protect an approved dependency direction. A technical contract can implement a published language without exposing the internal model accidentally.

AI benefits from these boundaries. It can select the correct terminology, avoid placing behaviour in the wrong module, respect dependency policies, and identify the owners affected by a proposed change. Human experts still decide whether a boundary or model represents the business effectively.

## System design connects intent to implementation

C4 provides levels of abstraction for systems, containers, components, and code. LikeC4 represents shared architecture elements and relationships as a model from which teams generate views. PlantUML provides focused sequence, state, class, component, and deployment diagrams.

System Design as Code connects product and domain intent to repositories, runtime elements, and interfaces. OpenAPI, AsyncAPI, GraphQL, and WSDL definitions describe technical integration surfaces. Their references should remain connected to the stories, examples, domain language, and architecture relationships that explain why those interfaces exist.

AI can use this material to answer practical implementation questions:

- Which component may change?
- Which dependencies are allowed?
- Which contract needs compatibility analysis?
- Which dynamic scenario will change?
- Which tests and operational signals should provide evidence?

Architecture becomes active engineering material rather than a static diagram in a wiki.

## Git as the source of truth

The connected models need one authoritative history. Git holds the accepted software intent and the policies that govern it. Visual editors render the files and write changes back to them. Pull requests provide a common review surface for people, automation, and AI.

One repository can organise the specification as follows:

```text
docs/
├── domain/
│   ├── *.ddd
│   └── *.ddm
├── system/
│   ├── c4/
│   │   └── *.likec4
│   ├── api/
│   │   ├── openapi/
│   │   │   └── *.yaml
│   │   ├── asyncapi/
│   │   │   └── *.yaml
│   │   ├── graphql/
│   │   │   └── **/*
│   │   └── wsdl/
│   │       └── *
│   └── uml/
│       └── **/*.puml
├── journeys/
│   └── *.eventstorm
└── stories/
    ├── *.storymap
    └── *.examplemap
```

The exact repository boundary can vary. A large organisation may distribute the files across product or domain repositories. Stable identifiers and declared dependencies preserve the connected model. The important governance rule remains constant: generated boards, tickets, diagrams, pages, and test assets identify their source revision and do not become competing authorities.

## GitOps extends the model into an operating loop

GitOps principles provide a useful operating model for the specification lifecycle. Accepted intent is declarative and versioned. Automation pulls the approved revision. Reconciliation compares downstream consumers and evidence with that declared state.

The loop can:

- Validate schemas, semantics, references, ownership, and compatibility
- Generate boards, tickets, scenarios, diagrams, catalogs, and documentation
- Publish every projection with its source and transformation revision
- Select affected tests and policies after a change
- Detect drift in tickets, contracts, architecture, code, or runtime behaviour
- Propose changes and route consequential differences to the right owners

Some outputs can be reconciled automatically. A generated diagram or contextual ticket field can update from the accepted source. A changed business rule, release objective, bounded context, or architecture responsibility needs human review. GitOps should automate alignment without automating authority.

## The role of AI across the lifecycle

AI supports different work at each level:

| Lifecycle area | AI can assist with | Required human decision |
| --- | --- | --- |
| User journey | Structure an initial journey hypothesis | Confirm the outcome and real user need |
| Event Storming | Propose events, actors, branches, and hotspots | Accept domain language and behaviour |
| Story Mapping | Suggest activities, slices, and ticket context | Set product priority and release intent |
| Example Mapping | Generate cases, questions, and scenarios | Accept the behavioural contract |
| DDD | Detect language conflicts and suggest model boundaries | Own semantic boundaries and invariants |
| System design | Propose views, dependencies, and impact | Approve responsibilities and constraints |
| Implementation | Generate code and tests within declared limits | Review engineering quality and trade-offs |
| Operations | Compare evidence with expected behaviour | Decide whether intent or implementation changes |

The model gives AI more than context volume. It gives the agent typed relationships, ownership, accepted examples, and explicit limits. Provenance distinguishes AI proposals from accepted human decisions.

## Digital contracts make the lifecycle enforceable

As-Code enables enforcement, but files alone do not enforce anything. Schemas, semantic validators, review rules, compatibility policies, and CI perform the enforcement.

The strength of the checks should match the maturity of the decision. A Big Picture Event Storming model should tolerate uncertainty and hotspots. A committed release slice needs stronger readiness checks. A published API or event contract may require compatibility guarantees. A forbidden dependency across core contexts may justify blocking a merge.

This maturity-aware approach protects discovery from premature rigidity while giving delivery the precision it needs.

## The developer receives the right material

The immediate engineering benefit is a better handoff. The developer receives a ticket connected to its user outcome, domain events, rules, examples, context boundaries, architecture elements, and formal contracts. IDEs, generators, validators, test tools, and delivery automation can consume the same material.

As-Code gives developers and their tooling the right material to do the right thing. AI then works from the specification the team has already validated. Better inputs do not make the agent infallible, but they make its output easier to constrain, test, explain, and review.

## The wiki changes role

Wiki-based documentation remains useful for learning, rationale, workshop guidance, onboarding, and narrative. It stops acting as the first-class source for current behaviour, release structure, domain boundaries, or architecture relationships.

Automation can publish readable projections into the wiki and link each view to its source revision. Teams update the model once and reuse it across developer portals, documentation sites, ticketing, test reports, and architecture catalogs.

## Change management is the organisational challenge

This model changes daily work for product, domain, development, quality, architecture, and platform participants. Adoption will fail if As-Code becomes an additional documentation task owned by a specialist.

A practical introduction begins with one connected thread:

```text
Pivotal event
    ↓
Story Map slice
    ↓
Generated ticket
    ↓
Accepted examples
    ↓
Bounded context and component
    ↓
Implementation and test evidence
```

The first automation should remove work that a team already performs manually. Generate ticket context, publish an architecture view, produce scenario skeletons, or detect broken references. Add stronger enforcement only after ownership and semantics become clear.

Useful measures include the time needed to move from discovery to delivery, the percentage of tickets connected to journeys and examples, contract changes caught before implementation, architecture drift detected before release, and repeated documentation work removed.

## Conclusion

An AI-driven SDLC uses AI throughout the lifecycle, but it does not place AI in charge of the lifecycle. People discover meaning, make product decisions, accept behaviour, and assign responsibility. AI proposes, transforms, analyses, generates, and compares.

The bridge between them is Software Intent as Code. Visual tools make structured knowledge usable by people. Git records accepted intent. Digital contracts and CI make it enforceable. GitOps-style reconciliation keeps its consumers aligned. Developers, engineering tools, and AI work from the same continuous specification.

That is the larger opportunity: Software Intent as Code provides the integration layer that lets AI boost the entire SDLC. Every stage becomes machine-readable, so AI can participate continuously from discovery through production evidence.

## References and tooling

- [Event Storming as Code](https://doc-es.obya.ch)
- [Story Mapping as Code](https://doc-sm.obya.ch)
- [Example Mapping as Code](https://doc-em.obya.ch)
- [Context Mapping as Code](https://ba-cm.obya.ch)
- [OpenGitOps principles](https://opengitops.dev/)
- [C4 model](https://c4model.com/)
- [LikeC4](https://likec4.dev/)
- [PlantUML](https://plantuml.com/)
