import { checkAuth } from './auth.js';

window.addEventListener('load', () => {
    // ৩ সেকেন্ড পর স্প্ল্যাশ স্ক্রিন রিমুভ
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('fade-out');
        document.getElementById('app').style.display = 'block';
        initApp();
    }, 3000);
});

async function initApp() {
    const user = await checkAuth();
    if (user && user.isOwner) {
        import('./owner.js').then(module => module.initOwnerMode());
    } else {
        import('./auth.js').then(module => module.initPublicMode());
    }
}
