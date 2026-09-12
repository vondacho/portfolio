---
title: Microcks Integration — Presentation Script (Part II)
date: 2026-09-12
type: script
series: Contract-Driven Development
topic: Microcks Integration — Part II
tags: [contract-driven, microcks, api, mocking]
summary: "Full speaker notes for Part II, with Q&A talking points and a closing statement."
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

# Part II --- From Contract to Capability: Integrating Microcks

## Slide 1 --- From Contract to Capability

**Purpose:** Reconnect to Part I and introduce the implementation focus.

**Speaker script**

Part I established the operating principle: agree first, build
independently, and verify continuously.

Part II is about making that practical with Microcks.

The goal is not simply to install a new tool. The goal is to connect the
contract to the moments where teams make decisions.

We want the OpenAPI contract and its examples to drive three
capabilities: a mock that consumers can use, conformance tests that
providers can run, and a delivery gate that prevents accidental drift.

So the progression is straightforward: **contract, mock, implement,
verify, gate.**

**Transition:** Let's start with where Microcks belongs in the
architecture.

------------------------------------------------------------------------

## Slide 2 --- Microcks Becomes the Shared Contract Runtime

**Purpose:** Establish the target architecture.

**Speaker script**

Git remains where the contract is authored and reviewed.

Microcks sits downstream from that source of truth and turns the
contract into runtime capabilities.

For frontend and mobile, it provides a mock endpoint based on the agreed
contract and examples.

For backend, it provides conformance testing against a deployed
implementation.

For CI/CD, it provides a machine-readable pass or fail signal that can
participate in release decisions.

This is why I describe Microcks as a **shared contract runtime**.

It does not replace Git, OpenAPI review, or team ownership. It
operationalizes the agreement across the delivery lifecycle.

**Transition:** That separation between Git and Microcks is important
enough to make explicit.

------------------------------------------------------------------------

## Slide 3 --- Git Remains the Source of Truth

**Purpose:** Define the contract publication flow.

**Speaker script**

I recommend that teams continue to author the API contract in the same
version-controlled workflow as other source artifacts.

A pull request changes the OpenAPI specification and examples.
Validation runs. Review happens. The contract is merged. Then automation
imports or synchronizes the artifact into Microcks.

Microcks should consume the contract; it should not become the primary
place where the contract is manually edited.

This gives us traceability. We know which commit changed behavior, who
reviewed it, what compatibility discussion happened, and which version
was published.

The exact automation can depend on our platform model. We can use
Microcks import mechanisms, APIs, or `microcks-cli` where appropriate.

The principle matters more than the mechanism: **a contract reaches
Microcks through the reviewed Git path.**

**Transition:** But importing an OpenAPI schema alone does not
automatically produce a useful simulation.

------------------------------------------------------------------------

## Slide 4 --- Examples Turn a Schema Into a Useful Simulation

**Purpose:** Explain why examples are central to Microcks value.

**Speaker script**

A schema tells us what is structurally valid.

Examples tell us what we expect an interaction to look like.

That distinction is especially important during migration.

We should encode the cases that usually create friction: missing fields,
empty collections versus `null`, 404 versus legacy 200 behavior, date
and timezone semantics, enum evolution, and realistic error responses.

Microcks can use the contract and examples to expose useful mocks.

So examples should not be treated as decorative documentation. They are
part of our executable specification.

A mock with only a perfect happy path can actually hide migration risk.
The valuable mock is the one that lets consumers exercise the behaviors
we have explicitly agreed.

**Transition:** With those examples in place, the consumer workflow
changes significantly.

------------------------------------------------------------------------

## Slide 5 --- Nearshore Consumer Workflow

**Purpose:** Show how frontend/mobile use Microcks day to day.

**Speaker script**

This is one of the highest-value changes for our nearshore frontend and
mobile teams.

The contract is proposed and reviewed. Examples are agreed. Microcks
publishes a stable mock endpoint.

The consumer team configures its API base URL to point to that mock and
starts development.

If an expected behavior is missing or incorrect, the team raises the
mismatch immediately. We update the agreement before both sides have
invested heavily in incompatible implementations.

When the real backend becomes available, the consumer changes the
endpoint from mock to real.

The important design goal is **one client, two endpoints**. Switching
from Microcks to the real service should not require rewriting client
logic.

This gives the nearshore team independence without inventing its own
mock behavior.

**Transition:** In parallel, the backend gets a complementary workflow.

------------------------------------------------------------------------

## Slide 6 --- Backend Workflow: Prove Conformance

**Purpose:** Explain provider-side contract testing.

**Speaker script**

For backend, the contract becomes a verification target.

The backend builds the service and deploys it to a preview or test
environment.

Microcks then exercises that deployed endpoint according to the API
contract.

If the implementation conforms, the pipeline continues. If it does not,
we have useful feedback before promotion.

A failed test can mean two different things.

The implementation may be wrong relative to the agreed contract. In that
case, fix the implementation.

Or the contract itself may need to change because we discovered a
legitimate design issue. In that case, we return to the contract
workflow and make that decision explicitly.

What we should avoid is silently changing implementation behavior and
allowing the specification to drift behind it.

**Transition:** To make that repeatable, we connect the verification to
CI/CD.

------------------------------------------------------------------------

## Slide 7 --- Put It in CI/CD

**Purpose:** Show the automation pattern.

**Speaker script**

A contract gate should be boring, repeatable, and visible.

A typical pipeline can validate the contract, build the provider, deploy
a preview environment, invoke Microcks tests---commonly through
`microcks-cli` or the relevant automation interface---and collect the
result.

A failure blocks promotion. A pass allows the pipeline to continue.

The detailed report should remain accessible from the pull request or
pipeline so developers can understand what failed.

For machine-to-machine authentication, use dedicated service accounts
rather than personal credentials.

The exact command will depend on service name, version, test endpoint,
and test strategy. The important architectural point is that **contract
conformance becomes a normal delivery signal**, just like unit tests or
static analysis.

**Transition:** We also need to be deliberate about which environments
are stable and which are ephemeral.

------------------------------------------------------------------------

## Slide 8 --- Environment Model

**Purpose:** Separate consumer mock stability from provider test
dynamism.

**Speaker script**

I recommend separating two concerns.

The first is a **shared mock plane**. Frontend and mobile need a stable
URL backed by versioned contracts and agreed scenarios. They should not
have to chase a different mock URL for every backend branch.

The second is a **provider verification plane**. Backend pull requests
can deploy ephemeral or preview environments. Microcks tests those
environments and attaches the result to the delivery workflow.

This gives us stability where consumers need stability and ephemerality
where backend delivery benefits from it.

Branch-specific mocks can still exist when there is a real need to
preview a proposed contract change. But they should be intentional, not
the default consumer experience.

**Transition:** Once Microcks participates in delivery, we need to treat
it as platform infrastructure.

------------------------------------------------------------------------

## Slide 9 --- Integrate Safely

**Purpose:** Cover security and access without turning the deck into an
infrastructure manual.

**Speaker script**

Microcks is now part of the development and delivery path, so access and
credentials deserve the same discipline as the rest of our platform.

Human access should integrate with our identity model, for example SSO
or OIDC where applicable.

CI/CD should use named service accounts with least privilege.

Credentials for private Git repositories, secured APIs, or test
endpoints should come from the platform's secret-management
mechanism---not be embedded in API specifications or pipeline source.

Network policy also matters. Microcks must be able to reach the preview
endpoints it is expected to test, but that does not mean it needs broad
network access.

The principle is straightforward: **make contract testing automated
without making credentials or connectivity informal.**

**Transition:** Tooling also fails when nobody knows who owns which part
of the workflow.

------------------------------------------------------------------------

## Slide 10 --- Operating Model and Ownership

**Purpose:** Prevent Microcks from becoming an unowned platform tool.

**Speaker script**

Microcks does not remove ownership. It makes ownership boundaries more
visible.

The backend team owns contract quality from the provider side,
meaningful examples, and fixes when implementation does not conform.

Frontend and mobile participate in consumer review, identify missing
scenarios, and provide early feedback on proposed behavior.

The platform team owns the Microcks runtime, CI/CD integration,
authentication, connectivity, and operational reliability.

API governance or architecture can provide conventions, compatibility
rules, and an escalation path for important breaking changes.

The shared responsibility is the contract-change review and the
migration decision.

If everyone assumes "the Microcks team" owns contract quality, the tool
will become shelfware. The contract remains a product-team
responsibility.

**Transition:** We should introduce this model incrementally.

------------------------------------------------------------------------

## Slide 11 --- Rollout in Three Layers

**Purpose:** Recommend a pragmatic adoption sequence and metrics.

**Speaker script**

I would not roll out every capability across every API at once.

Start with one painful migration API.

**Phase one: simulate.** Import the contract, improve the examples,
publish a realistic mock, and connect frontend and mobile.

This alone tests whether early consumer feedback reduces integration
friction.

**Phase two: verify.** Deploy the provider to a preview environment, run
Microcks conformance tests from CI, and attach the result to the pull
request or pipeline.

**Phase three: govern.** Add compatibility rules, service accounts,
ownership conventions, and metrics once the workflow has demonstrated
value.

Measure outcomes, not tool usage.

Useful signals are fewer integration defects found late, fewer
clarification and rework tickets, shorter time from contract-ready to
consumer integration, and more provider conformance failures caught
before release.

**Transition:** That leaves us with a simple integration pattern.

------------------------------------------------------------------------

## Slide 12 --- Contract → Mock → Implement → Verify → Gate

**Purpose:** Close Part II with the operational model.

**Speaker script**

The full pattern is now simple.

**Contract:** agree on observable behavior and realistic examples.

**Mock:** make that behavior available immediately to frontend and
mobile.

**Implement:** allow backend and consumers to build independently.

**Verify:** test the real provider against the same agreement.

**Gate:** prevent accidental contract drift from reaching production
unnoticed.

Microcks is successful when teams stop discovering contract drift during
late integration.

The tool is not the objective. The objective is earlier feedback,
independent delivery, and a shared understanding that survives the
migration.

So the final message across both presentations is:

**One contract. Executable expectations.**

------------------------------------------------------------------------

# Optional Q&A Talking Points

## "Does this mean the backend loses ownership of the API?"

No. Backend can remain accountable for the public API and its
implementation. Contract-driven development distinguishes
**implementation ownership** from **agreement participation**. Consumers
should participate early when a contract change affects them.

## "Are we trying to preserve all legacy behavior?"

No. The objective is not legacy compatibility at any cost. Contract
archaeology makes differences explicit so we can deliberately
**preserve, adapt, deprecate, or break** behavior.

## "Why not just let frontend create its own mocks?"

Consumer-owned mocks are useful for isolated tests, but they can encode
the consumer's assumptions rather than the shared agreement. A Microcks
mock generated from the reviewed contract gives teams a common
behavioral target.

## "Is OpenAPI enough?"

OpenAPI is the foundation for the REST API contract, but useful
contract-driven development also needs meaningful examples and explicit
semantics around errors, nullability, status codes, enums, pagination,
dates, and migration behavior.

## "Does every pull request need frontend/mobile approval?"

Not necessarily. Consumer review should be proportional to impact.
Automated compatibility checks and clear ownership can keep
non-impacting changes lightweight. The goal is earlier feedback, not a
new approval bottleneck.

## "What happens when the implementation reveals that the contract is wrong?"

That is expected. Change the contract through the reviewed contract
workflow, update examples and migration decisions, republish it, and
then bring implementation and consumers back into conformance. The
important thing is to avoid silent drift.

## "Where should we pilot this?"

Choose one migration API with recurring integration friction, an active
frontend or mobile consumer, and enough upcoming change to demonstrate
the benefit. Avoid starting with either the easiest API or the entire
API estate.

------------------------------------------------------------------------

# Closing statement

Contract-driven development is not primarily about OpenAPI, Microcks, or
another layer of governance.

It is about changing **when** we discover that two teams understood the
same interface differently.

During migration, those differences already exist. Our choice is whether
we discover them deliberately while they are still cheap---or
accidentally during integration when they are expensive.

**Agree first. Build independently. Verify continuously.**
