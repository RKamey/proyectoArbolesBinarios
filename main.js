const inputExpresion = document.getElementById('expresion');
const btnCalcular = document.getElementById('btn-calcular');
const btnLimpiar = document.getElementById('btn-limpiar');
const preorden = document.getElementById('preorden');
const postorden = document.getElementById('postorden');

btnCalcular.addEventListener('click', () => {
    let expresion = inputExpresion.value;
    let arbol = new ArbolBinario(expresion);
    arbol.separarExpresion();

    preorden.innerHTML = arbol.mostrarPreorderHTML();
    postorden.innerHTML = arbol.mostrarPostorderHTML();
});

btnLimpiar.addEventListener('click', () => {
    inputExpresion.value = '';
    preorden.innerHTML = '';
    postorden.innerHTML = '';
});

