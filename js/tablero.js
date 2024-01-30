class Tablero {

    constructor(w,h) {
        this.width = w;
        this.tablero = this.setTablero(w,h);
        this.setColCompletas();
    }
    setTablero(w,h) {
        let panel = [];
        for (let i = 0; i<h;i++){
            let fila = [];
            for (let p = 0; p<w;p++){
                fila.push(null);
            }
            panel.push(fila);
        }
        return panel;
    }

    setColCompletas(){
        this.columnas = [];
        for (let i = 0; i<this.width;i++){
            this.columnas.push(false);
        }
    }

    setJugada(col,jugador){
            let contador = 0;
            let primerafila = false;
            let aux;
            let bajarFicha = setInterval(() => {
                if (this.tablero[0][col] === null && !primerafila){
                    this.tablero[contador][col] = jugador.number;
                    primerafila = true;
                }else if(this.tablero[contador + 1] === undefined || this.tablero[contador + 1][col] !== null){
                    clearInterval(bajarFicha);
                }else{
                    aux = this.tablero[contador + 1][col];
                    this.tablero[contador + 1][col] = this.tablero[contador][col];
                    this.tablero[contador][col] = aux;
                    contador++;
                }
            },50)

            if (this.tablero[0][col] !== null){
                this.columnas[col] = true;
            }
    }
}

