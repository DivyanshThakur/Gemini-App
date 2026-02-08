# Gemini Desktop

![App Icon](src-tauri/icons/128x128@2x.png)

A native macOS & Windows wrapper application for [Google Gemini](https://gemini.google.com/), built with [Tauri v2](https://v2.tauri.app/).

This project brings the Gemini web experience to the desktop, offering a dedicated window, native shortcuts, and improved performance compared to running in a full browser tab.

## Features

-   **Native Experience**: Runs as a standalone macOS or Windows application.
-   **Global Shortcut**: Access Gemini instantly from anywhere with `Cmd+G` (macOS) or `Ctrl+G` (Windows).
-   **Customizable**: Change the global shortcut to your preference in Settings.
-   **Lightweight**: Built on Tauri, using the system's native webview for minimal resource usage.
-   **Secure**: Sandboxed environment with restricted permissions.
-   **Always on Top**: Maintain focus on your AI assistant (configurable).

## Usage

### Global Shortcut
The app runs in the background. Press **`Cmd+G`** (macOS) or **`Ctrl+G`** (Windows) to bring Gemini to the front instantly.

### Customization
You can change the global shortcut in the app settings:
1.  Open the application menu (**Gemini** -> **Settings...**).
2.  Click on the shortcut input field.
3.  Press your desired key combination.
4.  Click **Save**.

## Installation

### macOS

1.  **Download**: Get the latest release from the [Releases Page](https://github.com/DivyanshThakur/Gemini-App/releases).
2.  **Move to Applications**: Unzip or mount the file and drag **Gemini** to your `/Applications` folder.
3.  **Authorize System Access**:
    Since this app is open-source and not signed by Apple, you must approve it once to run:
    *   Open the **Terminal** app.
    *   Copy and run the following command:
        ```bash
        xattr -cr /Applications/Gemini.app
        ```
4.  **Launch**: Open Gemini normally from your Applications folder.

*Note: You only need to do step 3 once.*

### Windows

1.  **Download**: Get the latest `.exe` or `.msi` from the [Releases Page](https://github.com/DivyanshThakur/Gemini-App/releases).
2.  **Install**: Run the installer and follow the on-screen prompts.
3.  **Launch**: Open Gemini from your Start menu / Desktop.

## Development

If you want to build the app from source or contribute:

### Tech Stack

-   **Wrapper**: [Tauri v2](https://v2.tauri.app/) (Rust)
-   **Frontend**: Vanilla HTML/JS (Minimal wrapper)
-   **Platform**: macOS and Windows

### Prerequisites

You need **Node.js** and **Rust** installed.

1.  **Install Node.js**: Download from [nodejs.org](https://nodejs.org/).
2.  **Install Rust**:
    *   **macOS**: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
    *   **Windows**: Download [rustup-init.exe](https://win.rustup.rs/).

### Build Instructions

1.  **Clone**:
    ```bash
    git clone https://github.com/DivyanshThakur/Gemini-App.git
    cd Gemini-App
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run tauri dev
    ```

4.  **Build for Production**:
    ```bash
    npm run tauri build
    ```
    Output location: `src-tauri/target/release/bundle/`

## License

This project is a third-party wrapper and is not affiliated with Google.
Gemini is a trademark of Google LLC.
