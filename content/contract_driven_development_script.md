---
title: Contract-Driven Development — Presentation Script (Part I)
date: 2026-09-12
type: script
series: Contract-Driven Development
topic: Contract-Driven Development — Part I
tags: [contract-driven, api, openapi, migration]
summary: "Full speaker notes for Part I, slide by slide, with purpose and talking points for backend, frontend and mobile convergence."
---

# Contract-Driven Development --- Presentation Script

## Speaker guide

This script accompanies the two-part presentation series:

-   **Part I --- Contract-Driven Development: Migrating the Agreement**
-   **Part II --- From Contract to Capability: Integrating Microcks**

The text is written as speaker notes rather than slide copy. Use it
conversationally; the goal is not to read every sentence verbatim. A
typical pace is **1.5--2.5 minutes per slide**, with extra time on the
workflow and migration slides.

------------------------------------------------------------------------

# Part I --- Contract-Driven Development: Migrating the Agreement

## Slide 1 --- Contract-Driven Development

**Purpose:** Set up the problem as an integration and migration problem,
not an API-documentation problem.

**Speaker script**

Today I want to talk about contract-first and contract-driven
development, but from the perspective of a problem we actually
experience.

We have a backend team providing a public REST API, and frontend and
mobile development performed by a nearshore team. At the same time, we
are moving from an existing system to a new platform and a new API
specification.

That sounds like a technical migration. But the difficult part is
usually not implementing endpoints. The difficult part is making sure
that everyone has the same understanding of what those endpoints mean
and how they behave.

The central idea of this presentation is simple: **migration is not only
replacing an API. It is migrating an agreement.**

Contract-first helps us establish that agreement earlier.
Contract-driven development goes further and makes the agreement
executable throughout development and delivery.

**Transition:** Before looking at the solution, let's look at where the
friction actually comes from.

------------------------------------------------------------------------

## Slide 2 --- Our Reality

**Purpose:** Establish the organizational and architectural boundaries.

**Speaker script**

Our delivery model has several independent moving parts.

The backend team designs and implements the new public REST API.
Frontend and mobile have already accumulated behavior and assumptions
from the existing system. The nearshore team needs enough stability to
develop independently, while the backend needs freedom to modernize the
platform.

During migration, those goals can conflict.

The backend may correctly implement the new specification and still
break an existing consumer. The consumer may correctly reproduce
existing behavior and still violate the intended new API model.

So the question is not, "Which team is right?" The useful question is,
**"Which behavior have we agreed to support?"**

That distinction changes the conversation from ownership and blame to an
explicit migration decision.

**Transition:** And we usually discover these decisions through a very
familiar sentence.

------------------------------------------------------------------------

## Slide 3 --- "But the old API did..."

**Purpose:** Make the pain recognizable.

**Speaker script**

This is where migration friction becomes visible.

The backend says, "This field is optional according to the new
specification." Frontend says, "But it has always been present."

The backend says, "A missing resource returns 404." Mobile says, "The
old system returned 200 with an empty result."

Or we change a field name, an enum, timestamp semantics, pagination
behavior, or the difference between `null`, an omitted property, and an
empty collection.

None of these examples is especially difficult to code. What makes them
expensive is discovering them late.

By the time they appear during integration or regression testing, code
exists on both sides, tickets are already considered complete, and
changing behavior requires coordination.

Our objective is therefore not to eliminate disagreement. **It is to
make disagreement happen earlier, when it is cheap.**

**Transition:** During migration, this happens because we are dealing
with more than one version of the truth.

------------------------------------------------------------------------

## Slide 4 --- Three Sources of Truth

**Purpose:** Introduce the migration gap.

**Speaker script**

At the beginning of a migration, we effectively have three sources of
truth.

First, there is the **legacy system's actual behavior**. Not what its
documentation says---the behavior consumers really see.

Second, there are the **existing frontend and mobile expectations**.
These applications contain assumptions that may never have been written
down.

Third, there is the **new API specification**, describing how we want
the future platform to behave.

Those three things will not automatically agree.

The space between them is what I call the **migration gap**. That gap
contains our compatibility issues, hidden assumptions, migration
decisions, and much of our rework.

A successful migration makes those differences explicit rather than
allowing integration testing to discover them accidentally.

**Transition:** This leads to an important observation about what an API
contract actually is.

------------------------------------------------------------------------

## Slide 5 --- The Hidden Contract

**Purpose:** Broaden "contract" beyond OpenAPI syntax.

**Speaker script**

An OpenAPI document is extremely valuable, but our real contract is
larger than the OpenAPI file.

The existing applications encode an implicit contract: nullability
assumptions, ordering, error semantics, default values, pagination, date
formats, enum values, authentication behavior, and sometimes even legacy
quirks.

If frontend code assumes a property always exists, that assumption is
part of the migration problem whether or not the old specification
documented it.

So when we create the new API contract, we should not simply ask, "Is
this OpenAPI valid?"

We should ask, **"Does this describe the observable behavior that
consumers need, and have we consciously decided where the new behavior
differs?"**

That is the difference between schema work and contract work.

**Transition:** Once we see the hidden contract, migration looks
different.

------------------------------------------------------------------------

## Slide 6 --- Migration = Migrating an Agreement

**Purpose:** Deliver the conceptual pivot.

**Speaker script**

This is the main idea of Part I.

A system migration is not complete because the new endpoint exists. It
is complete when producers and consumers have moved to a new, shared
agreement.

That agreement includes structure, but also behavior.

What does a missing resource mean? What is guaranteed to be present?
Which changes are intentionally breaking? How long will compatibility be
preserved? How should a consumer migrate?

Thinking this way changes our engineering objective.

Instead of trying to reproduce the legacy implementation, we identify
the legacy **agreement**, decide what survives, decide what changes, and
encode the result in the new contract.

This also gives us a much better way to discuss modernization. We do not
need to preserve every historical behavior. We need to make every
important difference **intentional**.

**Transition:** That is where contract-first enters the picture.

------------------------------------------------------------------------

## Slide 7 --- Contract-First

**Purpose:** Define contract-first as a collaborative ordering decision.

**Speaker script**

Contract-first means that the observable interface is agreed before
implementation becomes the de facto truth.

It does not mean that the backend writes a YAML file before writing Java
and then sends it to consumers.

The important word is **agreement**.

The backend brings implementation and domain knowledge. Frontend and
mobile bring consumer requirements and existing assumptions. Product or
architecture brings the intended future behavior.

Together, we review the contract, examples, error behavior, edge cases,
and migration differences before either side commits deeply to
implementation.

The backend can remain accountable for the public API. But the
integration agreement should not be created in isolation from its
consumers.

**Transition:** Contract-first tells us when to agree. Contract-driven
development tells us what to do with that agreement.

------------------------------------------------------------------------

## Slide 8 --- Contract-Driven

**Purpose:** Distinguish contract-first from contract-driven.

**Speaker script**

Contract-first is an ordering decision: contract before implementation.

Contract-driven development is an engineering system.

The contract becomes an input to multiple activities: documentation,
mocks, examples, provider verification, consumer development,
compatibility checks, and CI/CD gates.

That is the shift from a document that humans read to an artifact that
our delivery process can execute.

This matters because documentation alone cannot prevent drift.

If the implementation can change without the contract noticing, or the
contract can change without consumers noticing, we still discover
problems late.

The goal is an executable feedback loop around the shared agreement.

**Transition:** One of the first benefits of making the contract
executable is parallel development.

------------------------------------------------------------------------

## Slide 9 --- Contract → Mock → Parallel Development

**Purpose:** Introduce Microcks as an enabler, not the protagonist.

**Speaker script**

Once we have an agreed OpenAPI contract with useful examples, we can
create a realistic mock before the backend implementation is finished.

This is where Microcks enters our story.

Microcks can consume the API contract and expose a mock endpoint.
Frontend and mobile can build against that endpoint while the backend
implements the real service independently.

This changes an important dependency.

Today, consumers may wait for a backend deployment before they can
validate assumptions. With a contract-driven workflow, they can validate
the contract itself much earlier.

If the mock feels wrong to frontend or mobile, that is useful
information. We want that feedback while we are still discussing the
contract---not after the backend implementation has become expensive to
change.

Microcks is therefore not the source of truth. **The contract is the
source of truth; Microcks makes it executable.**

**Transition:** For migration, however, we need one additional
discipline before we declare the new contract correct.

------------------------------------------------------------------------

## Slide 10 --- Contract Archaeology

**Purpose:** Introduce a repeatable migration discovery process.

**Speaker script**

I call this **contract archaeology**.

Before finalizing a migrated API, we deliberately discover the behaviors
that matter.

The sequence is: **discover, compare, decide, encode, enforce.**

Discover what the legacy API actually does and what the existing
consumers depend on.

Compare that with the proposed new API.

For every meaningful difference, make a decision. Is this a behavior we
preserve? Is it intentionally changed? Do we need an adapter or
migration period?

Then encode the chosen behavior in the contract and examples.

Finally, enforce it with mocks, tests, compatibility checks, and the
delivery pipeline.

The important part is the word "decide." Contract-driven development
should not freeze the legacy system. It should make modernization
decisions explicit.

**Transition:** We need a lightweight artifact to capture those
decisions.

------------------------------------------------------------------------

## Slide 11 --- The Contract Migration Matrix

**Purpose:** Make migration disagreements operational.

**Speaker script**

The Contract Migration Matrix is intentionally simple.

For each relevant behavior, we record the legacy behavior, the existing
consumer expectation, the proposed new contract, and the decision.

For example, the legacy API might expose `customerNumber`, while the new
API uses `customerId`. That is not merely a field rename---it is a
consumer migration item.

The legacy system may return an empty array where the new model permits
`null`. We decide whether to preserve the empty array or explicitly
migrate consumers.

An unknown ID might move from a legacy 200 response to a proper 404.
Again, that can be a good change, but it should be an intentional change
with known consumer impact.

In practice I would add owner, affected consumers, target release, and
status.

The benefit is that disagreements become visible **migration
decisions**, rather than disappearing into chat messages and integration
bugs.

**Transition:** Now we can redesign the delivery workflow around earlier
decisions.

------------------------------------------------------------------------

## Slide 12 --- Move Disagreement Left

**Purpose:** Contrast late integration with early contract feedback.

**Speaker script**

The traditional flow is expensive.

Backend specification, backend implementation, deployment, consumer
integration---and only then do we discover a mismatch. That leads to a
ticket, clarification, changes, redeployment, and retesting.

The proposed flow moves the same disagreement earlier.

We propose the API, review the contract with consumers, encode examples,
publish a mock, and let frontend and mobile exercise the intended
behavior before the provider is complete.

The backend and consumer teams can then implement independently against
the same agreement.

Notice the objective: **we do not want fewer disagreements; we want
cheaper disagreements.**

A disagreement in a contract review may cost minutes. The same
disagreement discovered in mobile regression testing can cost days and
interrupt multiple teams.

**Transition:** To make this sustainable, we need a shared definition of
when a contract is actually ready.

------------------------------------------------------------------------

## Slide 13 --- Contract Ready / Contract Done

**Purpose:** Establish practical quality gates.

**Speaker script**

An API should not be considered ready simply because an OpenAPI file
exists.

"Contract Ready" means the contract is valid and sufficiently precise
for independent implementation.

That includes realistic request and response examples, explicit required
and optional properties, nullability, status codes, errors, enums,
pagination semantics, authentication behavior, migration differences,
consumer review, and a working mock.

Then we also need "Contract Done."

A backend ticket is not done merely because the implementation merged.
We want the specification, implementation, contract tests, compatibility
assessment, consumer validation, and migration decisions to agree.

This gives both sides a shared definition of integration readiness and
completion.

**Transition:** Those definitions only work if contract changes travel
through a predictable path.

------------------------------------------------------------------------

## Slide 14 --- Contract Change Protocol

**Purpose:** Recommend lightweight governance.

**Speaker script**

We do not need to start with a large API governance program.

We need a lightweight contract-change protocol.

An API change begins with a contract change in version control.
Automated validation and compatibility checks run. The mock is updated.
Affected consumers can review or validate the behavior. If there is
migration impact, the decision is recorded before the implementation is
treated as complete.

The key rule is: **review the contract change before---or at least
independently from---the implementation change.**

That lets reviewers reason about consumer impact without having to
reverse-engineer the intended API from backend code.

Governance should make delivery faster by preventing expensive
surprises. If it becomes ceremony without feedback, we have missed the
point.

**Transition:** So what does success look like?

------------------------------------------------------------------------

## Slide 15 --- Agree First. Build Independently. Verify Continuously.

**Purpose:** Close Part I and tee up Part II.

**Speaker script**

The operating model can be summarized in three lines.

**Agree first.** Make the observable behavior explicit before
implementation makes decisions expensive.

**Build independently.** Give backend, frontend, and mobile a shared
executable target so teams do not need to wait for one another.

**Verify continuously.** Use automation to detect when implementation or
contract drifts from the agreement.

The goal is not to introduce more API process. The goal is to reduce
integration friction, especially during migration.

Distance between teams should not create distance between expectations.

**One contract. Shared expectations. Independent delivery.**

Part II takes this operating model and makes it concrete: how we
integrate Microcks into Git, consumer development, backend verification,
and CI/CD.