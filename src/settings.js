const { invoke } = window.__TAURI__.core;

const shortcutInput = document.getElementById('shortcut-display');
const saveBtn = document.getElementById('save-btn');

let currentBackendShortcut = '';
let isRecording = false;

// Display mapping
const DISPLAY_MAP = {
    'Command': 'Cmd',
    'Control': 'Ctrl',
    'Alt': 'Opt',
    'CommandOrControl': 'Cmd' // Handle default
};

const BACKEND_MAP = {
    'Cmd': 'Command',
    'Ctrl': 'Control',
    'Opt': 'Alt'
};

function toDisplay(shortcut) {
    if (!shortcut) return '';
    return shortcut.split('+').map(part => DISPLAY_MAP[part] || part).join('+');
}

function toBackend(displayShortcut) {
    if (!displayShortcut) return '';
    return displayShortcut.split('+').map(part => BACKEND_MAP[part] || part).join('+');
}

async function init() {
    try {
        currentBackendShortcut = await invoke('get_shortcut');
        // Handle "CommandOrControl" specifically for macOS/Windows diffs if needed,
        // but for now just map it for display.
        if (currentBackendShortcut.includes('CommandOrControl')) {
             // In v2, CommandOrControl is resolved by the plugin, but let's just show Cmd/Ctrl based on platform if possible.
             // For now, map CommandOrControl to Cmd (since user asked for Cmd+G).
        }
        shortcutInput.value = toDisplay(currentBackendShortcut);
    } catch (error) {
        console.error('Failed to load shortcut:', error);
        shortcutInput.value = 'Error loading';
    }
}

// Key recording logic
shortcutInput.addEventListener('focus', () => {
    isRecording = true;
    shortcutInput.classList.add('recording');
    shortcutInput.value = 'Press keys...';
    saveBtn.disabled = true;
});

shortcutInput.addEventListener('blur', () => {
    isRecording = false;
    shortcutInput.classList.remove('recording');
    if (shortcutInput.value === 'Press keys...') {
        shortcutInput.value = toDisplay(currentBackendShortcut);
    }
});

shortcutInput.addEventListener('keydown', (e) => {
    if (!isRecording) return;
    e.preventDefault();

    const keys = [];
    if (e.metaKey) keys.push('Command');
    if (e.ctrlKey) keys.push('Control');
    if (e.altKey) keys.push('Alt');
    if (e.shiftKey) keys.push('Shift');

    // Handle key code
    let key = e.key;

    // Normalize keys
    if (key === ' ') key = 'Space';
    if (key.length === 1) key = key.toUpperCase();
    
    // Don't add modifier keys as the main key
    if (['Meta', 'Control', 'Alt', 'Shift'].includes(key)) {
        // Just modifiers pressed
    } else {
        keys.push(key);
    }
    
    // Construct backend string first
    const backendString = keys.join('+');
    
    // Update display
    shortcutInput.value = toDisplay(backendString);
    
    // Enable save if it looks valid
    if (keys.length > 0 && !['Meta', 'Control', 'Alt', 'Shift'].includes(key)) {
        saveBtn.disabled = false;
        // Store the backend representation temporarily on the element or just re-derive it
        shortcutInput.dataset.backendValue = backendString;
    }
});

saveBtn.addEventListener('click', async () => {
    const newBackendShortcut = shortcutInput.dataset.backendValue || toBackend(shortcutInput.value); // Fallback
    try {
        await invoke('update_shortcut', { shortcut: newBackendShortcut });
        currentBackendShortcut = newBackendShortcut;
        saveBtn.disabled = true;
        isRecording = false;
        shortcutInput.classList.remove('recording');
        shortcutInput.blur();
        // alert('Shortcut saved!'); // Removed alert for smoother UX, maybe add a visual indicator later
        saveBtn.textContent = 'Saved!';
        setTimeout(() => saveBtn.textContent = 'Save', 2000);
    } catch (error) {
        console.error('Failed to save shortcut:', error);
        alert('Failed to save: ' + error);
        shortcutInput.value = toDisplay(currentBackendShortcut); // Revert
    }
});

init();
