import { exec } from 'node:child_process';
import path from 'node:path';

// Get current directory in ESM
const __dirname = path.resolve(import.meta.dirname, '..');
const csrFilePath = path.join(__dirname, "./.plugin-visualizer/csr.html");
const ssrFilePath = path.join(__dirname, "./.plugin-visualizer/ssr.html");

// Determine the command based on the OS
const onWindows = (process.platform === 'win32');
const onMacOS = (process.platform === 'darwin');
const command = (onWindows ? 'start' : (onMacOS ? 'open' : 'xdg-open'));

/** This function acts as a callback to opening a window.  */
function onWindowOpen(err) {
    if(err) {
        console.error('Failed to open file:', err);
    } else {
        console.log('Opening report in your default browser...');
    }
}

// Opens the .html files.
exec((command + " " + csrFilePath), (err) => { onWindowOpen(err); });
exec((command + " " + ssrFilePath), (err) => { onWindowOpen(err); });