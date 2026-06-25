# Lean Inception To Spec Kit

Use this reference when Lean Inception outputs must drive Spec Kit or another spec-driven development flow.

## Core idea

Lean Inception is the discovery and alignment layer. Spec Kit is the specification and execution layer. Do not skip from workshop notes to implementation. First translate the Lean Inception artifacts into a structured discovery handoff, then feed that handoff into the repository's Spec Kit workflow.

If a repository contains `.specify/`, `.specify/templates/`, `specs/`, or existing feature folders, inspect those local conventions before writing final output.

## Recommended flow

1. Run or synthesize Lean Inception.
2. Create a discovery handoff for the MVP, usually MVP1 only.
3. Use the handoff to start or refine `/specify`.
4. Use Lean Inception trade-offs, risks, constraints, and confidence notes during `/plan`.
5. Use the sequencer, dependencies, and MVP boundary to inform `/tasks`.
6. Implement only after the spec, plan, and tasks are coherent and testable.

## Artifact mapping

| Lean Inception output | Spec Kit use |
| --- | --- |
| Product vision | Feature summary, value proposition, problem statement |
| Is / Is not / Does / Does not | Scope, non-goals, boundaries, exclusions |
| Business objectives | Success criteria, measurable outcomes, prioritization rationale |
| Trade-offs | Product constraints, quality attributes, planning decisions |
| Personas | Actors, user roles, stakeholders |
| Empathy maps | User needs, pains, context, accessibility or usability concerns |
| User journeys | Primary user scenarios, flows, acceptance scenario seeds |
| Feature brainstorming | Functional requirement candidates |
| Feature-to-journey mapping | Requirement traceability and scenario coverage |
| Confidence review | Risks, assumptions, research items, clarification needs |
| Effort/business/UX marks | Prioritization and MVP rationale |
| Sequencer | MVP boundary, delivery phases, dependencies, task sequencing |
| MVP Canvas | `/specify` input brief and validation strategy |
| Cost and schedule | Planning assumptions and constraints |
| Showcase feedback | Stakeholder decisions, open questions, changes to scope |

## Discovery gate before `/specify`

Proceed to `/specify` when the handoff includes:

- MVP proposal.
- Target personas or user roles.
- Main journeys or scenarios.
- MVP feature list tied to journeys.
- Explicit non-goals and future increments.
- Expected outcome or learning.
- Metrics or evidence needed to validate the MVP.
- Major assumptions, risks, dependencies, and constraints.
- Open questions that do not block writing a useful spec.

Pause for more discovery when:

- The MVP has no specific target persona.
- The proposed scope tries to satisfy every persona or journey.
- Features are not mapped to user journeys or business objectives.
- There is no measurable outcome, learning goal, or validation metric.
- Low-confidence work dominates MVP1.
- Critical legal, compliance, security, data, or operational risks are unknown.
- Stakeholders disagree on what the product is or is not.

## Discovery handoff template

Use this structure for a Spec Kit-ready handoff:

```markdown
# Discovery Handoff - [Feature/Product]

## Context
[Why this initiative exists, what triggered it, and what decision the MVP should support.]

## Product Vision
[One concise product vision statement.]

## MVP Proposal
[What MVP1 validates and why this is the smallest useful slice.]

## Target Personas
- [Persona/role]: [goal, pain, context, reason this persona matters for MVP1]

## Objectives And Success Criteria
- Objective: [business/user objective]
  Success signal: [metric or observable evidence]

## Scope
### In MVP1
- [Feature/capability tied to persona and journey]

### Not In MVP1
- [Explicit exclusion or future increment]

## Primary Journeys
### [Journey name]
- Actor: [persona]
- Trigger: [what starts the journey]
- Steps: [short sequence]
- MVP support: [where MVP1 helps]

## Requirement Seeds
- [The system/product should enable persona X to do Y so that Z.]

## Validation Plan
- Hypothesis: [assumption to validate]
- Metric/evidence: [how it will be measured]
- Threshold or decision rule: [continue, pivot, stop, or expand]

## Risks, Assumptions, And Dependencies
- Risk: [risk] - mitigation or research item: [action]
- Assumption: [assumption] - evidence needed: [evidence]
- Dependency: [dependency] - owner or next step: [owner/action]

## Sequencer Summary
- MVP1: [features]
- Next increment candidates: [features, clearly marked as provisional]

## Open Questions
- [Question] - blocks `/specify`? [yes/no]
```

## Writing `/specify` input

When turning the handoff into a Spec Kit specify prompt:

- Start from the MVP proposal, not the full product vision.
- Include personas, journeys, scope, non-goals, metrics, and open questions.
- Express requirements in user-observable behavior.
- Preserve assumptions as assumptions; do not silently convert them into facts.
- Keep future increments out of MVP1 unless the user explicitly asks to specify them.
- Avoid technical solution details unless Lean Inception identified them as constraints.

Suggested prompt shape:

```text
Use this Lean Inception discovery handoff to create a Spec Kit feature specification for MVP1. Keep the specification focused on user-observable behavior, explicit non-goals, measurable success criteria, assumptions, risks, and open questions. Do not include future increments as MVP requirements unless they are required for viability.

[paste handoff]
```

## Planning handoff

During `/plan`, carry forward:

- Technical and business trade-offs.
- Non-negotiable constraints.
- Confidence review notes.
- Dependencies between features.
- Data, integration, security, privacy, compliance, or operational risks.
- Cost/schedule assumptions from the MVP Canvas.

If a technical plan contradicts a workshop trade-off, call out the conflict and ask for a product decision before continuing.

## Tasks handoff

During `/tasks`, use the sequencer:

- Generate MVP1 tasks first.
- Preserve dependency order.
- Split tasks by user-visible capability where possible.
- Add validation tasks for metrics, events, analytics, or evidence collection.
- Add research tasks for low-confidence assumptions before build tasks that depend on them.
- Keep future increments as parked backlog unless requested.

## Quality checklist

Before handing off to implementation, check:

- Every MVP requirement traces to a persona, journey, objective, or MVP Canvas block.
- Every journey has at least one acceptance scenario or success signal.
- Every metric has a collection method or follow-up task.
- Non-goals are explicit enough to prevent scope creep.
- High-risk assumptions are visible in research, plan, or tasks.
- Future increments are labeled as provisional.
- Stakeholder decisions from the showcase are reflected.
