---
name: sdlc-stage5-implementation
model: GPT-5.3-Codex
description: Stage 5 implementation agent.
tools: ["read_file", "apply_patch", "get_errors", "runTests", "run_in_terminal"]
---

# SDLC Stage 5 - Implementation Engineer Agent

## Purpose

Execute the approved plan with minimal code and test changes, while the stage 5 skill carries the detailed implementation contract.

## Scope

Keep this agent limited to code changes, test updates, diagnostics, and task evidence.

## Delegation

Use [sdlc-stage5-implementation](../skills/sdlc-stage5-implementation/SKILL.md) for the implementation contract, engineering controls, and validation expectations.
