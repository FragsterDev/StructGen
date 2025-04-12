# StructGen

StructGen is a lightweight VS Code extension that helps you **generate complex folder structures** from a simple JSON input. It's great for scaffolding domain-driven folder architectures in seconds.

### Requirements

- **Node.js**: v22.14.0  
- **npm**: v10.9.2  
- **VS Code**: Latest stable version recommended
- **VSCE (Visual Studio Code Extension Manager)**:  
  Install globally using:

  ```bash
  npm install -g vsce
  ```

## Installation

To install **StructGen** for use as a Visual Studio Code extension:

Install the **StructGen** extension from the VS Code Marketplace using the VSCE (Visual Studio Code Extension) package:

1. Open your terminal and run the following command:
   ```bash
   vsce install StructGen
   ```
Alternatively, you can install it directly from the VS Code Marketplace by searching for StructGen.

---

## Features

- Generate nested folders and files instantly from a single JSON file.
- Supports nested object structure and arrays of files.
- Perfect for backend architecture, monorepos, or boilerplate setups.

---

## How to Use

1. Open any folder in VS Code.
2. Press `Cmd+Shift+P` / `Ctrl+Shift+P` to open Command Palette.
3. Search and run: `Generate Folder Structure`.
4. Choose your JSON file describing the structure.
5. Done

---

## Example Input

```json
{
  "data": {
    "datasource": "mongo_datasource.go",
    "repository": "mongo_repository.go"
  },
  "domain": {
    "entities": "user_entity.go",
    "repository": "user_repository.go",
    "usecases": ["create_user.go", "get_users.go", "delete_users.go"]
  },
  "presentation": {
    "http": {
      "routes": "user_routes.go",
      "middleware": "user_middleware.go",
      "controller": "user_controller.go"
    }
  }
}
```


## Output

![Output Image](example/output-example.png)


## Collaboration Instructions

To contribute to **StructGen** or collaborate with others, follow these steps:

### 1. Clone the Repository

Clone the project repository by running the following command in your terminal:

```bash
git clone https://github.com/your-username/structgen.git
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary npm packages:

```bash
cd structgen
npm install
```

### 3. Run the Extension Locally

You can test the extension locally within VS Code:

1. Open the project folder in **Visual Studio Code**.
2. Press `F5` to start the extension in a new VS Code window (**Extension Development Host**).
3. In the new window, open any folder and run the `Generate Folder Structure` command from the **Command Palette** to test the functionality.
