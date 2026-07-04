const { app, BrowserWindow, Menu, shell, ipcMain, Notification } = require('electron');
const path = require('path');

const CLAUDE_URL = 'https://claude.ai';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'Claude',
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#0d0d0d',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: false,
      // Spoof as a normal browser to avoid "unsupported browser" messages
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
    autoHideMenuBar: true,
    frame: true,
    show: false,
  });

  // Only allow claude.ai navigation
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://claude.ai') || url.startsWith('https://accounts.anthropic.com') || url.startsWith('https://auth.anthropic.com')) {
      return { action: 'allow' };
    }
    // Open all other links in the default browser
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const allowed = [
      'https://claude.ai',
      'https://accounts.anthropic.com',
      'https://auth.anthropic.com',
      'https://www.anthropic.com',
    ];
    const isAllowed = allowed.some(a => url.startsWith(a));
    if (!isAllowed) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.loadURL(CLAUDE_URL);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Set minimal menu: just app controls + reload
  const menuTemplate = [
    {
      label: 'Claude',
      submenu: [
        { label: 'Recargar', accelerator: 'F5', click: () => mainWindow.webContents.reload() },
        { label: 'Nueva conversación', accelerator: 'CmdOrCtrl+N', click: () => mainWindow.loadURL(CLAUDE_URL + '/new') },
        { type: 'separator' },
        { label: 'Herramientas de desarrollo', accelerator: 'F12', click: () => mainWindow.webContents.toggleDevTools() },
        { type: 'separator' },
        { label: 'Salir', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
      ],
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Deshacer' },
        { role: 'redo', label: 'Rehacer' },
        { type: 'separator' },
        { role: 'cut', label: 'Cortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Pegar' },
        { role: 'selectAll', label: 'Seleccionar todo' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
