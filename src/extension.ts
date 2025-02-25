import * as vscode from "vscode";
import { icons } from "./icons";

export function activate(context: vscode.ExtensionContext) {
  const items: vscode.StatusBarItem[] = [];

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-cmd.refresh", () => {
      while (items.length) {
        const item = items.pop();
        item?.hide();
        item?.dispose();
      }

      const config = vscode.workspace.getConfiguration("easy-cmd");

      const buttons = [...config?.buttons || []];

      if (!config.hideRefreshButton) {
        buttons.push({
          name: "$(refresh)",
          command: "#easy-cmd.refresh",
          tooltip: "Refresh buttons",
        });
      }

      if (!config.hideAddButton) {
        buttons.push({
          name: "$(plus)",
          command: "#easy-cmd.addCommand",
          tooltip: "Add new command",
        });
      }

      buttons.forEach((button: any) => {
        const item = vscode.window.createStatusBarItem(
          vscode.StatusBarAlignment.Left
        );
        item.text = button.name;
        item.command = {
          command: "easy-cmd.runcmd",
          arguments: [button.command],
          title: button.name,
        };
        item.tooltip = button.tooltip || button.command;
        if (button.color) {
          item.color = button.color;
        }
        item.show();
        items.push(item);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-cmd.addCommand", async () => {
      // Prompt for command name
      const name = await vscode.window.showInputBox({
        prompt: "Enter button label",
      });
      if (!name) {
        return;
      }

      // Prompt for command
      const command = await vscode.window.showInputBox({
        prompt: "Enter command",
      });
      if (!command) {
        return;
      }

      // Prompt for icon
      const icon = (await vscode.window.showQuickPick(icons))?.split(" ")[0];

      if (!icon) {
        return;
      }

      // Prompt for tooltip
      const tooltip = (
        await vscode.window.showInputBox({
          prompt: "Enter tooltip, Press enter for default",
        })
      )?.trim();

      if (typeof tooltip === undefined) {
        return;
      }

      // Prompt for color
      const color = await vscode.window.showInputBox({
        prompt: "Enter color (#hex or color name), Press enter for default",
      });

      if (typeof color === undefined) {
        return;
      }

      const buttons =
        vscode.workspace.getConfiguration("easy-cmd")?.buttons || [];

      buttons.push({
        name: icon === "none" ? name : `${icon} ${name}`,
        command,
        ...(color && { color }),
        ...(tooltip && { tooltip }),
      });

      vscode.workspace
        .getConfiguration()
        .update("easy-cmd.buttons", buttons, vscode.ConfigurationTarget.Global);

      vscode.commands.executeCommand("easy-cmd.refresh");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-cmd.runcmd", (cmd: string) => {
      if (cmd.startsWith("#")) {
        vscode.commands.executeCommand(cmd.slice(1));
      } else {
        const terminal =
          vscode.window.activeTerminal || vscode.window.createTerminal();

        terminal.show(true);

        if (terminal.shellIntegration) {
          terminal.shellIntegration.executeCommand(cmd);
        } else {
          terminal.sendText(cmd, true);
        }
      }
    })
  );

  vscode.commands.executeCommand("easy-cmd.refresh");
}

export function deactivate() {}
