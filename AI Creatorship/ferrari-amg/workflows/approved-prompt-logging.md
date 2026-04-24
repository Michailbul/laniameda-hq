---
kind: workflow
id: approved-prompt-logging
title: Approved Prompt Logging
applies_to: image
model: all
---
# Approved Prompt Logging

## Rule

Only winning generations get logged as durable prompt threads. Do not archive every attempt as if it worked.

## What To Save

When Michael confirms a result is a keeper, update or create the relevant `prompt-thread` file with:

- the exact prompt used
- the reference/start-frame path
- the model
- the variation heading marked with `★` if it is the current favorite
- one sentence on why it worked

## What Not To Save

- failed prompts with no diagnostic value
- generic summaries of a prompt
- prompts missing the actual copy-paste body
