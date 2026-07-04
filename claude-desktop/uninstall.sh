#!/bin/bash
echo "🗑  Desinstalando Claude Desktop..."
rm -rf "$HOME/.local/share/claude-desktop"
rm -f "$HOME/.local/bin/claude"
rm -f "$HOME/.local/share/applications/claude.desktop"
update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true
echo "✅ Desinstalado."
