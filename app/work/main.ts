import { ipcMain, dialog } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as mm from "music-metadata";
import { asyncForEach } from "../functions/functions";
import { iMediaFile } from "../Intefaces/interfaces";



export function listenEvents() {
  console.log("register ipc handlers");

  ipcMain.on("openFolder", (event, arg) => {
    console.log({ arg });
    const path = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });
    console.log({ path });
    event.returnValue = path;
  });

  ipcMain.on("listFiles", async (event, arg) => {
    const apath = arg.path;
    const files = fs.readdirSync(apath);
    const filesReturn = files.map((file) => {
      //const metadata: mm.IAudioMetadata = await mm.parseFile(file);
      return {
        path: `${apath}\\${file}`,
        Artist: "",
        Title: "",
      };
    });
    const aFiles: iMediaFile[] = [];
    let i = 0;
    await asyncForEach(filesReturn, async (file: iMediaFile) => {
      if (file.path.includes(".mp3")) {
        //console.log({ file });
        const metadata: mm.IAudioMetadata = await mm.parseFile(file.path,);
        aFiles.push({
          id: i,
          path: file.path,
          Artist: metadata.common.artist,
          Title: metadata.common.title,
        });
        i++;
      }
    });
    event.returnValue = aFiles;
  });
}
