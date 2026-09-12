---
title: Living Documentation and the Gap Between Software Intent and Reality
date: 2026-09-12
type: article
series: Connected SDLC
topic: Living Documentation
tags: [living-documentation, doc-as-code, observability, architecture]
summary: "Connect intended, delivered and observed software so teams understand both what the system should be and what it has become — including incident context packs."
---

# Living Documentation and the Gap Between Software Intent and Reality

*How Doc as Code can connect design decisions, delivery evidence, and runtime behavior*

**Living Documentation gives teams a continuously assembled view of the software they intended to build, the software they delivered, and the software that is operating now.**

Software documentation usually begins with good intentions. Teams record the domain, design an architecture, define contracts, and capture important decisions. Delivery then accelerates. Code changes, dependencies move, configuration diverges, and production develops behaviors that no document anticipated. The documentation remains available, but confidence in it decreases.

This is the gap that Living Documentation aims to solve. Its purpose is not simply to keep pages fresh. It connects documented intent with evidence from implementation, delivery, and operations, so that teams can understand both what the system should be and what it has become.

Doc as Code provides an essential foundation. It makes software knowledge versioned, reviewable, and machine readable. Living Documentation builds on that foundation by assembling a current view of the system from the sources that create and operate it.

## Software has more than one reality

A useful model starts with three complementary views. Each view answers a different question, and no single view can explain the system on its own.

| **View**           | **Question**                  | **Representative sources**                                                    |
|--------------------|-------------------------------|-------------------------------------------------------------------------------|
| Intended software  | What did we mean to build?    | Domain models, architecture, ADRs, API and event contracts, journeys, stories |
| Delivered software | What did we build and deploy? | Source code, dependencies, builds, tests, artifacts, manifests, configuration |
| Observed software  | What is happening now?        | Logs, metrics, traces, events, SLOs, topology, incidents                      |

Traditional documentation focuses mainly on intent. Service catalogs focus on ownership and deployed components. Observability tools focus on runtime behavior. Delivery platforms know which artifact reached each environment. These perspectives often live in separate products and use different identifiers, which forces people to rebuild the connections mentally.

Living Documentation makes those connections explicit. A service page, for example, can connect its domain purpose, source repository, API contract, deployment history, current version, upstream and downstream dependencies, SLOs, dashboards, runbooks, and recent incidents. Each element retains a link to its authoritative source.

## Doc as Code provides the intent layer

Doc as Code applies software engineering practices to the knowledge that shapes a system. Teams keep documentation close to the code or in linked repositories. Git records its history. Pull requests review changes. Automation validates formats and publishes views. GitOps can extend the same model into delivery.

The most valuable content goes beyond prose. Domain models, C4 descriptions, PlantUML diagrams, OpenAPI and AsyncAPI contracts, GraphQL schemas, WSDL files, event storming models, story maps, example maps, ADRs, and policy definitions all carry structured intent. They form digital contracts that tools can validate and AI can interpret.

A representative repository might organize this material by concern:

```text
docs/domain                  *.ddd, *.ddm
docs/system/c4               *.likec4
docs/system/uml              *.puml
docs/system/api/openapi      *.yaml
docs/system/api/asyncapi     *.yaml
docs/system/api/graphql      *
docs/system/api/wsdl         *
docs/journeys                *.eventstorm
docs/stories                 *.storymap, *.examplemap
```

This repository does not need to contain every operational fact. It establishes a versioned intent layer and stable identifiers that other systems can reference. Living Documentation then connects those identifiers to delivery and runtime evidence.

## Living Documentation is a reconciliation capability

The word living should have a precise meaning. A document becomes living when automation can refresh it, trace each statement to a source, show the time and version to which it applies, and expose divergence between expected and actual behavior.

That reframes documentation from a publishing activity into a reconciliation capability. The system continuously compares intent, delivery, and observation. It can identify an API operation that exists in code but not in the contract, a runtime dependency absent from the architecture, a deployed artifact that differs from the expected Git revision, or a critical customer journey with no useful telemetry.

The goal is not perfect synchronization. Software contains ambiguity, temporary states, and legitimate exceptions. The goal is visible and explainable divergence. Teams should be able to tell whether a difference represents planned evolution, an accepted exception, incomplete documentation, or an operational defect.

## A new constellation of tooling

This model suggests a new tooling landscape. The documentation hub becomes a federated view rather than another destination where teams copy information. It assembles content from systems that already govern the work and preserves provenance instead of hiding it.

| **Capability**    | **What it connects**                                         | **Opportunity**                                                |
|-------------------|--------------------------------------------------------------|----------------------------------------------------------------|
| Knowledge graph   | Domains, teams, services, APIs, events, data, infrastructure | Reveal ownership, dependencies, and impact paths               |
| Evidence pipeline | Repositories, CI, CD, environments, telemetry                | Refresh documentation from lifecycle events                    |
| Drift detection   | Contracts, architecture rules, deployments, runtime topology | Surface meaningful differences before they become surprises    |
| Time aware views  | Commits, releases, configuration, telemetry                  | Reconstruct the system at a chosen moment                      |
| Grounded AI       | Intent and operational evidence with provenance              | Answer questions and propose hypotheses with traceable support |

The hub can offer several lenses over the same connected model. Architects may inspect conformance and evolution. Product teams may follow a journey from intent to telemetry. Developers may assess the impact of a contract change. Auditors may trace a control from policy to evidence. Operators may investigate a production symptom without first locating a dozen disconnected systems.

## Incident investigation is the proving ground

Incidents expose the cost of fragmented knowledge. Responders need context immediately, but they often begin by asking who owns the affected component, which version is deployed, what changed recently, how services depend on one another, and where the relevant dashboard or runbook lives. Each answer may require a different interface and a different vocabulary.

Living Documentation can assemble an incident context pack as soon as an alert, SLO breach, or incident declaration occurs. The pack should connect the symptom to the system's intended behavior and recent history.

- Affected customer journeys and business capabilities
- Current service topology and observed runtime dependencies
- Recent code, configuration, infrastructure, deployment, and feature flag changes
- Deployed artifact versions and their source revisions
- Related API and event contracts, SLOs, dashboards, runbooks, and owners
- Correlated logs, metrics, traces, anomalies, and relevant past incidents

With this context, tooling can organize an investigation around four questions: What was expected? What is happening? What changed? What evidence explains the difference? This structure reduces the time spent gathering context and helps teams test hypotheses against both design intent and production evidence.

### The system time machine

A particularly valuable opportunity is a system time machine. Most tools show current state. Incident analysis often requires the state at the first symptom, the deployment immediately before it, and the intended model that applied at that time.

A time aware documentation hub could reconstruct the architecture, versions, configuration, feature flags, ownership, contracts, and observed dependencies for any relevant moment. Responders could compare the system before and after a regression. Post incident reviewers could examine the evidence available to the team at the time, rather than relying on today's corrected view.

### Incidents should improve the documentation

The relationship also works in reverse. An incident creates new knowledge about failure modes, hidden dependencies, weak signals, missing runbooks, and invalid assumptions. The post incident workflow should feed those findings back into the intent layer.

A newly discovered dependency can update the architecture model. A weak alert can become a better SLO or telemetry requirement. An undocumented recovery step can update the runbook. A contract ambiguity can become an executable example or test. This closes the learning loop between operations and design.

## AI can participate when the evidence is connected

Making lifecycle knowledge available as code gives AI a useful role across discovery, delivery, and operations. In a Living Documentation environment, AI can answer cross system questions, summarize relevant changes, identify likely impact paths, and propose investigation hypotheses.

The quality of those answers depends on grounding. Every claim should point to its source, version, environment, and observation time. The system should distinguish recorded facts from inferred relationships and proposed explanations. Access controls must follow the underlying sources. Without these properties, AI risks producing a convincing story rather than reliable engineering evidence.

The strongest opportunity is therefore not a chatbot placed in front of scattered tools. It is a connected evidence model that allows AI and people to reason over the same traceable representation of the system.

## A practical path to adoption

Teams do not need to build the complete vision at once. A narrow, high value path can establish the identifiers and automation patterns that later use cases will reuse.

- Choose a bounded domain or critical customer journey.
- Put its architecture, contracts, decisions, and examples under version control.
- Connect services to repositories, owners, deployments, dashboards, and runbooks.
- Capture deployment and configuration changes as time stamped evidence.
- Compare intended dependencies with observed runtime topology.
- Generate an incident context pack and measure how it changes investigation work.

The first useful product may therefore be an incident lens over one important journey, rather than an enterprise documentation portal. It creates visible operational value while building the connected model required for broader architecture, delivery, compliance, and AI use cases.

## Documentation becomes operational

Doc as Code makes software intent versioned, reviewable, and machine readable. Living Documentation continuously reconciles that intent with delivered and observed reality.

Together, they turn documentation into part of the software system's operating model. Documentation can expose drift, preserve history, accelerate investigation, and channel production learning back into design. The result is more than current pages. It is a continuously evolving representation of the software and the evidence that explains it.
