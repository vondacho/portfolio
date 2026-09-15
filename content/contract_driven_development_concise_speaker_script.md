---
title: Contract-Driven Development — Concise Speaker Script (Part I)
date: 2026-09-12
type: script
series: Contract-Driven Development
topic: Contract-Driven Development — Part I
tags: [contract-driven, api, openapi, migration]
summary: "One core message and a few speaking cues per slide for Part I."
---
# Contract-Driven Development — Condensed Speaker Script

Aligned exactly with the 15-slide **One Contract. Shared Expectations.** deck.

## Slide 1 — One Contract. Shared Expectations.

**Core message:** Migration is the migration of an agreement, not only an API.

- One shared executable contract.
- OpenAPI + examples + Microcks + CI/CD.
- Goal: independent delivery without expectation drift.

**Key line:** **One contract. Shared expectations.**

## Slide 2 — Our migration has three sources of truth

**Core message:** Legacy behavior, consumer assumptions and the new API can disagree.

- Legacy = actual behavior.
- Apps = encoded expectations.
- New REST API = intended agreement.

**Key line:** **Discover disagreement while it is still cheap.**

## Slide 3 — “But the old API did…”

**Core message:** Most migration friction is contract ambiguity appearing late.

- Optional vs always-present fields.
- Status-code semantics.
- Renames and date/time assumptions.

**Key line:** **Nobody is necessarily wrong; they are working from different contracts.**

## Slide 4 — Your API contract is bigger than the OpenAPI file

**Core message:** OpenAPI is the anchor, not the whole agreement.

- Add examples and behavioral semantics.
- Observe legacy behavior.
- Surface consumer assumptions.

**Key line:** **Your API contract is bigger than the OpenAPI file.**

## Slide 5 — Migration = migrating an agreement

**Core message:** Use contract archaeology: discover, compare, decide, encode, enforce.

**Key line:** **The new API is done when the new agreement is explicit, shared and verified.**

## Slide 6 — Contract-first ≠ contract-driven

**Core message:** Contract-first defines order; contract-driven makes the agreement executable.

**Key line:** **The contract should drive delivery, not merely document it.**

## Slide 7 — One contract lets teams build independently

**Core message:** Shared executable expectations enable parallel work.

- Consumers develop against the mock.
- Backend implements against the contract.
- Both converge on the same agreement.

**Key line:** **Build independently from the same contract.**

## Slide 8 — Move disagreement left

**Core message:** Shift contract disagreement before implementation and integration.

**Key line:** **We don't need fewer disagreements. We need cheaper disagreements.**

## Slide 9 — Use a Contract Migration Matrix

**Core message:** Make migration differences explicit and owned.

**Key line:** **Turn “who is right?” into “what migration decision are we making?”**

## Slide 10 — Define “Contract Ready” before coding starts

**Core message:** “YAML exists” is not Contract Ready.

- Semantics and examples are explicit.
- Legacy differences are known.
- Consumers have reviewed it.
- A Microcks mock is available.

**Key line:** **API Ready ≠ the YAML exists.**

## Slide 11 — And define “Contract Done”

**Core message:** Backend completion alone is not integration completion.

**Key line:** **Backend done is not integration done.**

## Slide 12 — Put the contract in the delivery path

**Core message:** Make contract checks part of the normal delivery path.

**Key line:** **Review the contract change before reviewing its implementation.**

## Slide 13 — When does contract-driven development pay off?

**Core message:** The approach pays off with team distance and integration risk.

**Key line:** **Our migration sits in the strong-fit zone.**

## Slide 14 — A pragmatic rollout — start with one painful boundary

**Core message:** Pilot the method on one painful migration boundary and measure the outcome.

**Key line:** **Start small, make the agreement executable, measure the friction removed.**

## Slide 15 — Agree First. Build Independently. Verify Continuously.

**Three messages:**

1. Migration is migration of an agreement, not only an API.
2. Shared executable expectations enable independent delivery.
3. Contract checks keep the agreement alive through delivery.

**Closing line:** **Agree first. Build independently. Verify continuously.**
