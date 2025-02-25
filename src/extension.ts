import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const buttons = vscode.workspace.getConfiguration("easy-cmd")?.buttons || [];
  buttons.forEach((button: any) => {
    const item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      button.priority || 100
    );
    item.text = button.name;
    item.command = {
      command: "easy-cmd.runcmd",
      arguments: [button.command],
      title: button.name,
    };
    item.tooltip = button.command;
    if (button.color) {
      item.color = button.color;
    }
    item.show();
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-cmd.runcmd", (cmd) => {
      const terminal =
        vscode.window.activeTerminal || vscode.window.createTerminal();

      terminal.show(true);

      if (terminal.shellIntegration) {
        terminal.shellIntegration.executeCommand(cmd);
      } else {
        terminal.sendText(cmd, true);
      }
    })
  );
}

export function deactivate() {}
