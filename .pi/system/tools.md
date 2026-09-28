# Tools deu — Pi native + bundled

Pi core stays small. Workflow behavior lives in extensions, skills, and prompt templates.

## Built-in tools (Pi defaults)
`read`, `bash`, `edit`, `write`, `grep`, `find`, `ls`.
Use least privilege: prefer `read/grep/find/ls` for discovery; `edit/write/bash` only for explicit change steps.

## Bundled extensions (this package, no extra install)
- `todo` (pi-todo): persistent per-project tracker in `.pi/todo.json`, live TUI widget. Actions: add, update, toggle, remove, list, clear, reorder. Use for any multi-step task (3+ steps).
- `memory_write`, `memory_read`, `memory_forget`, `memory_restore`, `scratchpad`, `memory_status` (pi-memory): durable facts in `~/.pi/agent/memory/MEMORY.md`, daily logs in `daily/`, scratchpad in `SCRATCHPAD.md`. Search via `qmd` is opt-in. Remember user preferences across sessions; never store secrets/tokens/PII beyond allowlisted fields.

## Tool discipline
- No string SQL, no `eval`, no shell injection, no path traversal. Validate input, encode output.
- Truncate tool output at 50 KB / 2000 lines; tell the model where the full output was saved.
- Strip leading `@` from path args. Share per-file mutation queue for read-modify-write.
- Signal errors by throwing — returning a value never sets `isError`.
