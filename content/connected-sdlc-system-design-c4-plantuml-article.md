---
title: "System Design as Code with C4, LikeC4, and PlantUML"
date: 2026-09-12
type: article
series: Connected SDLC
topic: System Design
tags: [architecture, c4, as-code, contract-driven, gitops]
summary: "An architecture contract with stable identities for systems, containers, components and interfaces, compared continuously with code, contracts and deployment."
---

# System Design as Code with C4, LikeC4, and PlantUML

## Abstract

System design explains how software responsibilities, interactions, and deployment choices realize product and domain intent. C4 provides a developer-friendly set of abstractions and levels of zoom. LikeC4 represents architecture as a model from which teams generate views. PlantUML expresses structural and behavioral diagrams in text.

In a connected and contract-driven SDLC, these tools do more than generate diagrams. They create an architecture contract. Systems, containers, components, people, relationships, interfaces, dynamic scenarios, and deployment nodes receive stable identities. The model connects to bounded contexts, domain events, stories, examples, API contracts, repositories, and operational evidence.

Architecture becomes reviewable and testable inside normal delivery. Git holds the accepted model as the source of truth. GitOps-style automation publishes views and compares declared architecture with code, contracts, deployment, and observed interactions. Wiki pages can still explain the design, but the model governs its current structure and relationships.

## The system-design decision

System design answers how software will fulfill its responsibility within known constraints.

The model should help different actors understand:

- Which people and external systems interact with the software
- Which software systems own which responsibilities
- Which applications and data stores make up a system
- Which components collaborate inside a container
- Which interfaces and messages connect those elements
- How a scenario moves through the system
- How logical elements map to deployment environments

The design needs several views because one diagram cannot answer every question without becoming unreadable.

## C4 as the abstraction framework

The official C4 model defines four core static structure diagrams: system context, container, component, and code. Its guidance also notes that many teams gain enough value from context and container views without using every level.

| C4 view | Primary question | Typical audience |
| --- | --- | --- |
| System context | Who uses the system, and which external systems surround it? | Product, domain, architecture, leadership |
| Container | Which applications and data stores form the system? | Architects and development teams |
| Component | How is responsibility organized inside a container? | Developers and technical leads |
| Code | How is a component realized at code level? | Developers, when the detail adds value |
| Dynamic | How do elements interact in one scenario? | Developers, QA, domain specialists |
| Deployment | Where do instances run in an environment? | Platform, operations, security |

The abstraction levels support communication. They should not become a requirement to produce every possible diagram.

## LikeC4 as the architecture model

LikeC4 describes software architecture with code and generates visual views from a model. Its official documentation describes the model as hierarchical elements and relationships, while views act as projections from different scopes and levels of detail.

This model-first approach matters. If every diagram stores its own boxes and lines, the same component or relationship can drift across views. When views reference shared elements, a model change updates each applicable view.

The architecture contract can include:

- Element identifiers, kinds, names, descriptions, and owners
- Hierarchical containment
- Directed relationships with purpose and protocol
- Links to source repositories, APIs, events, and runbooks
- Tags for bounded context, data classification, lifecycle, or criticality
- Dynamic views for important user or operational scenarios
- Deployment nodes and instances
- Rules that allow or prohibit relationships

LikeC4 also provides editor validation and a CLI that can build a shareable site, export diagrams, format source, and generate typed data or components. These capabilities make the model available to CI and downstream tools.

## PlantUML as a precise textual view

PlantUML supports sequence, class, component, deployment, state, activity, and many other diagram types from text descriptions. It complements the model-centric C4 view.

Use PlantUML when a scenario needs precise interaction order, when a domain model benefits from a class diagram, or when a state transition needs focused explanation. Keep references to the same systems, components, commands, events, and contracts used elsewhere.

PlantUML diagrams should not invent a separate architecture vocabulary. A small generation or include layer can keep common element identifiers and styling aligned with the architecture model.

## The architecture digital contract

| Contract element | Meaning | Possible enforcement |
| --- | --- | --- |
| System | Software that provides value to users or other systems | Owner and purpose required |
| Container | Application or data store within a system | Technology, responsibility, and deployment mapping |
| Component | Unit of responsibility within a container | Dependency and ownership rules |
| Relationship | A directional interaction with a purpose | Allowed dependency, protocol, contract link |
| Interface | API, event, file, or other integration surface | OpenAPI, AsyncAPI, schema, or test reference |
| Dynamic scenario | Ordered interaction for a use case | Link to story and examples |
| Deployment node | Environment or infrastructure location | Security and operational constraints |
| Decision reference | Reason behind a significant choice | ADR and affected element links |
| Model revision | Version of architecture used by delivery | Build and evidence traceability |

The contract should state what the architecture intends. Runtime evidence can confirm or challenge it, but observed traffic alone cannot explain purpose.

## Connections to the other disciplines

### Event Storming

Actors and external systems seed the system-context view. Commands and events identify interfaces and dynamic interactions. System Design Event Storming provides behavioral evidence for component responsibilities.

### Story Mapping

A story or release slice can reference the systems and containers it changes. Architecture can reveal when one slice crosses several systems, teams, or deployment boundaries.

### Example Mapping

Examples define scenarios that dynamic or sequence diagrams can illustrate. Expected outcomes link to tests and observability. A design without a way to observe the example’s outcome remains difficult to validate.

### DDD

Bounded contexts supply semantic responsibility. Architecture elements realize those responsibilities. The relationship should remain explicit because a bounded context does not always equal a microservice or container.

### API and event contracts

OpenAPI descriptions provide machine-readable HTTP API definitions. AsyncAPI documents define communication contracts between event senders and receivers. Architecture relationships should link to these specifications rather than restating their fields in diagram labels.

## Contract enforcement in delivery

System Design as Code enables several checks:

- Every critical system, container, and component has an owner.
- Relationships reference valid elements and include a purpose.
- Cross-context dependencies follow approved directions.
- Public interfaces link to an API or event contract.
- High-risk data flows carry classification and security metadata.
- Dynamic views use elements from the static model.
- Deployment views reference valid logical elements.
- Architecture changes trigger review from affected owners.
- Repositories and pipelines identify the architecture revision they implement.

CI can lint the model, build diagrams, run policy checks, and publish the accepted views. A failed check should explain the violated design rule and the responsible owner.

## Git as source of truth and the GitOps extension

Git should hold the accepted architecture model, LikeC4 and PlantUML sources, Architecture Decision Records, relationship policies, and links to interface contracts. Rendered diagrams and wiki pages are projections from that source. Each projection should expose the model revision that produced it.

A pull request makes architectural change review concrete. Teams can inspect the changed systems, containers, components, relationships, deployment mappings, and affected contracts together with code. Repository ownership rules can request reviewers for the architecture elements involved.

GitOps extends this workflow beyond merge:

- Automation pulls the accepted model, validates it, and publishes updated views.
- Policy checks compare dependencies and interface references with declared architecture.
- Runtime discovery and observability provide evidence about actual interactions.
- Reconciliation reports undocumented relationships, missing contracts, or stale deployment mappings.
- Safe projections regenerate automatically, while structural or ownership changes return to people as review proposals.

Runtime state can expose drift, but it should not silently redefine architectural intent. The team decides whether the implementation must return to the declared model or whether the model should change to reflect a justified design decision.

## Architecture and AI

AI coding agents often infer system boundaries from repository structure. That works poorly when one repository contains several responsibilities or when a capability spans repositories.

The architecture model provides explicit context:

- Which component the agent may change
- Which dependencies it may introduce
- Which interfaces require compatibility
- Which bounded context supplies the language
- Which dynamic scenarios the change affects
- Which tests and operational signals provide evidence

AI can also propose new views, relationships, or impact analyses. Human architects and developers review changes to responsibility and constraints.

## The wiki after Architecture as Code

Wiki documentation remains useful for architecture principles, onboarding, operational explanations, and decision narratives. It should not contain the only current system diagram or dependency map.

Generate architecture pages and diagrams from LikeC4 and PlantUML. Embed those outputs in narrative pages. Keep Architecture Decision Records in version control and link them to model elements. The wiki becomes a publication and learning surface, not the canonical model editor.

## How actors adapt

| Actor | New responsibility | Benefit |
| --- | --- | --- |
| Architect | Own model semantics, rules, and major decisions | Architecture participates in delivery |
| Developer | Update the model with significant structural changes | Less stale documentation and clearer boundaries |
| Domain expert | Review system-context and dynamic views | Technical design stays connected to domain behavior |
| Product manager | Link slices to affected systems | Cross-system scope becomes visible |
| QA specialist | Link examples and tests to dynamic scenarios | Better integration and campaign design |
| Platform or operations | Maintain deployment and operational references | Logical and runtime views connect |
| Security | Define enforceable relationship and data-flow policies | Earlier architecture feedback |
| AI agent | Use model constraints during generation | Safer changes and better impact analysis |

## Change management

Architecture as Code often fails when architects create a central repository that delivery teams do not touch. Ownership must follow the software.

Begin with system-context and container views for one active value stream. Link elements to bounded contexts, repositories, and interface contracts. Add only a few rules with obvious value, such as ownership requirements and prohibited dependency directions.

Integrate validation into the developer workflow. Provide live previews, safe renaming, clear errors, and automatic publishing. Assign model review to the same teams that review code changes. The architecture group maintains conventions and cross-system governance rather than editing every team’s model.

Useful measures include:

- Critical elements with explicit owners
- Interfaces linked to formal contracts
- Invalid dependencies blocked before merge
- Time required to assess a cross-system change
- Architecture views generated from the current model
- Production incidents involving undocumented relationships

## Conclusion

C4 supplies understandable abstraction levels. LikeC4 supplies a model and generated views. PlantUML supplies precise textual diagrams for structure and behavior. Together, they can establish a system-design contract that participates in delivery.

Developers and their tools receive explicit boundaries, dependencies, and interface references. AI receives the same context. The architecture stops living mainly in a wiki and becomes connected, versioned material that teams can validate with every change.

## References

- [C4 model diagrams](https://c4model.com/diagrams)
- [LikeC4: Architecture as Code](https://likec4.dev/)
- [LikeC4 model](https://likec4.dev/dsl/model/)
- [LikeC4 views](https://likec4.dev/dsl/views/)
- [PlantUML](https://plantuml.com/)
- [OpenAPI description structure](https://learn.openapis.org/specification/structure.html)
- [AsyncAPI document](https://www.asyncapi.com/docs/concepts/asyncapi-document)
- [OpenGitOps principles](https://opengitops.dev/)
