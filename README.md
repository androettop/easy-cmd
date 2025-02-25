# easy-cmd

easy-cmd is a Visual Studio Code extension that provides easy-to-configure command buttons in the status bar. With this extension, you can quickly run shell commands in the active terminal with a single click.

## Features

- **Custom Command Buttons:**  
  Easily define buttons that appear in the status bar, each executing a specific shell command.

- **Customizable Appearance:**  
  Configure the name and color of each button to suit your preferences.

- **Simple Configuration:**  
  Configure your buttons via the VS Code settings with an intuitive JSON schema.

## Installation

1. **Via the VS Code Marketplace:**

   - Open Visual Studio Code.
   - Navigate to the Extensions view by clicking on the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS).
   - Search for `"easy-cmd"` and click **Install**.

2. **From Source:**
   - Clone the repository.
   - Run `npm install` to install dependencies.
   - Compile the extension using `npm run compile` or start in watch mode with `npm run watch`.
   - Press `F5` in VS Code to launch the extension in a new Extension Development Host window.

## Configuration

The extension allows you to define a list of buttons via the VS Code settings. To configure your command buttons, add or modify the `easy-cmd.buttons` property in your `settings.json` file. Each button is an object with the following properties:

- **name** (`string`):  
  The label of the button displayed in the status bar. Icons can be used in button names, see the [VS Code Icons](https://code.visualstudio.com/api/references/icons-in-labels) documentation for a list of available icons.

- **color** (`string`, optional):  
  The color of the button text.

- **command** (`string`):  
  The shell command to execute when the button is clicked.

### Example Configuration

```json
{
  "easy-cmd.buttons": [
    {
      "name": "$(repo-pull) Pull",
      "color": "green",
      "command": "git pull"
    },
    {
      "name": "$(repo-push) Push",
      "command": "git push"
    }
  ]
}
```

![screnshot](https://github.com/androettop/easy-cmd/raw/master/screenshot.png)

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or would like to contribute code, please:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.
