import * as vscode from "vscode";
import { paramCase } from "change-case";
const path = require("path");
const fs = require("fs");

export interface ICreateFolderDTO {
  folderName: string;
  directoryPath: string;
}

const createFolder = async ({
  folderName,
  directoryPath,
}: ICreateFolderDTO) => {
  try {
    const folderNameSnakeCase = paramCase(folderName);
    const configuration = vscode.workspace.getConfiguration();

    const workspaceFolderPath =
      vscode.workspace.workspaceFolders![0].uri.fsPath;
    const settingsPath = path.join(
      workspaceFolderPath,
      ".vscode",
      "settings.json"
    );
    let settings;

    // .vscode/settings.json 파일 읽기
    const data = fs.readFileSync(settingsPath, "utf8");
    settings = JSON.parse(data);

    let filesToCreate: any[] = [];

    // console.log(settings);

    const fileSettingList = settings.quickFileSetting;
    console.log(fileSettingList);

    fileSettingList.forEach((el: any) => {
      filesToCreate.push({
        ...(el.extension && { extension: el.extension }),
        ...(el.name && { name: el.name }),
        content: el.template.replaceAll("${folderName}", folderName),
      });
    });

    if (filesToCreate.length === 0) {
      return;
    }

    const directory = path.join(directoryPath, folderName);

    await vscode.workspace.fs.createDirectory(vscode.Uri.file(directory));

    for (let fileToCreate of filesToCreate) {
      await vscode.workspace.fs.writeFile(
        vscode.Uri.file(
          path.join(
            directory,
            fileToCreate.name
              ? fileToCreate.name
              : folderName + fileToCreate.extension
          )
        ),
        Buffer.from(fileToCreate.content, "utf-8")
      );
    }
  } catch (e: any) {
    throw e;
  }
};

export default createFolder;
