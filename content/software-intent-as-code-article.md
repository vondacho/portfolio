---
title: "Software Intent as Code: A Specification Backbone for the AI-Assisted SDLC"
date: 2026-09-12
type: article
series: Connected SDLC
topic: Software Intent as Code
tags: [as-code, doc-as-code, ai, sdlc, event-storming, story-mapping, example-mapping, ddd]
summary: "Beyond Documentation as Code: normalised, versioned models behind visual boards create a continuous specification connecting product intent, domain knowledge, architecture and evidence."
---

# Software Intent as Code: A Specification Backbone for the AI-Assisted SDLC

## Abstract

Documentation as Code improved the way teams maintain technical knowledge. It made documentation versionable, reviewable, and close to the software it describes. The next step is broader: make software intent machine-readable from discovery onward.

Event Storming, Story Mapping, Example Mapping, Context Mapping, domain models, and architecture diagrams capture different aspects of the same system. Event Storming itself can operate at three levels: Big Picture, Process Modelling, and System Design. In many organizations, however, these artifacts live in separate tools and lose meaning as teams translate workshop outcomes into tickets, specifications, tests, and code. A visual board becomes a photograph. A photograph becomes a summary. A summary becomes a backlog. Every transition creates room for omission and reinterpretation.

An as-code approach changes the role of the visual artifact. The board remains the interface through which people explore and decide, while a normalized representation records the structure behind it. Git becomes the source of truth for the reviewed models and their history. Artificial intelligence can then generate, transform, question, and validate that structure. GitOps extends the model into an operating loop that publishes projections and detects drift across the lifecycle. Together, these practices create the foundation for a continuous specification that connects product intent, domain knowledge, architecture, implementation, and evidence from the running system.

## The gap between discovery and delivery

Software teams already use strong collaborative practices. Event Storming reveals the Big Picture, models business processes, and supports detailed System Design. Story Mapping organizes work around the user journey and prepares delivery slices that can become tickets. Example Mapping turns rules and uncertainty into concrete examples. Context Mapping exposes boundaries and relationships. Domain models and architecture diagrams describe the system that teams intend to build.

The problem lies less in the practices than in the transitions between them.

A typical flow looks like this:

```text
Workshop → board photo → documentation → backlog → code → tests
```

People repeatedly translate the same intent. The translations rarely preserve every relationship, decision, and unresolved question. The implementation eventually becomes precise, but the original reasoning becomes difficult to find. When the system changes, the earlier artifacts often remain unchanged because updating them requires manual work with little immediate payoff.

Artificial intelligence does not automatically solve this problem. When an AI assistant receives screenshots, disconnected prose, tickets, and repository fragments, it must reconstruct meaning from incomplete evidence. It can produce plausible output without understanding the business rule, bounded context, or user outcome that should constrain the change.

## The board as a projection of structured knowledge

The central design decision is simple: treat each board as a human projection of a structured artifact.

People still need spatial, visual, and collaborative interfaces. Sticky notes, lanes, timelines, and relationships support the way a group thinks during discovery. Yet the underlying model can record the meaning of each element, its identity, its relationships, and its origin.

This is the pattern implemented by a growing set of concrete tools:

- [Event Storming as Code](https://doc-es.obya.ch) supports Big Picture, Process Modelling, and System Design while maintaining a coded representation behind the board.
- [Story Mapping as Code](https://doc-sm.obya.ch) expresses the user journey and its release slices as structured data that can supply ticketing.
- [Example Mapping as Code](https://doc-em.obya.ch) captures rules, examples, questions, and stories in a form that machines can process.
- [Context Mapping as Code](https://ba-cm.obya.ch) represents bounded contexts and their relationships in the same as-code spirit.

The visible board and the underlying representation serve different needs. The board helps people think together. The normalized model enables version control, automation, transformation, validation, and AI-assisted reasoning.

```text
Human collaboration ↔ visual board ↔ normalized model ↔ AI and automation
```

The bidirectional relationship matters. People must be able to refine an AI-generated hypothesis on the board, while the system preserves those refinements in the canonical representation. The tool should support a conversation between human judgment and machine assistance, not a one-time generation step.

## Event Storming across three levels

Event Storming provides a path from broad discovery to detailed design.

**Big Picture** explores the domain across a wide horizon. It reveals major events, business areas, conflicts in language, hotspots, and pivotal moments. This view helps a group develop shared situational awareness before deciding where to focus.

**Process Modelling** narrows the scope to an end-to-end business process. The team can examine the commands, events, policies, actors, rules, exceptions, and external dependencies involved in producing an outcome.

**System Design** adds the precision needed to shape software. The model can express how the system handles commands, produces events, applies policies, and protects domain invariants. This creates useful material for domain modelling, contracts, components, and implementation.

Representing all three levels as code gives teams continuity. A hotspot in the Big Picture can become the scope of a process model. A process can then lead to System Design without losing the events, language, or decisions already established.

## AI-driven software specification

Consider a prompt that describes a user journey. AI can interpret the prompt and propose a Big Picture Event Storming model. The group can select a pivotal part of that picture, develop its Process Model, and add System Design detail where software must take responsibility. The result is not a final specification. It is a structured hypothesis that a group can challenge and progressively refine.

Pivotal events then provide a natural bridge to Story Mapping. They reveal moments in the journey around which outcomes, activities, and delivery slices can be organized. Story Mapping becomes the delivery spine: it preserves the user journey while defining releases and supplying well-contextualized work to the ticketing system. The same domain language can continue into Example Mapping, where teams make rules concrete and explore edge cases.

This sequence creates progressive precision:

```text
User intent
  → Big Picture domain hypothesis
  → process and system design
  → journey, release slices, and tickets
  → rules and examples
  → system boundaries and models
  → architecture and contracts
  → implementation and tests
```

AI can assist at every transition. It can propose a first model, identify missing scenarios, detect inconsistent terminology, suggest examples for a rule, or show which architecture elements a change may affect. Humans remain responsible for meaning, priorities, and decisions.

This is a more useful framing than code generation alone. As-Code provides developers and their tooling with the right material to do the right thing. When AI receives the same structured intent, business rules, architectural constraints, and behavioral examples, it has the material to do it right too.

## Story Mapping as the source for ticketing

Ticketing systems are useful for coordinating work, but a flat list of tickets is a weak representation of a product. Story Mapping preserves the narrative that tickets usually lose: who moves through the journey, which outcome they seek, where activities occur, and how a release slice delivers coherent value.

Story Mapping as Code can act as the source for ticket generation. A ticket can inherit its activity, journey position, release slice, related domain events, and links to the rules and examples that clarify its behavior. The ticket remains useful for workflow and assignment while the Story Map remains the source of product context.

This direction also improves change management. Moving a story between slices, changing a journey, or revising a pivotal event can expose which tickets need review. Teams avoid treating the backlog as an isolated database of work.

## One semantic backbone, several views

Event Storming as Code, Story Mapping as Code, and Example Mapping as Code should not become new silos. Their larger value appears when they act as connected views over a shared semantic backbone. Story Mapping occupies a central position because it converts the discovered domain and user journey into delivery slices and ticketable work.

A domain event can retain its identity when it becomes pivotal to a user journey. A Story Map slice can reference the events and outcomes it covers, then generate tickets that preserve those references. An example can reference the rule and story it clarifies. A bounded context can own the relevant domain concepts. A system component can implement that context. Contracts and tests can carry the same references forward.

The result resembles a knowledge graph, even when teams store the artifacts as readable text files:

```text
User journey ─ Story map ─ Domain events
                     │             │
                  Examples     Bounded contexts
                     │             │
                     └──── System design
                               │
                       APIs, events, components
                               │
                      Implementation and tests
```

LikeC4 and PlantUML fit naturally into this model for system design. They turn architecture into versioned, reviewable artifacts and offer additional projections for different audiences. Domain models can provide another layer between business concepts and implementation structures.

The goal is not to force every practice into one notation. Each view should keep the language and visual grammar that makes it useful. The shared backbone supplies stable identities, relationships, provenance, and transformation rules.

## Git as the source of truth

The normalized models need a clear home. Git provides the authoritative record for accepted software intent: the Event Storming model, Story Map, examples, context map, domain model, architecture model, contracts, and policies that connect them.

A practical repository model establishes a few rules:

- A pull request proposes a change to intent and shows its downstream impact.
- Domain, product, architecture, development, and quality owners review the parts for which they hold authority.
- Validation checks syntax, semantics, references, compatibility, and ownership before merge.
- The merge commit identifies the accepted revision that generators, tickets, tests, and AI consume.
- Generated boards, diagrams, pages, and ticket fields point back to that revision and do not become competing sources.

Git does not replace the visual tools. The board remains the working interface, and the tooling commits the normalized representation behind it. The source-of-truth rule concerns meaning and history, not the interface people must use.

### Example Git repository organization

One repository can make the specification domains and their file types visible:

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

The `domain` directory holds DDD and domain-modelling sources. The `system` directory holds architecture, interface, and UML artifacts. Its `api` branch separates OpenAPI, AsyncAPI, GraphQL, and WSDL definitions so contract tooling can target each format explicitly. Event Storming models describe journeys and behavior under `journeys`, while Story Maps and Example Maps connect that discovery to delivery under `stories`. Stable identifiers inside these files preserve links across directories even when teams split the repository later.

## GitOps as the operating extension

OpenGitOps defines a GitOps-managed system through declarative desired state, versioned and immutable storage, automatic pull, and continuous reconciliation. Applied to the specification lifecycle, the merged as-code model declares accepted intent. Automation then pulls that revision and keeps its consumers aligned.

The loop can:

- Validate connected contracts and reject broken references.
- Generate visual boards, architecture views, catalogs, tickets, scenarios, and human-readable documentation.
- Publish artifacts with the source revision and transformation version.
- Compare generated or running evidence with declared intent.
- Open a change proposal or alert owners when ticket fields, tests, contracts, architecture, or implementation drift.

This is a GitOps extension rather than a claim that every specification artifact behaves like infrastructure. Some differences can be reconciled automatically, such as regenerating a diagram or ticket context. Changes to business meaning, release scope, domain boundaries, or architecture responsibility require human review. The reconciliation policy must distinguish safe projection updates from decisions that belong to people.

## What becomes possible at scale

### Continuity of intent

Teams can follow a line of reasoning from a business objective or user journey to domain events, rules, examples, architectural decisions, implementation, and tests. Delivery artifacts preserve more of the context that produced them.

### Practical traceability

Traceability can emerge from preserved relationships instead of a separate documentation exercise. A developer could ask why an event exists. A QA engineer could find business rules without executable examples. An architect could identify synchronous relationships across bounded contexts. A product manager could see which journey slices a changed rule affects.

### Change impact analysis

A modification to a pivotal event, business rule, or context boundary can expose downstream consequences. The model can point to affected stories, examples, contracts, components, teams, and tests before a change reaches production.

### Better context for AI agents

Coding agents need more than source code. A normalized specification can tell an agent what the system means, which constraints apply, what it may change, and which examples prove the result. The same model can help review generated code for conceptual drift.

This establishes a practical sequence. As-Code gives developers the material needed to make a sound implementation. Their IDEs, generators, test tools, and delivery automation can consume the same material. AI then works from the specification the team already validated instead of reconstructing intent from tickets and code.

### Computable organizational knowledge

When domain and architecture knowledge becomes structured, teams can query it. They can detect duplicated concepts, conflicting names, undocumented integrations, missing examples, and ownership gaps. Knowledge that once lived mainly in workshops and individual experience becomes available to the wider organization.

## Conditions for a trustworthy implementation

The approach also creates responsibilities. Scaling it requires more than generating files.

First, every meaningful element needs a stable identity. Names change, but references should survive renaming and movement. Second, transformations need provenance. Teams should know whether a person, rule, model, or AI produced a change and which source informed it. Third, schemas and transformation rules require versioning so that tools can evolve without silently changing meaning.

Authority must remain explicit. A team needs to know which representation governs a decision when two views disagree. Generated artifacts should show their source and should not overwrite human decisions without review. Round-trip editing requires careful boundaries so visual and textual changes do not compete.

Finally, the system needs feedback from delivery and operations. Executable examples, contract checks, test results, and operational evidence can reveal where the specification no longer matches reality. A continuous specification becomes valuable when teams can test and improve it, not merely generate it.

GitOps makes that feedback operational. A reconciliation loop can detect divergence and propose a change, but it should not rewrite accepted intent from runtime observations without review. Declared intent and observed reality remain separate inputs to an explicit decision.

## A broader definition of Documentation as Code

Documentation as Code began by bringing documents closer to software engineering practices. Its next chapter can bring software intent into a form that people and machines can share.

The proposition is larger than a collection of “X as Code” tools. It is a continuous specification model that connects discovery, product work, domain design, architecture, delivery, validation, and operations.

The visual practices remain essential because they help people reason together. Code and normalized data make the results durable and computable. AI accelerates the movement between representations and helps teams inspect the model. Human experts decide what the model should mean.

At scale, this can become a specification backbone for software development: a living structure through which intent travels, changes become visible, and AI works against explicit constraints rather than inferred context.

## Reference

- [OpenGitOps principles](https://opengitops.dev/)
