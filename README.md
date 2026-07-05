# github-desktop

Cliente de Electron para navegar por [GitHub](https://github.com) en Linux como app de escritorio. Empaqueta la web en una ventana nativa usando el `electron` del sistema (no el binario descargado por npm).

> Nota: no tiene relación con la app oficial "GitHub Desktop" de GitHub Inc. Es un wrapper propio de la web.

## Características

- Ventana nativa con icono, menú y entrada en el launcher del sistema.
- Tema oscuro (`#0d1117`, el color oficial de GitHub) desde el arranque.
- Solo permite navegación dentro de `github.com`, `gist.github.com` y `github.blog`; cualquier otro enlace se abre en el navegador predeterminado.
- Contexto aislado (`contextIsolation: true`, `nodeIntegration: false`), sin `webview` ni superficie insegura expuesta.
- Atajos: `F5` recargar, `Ctrl+H` ir al inicio, `F12` DevTools, `Ctrl+Q` salir.

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
git clone https://github.com/launxy/github-desktop.git
cd github-desktop/GitHub-desktop
chmod +x install.sh
./install.sh
```

Esto instala la app en `~/.local/share/github-desktop-electron`, crea el lanzador `github-app` en `~/.local/bin` y añade una entrada `.desktop` en `~/.local/share/applications`.

Lanzar con:

```bash
github-app
```

## Desinstalación

```bash
cd github-desktop/GitHub-desktop
chmod +x uninstall.sh
./uninstall.sh
```

## Estructura

```
GitHub-desktop/
├── main.js         # Proceso principal de Electron
├── preload.js      # Script de precarga, contexto aislado
├── icon.png        # Icono de la app
├── install.sh      # Instalador
└── uninstall.sh    # Desinstalador
```

## Notas

Este proyecto no está afiliado a GitHub ni a Microsoft. Es un empaquetado no oficial de la web para tener un cliente de escritorio en Linux.
