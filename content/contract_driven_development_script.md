---
title: Contract-Driven Development — Presentation Script (Part I)
date: 2026-09-12
type: script
series: Contract-Driven Development
topic: Contract-Driven Development — Part I
tags: [contract-driven, api, openapi, migration]
summary: "Full speaker notes for Part I, slide by slide, on migrating the agreement and making it executable across backend, frontend and mobile."
---
# Contract-Driven Development — Speaker Script

Aligned exactly with the 15-slide **One Contract. Shared Expectations.** deck.

## Slide 1 — One Contract. Shared Expectations.

This deck is about reducing integration friction during a migration where the backend evolves the public REST API while frontend and mobile are delivered by a nearshore team.

The central idea is simple: migration is not only replacing an API implementation. It is migrating an agreement between provider and consumers. If that agreement is explicit and executable, teams can work more independently without drifting apart.

OpenAPI gives us the contract structure. Examples make expected interactions concrete. Microcks makes those expectations usable as mocks and tests. CI/CD keeps the agreement in the delivery path.

**Transition:** Before discussing the approach, we need to look at why migration creates so much friction.

## Slide 2 — Our migration has three sources of truth

In this migration, we do not start from a blank page. We have three sources of truth at the same time.

The legacy system tells us what actually happens today. Existing frontend and mobile applications tell us what consumers already assume. The new REST API specification tells us what we want the future agreement to become.

The dangerous area is the gap between those three. That is where undocumented assumptions become bugs, clarification tickets, meetings and rework.

The objective is not to eliminate disagreement. It is to expose disagreement while changing the contract is still cheap.

**Transition:** Those gaps show up in very recognizable conversations.

## Slide 3 — “But the old API did…”

These are typical migration conversations: a field is optional in the new specification but consumers have always received it; the backend wants a 404 while mobile handles a 200 with an empty body; a renamed field affects dozens of screens; an ISO timestamp still leaves timezone semantics unclear.

Nobody is necessarily wrong. Each team is reasoning from a different version of the contract.

That changes the nature of the discussion. Instead of asking who implemented the API incorrectly, we ask which expectation is intended, which one is legacy, and what migration decision we want to make.

**Transition:** That is why the real contract is larger than the OpenAPI document.

## Slide 4 — Your API contract is bigger than the OpenAPI file

OpenAPI is essential, but the effective API contract also includes realistic examples, observable legacy behavior and assumptions already encoded in consumers.

Many integration problems live in details that a schema alone does not fully communicate: nullability, ordering, error semantics, defaults, pagination, dates, enum evolution and authentication behavior.

So the migration task is to make this hidden contract visible. OpenAPI remains the anchor, but examples and explicit migration decisions give it the behavioral meaning consumers need.

**Transition:** Once we see the contract this way, migration becomes a different engineering activity.

## Slide 5 — Migration = migrating an agreement

The conceptual pivot is to treat migration as the migration of an agreement.

We discover what exists, compare legacy behavior with consumer expectations and the new specification, decide intentionally what should happen, encode that decision in the contract and examples, and then enforce it through delivery.

I call this contract archaeology because we are excavating behavior that often exists only in production, consumer code or team memory.

The new API is not done when the YAML is written. It is done when the new agreement is explicit, shared and verified.

**Transition:** This also explains the difference between contract-first and contract-driven development.

## Slide 6 — Contract-first ≠ contract-driven

Contract-first is primarily an ordering decision: agree on the contract before implementing it. That is valuable, but it is only the beginning.

Contract-driven development turns the contract into an engineering system. The same agreement drives mocks, tests, documentation, client work and CI/CD decisions.

This distinction matters for our migration. A specification that is reviewed once and then becomes passive documentation can still drift from implementation and consumer expectations. An executable contract keeps participating throughout delivery.

**Transition:** Microcks is one of the capabilities that makes this practical across separated teams.

## Slide 7 — One contract lets teams build independently

Once OpenAPI and its examples are sufficiently explicit, Microcks can expose that agreement as a working mock.

Frontend and mobile no longer need to wait for the new backend implementation to be available before integrating against the intended API behavior. At the same time, the backend can implement independently and later prove conformance against the same contract knowledge.

This is important for our topology: independence does not come from giving each team its own interpretation. It comes from giving separated teams the same executable expectations.

**Transition:** The real benefit is where disagreements occur in the timeline.

## Slide 8 — Move disagreement left

In the common failure mode, we specify, implement, deploy and only then integrate. A mismatch appears at the most expensive point, followed by tickets, meetings and rework.

In the contract-driven flow, the API proposal is reviewed as a shared contract. A Microcks mock makes it tangible before implementation is complete. Teams build in parallel, contract tests verify the provider, and integration becomes confirmation rather than discovery.

We do not need fewer disagreements. We need cheaper disagreements.

**Transition:** To make those disagreements actionable, migration decisions need a simple shared format.

## Slide 9 — Use a Contract Migration Matrix

The Contract Migration Matrix is a lightweight way to turn ambiguous debates into explicit decisions.

For each meaningful behavior, record what the legacy system does, what the consumer expects, what the new contract proposes, the decision we are making, and who owns the resulting change.

The point is not to preserve every legacy behavior. Sometimes we deliberately adopt the new behavior. Sometimes we preserve compatibility. Sometimes we add an adapter. What matters is that the choice is visible and owned.

This changes the conversation from “who is right?” to “what migration decision are we making?”

**Transition:** Once decisions are explicit, we can define when a contract is actually ready for implementation.

## Slide 10 — Define “Contract Ready” before coding starts

A contract should not be considered ready merely because an OpenAPI file exists.

Before coding starts, we want the specification to validate, realistic examples to exist, errors and status codes to be agreed, nullability and required fields to be explicit, enum and date/time semantics to be clear, and pagination and authentication behavior to be understood.

For a migration, we also identify legacy differences and have frontend and mobile review the consumer-facing expectations. Finally, the Microcks mock should be available so the agreement can be experienced rather than only read.

**Transition:** Readiness gets us into implementation; we also need a shared finish line.

## Slide 11 — And define “Contract Done”

Contract Done gives provider and consumers the same finish line.

The specification is complete, the implementation exists, Microcks tests demonstrate conformance, compatibility impact has been assessed, consumers have validated the behavior, and any migration decision is recorded.

This is especially important in a distributed topology. Backend done cannot mean only that backend code has been merged. The change is complete when the shared agreement has been implemented and validated across the boundary.

**Transition:** That definition becomes much stronger when the contract participates directly in the delivery pipeline.

## Slide 12 — Put the contract in the delivery path

The contract should be reviewed before its implementation and then checked throughout delivery.

A pull request changes the contract. We lint and validate it, assess compatibility, deploy a preview implementation, and use Microcks for conformance verification. If the change is breaking or non-conformant, it returns to review or requires an explicit migration decision. Otherwise it can continue toward release.

This makes the contract a quality gate rather than a document that somebody checks manually after the fact.

**Transition:** This level of discipline is not equally valuable everywhere, so we should be explicit about where it pays off.

## Slide 13 — When does contract-driven development pay off?

Contract-driven development pays off as integration complexity and independent evolution increase.

For a single-team prototype, the overhead may not be justified. As soon as frontend and backend evolve separately, the value grows. It becomes especially strong for shared platform APIs, public APIs, distributed teams, migrations, mobile release cycles and external consumers.

Our context is firmly in that high-value area: teams are separated, consumers already exist, and migration creates compatibility risk.

So this is not process for its own sake. It is a response to team distance and integration risk.

**Transition:** The right adoption strategy is therefore focused rather than enterprise-wide.

## Slide 14 — A pragmatic rollout — start with one painful boundary

We should not begin by trying to transform every API.

Pick one migration API where integration pain is already visible. Run contract archaeology, create the migration matrix, enrich the OpenAPI examples, publish a Microcks mock, and add a provider conformance gate.

Then measure whether the approach changes the outcomes we care about: integration defects, clarification tickets, rework cycles, lead time to integrate and consumer-blocked days.

If it works, we expand from evidence rather than doctrine.

**Transition:** The entire approach can be summarized in three verbs.

## Slide 15 — Agree First. Build Independently. Verify Continuously.

The closing message is intentionally simple.

Agree first: make the expected behavior explicit before implementation locks in assumptions.

Build independently: let backend, frontend and mobile progress without waiting on one another, because they share executable expectations.

Verify continuously: keep checking that implementation and consumers remain aligned with the agreement as it evolves.

Distance between teams should not create distance between expectations. One contract, shared expectations, independent delivery.

**Closing line:** **Agree first. Build independently. Verify continuously.**
