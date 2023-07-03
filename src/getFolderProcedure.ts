import * as vscode from "vscode";
const path = require("path");

const getFolderProcedure = async (folderPathFromContextMenu: any) => {
  let directory = undefined;

  if (!folderPathFromContextMenu) {
    let value = "src/";
    let selectedWorkspace = null;

    if (vscode.window.activeTextEditor?.document.uri) {
      selectedWorkspace = vscode.workspace.getWorkspaceFolder(
        vscode.window.activeTextEditor?.document.uri
      );
      value = vscode.workspace.asRelativePath(
        vscode.window.activeTextEditor?.document.uri,
        false
      );
    }

    const directoryPath = await vscode.window.showInputBox({
      placeHolder: "Where should I place the folder?",
      value: value,
      title: "Folder path",
      validateInput: async (text: string | undefined) => {
        if (!text) {
          return "Cannot be empty";
        }
        if (text.match(/^\d/)) {
          return "Cannot start with number";
        }
      },
    });

    if (!directoryPath) {
      return;
    }

    if (selectedWorkspace) {
      folderPathFromContextMenu = vscode.Uri.file(
        path.join(selectedWorkspace.uri.fsPath, directoryPath)
      );
    } else {
      folderPathFromContextMenu = vscode.Uri.file(directoryPath);
    }
  }

  if (folderPathFromContextMenu) {
    const directoryStatistics = await vscode.workspace.fs.stat(
      folderPathFromContextMenu
    );

    if (directoryStatistics.type === vscode.FileType.Directory) {
      directory = folderPathFromContextMenu;
    } else {
      const parentDirectory = path.dirname(
        (folderPathFromContextMenu as vscode.Uri).fsPath
      );
      directory = vscode.Uri.file(parentDirectory);
    }
  }

  return directory;
};

export default getFolderProcedure;
