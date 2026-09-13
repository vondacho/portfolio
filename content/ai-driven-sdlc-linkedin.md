---
title: AI-Driven SDLC
date: 2026-09-12
type: linkedin
series: Connected SDLC
topic: AI-Driven SDLC
tags: [ai, sdlc, as-code, gitops]
summary: "Code generation starts too late. A short post on making journeys, events, rules and contracts available to AI as versioned intent."
---

# AI-Driven SDLC

AI-driven development is often reduced to code generation. That starts too late.

Before AI can implement the right system, it needs the user journey, domain events, product outcomes, business rules, examples, bounded contexts, architecture constraints, and technical contracts.

Two messages define the proposition:

**Software Intent as Code provides the integration layer that lets AI boost the entire SDLC.**

**As-Code makes every stage of the lifecycle machine-readable, allowing AI to participate continuously from discovery through production evidence.**

But parseable output is not automatically useful. AI needs a three-part instruction set:

- **Doctrine** defines what good practice means, what uncertainty must remain visible, and what AI must not invent or decide.
- **Notation** explains the modelling elements and relationships behind the visual practice.
- **DSL** defines the exact grammar and file format AI may generate.

**Notation protects syntax. Doctrine protects the practice.**

Event Storming doctrine prevents AI from resolving hotspots or inventing domain facts. Story Mapping doctrine protects the journey, coherent slices, and unscheduled work. Example Mapping doctrine preserves red questions. DDD doctrine keeps boundaries, relationship power, language seams, and aggregate invariants honest.

These are versioned instructions for the LLM, not background reading. The generation loop becomes:

Current model + requested change + notation + doctrine → AI proposal → parser and semantic validation → human approval → merge.

A journey prompt can seed an Event Storming Big Picture. Pivotal events connect discovery to a Story Map and contextualised tickets. Example Mapping defines correct behaviour. DDD provides language and boundaries. C4, LikeC4, PlantUML, and interface specifications connect intent to implementation.

Each practice keeps its visual language. Its normalised source makes the same knowledge usable by people, engineering tools, and AI.

Git is the source of truth for accepted intent. GitOps validates digital contracts, generates projections, publishes their source revision, and detects drift across tickets, tests, architecture, code, and production evidence.

People retain authority over meaning, priorities, behaviour, and responsibility. AI proposes reviewable changes with visible provenance.

As-Code gives developers and their tooling the right material to do the right thing. Then AI can do it right too.

What would change if software intent became as computable as source code?

#AIDrivenSDLC #DocumentationAsCode #GitOps #DomainDrivenDesign #SoftwareArchitecture #AIEngineering
