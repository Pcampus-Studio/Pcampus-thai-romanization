#!/usr/bin/env bash
# Sync Pcampus Agent OS framework layer into an existing project.
# Does NOT overwrite product-owned files (code/, brief, goals content, ADRs, …).
#
# Usage:
#   ./scripts/upgrade-os.sh /path/to/existing-project [--dry-run] [--yes]
#
# Run from a Pcampus Agent OS clone (script location = OS root).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

TARGET=""
DRY_RUN=false
ASSUME_YES=false

usage() {
  cat <<'EOF'
Usage: upgrade-os.sh <existing-project-path> [--dry-run] [--yes]

  Sync framework layer from Pcampus Agent OS into an existing project.

  --dry-run   Show what would change; do not write files
  --yes       Skip confirmation prompt

Product-owned paths are never overwritten — see docs/06-workflows/upgrade-agent-os.md

Examples:
  ./scripts/upgrade-os.sh ../my-app --dry-run
  ./scripts/upgrade-os.sh ../my-app --yes
EOF
}

log() { echo "==> $*"; }
warn() { echo "WARN: $*" >&2; }

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --yes) ASSUME_YES=true ;;
    -h|--help) usage; exit 0 ;;
    *)
      if [[ -z "$TARGET" ]]; then
        TARGET="$arg"
      else
        echo "Unknown argument: $arg" >&2
        usage
        exit 1
      fi
      ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  usage
  exit 1
fi

TARGET="$(cd "$TARGET" 2>/dev/null && pwd)" || {
  echo "ERROR: Target directory does not exist: $1" >&2
  exit 1
}

if [[ "$TARGET" == "$OS_ROOT" ]]; then
  echo "ERROR: Target must be a different project — not the Agent OS repo itself." >&2
  exit 1
fi

if [[ ! -f "$TARGET/AGENTS.md" && ! -f "$TARGET/docs/07-backlog/goals.md" ]]; then
  echo "ERROR: Target does not look like a Pcampus project (missing AGENTS.md and docs/07-backlog/goals.md)." >&2
  echo "       For new projects use: ./scripts/bootstrap.sh <path> \"Project Name\"" >&2
  exit 1
fi

# --- rsync helpers ---
RSYNC_OPTS=(-a)
[[ "$DRY_RUN" == true ]] && RSYNC_OPTS+=(-n -v)

rsync_path() {
  local src="$1"
  local dest="$2"
  shift 2

  if [[ ! -e "$OS_ROOT/$src" ]]; then
    warn "Source path missing, skipping: $src"
    return 0
  fi

  mkdir -p "$(dirname "$dest")"
  if (($# > 0)); then
    rsync "${RSYNC_OPTS[@]}" "$@" "$OS_ROOT/$src" "$dest"
  else
    rsync "${RSYNC_OPTS[@]}" "$OS_ROOT/$src" "$dest"
  fi
}

rsync_dir() {
  local src="$1"
  local dest="$2"
  shift 2

  if [[ ! -d "$OS_ROOT/$src" ]]; then
    warn "Source directory missing, skipping: $src"
    return 0
  fi

  mkdir -p "$dest"
  if (($# > 0)); then
    rsync "${RSYNC_OPTS[@]}" "$@" "$OS_ROOT/$src/" "$dest/"
  else
    rsync "${RSYNC_OPTS[@]}" "$OS_ROOT/$src/" "$dest/"
  fi
}

# --- version stamp ---
write_version_stamp() {
  [[ "$DRY_RUN" == true ]] && return 0

  local version=""
  if git -C "$OS_ROOT" rev-parse --short HEAD >/dev/null 2>&1; then
    version="$(git -C "$OS_ROOT" rev-parse --short HEAD)"
    local tag
    tag="$(git -C "$OS_ROOT" describe --tags --always 2>/dev/null || true)"
    [[ -n "$tag" ]] && version="$tag ($version)"
  else
    version="unknown"
  fi

  printf '%s\n%s\n' "$version" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$TARGET/.pcampus-os-version"
  log "Wrote .pcampus-os-version ($version)"
}

# --- merge-required report ---
MERGE_REQUIRED=(
  "AGENTS.md — keep mission + {TEST_COMMANDS}; merge new governance/CI sections"
  "README.md — merge project-specific sections"
  "docs/00-index.md — merge project status table"
  "docs/07-backlog/goals.md — keep your goals; add state machine / DoD if missing"
  "docs/00-project-snapshot.md — fill project state (created only if missing)"
  "docs/07-backlog/changelog.md — audit trail (created only if missing)"
  ".github/ci-config.yml — keep stack test/lint commands (copy from ci-config.example.yml if new)"
  ".cursor/rules/{stack}.mdc — keep project stack rules"
  ".cursor/skills/{project}-*/ — keep project-specific skills"
)

print_merge_checklist() {
  echo ""
  echo "=== Manual merge / verify (product-owned — not overwritten) ==="
  for item in "${MERGE_REQUIRED[@]}"; do
    echo "  • $item"
  done
  echo ""
  echo "=== Suggested next steps ==="
  echo "  1. git diff — review framework updates"
  echo "  2. Merge files listed above"
  echo "  3. bash scripts/ci/governance-check.sh (optional)"
  echo "  4. Commit: G-xxx: upgrade Pcampus Agent OS"
  echo ""
  echo "Docs: docs/06-workflows/upgrade-agent-os.md"
}

# --- main sync ---
run_upgrade() {
  log "Agent OS source: $OS_ROOT"
  log "Target:   $TARGET"
  [[ "$DRY_RUN" == true ]] && log "Mode:     DRY RUN (no writes)"

  log "Syncing pcampus-* skills..."
  for skill_dir in "$OS_ROOT"/.cursor/skills/pcampus-*/; do
    [[ -d "$skill_dir" ]] || continue
    name="$(basename "$skill_dir")"
    rsync_dir ".cursor/skills/$name" "$TARGET/.cursor/skills/$name" --delete
  done

  log "Syncing Cursor rules (framework)..."
  for rule in governance security core guidelines commits testing; do
    rsync_path ".cursor/rules/${rule}.mdc" "$TARGET/.cursor/rules/${rule}.mdc"
  done
  for example in "$OS_ROOT"/.cursor/rules/stack-*.example.mdc; do
    [[ -f "$example" ]] || continue
    name="$(basename "$example")"
    rsync_path ".cursor/rules/$name" "$TARGET/.cursor/rules/$name"
  done

  log "Syncing GitHub workflows & PR template..."
  rsync_dir ".github/workflows" "$TARGET/.github/workflows"
  rsync_path ".github/pull_request_template.md" "$TARGET/.github/pull_request_template.md"
  rsync_path ".github/ci-config.example.yml" "$TARGET/.github/ci-config.example.yml"

  log "Syncing scripts..."
  rsync_dir "scripts/ci" "$TARGET/scripts/ci"
  rsync_path "scripts/bootstrap.sh" "$TARGET/scripts/bootstrap.sh"
  rsync_path "scripts/upgrade-os.sh" "$TARGET/scripts/upgrade-os.sh"

  log "Syncing process docs..."
  rsync_dir "docs/04-agents" "$TARGET/docs/04-agents"
  rsync_dir "docs/06-workflows" "$TARGET/docs/06-workflows"
  rsync_path "docs/03-architecture/design-spec.md" "$TARGET/docs/03-architecture/design-spec.md"
  rsync_path "docs/02-product/acceptance-template.md" "$TARGET/docs/02-product/acceptance-template.md"
  rsync_dir "docs/02-product/acceptance" "$TARGET/docs/02-product/acceptance"
  rsync_path "docs/assets/human-agent-cycle.png" "$TARGET/docs/assets/human-agent-cycle.png"

  log "Creating missing framework files (ignore-existing)..."
  rsync_path "docs/00-project-snapshot.md" "$TARGET/docs/00-project-snapshot.md" --ignore-existing
  rsync_path "docs/07-backlog/changelog.md" "$TARGET/docs/07-backlog/changelog.md" --ignore-existing

  write_version_stamp

  if [[ "$DRY_RUN" == true ]]; then
    log "Dry run complete — no files were modified."
  else
    chmod +x "$TARGET/scripts/ci/"*.sh 2>/dev/null || true
    chmod +x "$TARGET/scripts/bootstrap.sh" "$TARGET/scripts/upgrade-os.sh" 2>/dev/null || true
    log "Framework sync complete."
  fi

  print_merge_checklist
}

# --- confirm ---
if [[ "$ASSUME_YES" != true && "$DRY_RUN" != true ]]; then
  echo ""
  echo "This will overwrite Pcampus framework files in:"
  echo "  $TARGET"
  echo ""
  echo "Product files (code/, brief, goals, ADRs, ci-config.yml, stack rules) are NOT touched."
  echo ""
  read -r -p "Continue? [y/N] " reply
  if [[ ! "$reply" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
  fi
fi

run_upgrade
