// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const pascalCase = require('change-case').pascalCase;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "react-component-gen" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
    //     // The code you place here will be executed every time your command is executed

    //     // Display a message box to the user
    //     vscode.window.showInformationMessage('Hello World!');
    // });

    let disposable = vscode.commands.registerCommand('extension.genComponent', function (target) {
      // The code you place here will be executed every time your command is executed

      return vscode.window.showInputBox({
        prompt: "Enter Component name",
      })
      .then(name => {
        if (!name) {
          return;
        }
        if(!target) {
          return;
        }
        const componentName = pascalCase(name);
        let componentPath = target.path;

        if(!fs.lstatSync(target.path).isDirectory()) {
          componentPath = path.dirname(target.path)
        }
        
        if (target.path.match(/components(|\/)$/)) {
          componentPath = path.join(target.path, componentName); 
          fs.mkdirSync(componentPath);  
          
          console.log('created directory', componentName);
        }

        const requirePath = componentPath.substr(componentPath.indexOf("components/"));

        const componentTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, "templates", "component.hbs")).toString());
        const componentTestTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, "templates", "componentTest.hbs")).toString());

        fs.writeFileSync(path.join(componentPath, `${componentName}.jsx`), componentTemplate({ componentName, requirePath }));
        fs.writeFileSync(path.join(componentPath, `${componentName}.scss`), "");
        
        const testPath = path.join(componentPath, "__tests__");
        if(!fs.existsSync(testPath)) {
          fs.mkdirSync(testPath);
        }
        
        fs.writeFileSync(path.join(testPath, `${componentName}.test.js`), componentTestTemplate({ componentName, requirePath }));    
      })
  });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;