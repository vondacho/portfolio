---
title: Microcks Integration — Concise Speaker Script (Part II)
date: 2026-09-12
type: script
series: Contract-Driven Development
topic: Microcks Integration — Part II
tags: [contract-driven, microcks, api, mocking]
summary: One core message per slide for Part II and three messages to remember.
---

# Contract-Driven Development --- Concise Speaker Script

> **Format:** one core message + a few speaking cues per slide.\
> **Target pace:** roughly 45--75 seconds per slide.\
> **Rule:** explain the diagram; do not read the slide.

------------------------------------------------------------------------

# Part II --- Integrating Microcks

## 1 --- From Contract to Capability

**Core message:** Part I defined the operating model. Part II makes it
executable.

**Contract → Mock → Implement → Verify → Gate**

Microcks connects the contract to the development and delivery workflow.

## 2 --- Shared Contract Runtime

**Core message:** Microcks operationalizes the contract across teams.

-   Git/OpenAPI remains the source.
-   Consumers get mocks.
-   Backend gets conformance tests.
-   CI/CD gets a quality signal.

**Key line:** **Don't just install Microcks; connect it to decision
points.**

## 3 --- Git Remains the Source of Truth

**Core message:** Author and review contracts in Git; publish them to
Microcks.

**PR → validate → review → merge → import → mock/test**

-   Traceable.
-   Reviewable.
-   Automatable.

**Key line:** **Microcks consumes the contract; it does not replace
contract ownership.**

## 4 --- Examples Are Executable Behavior

**Core message:** Schemas define validity; examples make useful behavior
executable.

Focus examples on migration friction:

-   missing/optional fields;
-   `null` vs empty;
-   errors and status codes;
-   dates;
-   enums;
-   realistic edge cases.

**Key line:** **A mock is only as useful as the examples behind it.**

**Developer note:** We already have Spring Boot stubs. Microcks gives us
a lighter progression: examples → dispatch rules → response templates →
Groovy/JavaScript. Keep coded stubs for cases that genuinely require
application-level simulation.

## 5 --- Nearshore Consumer Workflow

**Core message:** Frontend/mobile should not wait for backend
availability.

-   Review contract.
-   Consume stable Microcks mock.
-   Build and validate assumptions.
-   Raise mismatches early.
-   Switch base URL to the real API later.

**Key line:** **One client. Two endpoints. No rewrite.**

## 6 --- Backend Workflow

**Core message:** The real implementation must prove it satisfies the
agreement.

**Build → preview deployment → Microcks test → pass/fail**

If it fails: - fix implementation; or - explicitly change the contract.

**Key line:** **Never let implementation silently redefine the
contract.**

## 7 --- CI/CD

**Core message:** Make contract verification a normal pipeline gate.

-   Deploy preview.
-   Run Microcks tests / CLI.
-   Publish the result.
-   Fail → stop promotion.
-   Pass → continue.

**Key line:** **Contract conformance becomes as normal as unit tests.**

## 8 --- Environment Model

**Core message:** Consumers need stability; provider verification
benefits from ephemerality.

-   **Shared Microcks mock:** stable consumer endpoint.
-   **Preview API:** temporary backend environment.
-   Microcks verifies previews against the same contract.

**Key line:** **Stable mock, ephemeral provider.**

## 9 --- Security and Access

**Core message:** Treat Microcks as delivery-platform infrastructure.

-   SSO/OIDC for people.
-   Service accounts for automation.
-   Secrets outside specifications and pipelines.
-   Least-privilege network access.

Keep this boring and standardized.

## 10 --- Ownership

**Core message:** Tool ownership and contract ownership are different.

-   Backend: provider contract quality and implementation.
-   FE/mobile: consumer review and scenarios.
-   Platform: Microcks runtime and CI integration.
-   Governance: conventions and compatibility.

**Key line:** **Microcks exposes ownership; it doesn't replace it.**

## 11 --- Rollout

**Core message:** Start small and prove the workflow.

**1. Simulate** --- one migration API + realistic mock.\
**2. Verify** --- provider tests in CI.\
**3. Govern** --- compatibility, ownership and metrics.

Measure: - late integration defects ↓ - rework ↓ - integration lead time
↓ - pre-release detection ↑

**Key line:** **Start with one painful migration API.**

## 12 --- Contract → Mock → Implement → Verify → Gate

**Core message:** This is the complete integration pattern.

-   **Contract:** agree.
-   **Mock:** make it available.
-   **Implement:** work independently.
-   **Verify:** prove conformance.
-   **Gate:** prevent drift.

**Final close:**\
**Microcks is not the objective. Earlier feedback is.**

**One contract. Executable expectations.**

------------------------------------------------------------------------

# Three Messages to Remember

If time is short, reduce both presentations to these three statements:

1.  **Migration is the migration of an agreement---not only an API.**
2.  **Move disagreement left: make expectations executable before
    integration.**
3.  **Use Microcks to turn the contract into mocks, verification and
    delivery gates.**

**Final line:** **Agree first. Build independently. Verify
continuously.**
