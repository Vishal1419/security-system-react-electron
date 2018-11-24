const electron = require('electron');
const isDev = require('electron-is-dev');
// Module to control application life.
const { app, BrowserWindow } = electron;

const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  if (isDev) {
    process.env.NODE_ENV = 'development';
  } else {
    process.env.NODE_ENV = 'production';
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 400,
    width: 600,
    icon: path.join(__dirname, 'assets/icons/win/64x64.ico'),
  });
  mainWindow.maximize();
  mainWindow.setMenu(null);
  // and load the index.html of the app.
  const startUrl = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production'
    ? `file://${__dirname}/react-build/index.html`
    : process.env.ELECTRON_START_URL || 'http://localhost:3000';

  //mainWindow.loadURL(startUrl);
  const ses = mainWindow.webContents.session;
  ses.setProxy({ proxyRules: 'direct://' }, () => {
    mainWindow.loadURL(startUrl);
    mainWindow.show();
  });

  if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    const installExtension = require('electron-devtools-installer').default;
    const REDUX_DEVTOOLS = require('electron-devtools-installer').REDUX_DEVTOOLS;

    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// app.on('activate', function () {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (mainWindow === null) {
//         createWindow()
//     }
// });
