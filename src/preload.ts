import { contextBridge, ipcRenderer } from "electron";

const api: Api = {
  runProgram: (programCode: string) => {
    const lines = programCode.split("\n");

    lines.forEach((line) => {
      console.log(line);
      ipcRenderer.send("line", line);
    });
    ipcRenderer.send("init");
  },
};

contextBridge.exposeInMainWorld("api", api);
