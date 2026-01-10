# Gemini Desktop

![App Icon](src-tauri/icons/128x128@2x.png)

A native macOS & Windows wrapper application for [Google Gemini](https://gemini.google.com/), built with [Tauri v2](https://v2.tauri.app/).

This project brings the Gemini web experience to the desktop, offering a dedicated window, native shortcuts, and improved performance compared to running in a full browser tab.

## Features

-   **Native Experience**: Runs as a standalone macOS or Windows application.
-   **Lightweight**: Built on Tauri, using the system's native webview for minimal resource usage.
-   **Secure**: Sandboxed environment with restricted permissions.
-   **Always on Top**: Maintain focus on your AI assistant (configurable).

## Tech Stack

-   **Wrapper**: [Tauri v2](https://v2.tauri.app/) (Rust)
-   **Frontend**: Vanilla HTML/JS (Minimal wrapper)
-   **Platform**: macOS and Windows

## Download

Get the latest version from the [Releases Page](https://github.com/DivyanshThakur/Gemini-App/releases).

## Troubleshooting

### "App is damaged and can't be opened"
This is a standard macOS security message for apps downloaded from the internet that aren't notarized by Apple. It does **not** mean the app is actually broken.

**To fix this (One-time only):**

1.  Open your **Terminal** app.
2.  Copy and run this command:
    ```bash
    xattr -cr /Applications/Gemini.app
    ```
    *(If you haven't moved the app to Applications yet and it's still in Downloads, use: `xattr -cr ~/Downloads/Gemini.app`)*

3.  Open the app normally.

## Getting Started

### Prerequisites

You need **Node.js** and **Rust** installed to build the app.

1.  **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2.  **Install Rust** (Required for Tauri):
    *   **macOS**: Open Terminal and run:
        ```bash
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
        ```
    *   **Windows**: Download and run the [rustup-init.exe](https://win.rustup.rs/) installer.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/DivyanshThakur/Gemini-App.git
    cd Gemini-App
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run tauri dev
    ```

### Building for Production

To build the application for your operating system:

```bash
npm run tauri build
```
The output will be available in `src-tauri/target/release/bundle/`.

## Troubleshooting

## License

This project is a third-party wrapper and is not affiliated with Google.
Gemini is a trademark of Google LLC.
