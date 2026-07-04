#!/bin/bash
set -e

INSTALL_DIR="$HOME/.local/share/claude-desktop"
BIN_DIR="$HOME/.local/bin"
DESKTOP_DIR="$HOME/.local/share/applications"

echo "📦 Instalando Claude Desktop..."

# Comprobar electron del sistema
if ! command -v electron &> /dev/null; then
  echo "❌ Electron no encontrado. Instálalo primero:"
  echo "   Arch/Manjaro:  sudo pacman -S electron"
  echo "   Ubuntu/Debian: sudo apt install electron"
  exit 1
fi

mkdir -p "$INSTALL_DIR"
cp main.js preload.js icon.png "$INSTALL_DIR/"

mkdir -p "$BIN_DIR"
cat > "$BIN_DIR/claude" << 'LAUNCHER'
#!/bin/bash
exec electron "$HOME/.local/share/claude-desktop/main.js" "$@"
LAUNCHER
chmod +x "$BIN_DIR/claude"

mkdir -p "$DESKTOP_DIR"
cat > "$DESKTOP_DIR/claude.desktop" << DESKTOP
[Desktop Entry]
Version=1.0
Type=Application
Name=Claude
Comment=Cliente nativo de Claude.ai
Exec=$BIN_DIR/claude %U
Icon=$INSTALL_DIR/icon.png
Terminal=false
Categories=Network;InstantMessaging;
StartupWMClass=claude
DESKTOP

chmod +x "$DESKTOP_DIR/claude.desktop"
update-desktop-database "$DESKTOP_DIR" 2>/dev/null || true

echo ""
echo "✅ Instalado. Lanza con: claude"
