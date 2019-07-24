// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Range } from 'vscode';

interface IkeyWords {
  [key: string]: string;
}

const words: IkeyWords = {
  defmodule: `In order to create our own modules in Elixir, we use the defmodule macro. We use the def macro to define functions in that module:

	iex> defmodule Math do
	...>   def sum(a, b) do
	...>     a + b
	...>   end
	...> end
	
	iex> Math.sum(1, 2)
	3`
};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerHoverProvider('elixir', {
    provideHover(document, position, token) {
      const range: Range | undefined = document.getWordRangeAtPosition(
        position
      );
      const word: string = document.getText(range);
      return {
        contents: [words[word] || "Meh, don't know what this is 😒"]
      };
    }
  });

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "syntax-support" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello YOU!');
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
