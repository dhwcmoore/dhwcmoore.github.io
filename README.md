# Duston Moore | Formal Verification Portfolio

Public portfolio for work on formal verification, proof-carrying evidence, structural admissibility, local-to-global obstruction, claim-relative exactness, and inspectable assurance evidence.

The organising principle is simple:

> Imperfect evidence does not require imprecise inference.

Exactness here does **not** mean perfect measurement, complete models, deterministic environments, or exhaustive knowledge. It means stating exactly what a nominated claim is allowed to follow from the evidence, uncertainty, transformations, and assumptions actually declared.

A tolerance can be stated. Missing evidence can be identified. A transformation can be recorded. Once those conditions are explicit, a claim can be checked against them rather than accepted because it is plausible, locally consistent, statistically convenient, or merely "close enough".

The public work separates several obligations that are often collapsed together:

- **Assurance evidence:** when a machine-checked proof is offered as lifecycle evidence, what does it establish, what assumptions does it depend on, and what remains outside the proof? The public [DO-333 Rocq Assurance Case Study](https://github.com/dhwcmoore/do333-rocq-assurance-case-study) reconstructs selected NASA/Rockwell Collins Flight Guidance System arguments while keeping proof, evidence relevance, objective satisfaction, and certification credit distinct.
- **Structural admissibility:** can the available observation possibly determine the claim?
- **Lift-descent exactness:** does a compatible state exist, and if so, is the nominated claim uniquely determined?
- **Regional obstruction:** do locally compatible pieces actually assemble into a coherent whole?
- **Claim-relative exactness:** can a nominated claim remain determined even when the complete global state cannot be reconstructed?
- **Proof-carrying exactness:** can a result travel with evidence that an independent verifier can check?
- **Proof-carrying stream exactness:** what exactly is a receiver entitled to claim about a finite transfer?

The practical rule is equally simple: state the claim, preserve the evidence, declare the uncertainty, record every transformation, check the relevant obligation independently, and never strengthen the conclusion beyond what survives those steps.

## Site

`https://dhwcmoore.github.io/`

## Public GitHub work

`https://github.com/dhwcmoore`

## Contact

`dhwcmoore@gmail.com`
