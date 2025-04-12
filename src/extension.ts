import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Folder Structure Generator" is now active!');

    let disposable = vscode.commands.registerCommand('structgen.generateFromJSON', async () => {
        try {
            // Verify workspace is open
            if (!vscode.workspace.workspaceFolders) {
                vscode.window.showErrorMessage('Please open a workspace folder first');
                return;
            }

            const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

            // Select JSON file
            const jsonFile = await vscode.window.showOpenDialog({
                canSelectMany: false,
                filters: { 'JSON Files': ['json'] },
                title: 'Select folder structure JSON file'
            });

            if (!jsonFile || jsonFile.length === 0) {
                return;
            }

            // Read and parse JSON
            const jsonContent = fs.readFileSync(jsonFile[0].fsPath, 'utf-8');
            const structure = JSON.parse(jsonContent);

            // Create progress indicator
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating folder structure",
                cancellable: false
            }, async () => {
                await createStructure(rootPath, structure);
            });

            vscode.window.showInformationMessage('Folder structure generated successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate structure: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function createStructure(basePath: string, tree: any) {
  for (const [folderName, value] of Object.entries(tree)) {
    const folderPath = path.join(basePath, folderName);
    fs.mkdirSync(folderPath, { recursive: true }); // Always create folder first

    if (typeof value === 'string' && value.endsWith('.go')) { // Your specific file extension
      // Create file directly in the current folder
      fs.writeFileSync(path.join(folderPath, value), ""); 
    } 
    else if (Array.isArray(value)) {
      // Create all files in current folder
      value.forEach(file => {
        if (typeof file === 'string' && file.endsWith('.go')) {
          fs.writeFileSync(path.join(folderPath, file), "");
        }
      });
    }
    else if (typeof value === 'object') {
      // Recurse into subfolder
      await createStructure(folderPath, value);
    }
  }
}

export function deactivate() {}