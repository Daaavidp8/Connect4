class Tablero {

    constructor(w,h) {
        this.width = w;
        this.tablero = this.setTablero(w,h);
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

    setJugada(col,jugador){
        return new Promise(resolve => {
            let contador = 0;
            let primerafila = false;
            let aux;
            let bajarFicha = setInterval(() => {
                if (this.tablero[0][col] === null && !primerafila){
                    this.tablero[contador][col] = jugador.number;
                    primerafila = true;
                }else if(this.tablero[contador + 1] === undefined || this.tablero[contador + 1][col] !== null){
                    clearInterval(bajarFicha);
                    resolve(contador);
                }else{
                    aux = this.tablero[contador + 1][col];
                    this.tablero[contador + 1][col] = this.tablero[contador][col];
                    this.tablero[contador][col] = aux;
                    contador++;
                }
            },50)
        })

    }
}

