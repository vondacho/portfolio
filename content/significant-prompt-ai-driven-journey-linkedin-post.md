---
title: The Significant Prompt for an AI-Driven SDLC
date: 2026-09-13
type: linkedin
series: Connected SDLC
topic: Significant Prompt
tags: [ai, sdlc, as-code, prompting]
summary: "Start AI from the problem, not the ticket: a focused prompt plus versioned instructions yields connected models, delivery packs and a reviewable Git change."
---

# The Significant Prompt for an AI-Driven SDLC

AI-assisted development often starts with a ticket and a repository.

That gives AI the implementation context, but very little of the reasoning that makes the implementation correct.

A stronger journey begins with a significant prompt grounded in a problem narrative or a consistent specification.

The prompt asks AI to study the problem before proposing a solution. It provides the actors, desired outcomes, constraints, evidence, existing systems, and unresolved questions.

Stable instructions do not need to make every prompt enormous. Keep them as versioned Markdown files in the repository:

- SDLC orchestration instructions
- Artefact and traceability contract
- Review and delivery policy

The problem-specific prompt can then stay focused:

“Study the supplied narrative or specification. Follow the AI-driven SDLC instructions in `docs/ai/`. Produce a connected solution proposal, delivery packs, validation report, and pull-request description. Preserve assumptions and open questions.”

The reusable instructions define the artefacts AI should generate:

- Journey and Event Storming models
- A Story Map with coherent delivery slices
- Example Maps containing rules, cases, and open questions
- Context Maps and domain models
- C4, LikeC4, PlantUML, and interface contracts
- A walking-skeleton pack
- An MVP pack
- A traceability manifest and validation report

AI receives a three-part instruction set for every modelling practice:

**Doctrine** explains how to apply the practice and what AI must not invent or decide.

**Notation** explains the model elements and their visual meaning.

**DSL** defines the exact file format AI must generate.

Notation protects syntax. Doctrine protects the practice.

The generated artefacts keep stable identifiers and explicit relationships:

Objective → journey → domain event → story → rule → example → bounded context → component → interface → test → production evidence.

AI then proposes two different delivery slices.

The walking skeleton proves the technical path through architecture, integration, deployment, testing, and observability.

The MVP delivers the smallest coherent user outcome that can test an important business or product hypothesis.

AI writes the result as a reviewable Git change. Automated checks validate syntax, references, semantics, and compatibility. People decide whether the models express the right meaning. Git records the accepted intent. GitOps publishes and reconciles the downstream tickets, tests, diagrams, contracts, and evidence.

Software Intent as Code provides the integration layer that lets AI boost the entire SDLC.

The significant prompt does not ask AI for more documents. It asks AI to build a connected delivery baseline from the problem we actually need to solve.

#AIDrivenSDLC #SoftwareIntentAsCode #DocumentationAsCode #GitOps #DomainDrivenDesign #SoftwareArchitecture #AIEngineering
