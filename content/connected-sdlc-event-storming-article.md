---
title: Event Storming as Code in a Connected and Contract-Driven SDLC
date: 2026-09-12
type: article
series: Connected SDLC
topic: Event Storming
tags: [event-storming, as-code, ddd, contract-driven, gitops]
summary: "Keep the board as the collaborative surface and record a normalised model behind it, so Big Picture, Process Modelling and System Design discoveries feed delivery instead of going stale."
---

# Event Storming as Code in a Connected and Contract-Driven SDLC

## Abstract

Event Storming creates shared understanding by letting people explore a domain through events and the decisions around them. Its three main scopes support a progression from discovery to design: Big Picture, Process Modelling, and System Design, often called Software Design in EventStorming literature. The usual weakness appears after the workshop. A board becomes a picture, a summary, or a wiki page, while downstream teams recreate its meaning in backlogs, models, interfaces, and code.

Event Storming as Code changes that lifecycle. The visual board remains the collaborative surface, while a normalized model records the elements, relationships, identifiers, open questions, and decisions behind it. That model becomes a digital contract. Schemas and validation make the contract checkable. Stable references connect it to Story Mapping, Example Mapping, DDD, system design, ticketing, and tests.

This makes Event Storming an active source for delivery rather than a workshop artifact that gradually becomes stale. Git holds each accepted domain-model revision as the source of truth, while GitOps-style automation publishes its projections and reveals downstream drift.

## The role of Event Storming

Event Storming helps a group develop a shared model of what happens in a domain. The official EventStorming pattern catalog distinguishes Big Picture, Process Modelling, and Software Design contexts, and includes patterns for extracting acceptance tests from robust flows. The practice deliberately supports exploration before precision.

In a connected SDLC, Event Storming supplies the first structured account of business behavior. It captures what has happened, what caused it, who or what initiated it, which policy reacted, where questions remain, and which events change the direction of the journey.

That position gives it unusual leverage. If the model remains machine-readable, later disciplines can consume the discoveries directly.

## The digital contract

The contract does not need to freeze the domain. It defines the current, reviewable understanding and makes changes explicit.

| Contract element | Meaning | Downstream use |
| --- | --- | --- |
| Domain event | A meaningful fact that occurred | Story Map milestones, domain models, event contracts, tests |
| Command or action | An intention that may cause an event | Use cases, application services, API operations |
| Actor | A person or external party that initiates behavior | Personas, authorization, system context |
| Policy | A reaction or decision triggered by an event | Business rules, orchestration, acceptance examples |
| External system | A dependency outside the modeled responsibility | Context Map and C4 relationships |
| Hotspot or question | Uncertainty, conflict, or risk | Research, decision backlog, Example Mapping |
| Pivotal event | A transition that changes the journey | Story Map backbone and release slicing |
| Stable identifier | Identity that survives renaming and movement | Cross-artifact traceability |

The visual label remains important for people. The identifier protects machine relationships when the team improves the wording.

## A small notation example

The `.eventstorm` notation represents the workshop wall as a grid. Lanes run down the board, time runs across it, and `@3` places a card in the third column. The keywords determine the card types shown by the visual board.

```eventstorm
eventstorm "Title" {
  product "client-onboarding"

  lane "Customer" {
    actor "Hungry customer" @1
    event "Menu opened" @1
    event "Order placed" @3 +revenue
  }

  lane "Payments" {
    command "Take the payment" @3
    event "Payment requested" @4
  }
}
```

This fragment comes from the supplied `.eventstorm` notation. Give the LLM the [Event Storming doctrine](https://doc-es.obya.ch/doctrine), [notation](https://doc-es.obya.ch/notation), and [DSL reference](https://doc-es.obya.ch/dsl) as explicit generation instructions. The [Event Storming as Code tool](https://doc-es.obya.ch) keeps the resulting source synchronized with the visual board.

Notation makes lanes, cards, columns, and tags parseable. Doctrine keeps the model honest: AI may propose structure and questions, but it must not resolve hotspots, erase disagreement, or invent domain facts. **Notation protects syntax. Doctrine protects the practice.**

## Three levels of precision

### Big Picture

Big Picture Event Storming explores a broad business area. It reveals the temporal flow, competing language, handoffs, hotspots, opportunities, and pivotal events. It also identifies where the organization needs deeper modelling.

The as-code model should preserve discovery rather than force premature precision. It can allow partially classified elements, confidence levels, unresolved terms, and explicit questions. Validation at this stage should protect structure without rejecting useful ambiguity.

### Process Modelling

Process Modelling narrows the scope to a business outcome. The group explores the commands, events, policies, actors, read models, external systems, exceptions, and alternate paths involved.

At this level, the digital contract can enforce more. Every reaction should have an understandable trigger. Important branches should show their rule. External dependencies should have an owner or an explicit unknown. Examples can attach to difficult decision points.

### System Design

System Design adds the precision needed to shape software responsibility. It connects domain behavior to aggregates, application services, event handlers, interfaces, and boundaries. The model still speaks the domain language, but it becomes usable by developers and architecture tooling.

This stage should not mechanically generate a design from colored notes. The structured model provides evidence and constraints. Developers and architects decide how the software should realize them.

## Connected handoffs

Event Storming becomes more valuable when its outputs retain identity downstream.

### Story Mapping

Pivotal events and actors help construct the Story Map backbone. Activities and stories can reference the events they support. This preserves the domain journey when the product team creates release slices and tickets.

### Example Mapping

Policies, hotspots, and alternate paths provide strong inputs for rules, examples, and questions. Example Mapping can return clarified rules and concrete cases to the Event Storming model.

### DDD

Clusters of language and behavior suggest bounded context candidates. Commands, events, and policies inform domain models. Context Mapping can record ownership and relationships without assuming every visual cluster already defines a valid bounded context.

### System design and contracts

Actors and external systems contribute to C4 system-context views. Software responsibilities connect to containers or components. Event and API definitions can lead to AsyncAPI or OpenAPI contracts after the team confirms the system boundary and semantics.

AsyncAPI describes its document as a communication contract between senders and receivers. This illustrates an important distinction: an Event Storming event expresses business meaning, while the AsyncAPI artifact defines the technical message contract. The connection should be explicit, but the two artifacts should not be confused.

## How As-Code enables enforcement

Serialization alone does not enforce a contract. Enforcement comes from the ecosystem around the source:

- A schema validates element types and required fields.
- Semantic checks find broken references, impossible transitions, orphan elements, or missing ownership.
- Version control records changes and review.
- CI rejects invalid models or incompatible changes.
- Generators create views, tickets, test inputs, and architecture references from the accepted model.
- Provenance identifies human decisions and AI proposals.

This creates a contract-driven flow. Downstream automation reads an accepted model version. When the model changes, checks identify the consumers that may need to adapt.

## Git as source of truth and the GitOps extension

Git should hold the accepted Event Storming model and its history. The visual board remains the collaborative interface, while the normalized representation behind it becomes the source for review, generation, and traceability. A pull request can show changes to events, commands, policies, hotspots, and references alongside the downstream artifacts they affect.

The merge commit identifies the domain hypothesis accepted for the next delivery steps. Story Maps, ticket context, Example Maps, context maps, architecture references, and generated documentation should record that revision rather than silently copying the board.

A GitOps extension turns the repository into an operating loop:

- Automation pulls the accepted Event Storming revision.
- Validators check structure, references, ownership, and maturity rules.
- Generators publish the board and update permitted downstream projections.
- Reconciliation detects stale Story Map seeds, ticket links, examples, or architecture references.
- Meaningful differences create review work for the responsible people instead of overwriting their decisions.

Big Picture models need permissive policies because they contain hypotheses and hotspots. Process Modelling and System Design can use stronger checks. GitOps should therefore reconcile each model according to its maturity, not impose one release-grade policy on discovery.

## The new role of the wiki

The wiki remains useful, but it no longer governs behavior.

Use it for:

- Introductions and learning paths
- Workshop preparation and facilitation guidance
- Explanations of decisions and organizational context
- Generated views for broad audiences
- Links into the authoritative model

Do not use it as the only home for event definitions, relationships, ownership, or current process behavior. Those elements need structure, validation, and version history. The wiki can publish a readable projection of the model and clearly identify its source version.

## How each actor adapts

| Actor | Previous pattern | Connected practice |
| --- | --- | --- |
| Domain expert | Attends a workshop and later reviews prose | Reviews domain language, events, rules, and unresolved questions in the living model |
| Facilitator or BA | Produces a board and summary | Curates model quality, identifiers, scope, and connections |
| Product manager | Reads a workshop result | Uses pivotal events to build the Story Map and release slices |
| Developer | Receives a ticket detached from discovery | Receives references to events, rules, examples, and boundaries |
| QA specialist | Joins after story definition | Extracts risks and examples while the process is still being modeled |
| Architect | Interprets the board manually | Links external systems and responsibilities to DDD and C4 models |
| AI agent | Infers the domain from prose and code | Works from a typed, versioned domain hypothesis |

## Change management

The largest risk is asking everyone to maintain one more artifact. Adoption should remove duplicate work.

Start with one value stream where workshop output currently decays before delivery. Define a minimal schema and a small set of required identifiers. Generate one downstream artifact that people already need, such as a Story Map seed, ticket context, or acceptance-example list. Make the benefit visible within the first delivery cycle.

Next, introduce review rules. Domain experts review meaning. Developers review feasibility. Product reviews journey and scope. Architecture reviews boundaries. Tooling checks syntax and references.

Avoid turning discovery into form filling. Big Picture work needs permissive validation. Process and System Design can adopt stronger rules as the model becomes more precise.

Measure outcomes that show continuity:

- Time from workshop to usable Story Map
- Percentage of tickets linked to pivotal events
- Open hotspots that remain visible through delivery
- Contract changes detected before implementation
- Domain questions answered before development begins

## Conclusion

Event Storming as Code makes the workshop output durable, connected, and enforceable. Big Picture reveals the domain landscape. Process Modelling explains how outcomes emerge. System Design turns validated behavior into engineering material.

The board continues to support human exploration. The digital contract gives developers and their tooling the right material to do the right thing. AI receives the same material and can generate or change software against explicit intent rather than incomplete recollection.

## References

- [EventStorming patterns and antipatterns](https://www.eventstorming.com/patterns/)
- [Event Storming as Code](https://doc-es.obya.ch)
- [OpenGitOps principles](https://opengitops.dev/)
- [AsyncAPI document as a communication contract](https://www.asyncapi.com/docs/concepts/asyncapi-document)
