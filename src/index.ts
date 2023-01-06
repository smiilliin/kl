// import readline from "readline";

// const interpreter = new Interpreter();

// const rl = readline.createInterface({
//   input: process.stdin,
// });

// rl.on("line", function (line) {
//   interpreter.interpretLine(line);
// }).on("close", function () {
//   process.exit();
// });
import { app, BrowserWindow, ipcMain } from "electron";
import Interpreter from "./interpreter";
import path from "path";

const interpreter = new Interpreter();

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });
  app.setAppUserModelId("KL");

  window.loadFile("./index.html");
  // window.webContents.toggleDevTools();

  ipcMain.on("line", (event, line: string) => {
    interpreter.interpretLine(line);
  });
  ipcMain.on("init", () => {
    interpreter.init();
  });
});
