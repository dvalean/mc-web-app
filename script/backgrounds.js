
function transitionToSection2() {
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('stargazing-section').style.display = 'flex';
}

function transitionToSection1() {
    document.getElementById('stargazing-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'flex';
}