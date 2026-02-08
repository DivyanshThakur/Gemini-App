use tauri::Manager;
use tauri_plugin_global_shortcut::{GlobalShortcutExt, ShortcutState};
use tauri_plugin_store::StoreExt;
use serde_json::json;

const STORE_PATH: &str = "store.json";
const DEFAULT_SHORTCUT: &str = "CommandOrControl+G";

#[tauri::command]
fn update_shortcut(app: tauri::AppHandle, shortcut: String) -> Result<(), String> {
    let _ = app.global_shortcut().unregister_all();
    
    app.global_shortcut().register(shortcut.as_str()).map_err(|e| e.to_string())?;
    
    let store = app.store(STORE_PATH).map_err(|e| e.to_string())?;
    store.set("shortcut", json!(shortcut));
    let _ = store.save();
    
    Ok(())
}

#[tauri::command]
fn get_shortcut(app: tauri::AppHandle) -> Result<String, String> {
    let store = app.store(STORE_PATH).map_err(|e| e.to_string())?;
    let val = store.get("shortcut").and_then(|v| v.as_str().map(|s| s.to_string()));
    Ok(val.unwrap_or(DEFAULT_SHORTCUT.to_string()))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(|app, _shortcut, event| {
                    if event.state == ShortcutState::Pressed {
                         if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .build(),
        )
        .on_menu_event(|app, event| {
            if event.id().as_ref() == "settings" {
                 if let Some(window) = app.get_webview_window("settings") {
                     let _ = window.show();
                     let _ = window.set_focus();
                 }
            }
        })
        .setup(|app| {
            let handle = app.handle().clone();
            
            #[cfg(desktop)]
            {
                use tauri::menu::{AboutMetadata, Menu, MenuItem, PredefinedMenuItem, Submenu};
                
                let app_name = "Gemini";
                let app_submenu = Submenu::new(&handle, app_name, true)?;
                
                let about = PredefinedMenuItem::about(&handle, Some(app_name), Some(AboutMetadata::default()))?;
                let settings = MenuItem::with_id(&handle, "settings", "Settings...", true, Some("CmdOrCtrl+,"))?;
                let separator = PredefinedMenuItem::separator(&handle)?;
                let quit = PredefinedMenuItem::quit(&handle, None)?;
                
                app_submenu.append(&about)?;
                app_submenu.append(&separator)?;
                app_submenu.append(&settings)?;
                app_submenu.append(&separator)?;
                app_submenu.append(&quit)?;
                
                // Add standard Edit/Window menus for completeness if needed, but keeping it simple for now
                
                let menu = Menu::with_items(&handle, &[&app_submenu])?;
                app.set_menu(menu)?;
            }

            // Allow store to be created/loaded
            let store = handle.store(STORE_PATH)?;
            
            // Get shortcut or default
            let shortcut = store.get("shortcut")
                .and_then(|v| v.as_str().map(|s| s.to_string()))
                .unwrap_or_else(|| DEFAULT_SHORTCUT.to_string());
                
            // Register
            match handle.global_shortcut().register(shortcut.as_str()) {
                Ok(_) => println!("Registered global shortcut: {}", shortcut),
                Err(e) => eprintln!("Failed to register global shortcut: {}", e),
            }
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![update_shortcut, get_shortcut])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
