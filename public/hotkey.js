document.addEventListener('keydown', handleHotKey)

function handleHotKey(e) {
    if(e.ctrlKey && e.key.toLowerCase() == 'b') {
        document.querySelector('.left-sidebar').classList.toggle('hotkey-sidebar')
        document.querySelector('.right-sidebar').classList.toggle('hotkey-sidebar')
        document.querySelector('body').classList.toggle('hotkey-body')
    }
}