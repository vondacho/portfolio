---
title: "Example Mapping as Code: Behavioral Contracts for Delivery"
date: 2026-09-12
type: article
series: Connected SDLC
topic: Example Mapping
tags: [example-mapping, as-code, bdd, testing, contract-driven]
summary: "Stories, rules, examples and questions with stable identities become a versioned behavioural contract that drives executable tests and makes QA a co-author of the specification."
---

# Example Mapping as Code: Behavioral Contracts for Delivery

## Abstract

Example Mapping clarifies a story through rules, concrete examples, and unanswered questions. Cucumber describes concrete examples as a strong basis for acceptance tests and presents the map as a short, focused conversation before development begins.

Example Mapping as Code turns that conversation into a versioned behavioral contract. Stories, rules, examples, and questions receive stable identities and remain connected to the Story Map, domain events, bounded contexts, tickets, and executable tests. Validation can detect rules without examples, unresolved questions in committed work, and automated scenarios that no longer reflect the accepted map.

The result is a connected flow from product intent to executable evidence. QA becomes a co-author of the specification, developers receive precise behavioral material, and AI can implement and test against examples that the team has reviewed. Git holds accepted behavior as the source of truth, while GitOps-style automation regenerates test assets and compares evidence with intent.

## The decision that Example Mapping supports

Example Mapping helps a team answer a practical question: does everyone understand this story well enough to develop it?

The map uses four elements:

| Element | Purpose |
| --- | --- |
| Story | Names the behavior or outcome under discussion |
| Rule | Expresses a constraint or acceptance criterion |
| Example | Illustrates a rule with a concrete case |
| Question | Preserves uncertainty or an assumption that needs an answer |

The value comes from the conversation, not the colored cards. A short title may conceal contradictory interpretations. A rule may sound clear until the group tries to produce examples. A question makes uncertainty visible without forcing a premature answer.

## The behavioral digital contract

Example Mapping as Code records the accepted state of that conversation.

| Contract field | Why it matters | Possible consumer |
| --- | --- | --- |
| Story identifier | Connects behavior to Story Mapping and ticketing | Product and delivery tools |
| Rule identifier and text | Defines a durable constraint | Developers, tests, policy engines |
| Example identifier | Keeps a case stable while wording improves | BDD scenarios and test data |
| Given context | Describes relevant starting state | Fixtures, mocks, environments |
| Action or trigger | Identifies the behavior exercised | API calls, commands, events |
| Expected outcome | States observable evidence | Assertions and monitoring |
| Question status and owner | Makes uncertainty actionable | Product and domain experts |
| Source revision | Shows which accepted map generated an artifact | CI and audit history |

The as-code representation should preserve the map’s semantics without forcing every example into executable syntax immediately.

## A small notation example

The `.examplemap` notation records the story and the conversation around it. A rule holds concrete examples, and each example can express repeatable `given`, `when`, and `then` steps that naturally feed executable scenarios.

```examplemap
examplemap "Title" {
  story "Redeem a voucher" {
    as   "Returning customer"
    want "to apply a voucher code at checkout"
    so   "I pay the price I was promised"
  }

  rule "A voucher must not be expired" {
    example "A voucher that expired yesterday is refused" {
      given "a voucher SUMMER10 that expired on 2026-08-21"
      when  "the voucher is applied"
      then  "the voucher is refused"
    }
  }
}
```

This fragment comes from the supplied `.examplemap` notation. Give the LLM the [Example Mapping doctrine](https://doc-em.obya.ch/doctrine), [notation](https://doc-em.obya.ch/notation), and [DSL reference](https://doc-em.obya.ch/dsl) as explicit generation instructions. The [Example Mapping as Code tool](https://doc-em.obya.ch) keeps this source synchronized with the visual map.

Notation formalises stories, rules, examples, and questions. Doctrine requires concrete cases and preserved uncertainty: AI must not answer red questions, invent accepted examples, or prematurely replace the `.examplemap` discovery source with generated `.feature` output. **Notation protects syntax. Doctrine protects the practice.**

## Connection to Story Mapping and ticketing

Story Mapping selects a story for a release slice. The story keeps the identifier that Example Mapping uses. A ticket generated from that story can show:

- The rules that define its scope
- The examples that illustrate each rule
- Open questions that block or qualify readiness
- Links to domain events and bounded contexts
- The source revision of the Example Map

The ticket coordinates work. The Example Map governs the behavioral conversation. This division prevents acceptance criteria from becoming duplicated prose maintained independently in several systems.

When a rule changes, impact analysis can identify its examples, generated scenarios, tests, tickets, and implementation components.

## Connection to Event Storming

Event Storming provides rich input for examples.

Policies often become rules. Alternate paths and hotspots become candidate examples or questions. Commands and events help define the action and observable outcome. Process Modelling exposes boundary cases that a happy-path story description might miss.

The flow also works in reverse. Example Mapping may reveal that the team uses two meanings for the same event, or that a rule implies an event missing from the process model. The corrected domain understanding should flow back to Event Storming and DDD.

## From examples to executable evidence

Concrete examples can become acceptance tests, but the transformation should remain visible and governed.

```text
Reviewed example
  -> executable scenario
  -> test data and environment assumptions
  -> automated result
  -> evidence linked to the source example
```

A generated scenario should retain the example identifier. CI can then detect:

- An accepted example without an executable scenario
- A scenario whose source example was removed
- A rule whose examples all fail
- A committed story with unresolved blocking questions
- A test result produced from an outdated model revision

Cucumber’s documentation describes Gherkin as structured plain text and Example Mapping as a basis for acceptance tests. This makes Gherkin a natural downstream format when it fits the team, but the Example Map can remain independent of any single test framework.

## Contract examples beyond the user interface

Behavioral examples also improve technical contracts.

An OpenAPI description can define the shape of an HTTP API and support generated client or server code. AsyncAPI defines a communication contract for event-driven senders and receivers. Example Mapping adds business meaning to those structural contracts.

For example:

- OpenAPI can state that a response contains a status field.
- An Example Map can state when the business sets that status to `rejected`.
- AsyncAPI can define the payload for `BookingRejected`.
- An example can show the rule and prior events that make the rejection valid.

Structure and behavior reinforce each other. Neither should silently substitute for the other.

## Enforcing the contract

As-Code makes several quality policies automatable:

- Every rule in a committed story has at least one example or a reviewed exception.
- Every blocking question has an owner and target date.
- Examples use terms defined in the relevant bounded context.
- Generated scenarios retain the source example identifier.
- Test results report the model revision they exercised.
- Deleted or changed examples trigger review of downstream automation.
- AI-generated examples remain proposals until a human accepts them.

Validation should not reward quantity. Ten repetitive examples do not create better understanding. The team needs representative cases, boundaries, important exceptions, and examples that distinguish competing interpretations.

## Git as source of truth and the GitOps extension

Git should hold the accepted behavioral contract: stories, rules, examples, questions, status, and evidence links. The visual Example Map remains the collaborative surface. Its normalized representation records who accepted the behavior and which revision developers, QA tooling, and AI must use.

A GitOps-style loop can pull that revision and:

- Regenerate scenarios, fixtures, mocks, and acceptance documentation.
- Run the relevant checks when a rule or example changes.
- Publish results with the exact Example Map revision.
- Detect scenarios or tests that no longer reference an accepted example.
- Raise a review when executable behavior and declared intent diverge.

The loop must not turn generated scenarios or existing tests into a competing source of business truth. Test evidence can challenge the specification, and production evidence can reveal a missing case, but people decide whether the accepted behavior should change.

## The role of AI

AI can help the team explore the example space. It can suggest boundary conditions, combine rules, detect contradictory outcomes, and translate accepted examples into a test framework.

The model should label those suggestions as generated. Product, domain, QA, and development participants decide which examples express intended behavior.

Once accepted, the examples become strong context for a coding agent. The agent receives concrete starting states and observable outcomes rather than a vague instruction to handle edge cases. It can generate code, tests, or mocks and compare the result with the behavioral contract.

## The wiki after Example Mapping as Code

Use the wiki to explain the team’s BDD approach, define facilitation guidance, document test strategy, and publish readable collections of important examples. Avoid copying current rules and acceptance examples into manually maintained pages.

The wiki projection should link to the accepted Example Map and indicate its revision. Questions that need organizational discussion can appear in narrative form, but their state and ownership remain structured.

## How actors adapt

| Actor | New contribution | Benefit |
| --- | --- | --- |
| Product manager | Confirms story scope and intended outcomes | Fewer late scope disputes |
| Domain expert | Validates rules and domain language | Business meaning survives automation |
| QA specialist | Co-authors examples before development | Test strategy begins during specification |
| Developer | Challenges feasibility and observability | Clearer implementation constraints |
| Test automation engineer | Links scenarios to example identifiers | Traceable executable evidence |
| Architect | Connects examples to interfaces and components | Behavioral impact becomes visible |
| AI agent | Proposes cases and implements accepted behavior | Better input and objective checks |

## Change management

Many organizations introduce Example Mapping as another ceremony or ask QA to document examples after refinement. Both approaches miss the value.

Begin with stories that repeatedly create misunderstandings or production defects. Run a short cross-functional conversation before development. Store the result as code and generate the ticket’s acceptance section. Do not ask participants to maintain both.

Introduce automation gradually:

1. Validate the four element types and stable references.
2. Show rules and questions directly in ticketing.
3. Generate executable scenario skeletons from accepted examples.
4. Link test results back to example identifiers.
5. Add change-impact checks for committed stories.

Useful measures include unresolved questions at development start, defects caused by misunderstood rules, rule coverage by accepted examples, and the delay between an example change and updated automation.

## Conclusion

Example Mapping as Code establishes a behavioral contract between product, domain, development, and QA. It connects a Story Map story to rules, concrete cases, executable scenarios, and test evidence.

This contract gives developers and their tools the material needed to implement observable behavior. AI can propose and automate more work, but the accepted examples remain the human-reviewed definition of what right means.

## References

- [Cucumber: Example Mapping](https://cucumber.io/docs/bdd/example-mapping/)
- [Cucumber: Gherkin reference](https://cucumber.io/docs/gherkin/reference/)
- [Example Mapping as Code](https://doc-em.obya.ch)
- [OpenGitOps principles](https://opengitops.dev/)
- [OpenAPI description structure](https://learn.openapis.org/specification/structure.html)
- [AsyncAPI document](https://www.asyncapi.com/docs/concepts/asyncapi-document)
