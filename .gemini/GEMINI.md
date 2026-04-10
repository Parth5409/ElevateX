# Project Gemini Configuration

This file provides Gemini CLI with the baseline workflow, review standards, and security checks for this project.

## Tech Stack
- **Frontend**: React (TypeScript)
- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL + RLS)
- **AI**: Gemini API

## Core Workflow
1. **Plan first** — Use `/project-plan` before starting large features or architectural changes.
2. **Test-first** — Prefer `/tdd` for bug fixes and new functionality.
3. **Security review** — Always run `/code-review` with focus on security before committing.
4. **Surgical changes** — Keep changes focused, readable, and well-documented.

## Coding Standards
- **React**: Prefer functional components, hooks, and immutable state updates. Use shadcn/ui for components.
- **FastAPI**: Use Pydantic for request/response validation. Follow RESTful patterns.
- **Supabase**: Leverage Row Level Security (RLS) for all tables. Use `auth.uid()` for tenant isolation.
- **Python**: Follow PEP 8. Use type hints for all function signatures.

## Security Checklist
Before any commit:
- No hardcoded API keys (Gemini, Supabase) in source code.
- All external input validated via Pydantic (Backend) or Zod (Frontend).
- Supabase RLS policies verified for all new tables.
- Gemini API prompts sanitized and safe from injection.
- Error messages scrubbed of sensitive internal details.

## Delivery Standards
- Use conventional commits: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.
- Run `pytest` and `npm test` before shipping.
- Verify frontend builds with `npm run build`.

## Project Assets to Reuse
- `.gemini/agents/` — Custom agents for code review, database optimization, and planning.
- `.gemini/rules/` — Specific rules for Python, TypeScript, and Web development.
- `.gemini/commands/` — Custom slash commands for streamlined workflows.
- `.gemini/skills/` — Deep guidance for TDD, API design, and frontend patterns.
