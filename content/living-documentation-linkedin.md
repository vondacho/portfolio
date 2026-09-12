---
title: Living Documentation
date: 2026-09-12
type: linkedin
series: Connected SDLC
topic: Living Documentation
tags: [living-documentation, doc-as-code, observability]
summary: Documentation describes the system we intended; incident responders face the one that is running. Three realities to connect.
---

# Living Documentation

Software documentation usually describes the system we intended to build.

Incident responders must deal with the system we actually delivered and the system that is operating now.

That gap matters.

Doc as Code provides part of the answer. It makes architecture, contracts, decisions, journeys, and examples versioned, reviewable, and machine readable. Git becomes the source of truth, and automation can validate and publish these digital contracts.

Living Documentation goes further.

It continuously connects three realities:

- Intended software: What did we mean to build?
- Delivered software: What did we build and deploy?
- Observed software: What is happening now?

This suggests a new constellation of tooling: documentation hubs that federate knowledge from codebases, CI and CD platforms, deployed environments, service catalogs, and observability systems.

The incident investigation opportunity is especially compelling.

Imagine an incident context pack assembled automatically when a production problem begins. It could connect the affected customer journey with current topology, recent deployments, configuration and feature flag changes, related contracts, SLOs, dashboards, runbooks, owners, and correlated telemetry.

The investigation becomes structured around four questions:

1. What was expected?
2. What is happening?
3. What changed?
4. What evidence explains the difference?

Add a time aware view, and responders could reconstruct the intended, delivered, and observed system at the moment the first symptom appeared.

Incident findings would then flow back into architecture, contracts, tests, runbooks, and observability requirements.

My strong message pair is this:

Doc as Code makes software intent versioned, reviewable, and machine readable.

Living Documentation continuously reconciles that intent with delivered and observed reality.

I believe the first practical product may be an incident lens over one critical customer journey, rather than another enterprise documentation portal.

Where would you start: drift detection, impact analysis, or incident investigation?

#LivingDocumentation #DocsAsCode #SoftwareArchitecture #PlatformEngineering #SRE #Observability #GitOps #AI
