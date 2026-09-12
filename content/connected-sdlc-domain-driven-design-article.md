---
title: "Domain-Driven Design as Code: Semantic Contracts for Software"
date: 2026-09-12
type: article
series: Connected SDLC
topic: Domain-Driven Design
tags: [ddd, as-code, architecture, contract-driven, gitops]
summary: "Context Mapping and Domain Modelling as Code turn bounded contexts, language and invariants into structured, checkable semantic contracts."
---

# Domain-Driven Design as Code: Semantic Contracts for Software

## Abstract

Domain-Driven Design aligns software with a model of the domain. Its strategic patterns define bounded contexts and relationships. Its tactical patterns help teams express concepts, rules, and behavior in code. Eric Evans’ DDD reference provides an authoritative summary of the vocabulary and patterns.

In a connected and contract-driven SDLC, DDD supplies the semantic contract. It defines which language applies inside each boundary, who owns that model, how contexts relate, and which invariants the software must protect. Context Mapping as Code and Domain Modelling as Code make these decisions structured, versioned, and checkable.

This gives Event Storming discoveries a durable home, helps System Design reflect domain boundaries, and provides developers and AI with terminology and constraints that should appear in implementation. Git holds the accepted semantic model as the source of truth, while GitOps-style reconciliation keeps catalogs, policies, architecture, and code aligned with it.

## DDD’s place in the connected lifecycle

Event Storming discovers behavior and language. Story Mapping organizes delivery around the user journey. Example Mapping clarifies rules and cases. DDD turns the relevant knowledge into explicit models and boundaries.

The DDD model answers questions such as:

- Which meaning of a term applies here?
- Which bounded context owns the decision?
- What must remain true when state changes?
- Which integration relationship protects each model?
- Where should translation occur?
- Which business behavior belongs in software rather than coordination outside it?

These are contract questions. When the answers remain in a workshop or wiki, developers must infer them. When they exist as code, tools can validate references and detect drift.

## The semantic digital contract

| Contract element | Meaning | Connected use |
| --- | --- | --- |
| Bounded context | Boundary within which a model and language apply | Team ownership, architecture, repository scope |
| Ubiquitous language term | A precise term used by experts and developers | Model names, code vocabulary, examples |
| Context relationship | How two models collaborate or depend on each other | Integration design and governance |
| Aggregate | Consistency boundary for domain changes | Transaction and command handling |
| Entity | Concept with continuity and identity | Domain model and persistence |
| Value object | Descriptive concept defined by its attributes | Types, validation, APIs |
| Domain event | Meaningful fact in the model | Event contracts and downstream behavior |
| Invariant | Rule that must remain true | Code, examples, property tests |
| Policy or service | Domain decision or behavior spanning concepts | Application and domain services |
| Published language | Explicit language used across a boundary | OpenAPI, AsyncAPI, schemas, adapters |

The model should support narrative definitions and examples as well as machine references. A glossary without context boundaries can create false consistency because the same word may carry different meanings in different contexts.

## Strategic design as code

### Bounded contexts

Each bounded context needs a stable identifier, name, purpose, owner, language, and lifecycle state. Repositories, services, or teams may map to contexts, but the relationship should remain explicit rather than assumed to be one-to-one.

Validation can detect contexts without owners, components that claim several incompatible contexts, or references to terms outside the applicable language.

### Context Mapping

Context Mapping records relationships such as customer-supplier, conformist, anticorruption layer, shared kernel, open-host service, and published language. The map explains where coordination is required and where translation protects autonomy.

[Context Mapping as Code](https://ba-cm.obya.ch) makes those relationships available to architecture and delivery tooling. A change in an upstream model can identify downstream contexts and teams that need review.

### Subdomains and investment

Core, supporting, and generic subdomain classifications guide investment. The classification can influence architecture decisions, build-versus-buy discussions, and the degree of modelling effort. It should remain a strategic hypothesis that the organization revisits.

## Tactical design as code

Domain Modelling as Code can represent aggregates, entities, value objects, domain events, invariants, and policies. The source does not need to generate production classes directly. Its first purpose is to establish the intended model and make relationships inspectable.

Useful checks include:

- Every aggregate states its consistency responsibility.
- Commands identify the aggregate or policy that handles them.
- Domain events use terms defined in the context.
- Invariants connect to Example Mapping rules and examples.
- Public contracts do not accidentally expose internal model structures.
- Deprecated terms identify replacements and migration windows.

Code generators may create type skeletons, documentation, or test fixtures. Developers still decide how to realize the model in the chosen language and architecture.

## Connections to other disciplines

### Event Storming

Events, commands, policies, and language provide raw material for bounded contexts and domain models. Event Storming clusters suggest boundaries but do not automatically prove them. DDD adds deliberate modelling and ownership decisions.

### Story Mapping

Stories and release slices can reference the bounded contexts they change. This lets product and architecture see when a slice crosses several teams or integration boundaries.

### Example Mapping

Rules and examples provide evidence for invariants and policies. The DDD model gives those examples precise language. When an example uses a term incorrectly, validation or review can reveal the mismatch.

### System Design

C4 and LikeC4 describe software systems, containers, and components. DDD supplies semantic boundaries and responsibilities. A bounded context may map to one or several deployable units, while a container may host several simple contexts. The model should record the relationship without imposing a universal mapping rule.

### API and event contracts

OpenAPI and AsyncAPI define technical interfaces. DDD supplies the meaning of operations, messages, and terms. A published language can guide schemas, while anticorruption layers protect a context from external semantics.

## Contract enforcement

As-Code makes the semantic contract enforceable through several layers:

- Syntax and schema validation protect model structure.
- Reference checks enforce valid context and term usage.
- Architecture rules constrain dependencies between contexts.
- Static analysis can compare code namespaces or modules with model ownership.
- Contract tests check published interfaces.
- CI requires review from model owners for sensitive changes.
- Generated diagrams and glossaries publish the accepted model.

Teams should distinguish a warning from a release gate. A newly discovered language mismatch may begin as a hotspot. A forbidden dependency between core contexts may justify immediate failure.

## Git as source of truth and the GitOps extension

Git should hold the accepted semantic contract: bounded contexts, owners, context relationships, language, tactical model elements, invariants, and architecture policies. The visual context map and domain-model views remain accessible interfaces over that source.

A change to a term, invariant, or context relationship enters through a pull request. Review rules can request the relevant domain owner, affected customer or supplier context, architecture owner, and development team. The merge commit identifies the model revision that code, contracts, examples, and AI should follow.

A GitOps extension then keeps the semantic contract active:

- Automation pulls the accepted model and regenerates context maps, glossaries, and catalogs.
- Policy checks compare module and service dependencies with allowed context relationships.
- Contract checks verify published language and compatibility at integration boundaries.
- Reconciliation identifies code, architecture, examples, or documentation that use retired terms or violate ownership.
- Significant differences become reviewed model or implementation changes rather than automatic edits to domain meaning.

This loop lets DDD govern delivery continuously while preserving the modelling conversation that gives the contract its value.

## The wiki after DDD as Code

The wiki remains valuable for teaching the domain, describing history, and explaining major decisions. It should not hold the only current definition of a context, relationship, term, or invariant.

Generate context catalogs, glossaries, and diagrams from the model. Let narrative pages embed or link to those views. Architecture Decision Records can remain first-class as-code artifacts when they record decisions and link to affected model elements.

The key distinction concerns authority. Narrative explains. The structured model governs relationships and constraints.

## How actors adapt

| Actor | New responsibility | Benefit |
| --- | --- | --- |
| Domain expert | Own meanings, rules, and model corrections | Language survives delivery |
| Product manager | Relate outcomes and slices to contexts | Cross-team scope becomes visible |
| Developer | Use model language in code and review drift | Clearer responsibility and fewer translation errors |
| Architect | Govern context relationships and architecture constraints | Boundaries become enforceable |
| QA specialist | Link examples to invariants and policies | Tests reflect domain meaning |
| Platform team | Provide validators, catalogs, and CI integration | Governance moves into normal delivery |
| AI agent | Read context-scoped language and invariants | Better code generation and review |

## Change management

DDD can fail when an organization turns its patterns into mandatory diagrams without creating modelling conversations. The adoption program should focus on decisions and feedback.

Choose one core domain with recurring ambiguity or integration pain. Build a context map, identify owners, and define a small ubiquitous-language model. Link existing Event Storming events and Example Mapping rules. Add one enforceable architecture rule that protects a meaningful boundary.

Expand only when the team experiences the benefit. Provide lightweight editors, validation in the IDE, and generated views for non-technical participants. Avoid requiring domain experts to edit raw code unless they want to. The visual interface remains their working surface.

Useful measures include:

- Contexts with explicit owners
- Cross-context dependencies with documented relationships
- Domain terms linked from code and examples
- Boundary violations detected before merge
- Time needed to assess the impact of a model change
- Defects caused by conflicting domain interpretations

## Conclusion

DDD as Code provides the semantic contract for a connected SDLC. It turns bounded contexts, language, models, invariants, and relationships into living engineering material.

Developers gain a precise model for naming and responsibility. Architecture tools gain enforceable boundaries. QA gains domain-linked rules. AI gains the context needed to distinguish valid code from merely plausible code.

## References

- [Eric Evans: DDD Reference](https://www.domainlanguage.com/ddd/reference/)
- [Domain Language DDD resources](https://www.domainlanguage.com/ddd/)
- [Context Mapping as Code](https://ba-cm.obya.ch)
- [C4 model abstractions and diagrams](https://c4model.com/diagrams)
- [OpenGitOps principles](https://opengitops.dev/)
