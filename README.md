# claude-desktop

Cliente de Electron de [Claude.ai](https://claude.ai) para Linux. Envuelve la web app en una ventana nativa, sin depender de binarios de Electron descargados por npm (usa el paquete `electron` del sistema).

## Características

- Ventana nativa con icono, menú y entrada en el launcher del sistema.
- Solo permite navegación dentro de `claude.ai` y los dominios de autenticación de Anthropic (`accounts.anthropic.com`, `auth.anthropic.com`, `www.anthropic.com`); cualquier otro enlace se abre en el navegador predeterminado.
- Contexto aislado (`contextIsolation: true`, `nodeIntegration: false`), sin `webview` ni superficie insegura expuesta.
- Atajos: `F5` recargar, `Ctrl+N` nueva conversación, `F12` DevTools, `Ctrl+Q` salir.

## Requisitos

- Linux (probado en distros basadas en Arch, con Hyprland/Sway).
- `electron` instalado vía el gestor de paquetes del sistema (no vía npm):

```bash
# Arch / Manjaro / CachyOS
sudo pacman -S electron

# Ubuntu / Debian
sudo apt install electron
```

## Instalación

```bash
git clone https://github.com/launxy/claude-desktop.git
cd claude-desktop/claude-desktop
chmod +x install.sh
./install.sh
```

Esto instala la app en `~/.local/share/claude-desktop`, crea el lanzador `claude` en `~/.local/bin` y añade una entrada `.desktop` en `~/.local/share/applications`.

Lanzar con:

```bash
claude
```

## Desinstalación

```bash
cd claude-desktop/claude-desktop
chmod +x uninstall.sh
./uninstall.sh
```

## Estructura

```
claude-desktop/
├── main.js         # Proceso principal de Electron
├── preload.js      # Script de precarga, contexto aislado
├── icon.png        # Icono de la app
├── install.sh      # Instalador
└── uninstall.sh    # Desinstalador
```

## Notas

Este proyecto no está afiliado a Anthropic. Es simplemente un empaquetado no oficial de la web app para tener un cliente de escritorio en Linux.
