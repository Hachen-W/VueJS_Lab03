const circle = document.getElementById('blueCircle');


document.addEventListener('mousemove', function(e) {
    circle.style.left = e.clientX + 'px';
    circle.style.top = e.clientY + 'px';
});
