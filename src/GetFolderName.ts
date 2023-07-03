import { window } from "vscode";

const getFolderName = async (): Promise<string | undefined> => {
  const result = await window.showInputBox({
    placeHolder: "폴더 이름이 뭔가요?",
    title: "Folder Name",
    validateInput: (text: string | undefined) => {
      if (!text) {
        return "빈 이름은 불가능합니다.";
      }
      if (text.indexOf(" ") >= 0) {
        return "공백이 포함된 폴더 이름은 불가능합니다.";
      }
      if (text.match(/^\d/)) {
        return "숫자로 시작하는 폴더이름은 불가능합니다.";
      }
      return null;
    },
  });

  return result;
};

export default getFolderName;
