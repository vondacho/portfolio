---
title: Software Intent as Code — LinkedIn Series
date: 2026-09-12
type: linkedin
series: Connected SDLC
topic: Software Intent as Code
tags: [as-code, doc-as-code, ai, ddd, architecture]
summary: "Twelve posts published over six weeks, walking from Documentation as Code to a continuous, machine-readable software specification."
---

# LinkedIn Series: Software Intent as Code

Twelve posts designed to be published in sequence. A cadence of two posts per week creates a six-week narrative.

## Post 1 of 12: Documentation as Code has a bigger job now

Documentation as Code gave us a useful engineering discipline: version the documentation, review it, and keep it close to the software.

But software intent starts long before a technical document.

It starts in a user journey. In a domain workshop. In the moment a team discovers a pivotal event, a business rule, an exception, or a boundary.

Those discoveries often lose detail as they move from a board to a photo, then into documentation, tickets, code, and tests. Every handoff asks someone to reinterpret the original thinking.

I am exploring a broader proposition:

**Make software intent machine-readable from discovery onward.**

The visual board remains where people collaborate. A normalized model sits behind it, versioned as code. Automation can validate it, generate downstream artifacts, calculate change impact, and publish human-readable projections. AI can transform the same knowledge because the source is explicit and normalized.

This creates a path toward a continuous software specification, one that connects discovery to delivery without repeatedly starting from prose.

In the next posts, I will show how Event Storming, Story Mapping, Example Mapping, Context Mapping, and architecture models can work as connected views of that specification.

#DocumentationAsCode #SoftwareArchitecture #DomainDrivenDesign #AIEngineering

## Post 2 of 12: The board can become a projection

Most digital workshop tools store a board as a collection of visual objects.

That helps people collaborate, but the meaning often remains trapped in position, color, and free text.

I took a different approach for [Event Storming as Code](https://doc-es.obya.ch): the board renders on screen while a coded representation evolves in the background.

The same mechanism supports the three ways I use Event Storming: Big Picture, Process Modelling, and System Design.

The distinction matters.

The board is the human interface. The structured model records domain events, commands, actors, policies, and relationships in a form that tools can process.

This enables a bidirectional workflow:

**human collaboration ↔ visual model ↔ normalized representation ↔ AI**

AI can propose an initial model. People can challenge and refine it visually. The refined model remains available for version control, validation, transformation, CI checks, and downstream generation.

The goal is not to replace sticky-note thinking. The goal is to preserve what the team discovered and make it useful after the workshop ends.

What would you want an Event Storming model to generate next?

#EventStorming #DomainDrivenDesign #DocumentationAsCode #GenerativeAI

## Post 3 of 12: A user journey can seed domain discovery

Imagine starting with a prompt that expresses a user journey.

AI interprets it and proposes a Big Picture Event Storming board. The group can then select a pivotal area, develop its Process Model, and add System Design detail where the software takes responsibility.

The result should not pretend to be the truth. It is a structured hypothesis.

That changes the role of AI in a workshop. The model gives the group something concrete to challenge. Domain experts correct language, expose missing events, move boundaries, and reject false assumptions. Their corrections update the underlying representation.

This can reduce the time spent preparing an empty canvas while preserving the part that matters most: collective reasoning.

The combination is powerful:

- AI expands the initial search space.
- The visual board supports human judgment.
- The as-code model preserves the result.

I think this is a practical form of AI-driven software specification. AI starts and accelerates the conversation. People remain responsible for what the system means.

Explore the current [Event Storming as Code tool](https://doc-es.obya.ch).

#EventStorming #AIEngineering #SoftwareDesign #DomainDiscovery

## Post 4 of 12: Event Storming connects landscape, process, and system

Event Storming can answer three levels of question.

**Big Picture:** What happens across the wider domain? Where are the hotspots, conflicts in language, and pivotal moments?

**Process Modelling:** How does a specific business process produce an outcome? Which commands, events, policies, actors, and exceptions matter?

**System Design:** How should the software handle those commands, produce events, apply policies, and protect domain rules?

These are not disconnected workshops. A hotspot in the Big Picture can define the scope of a Process Model. The process can then acquire the System Design detail needed for implementation.

When every level exists as code, the transition preserves the events, language, and decisions already validated by the team.

This provides much better input for domain modelling, architecture, contracts, and development than a board photograph or workshop summary.

Explore [Event Storming as Code](https://doc-es.obya.ch).

#EventStorming #DomainDrivenDesign #SystemDesign #DocumentationAsCode

## Post 5 of 12: Pivotal events connect discovery to product work

Event Storming and Story Mapping often happen in different sessions and different tools.

Pivotal events give us a strong connection between them.

A pivotal event marks a meaningful change in the journey. It often separates phases of behavior, responsibility, or value. That makes it a natural anchor for the activities and slices of a Story Map.

When both models exist as code, the transition can preserve identity and language. A story-map activity can reference the events it covers. A delivery slice can remain connected to the domain outcomes that justify it.

The practical benefit is continuity.

Product work no longer begins with a summary of the discovery workshop. It begins with the structured result of that workshop, which the team can reorganize through a different visual lens.

I built [Story Mapping as Code](https://doc-sm.obya.ch) to explore this transition.

The larger question is compelling: how much meaning can we preserve as work moves from discovery into prioritization and delivery?

#StoryMapping #EventStorming #ProductDiscovery #DocumentationAsCode

## Post 6 of 12: Story Mapping should be the source for tickets

A ticketing system coordinates work. It does not express a product journey very well.

When teams create tickets directly, the backlog often loses the context that makes each item meaningful: the user activity, the intended outcome, the release slice, and the domain events behind the work.

Story Mapping provides that missing structure.

With [Story Mapping as Code](https://doc-sm.obya.ch), the map can become the source for automated ticket generation. Each ticket can inherit:

- Its position in the user journey
- The release slice that contains it
- The pivotal events and outcomes it supports
- Links to the rules and examples that define its behavior

The ticket remains useful for workflow, ownership, and progress. The Story Map remains the source of product and delivery context.

This also helps when plans change. Moving a story between slices or revising a journey can reveal which tickets need review.

The backlog should receive context from the Story Map, not replace it.

#StoryMapping #ProductManagement #AgileDelivery #DocumentationAsCode

## Post 7 of 12: Examples make intent testable

A story title can hide a surprising amount of disagreement.

Example Mapping exposes it.

Rules clarify the expected behavior. Examples make each rule concrete. Questions show where the team still lacks knowledge. This is where product intent starts becoming testable.

With [Example Mapping as Code](https://doc-em.obya.ch), those elements become more than notes on a board. They form structured input for acceptance criteria, test design, and AI-assisted scenario exploration.

AI can suggest edge cases or find rules without examples. A QA specialist can challenge those suggestions and add the cases that matter in the real domain. Developers can use the approved examples as constraints while implementing a story.

This changes the conversation around AI-generated code.

The key question is not only, “Can AI produce an implementation?” It is also, “Which explicit examples will prove that the implementation respects the intended behavior?”

Accepted examples can generate scenario skeletons and test data, then connect automated results back to the rule they prove.

Examples provide a bridge between collaborative specification and executable evidence.

#ExampleMapping #QualityEngineering #BDD #AIEngineering

## Post 8 of 12: Boundaries belong in the same model

Behavior alone does not tell an implementation where responsibility belongs.

Context Mapping adds that missing dimension. It describes bounded contexts and the relationships between them: ownership, dependencies, collaboration patterns, and translation boundaries.

I use the same background-coding idea in [Context Mapping as Code](https://ba-cm.obya.ch). People work with a visual map while the structure remains available to version, query, and transform.

That structure can connect domain discovery to system design.

A domain event belongs to a context. A context has a team and an integration relationship. Domain models describe the concepts inside the boundary. LikeC4 and PlantUML artifacts show how software components realize that design.

When these references survive across views, architecture becomes easier to question:

- Which capabilities cross contexts synchronously?
- Which team owns the decision behind this event?
- Which components implement a changed business rule?

LikeC4 and PlantUML sources can also generate current diagrams and publish architecture views automatically. Teams update the model once instead of redrawing the same relationship in several pages.

These are useful questions for humans. They are also exactly the context an AI coding agent needs.

#ContextMapping #SoftwareArchitecture #DomainDrivenDesign #ArchitectureAsCode

## Post 9 of 12: As-Code turns documentation into automation input

Documentation becomes operationally useful when machines can act on it.

A normalized as-code model can trigger automation whenever the team accepts a change:

- Validate schemas and semantic relationships
- Detect broken references or incompatible contracts
- Generate boards, tickets, scenarios, diagrams, and readable documentation
- Calculate which teams and artifacts a change may affect
- Publish updated projections without asking people to copy content

This changes the economics of documentation.

Keeping the source current now produces immediate delivery value. The team does not update a document only for a future reader. The update drives tools that developers, product managers, architects, and QA already use.

There is an important ownership rule:

**People review the authoritative source. Automation produces the projections.**

Generated tickets, diagrams, or pages should identify their source revision. Teams should avoid editing generated fields in downstream tools unless they have defined a round-trip policy.

As-Code is therefore more than storage in Git. It supplies the typed, versioned input that makes reliable automation possible.

#DocumentationAsCode #Automation #PlatformEngineering #SoftwareDelivery

## Post 10 of 12: GitOps for software intent

GitOps is usually discussed in the context of operating software systems.

For a connected, contract-driven SDLC, Git becomes the source of truth for accepted software intent. Visual boards remain the working interfaces. Their normalized models, review history, and approved revisions live in Git.

GitOps principles then provide a useful model for keeping every consumer aligned:

**Declarative:** Event Storming, Story Mapping, examples, domain models, and architecture describe the desired understanding explicitly.

**Versioned and immutable:** Every accepted state has history, authorship, and a review path.

**Pulled automatically:** Delivery tools and agents consume the accepted contracts from their source.

**Continuously reconciled:** Automation detects when tickets, interfaces, tests, architecture views, or the running system drift from the declared intent.

This is where Doc as Code enables a GitOps-style SDLC.

A Story Map change can trigger ticket reconciliation. A revised example can identify tests that need regeneration. An architecture change can republish diagrams and run dependency policies. Runtime evidence can reveal that the declared model no longer matches reality.

The goal is not blind synchronization. Some differences need human decisions. Reconciliation should expose drift, apply safe generated changes, and route consequential conflicts to the contract owners.

The result is a closed feedback loop between declared intent and delivered software.

[OpenGitOps principles](https://opengitops.dev/)

#GitOps #DocumentationAsCode #Automation #SoftwareArchitecture

## Post 11 of 12: The right material changes the result

The immediate value of an as-code board is convenience. The larger value appears when the models connect.

As-Code gives developers and their tooling the right material to do the right thing.

Developers receive the journey, domain language, system boundaries, business rules, examples, and architecture constraints behind a ticket. IDEs, generators, test tools, and delivery automation can consume the same structured material.

Then AI can do it right too.

That does not mean AI becomes infallible. It means the agent works from intent the team already validated instead of reconstructing requirements from a flat ticket and repository code.

Imagine asking:

“Why does this event exist?”

The answer could traverse from an event contract to a domain event, the examples that constrain it, the story-map slice that scheduled it, and the user journey that motivated it.

Or ask:

“What changes if we alter this rule?”

A connected specification could identify affected stories, examples, contexts, APIs, components, tests, and teams.

This is traceability without a separate traceability project. Relationships emerge because transformations preserve identifiers as intent moves through the lifecycle.

At scale, I see this becoming a software specification backbone: organizational knowledge that remains useful to people while becoming computable by machines.

#SoftwareArchitecture #Traceability #AIEngineering #DigitalTransformation

## Post 12 of 12: A continuous specification needs governance

“Everything as Code” can still create drift if every artifact claims authority.

A trustworthy specification backbone needs clear rules.

Meaningful elements need stable identifiers. Transformations need provenance. Schemas need versioning. Generated changes need review. Teams need to know which representation governs a decision when two views disagree.

Round trips also require care. A person may edit the visual board while another edits the source representation. Tools must make conflicts visible rather than silently choosing a winner.

Finally, the model should receive evidence from delivery. Tests, contract checks, reconciliation results, and operational signals can show where declared intent and the running system have diverged.

These constraints do not weaken the proposition. They make it credible.

The future I am working toward is a continuous specification that connects product intent, domain knowledge, architecture, implementation, and validation. Automation validates, generates, publishes, and detects drift. AI accelerates transformations and finds gaps. Human experts retain authority over meaning and decisions.

That is the broader promise of Documentation as Code for the whole software development lifecycle.

#DocumentationAsCode #SoftwareDelivery #ResponsibleAI #DomainDrivenDesign
