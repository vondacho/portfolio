---
title: From Software Intent to Executable Agreements
date: 2026-09-18
type: article
series: Connected SDLC
topic: Executable Agreements
tags: [as-code, contract-driven, doc-as-code, living-documentation, ai, sdlc]
summary: "Software Intent as Code, Contract-Driven Development, Docs as Code and Living Documentation solve different parts of one problem. Connected, they form an engineering loop that keeps intent, agreement, implementation and evidence in the same system."
---

# From Software Intent to Executable Agreements

## Connecting Software Intent as Code, Contract-Driven Development, Docs as Code, and Living Documentation

Software development creates a great deal of knowledge before it creates
software.

We describe a problem. We explore a user journey. We discover domain
behavior. We identify rules and examples. We make architectural
decisions. We define interfaces. We establish expectations for
performance, resilience, security, observability, and operations.

Then we implement.

The difficulty is that much of the reasoning that shaped the
implementation gradually becomes disconnected from it.

Documents become snapshots. Requirements remain prose. Architecture
diagrams drift. API specifications describe an earlier intention. Tests
encode assumptions without explaining where they came from. Production
reveals behavior that no longer matches what the documentation says.

This is not simply a documentation problem.

It is a problem of maintaining the relationship between **intent,
agreement, implementation, and evidence**.

Several engineering ideas address different parts of that problem:

-   **Software Intent as Code** makes important design intent explicit,
    structured, versionable, and connected.
-   **Contract-Driven Development** turns selected parts of that intent
    into agreements the software is expected to satisfy.
-   **Docs as Code** provides an engineering substrate for versioning,
    reviewing, validating, and automating those artifacts.
-   **Living Documentation** reconnects documented intent with evidence
    from delivery and running software.

Together, they suggest something larger than any one practice.

They suggest an engineering loop in which software knowledge does not
stop being useful when coding begins.

------------------------------------------------------------------------

## Software Intent Comes Before the Contract

A contract is not the beginning of software design.

Before an API operation, acceptance criterion, SLO, or compatibility
rule can become contractual, people first need to understand what they
are trying to achieve.

That understanding may appear in many forms:

-   a problem narrative;
-   user research and Journey Mapping;
-   Event Storming;
-   Story Mapping;
-   Example Mapping;
-   Context Mapping;
-   architecture models and ADRs;
-   policies and constraints;
-   functional and non-functional requirements.

These artifacts do not all have the same authority.

Some describe evidence. Some express hypotheses. Some expose
uncertainty. Some record decisions. Some describe desired outcomes. Some
eventually define obligations.

This distinction matters.

If every piece of design knowledge becomes a contract, exploration
freezes too early.

**Software Intent as Code** provides the broader container.

Its purpose is to make important software intent structured enough that
people, tooling, and AI can inspect it, connect it, validate it, version
it, and reason over it.

``` text
Problem / Opportunity
        │
        ▼
   User Intent
        │
        ▼
   Domain Intent
        │
        ▼
  Product Intent
        │
        ▼
Architecture Intent
        │
        ▼
Delivery Intent
```

These forms of intent create the reasoning from which contracts can
emerge.

The important transition is:

> **At what point does an intention become an agreement that the
> delivered system is expected to satisfy?**

That is where Contract-Driven Development enters.

------------------------------------------------------------------------

## Contract-Driven Development Is an Execution Layer for Intent

Contract-Driven Development is often associated with APIs.

An OpenAPI specification is an obvious contract between a provider and
its consumers. It can be reviewed before implementation, used to create
simulations, checked for compatibility, and verified against the
implemented provider.

But the underlying principle is broader:

> **Make important expectations explicit, executable, and continuously
> verifiable.**

From the perspective of Software Intent as Code, a contract is therefore
a particular kind of intent.

It is intent that has crossed a threshold.

``` text
Intent
  │
  ▼
Model
  │
  ▼
Decision
  │
  ▼
Agreement
  │
  ▼
Executable Contract
```

The contract says:

**This is something we expect the delivered system to preserve.**

That expectation might concern an interface.

It might concern functional behavior.

It might concern performance, resilience, security, compatibility,
observability, or operations.

Contract-Driven Development provides the mechanism for taking those
selected expectations and placing them directly into the engineering
feedback loop.

------------------------------------------------------------------------

## API Contracts Are the Obvious Case

Consider a REST API.

The intended interface can be expressed with OpenAPI. But the effective
agreement is usually larger than the schema.

It includes realistic examples, status-code semantics, errors,
nullability, enum evolution, date and time semantics, compatibility
expectations, and assumptions already encoded by consumers.

When the contract becomes executable, the topology changes:

``` text
                   API Contract
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
        Simulation             Provider
             │                     │
             ▼                     ▼
       Consumer work         Conformance
             │                     │
             └──────────┬──────────┘
                        ▼
                    Integration
```

The contract no longer merely documents the interface.

It drives development.

Consumers can work against a simulation before the provider exists.
Providers can verify implementation against the same agreement. CI/CD
can detect incompatibility.

Integration becomes less about discovering expectations and more about
confirming them.

That is Contract-Driven Development in its most recognizable form.

------------------------------------------------------------------------

## Functional Behavior Can Become Contractual

Now consider a business requirement:

> A customer may cancel an order until shipment begins.

That statement expresses intent, but it is not yet precise enough to
become an executable agreement.

What if payment has already been captured? What happens to inventory?
Can cancellation happen twice? What if shipment begins during
cancellation? What happens if reimbursement fails?

Techniques such as Example Mapping, Specification by Example, BDD, and
Event Storming help move from broad intent toward concrete behavioral
agreements.

For example:

``` gherkin
Given an order has been paid
And shipment has not started
When the customer cancels the order
Then the order becomes cancelled
And reserved inventory is released
And reimbursement is requested
```

The progression becomes:

``` text
Business Intent
      │
      ▼
    Rules
      │
      ▼
   Examples
      │
      ▼
Behavioral Agreement
      │
      ▼
Executable Verification
```

The functional requirement has crossed from intent into contract.

The example is no longer merely documentation. It becomes part of the
definition of what must remain true.

------------------------------------------------------------------------

## Non-Functional Intent Can Cross the Same Boundary

Non-functional requirements frequently remain aspirations:

> The API should be fast.

> The service must be resilient.

> The system should be observable.

> The application must be secure.

These are useful expressions of intent, but weak contracts.

Compare "the API should be fast" with:

``` text
95% of requests complete within 300 ms
under the agreed reference workload.
```

The second statement introduces something that can be observed.

The same transformation can happen with resilience:

``` text
When dependency X exceeds the defined timeout,
the service fails within the agreed time budget,
returns the defined degraded response,
and emits the required telemetry.
```

Or observability:

``` text
Every externally initiated request propagates
a correlation identifier across participating services.
```

Or security:

``` text
Operation X requires scope Y,
rejects expired credentials,
and does not expose protected attributes.
```

These are different contract languages and require different
verification mechanisms.

But they share the same lifecycle:

``` text
Quality Intent
      │
      ▼
Measurable Expectation
      │
      ▼
Contract
      │
      ▼
Verification
      │
      ▼
Evidence
```

Contract-Driven Development therefore does not require one universal
contract format.

It requires a consistent engineering principle.

------------------------------------------------------------------------

## A Constellation of Executable Agreements

Once we widen the idea, a software system can be viewed as a
constellation of agreements.

``` text
                     SOFTWARE INTENT
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   User / Domain       Functional         Quality / NFR
      Intent             Intent              Intent
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                    AGREEMENTS
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
       API             Behaviour          Quality
    Contracts          Contracts          Contracts
 OpenAPI/AsyncAPI   Examples/Scenarios   SLOs/Policies
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                  EXECUTABLE EVIDENCE
```

Not every piece of intent should become contractual.

The design question is instead:

> **Which expectations are important enough that disagreement or drift
> would be expensive?**

Those are strong candidates for executable contracts.

------------------------------------------------------------------------

## Docs as Code Provides the Substrate

Docs as Code establishes that documentation and specifications can
participate in the same engineering practices as source code.

They can live in Git. They can be reviewed through pull requests. They
can be validated automatically. They can be linked, generated,
versioned, and participate in CI/CD.

An OpenAPI document in Git is Docs as Code.

A Markdown ADR can be Docs as Code.

An Example Mapping model represented through a versionable DSL can be
Docs as Code.

A machine-readable SLO definition can be Docs as Code.

An architecture model stored as source can be Docs as Code.

This makes Docs as Code an important **enabler**.

But a document being stored in Git does not automatically mean it drives
development. It can still become passive documentation.

Contract-Driven Development makes a stronger claim about selected
artifacts:

> **The agreement should participate in implementation and
> verification.**

The roles can therefore be distinguished:

``` text
DOCS AS CODE
Version · Review · Trace · Validate · Automate
                         │
                         ▼
SOFTWARE INTENT AS CODE
Structure and connect what we intend
                         │
                         ▼
CONTRACT-DRIVEN DEVELOPMENT
Make selected expectations executable
```

These are complementary ideas rather than competing ones.

------------------------------------------------------------------------

## From Contract to Evidence

An executable contract changes the meaning of testing.

Testing is no longer simply an activity that happens after
implementation.

It becomes a mechanism for producing **evidence about an agreement**.

``` text
Contract
   │
   ▼
Implementation
   │
   ▼
Verification
   │
   ▼
Evidence
```

For an API contract, evidence may come from provider conformance
testing.

For functional behavior, it may come from executable examples or
acceptance tests.

For performance, it may come from measurements under a reference
workload.

For resilience, it may come from controlled failure campaigns.

For security, it may come from policy validation and security testing.

For observability, evidence may eventually come from the telemetry of
the running system itself.

And verification does not end at deployment.

------------------------------------------------------------------------

## Living Documentation Closes the Loop

Documentation traditionally describes intended software.

Testing tells us something about implemented software.

Observability tells us something about running software.

Those worlds are often disconnected.

Living Documentation creates the opportunity to connect them.

``` text
Intent
  │
  ▼
Contract
  │
  ▼
Implementation
  │
  ▼
Delivery Evidence
  │
  ▼
Production Evidence
```

Now documentation can show more than the intended agreement.

It can show whether the agreement is supported by current evidence.

An API page might show that its implementation currently conforms to its
specification.

A user journey might connect to functional scenarios verifying its
critical behaviors.

An architectural component might show the SLOs associated with it and
their current production status.

A resilience expectation might link to the most recent controlled
failure campaign.

A business rule might connect to examples, tests, implementation, and
observed production behavior.

Documentation begins to answer a much more valuable question:

> **What do we currently know to be true about the system, and what
> evidence supports that claim?**

That is a substantial step beyond keeping documentation synchronized
manually.

------------------------------------------------------------------------

## The Complete Engineering Loop

The relationship between these ideas can now be expressed as one loop:

``` text
                 SOFTWARE INTENT AS CODE
                         │
                  What should be true?
                         │
                         ▼
              CONTRACT-DRIVEN DEVELOPMENT
                         │
                   What must be true?
                         │
                         ▼
                       BUILD
                         │
                   What did we build?
                         │
                         ▼
                DELIVERY VERIFICATION
                         │
                 What evidence do we have?
                         │
                         ▼
                  OBSERVABILITY
                         │
                What is actually true?
                         │
                         ▼
               LIVING DOCUMENTATION
                         │
                 What do we now know?
                         │
                         └──────────────► Intent
```

Docs as Code provides infrastructure around the loop:

``` text
Version · Review · Trace · Validate
Generate · Automate · Link
```

This creates a continuous relationship between design reasoning and
operational reality.

------------------------------------------------------------------------

## AI Makes This Connection More Important

There is another reason to structure software knowledge this way.

AI-assisted software development increases the value of explicit intent.

A coding agent can inspect source code.

But source code mainly tells it what exists.

It does not necessarily explain why the system behaves that way, which
behavior is intentional, which assumptions remain uncertain, which user
outcome matters, which domain rule justified an implementation, which
architectural boundary should be preserved, which compatibility behavior
is contractual, or which non-functional expectation must remain true.

Software Intent as Code gives AI richer design context.

Contract-Driven Development identifies expectations that must not be
casually violated.

Docs as Code makes that knowledge accessible and versionable.

Living Documentation can feed current delivery and production evidence
back into the context.

The AI development loop can therefore become:

``` text
Problem
   │
   ▼
Structured Intent
   │
   ▼
Executable Agreements
   │
   ▼
AI + Human Implementation
   │
   ▼
Verification
   │
   ▼
Production Evidence
   │
   ▼
Updated Understanding
```

AI does not eliminate the need for these artifacts.

It makes their relationships more valuable.

------------------------------------------------------------------------

## From Documentation to an Engineering Knowledge System

This suggests a broader evolution.

Documentation begins as prose.

Docs as Code brings it into the engineering workflow.

Software Intent as Code gives important design knowledge structure and
relationships.

Contract-Driven Development turns selected intent into executable
agreements.

Living Documentation reconnects those agreements to evidence from
implementation and production.

``` text
DOCUMENTATION
     │
     ▼
DOCS AS CODE
     │
     ▼
SOFTWARE INTENT AS CODE
     │
     ▼
EXECUTABLE CONTRACTS
     │
     ▼
DELIVERY + PRODUCTION EVIDENCE
     │
     ▼
LIVING DOCUMENTATION
```

The destination is not simply better documentation.

It is an **engineering knowledge system** in which humans, automation,
and AI can reason about the relationship between what we intended and
what the software actually does.

------------------------------------------------------------------------

## Conclusion: From Intent to Evidence

Software engineering has always depended on agreements.

The problem is that many of those agreements remain implicit, scattered,
or disconnected from the systems they describe.

Software Intent as Code gives us a way to structure the reasoning.

Contract-Driven Development identifies the expectations important enough
to become executable agreements.

Docs as Code gives those artifacts an engineering lifecycle.

Delivery automation provides verification.

Observability provides production evidence.

Living Documentation reconnects that evidence with the original intent.

Together, they form a continuous loop:

> **Intent → Agreement → Implementation → Evidence → Learning**

This is why Contract-Driven Development belongs naturally between
Software Intent as Code and Living Documentation.

It is the point where selected intent stops being merely descriptive and
starts participating directly in the behavior and verification of the
system.

And that may be the larger opportunity:

> **Do not merely document what software should do. Structure the
> intent, make important agreements executable, and continuously collect
> evidence about what the software actually does.**

That is how documentation starts becoming part of the engineering system
itself.
