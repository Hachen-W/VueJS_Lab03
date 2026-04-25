let clicks = parseInt(localStorage.getItem('totalClicks')) || 0;
let startTime = parseInt(localStorage.getItem('clickStartTime'));

if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('clickStartTime', startTime);
}

const counterElement = document.getElementById('counter');
const cpsElement = document.getElementById('cps');

counterElement.textContent = clicks;

function updateCPS() {
    const now = Date.now();
    const elapsedSeconds = (now - startTime) / 1000;
    if (elapsedSeconds > 0) {
        const cps = clicks / elapsedSeconds;
        cpsElement.textContent = cps.toFixed(2);
    }
}

document.getElementById('clickBtn').addEventListener('click', () => {
    clicks++;
    localStorage.setItem('totalClicks', clicks);
    counterElement.textContent = clicks;
    updateCPS();
});

setInterval(updateCPS, 1000);
updateCPS();
