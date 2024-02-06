let jugadores = [];
let paused = false;

class Tablero {

    constructor(w,h) {
        this.width = w;
        this.height = h
        this.setTablero();
    }
    setTablero() {
        if (localStorage.getItem('tablero') !== null){
            this.divPregunta = document.createElement('div');
            this.divPregunta.className = "mensajeConfirmacion";
            this.divPregunta.innerHTML = "<p>Desea continuar por donde lo dejó?</p>" +
                "<div><button onclick='tablero.CrearTablero()' class='danger'>Cancelar</button>" +
                "<button onclick='tablero.RecuperarTablero()' class='success'>Okay</button></div>";
            document.body.appendChild(this.divPregunta);
        }
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

    CrearTablero(){
        let panel = [];
        for (let i = 0; i<this.height;i++){
            let fila = [];
            for (let p = 0; p<this.width;p++){
                fila.push(null);
            }
            panel.push(fila);
        }
        jugadores.push(new Jugador("Jugador1",'red'), new Jugador("Jugador2","yellow"));
        localStorage.jugadores = JSON.stringify(jugadores);
        this.tablero = panel;
        document.getElementById('panel').style.visibility = "visible";
        document.body.removeChild(this.divPregunta);
    }

    RecuperarTablero(){
        paused = localStorage.getItem('paused');
        jugadores = JSON.parse(localStorage.getItem('jugadores'));
        this.tablero = JSON.parse(localStorage.getItem('tablero'));
        document.getElementById('panel').style.visibility = "visible";
        document.body.removeChild(this.divPregunta);
    }
}