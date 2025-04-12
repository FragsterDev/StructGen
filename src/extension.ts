// import * as vscode from 'vscode';
// import * as fs from 'fs';
// import * as path from 'path';

// export function activate(context: vscode.ExtensionContext) {
//     console.log('Extension "Folder Structure Generator" is now active!');

//     let disposable = vscode.commands.registerCommand('structgen.generateFromJSON', async () => {
//         try {
//             // Verify workspace is open
//             if (!vscode.workspace.workspaceFolders) {
//                 vscode.window.showErrorMessage('Please open a workspace folder first');
//                 return;
//             }

//             const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

//             // Select JSON file
//             const jsonFile = await vscode.window.showOpenDialog({
//                 canSelectMany: false,
//                 filters: { 'JSON Files': ['json'] },
//                 title: 'Select folder structure JSON file'
//             });

//             if (!jsonFile || jsonFile.length === 0) {
//                 return;
//             }

//             // Read and parse JSON
//             const jsonContent = fs.readFileSync(jsonFile[0].fsPath, 'utf-8');
//             const structure = JSON.parse(jsonContent);

//             // Create progress indicator
//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Generating folder structure",
//                 cancellable: false
//             }, async () => {
//                 await createStructure(rootPath, structure);
//             });

//             vscode.window.showInformationMessage('Folder structure generated successfully!');
//         } catch (error) {
//             vscode.window.showErrorMessage(`Failed to generate structure: ${error instanceof Error ? error.message : String(error)}`);
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// async function createStructure(basePath: string, tree: any) {
//     for (const [key, value] of Object.entries(tree)) {
//         const pathName = path.join(basePath, key);
        
//         // Check if key has a file extension
//         const hasExtension = path.extname(key) !== '';
        
//         if (hasExtension) {
//             // This is a file - write the content
//             const fileContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
//             fs.writeFileSync(pathName, fileContent);
//         } else {
//             // This is a folder - create it
//             fs.mkdirSync(pathName, { recursive: true });
            
//             if (Array.isArray(value)) {
//                 // Handle array items
//                 for (const item of value) {
//                     if (typeof item === 'string') {
//                         // Simple string file names
//                         fs.writeFileSync(path.join(pathName, item), "");
//                     } else if (typeof item === 'object' && item !== null) {
//                         // Object with filename: content pairs
//                         for (const [fileName, fileContent] of Object.entries(item)) {
//                             const filePath = path.join(pathName, fileName);
//                             const content = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent, null, 2);
//                             fs.writeFileSync(filePath, content);
//                         }
//                     }
//                 }
//             } else if (value !== null && typeof value === 'object') {
//                 // Recursively process the subtree
//                 await createStructure(pathName, value);
//             }
//         }
//     }
// }




// export function deactivate() {}

// import * as vscode from 'vscode';
// import * as fs from 'fs';
// import * as path from 'path';

// export function activate(context: vscode.ExtensionContext) {
//     console.log('Extension "Folder Structure Generator" is now active!');

//     let disposable = vscode.commands.registerCommand('structgen.generateFromJSON', async () => {
//         try {
//             // Get the current focused directory
//             const basePath = await getCurrentFocusedDirectory();
//             if (!basePath) {
//                 vscode.window.showErrorMessage('Could not determine the current focused directory');
//                 return;
//             }

//             // Select JSON file
//             const jsonFile = await vscode.window.showOpenDialog({
//                 canSelectMany: false,
//                 filters: { 'JSON Files': ['json'] },
//                 title: 'Select folder structure JSON file'
//             });

//             if (!jsonFile || jsonFile.length === 0) {
//                 return;
//             }

//             // Read and parse JSON
//             const jsonContent = fs.readFileSync(jsonFile[0].fsPath, 'utf-8');
//             const structure = JSON.parse(jsonContent);

//             // Create progress indicator
//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Generating folder structure",
//                 cancellable: false
//             }, async () => {
//                 await createStructure(basePath, structure);
//             });

//             vscode.window.showInformationMessage('Folder structure generated successfully!');
//         } catch (error) {
//             vscode.window.showErrorMessage(`Failed to generate structure: ${error instanceof Error ? error.message : String(error)}`);
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// // Function to get the currently focused directory
// async function getCurrentFocusedDirectory(): Promise<string | undefined> {
//     // Try to get directory from active file
//     const activeEditor = vscode.window.activeTextEditor;
//     if (activeEditor) {
//         const filePath = activeEditor.document.uri.fsPath;
//         return path.dirname(filePath);
//     }
    
//     // Try to get directory from selected item in explorer
//     if (vscode.workspace.workspaceFolders) {
//         // If there's a focused file in the explorer
//         const explorerSelection = await getExplorerSelection();
//         if (explorerSelection) {
//             return explorerSelection;
//         }
        
//         // Default to first workspace folder
//         return vscode.workspace.workspaceFolders[0].uri.fsPath;
//     }
    
//     return undefined;
// }

// // Helper function to get the current explorer selection
// async function getExplorerSelection(): Promise<string | undefined> {
//     // This part uses internal VS Code API and may not be reliable across versions
//     try {
//         // Get the explorer context from VS Code's command API
//         const uri = await vscode.commands.executeCommand<vscode.Uri>('_workbench.explorer.getContext');
//         if (uri) {
//             const stat = await vscode.workspace.fs.stat(uri);
//             if (stat.type === vscode.FileType.Directory) {
//                 return uri.fsPath;
//             } else {
//                 return path.dirname(uri.fsPath);
//             }
//         }
//     } catch (error) {
//         console.error('Failed to get explorer selection:', error);
//     }
//     return undefined;
// }

// async function createStructure(basePath: string, tree: any) {
//     for (const [key, value] of Object.entries(tree)) {
//         const pathName = path.join(basePath, key);
        
//         // Check if key has a file extension
//         const hasExtension = path.extname(key) !== '';
        
//         if (hasExtension) {
//             // This is a file - write the content
//             const fileContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
//             fs.writeFileSync(pathName, fileContent);
//         } else {
//             // This is a folder - create it
//             fs.mkdirSync(pathName, { recursive: true });
            
//             if (Array.isArray(value)) {
//                 // Handle array items
//                 for (const item of value) {
//                     if (typeof item === 'string') {
//                         // Simple string file names
//                         fs.writeFileSync(path.join(pathName, item), "");
//                     } else if (typeof item === 'object' && item !== null) {
//                         // Object with filename: content pairs
//                         for (const [fileName, fileContent] of Object.entries(item)) {
//                             const filePath = path.join(pathName, fileName);
//                             const content = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent, null, 2);
//                             fs.writeFileSync(filePath, content);
//                         }
//                     }
//                 }
//             } else if (value !== null && typeof value === 'object') {
//                 // Recursively process the subtree
//                 await createStructure(pathName, value);
//             }
//         }
//     }
// }

// export function deactivate() {}

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Folder Structure Generator" is now active!');

    let disposable = vscode.commands.registerCommand('structgen.generateFromJSON', async () => {
        try {
            // First, select the target directory
            const folderUri = await vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: 'Select Target Directory',
                title: 'Select where to create the folder structure'
            });

            if (!folderUri || folderUri.length === 0) {
                return;
            }

            const targetDirectory = folderUri[0].fsPath;

            // Then, select JSON file
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
                await createStructure(targetDirectory, structure);
            });

            vscode.window.showInformationMessage('Folder structure generated successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate structure: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function createStructure(basePath: string, tree: any) {
    for (const [key, value] of Object.entries(tree)) {
        const pathName = path.join(basePath, key);
        
        // Check if key has a file extension
        const hasExtension = path.extname(key) !== '';
        
        if (hasExtension) {
            // This is a file - write the content
            const fileContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
            fs.writeFileSync(pathName, fileContent);
        } else {
            // This is a folder - create it
            fs.mkdirSync(pathName, { recursive: true });
            
            if (Array.isArray(value)) {
                // Handle array items
                for (const item of value) {
                    if (typeof item === 'string') {
                        // Simple string file names
                        fs.writeFileSync(path.join(pathName, item), "");
                    } else if (typeof item === 'object' && item !== null) {
                        // Object with filename: content pairs
                        for (const [fileName, fileContent] of Object.entries(item)) {
                            const filePath = path.join(pathName, fileName);
                            const content = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent, null, 2);
                            fs.writeFileSync(filePath, content);
                        }
                    }
                }
            } else if (value !== null && typeof value === 'object') {
                // Recursively process the subtree
                await createStructure(pathName, value);
            }
        }
    }
}

export function deactivate() {}