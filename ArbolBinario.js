class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.hijoIzq = null;
        this.hijoDer = null;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ArbolBinario {
    constructor(expresion) {
        this.expresion = expresion;
        this.raiz = null;
        this.primero = null;
        this.ultimo = null;
    }

    separarExpresion() {
        let expresion = this.expresion;
        let separada = expresion.split('');

        for (let i = 0; i < separada.length; i++) {
            this.agregarNodo(separada[i]);
        }
    }

    agregarNodo(valor) {
        let nodo = new Nodo(valor);

        if (this.primero == null) {
            this.primero = nodo;
            this.ultimo = nodo;
        } else {
            this.ultimo.siguiente = nodo;
            nodo.anterior = this.ultimo;
            this.ultimo = nodo;
        }
    }
}

