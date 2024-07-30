const container = document.getElementById('container');
const btnUsername = document.getElementById('btnUsername');
const inputUsername = document.getElementById('inputUsername');

btnUsername.onclick = function() {
    container.innerHTML = `<h1> hi ${inputUsername.value}</h1>`;
};