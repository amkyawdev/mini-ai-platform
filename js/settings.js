// Settings.js - Settings Page Logic
function loadSettings() {
    var s = JSON.parse(localStorage.getItem('settings') || '{"aiName":"Chat","theme":"dark","apiKey":""}');
    return s;
}

function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

function clearAll() {
    if(confirm('Clear all data?')) {
        localStorage.clear();
        window.location.reload();
    }
}
