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
        this.preorderArr = [];
        this.postorderArr = [];
    }

    separarExpresion() {
        let expresionSeparada = this.expresion.split('');

        for (let i = 0; i < expresionSeparada.length; i++) {
            this.agregarNodo(expresionSeparada[i]);
        }
        return this.crearArbol();
    }

    agregarNodo(nodo) {
        let nodox = new Nodo(nodo);

        if (this.primero == null) {
            this.primero = nodox;
            this.ultimo = nodox;
        } else {
            this.ultimo.siguiente = nodox;
            nodox.anterior = this.ultimo;
            this.ultimo = nodox;
        }
    }

    borrarNodo(nodox) {
        if (nodox != this.primero) {
            nodox.anterior.siguiente = nodox.siguiente;
            if (nodox.siguiente != null) {
                nodox.siguiente.anterior = nodox.anterior;
            } else {
                this.ultimo = nodox.anterior;
            }
        } else {
            if (this.primero == this.ultimo) {
                this.primero = null;
                this.ultimo = null;
            } else {
                this.primero = this.primero.siguiente;
                this.primero.anterior = null;
            }
        }
    }

    crearArbol() {
        let aux = this.primero;
        for (let i = 0; i < this.expresion.length-1; i++) {
            if (aux.valor == '*' || aux.valor == '/') {
                aux.hijoIzq = aux.anterior;
                aux.hijoDer = aux.siguiente;
                this.borrarNodo(aux.anterior);
                this.borrarNodo(aux.siguiente);
            }
            aux = aux.siguiente;
        }
        aux = this.primero;
        for (let i = 0; i < this.expresion.length-1; i++) {
            if (aux.valor == '+' || aux.valor == '-') {
                aux.hijoIzq = aux.anterior;
                aux.hijoDer = aux.siguiente;
                this.borrarNodo(aux.anterior);
                this.borrarNodo(aux.siguiente);
            }
            aux = aux.siguiente;
        }
        this.raiz = this.primero;

        return this.raiz;
    }

    operacionConDosNumeros(operador, num1, num2) {
        if (operador == '+') return num1 + num2;
        if (operador == '-') return num1 - num2;
        if (operador == '*') return num1 * num2;
    
        return num1 / num2;
    }

    preorder(nodox) {
        if (nodox != null) {
            this.preorderArr.push(nodox.valor);
            this.preorder(nodox.hijoIzq);
            this.preorder(nodox.hijoDer);
        } 

        if (this.preorderArr[this.preorderArr.length - 1] == undefined) {
            this.preorderArr.pop();
        }

        return this.preorderArr;
    }

    postorder(nodox) {
        if (nodox != null) {
            this.postorder(nodox.hijoIzq);
            this.postorder(nodox.hijoDer);
            this.postorderArr.push(nodox.valor);
        }

        return this.postorderArr;
    }

    calcularPreorder() {
        let pila = [];
    
        for (let i = this.preorderArr.length - 1; i >= 0; i--) {
          if (!isNaN(this.preorderArr[i])) {
                pila.push(Number(this.preorderArr[i]));
                continue
            }
    
        let num1 = pila.pop();
        let num2 = pila.pop();
        let resultado = this.operacionConDosNumeros(this.preorderArr[i], num1, num2)

        pila.push(resultado);
        }
    
        return pila.pop();
    }

    calcularPostorder() {
        let cola = [];
    
        for (let i = 0; i < this.postorderArr.length; i++) {
          if (!isNaN(this.postorderArr[i])) {
                cola.push(Number(this.postorderArr[i]));
                continue
            }
    
        let num1 = cola.pop();
        let num2 = cola.pop();
        let resultado = this.operacionConDosNumeros(this.postorderArr[i], num2, num1)

        cola.push(resultado);
        }
    
        return cola.pop();
    }

    mostrarPreorderHTML() {
        let preorder = this.preorder(this.raiz);
        let resultadoPreorder = this.calcularPreorder();

        return `<h4>Preorder: ${preorder}</h4><h4>Resultado: ${resultadoPreorder}</h4>`;
    }

    mostrarPostorderHTML() {
        let postorder = this.postorder(this.raiz);
        let resultadoPostorder = this.calcularPostorder();

        return `<h4>Postorder: ${postorder}</h4><h4>Resultado: ${resultadoPostorder}</h4>`;
    }
}