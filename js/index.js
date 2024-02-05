const panel = document.getElementById('panel');
const width = 8;
const height = 6;
const audio = new Audio('../sounds/mixkit-short-whistle-fall-406.wav');
let turno = 1;
let teclaPresionada = false;
let paused = false;
let win = 4;

let tablero = new Tablero(width,height);

let llenarTablero = () => {
    panel.style.setProperty('--miwidth', (width * 107) + 'px');
    panel.style.setProperty('--miheight', (height * 107) + 'px');
    for (let i = 0; i < height; i++) {
        for (let p = 0; p < width; p++) {
            let div = document.createElement('div');
            div.classList.add('circle');
            div.id = i + "" + p;
            div.addEventListener('click', () => Jugada(parseInt(div.id.substring(1,div.id.length))));
            panel.appendChild(div);
        }
    }

}

let pintarFicha = () => {
    let color;
    tablero.tablero.forEach((filas,indiceFila) => {
        filas.forEach((columna,indiceColumna) => {
            if (columna === null){
                color = 'white';
            }else if(columna === jugador1.number){
                color = jugador1.color;
            }else if (columna === jugador2.number){
                color = jugador2.color;
            }
            document.getElementById(indiceFila + "" + indiceColumna).style.background = color;
        })
    })
}

let jugador1 = new Jugador("Juanjo",'red');
let jugador2 = new Jugador("David","yellow");

let finPartida = (jugador) => {
    paused = true;
    alert("Ha ganado " + jugador.name)
}

let ComprobarGanador = (col,fila,jugador) => {
    let contador = 0;
    // Comprobación Horizontal
    tablero.tablero[fila].forEach((columna,indice) => {
        if (columna === jugador.number && tablero.tablero[fila][indice + 1] === columna){
            contador++;
        }else{
            contador = 0;
        }
        if (contador === win - 1){
            finPartida(jugador);
        }
    })



    //Comprobación Vertical
    if (fila <= win - 2){
        contador = 0;
        for (let i = (height - 1); i > (fila - 1);i--){
            if ((i - 1) >= 0 && tablero.tablero[i][col] === tablero.tablero[i - 1][col]){
                contador++;
            }else {
                contador = 0;
            }
            if (contador === win - 1){
                finPartida(jugador);
            }
        }
    }


    //Comprobación Diagonal Ascendente
    contador = 0;
    let posicion = [1,false];

     while (!posicion[1]){
         // Manejo que la comprobación este dentro del tablero
         if (fila - posicion[0] >= 0 && col + posicion[0] < width){
             // Miro cuantas Fichas seguidas hay arriba a la derecha
             if (tablero.tablero[fila - posicion[0]][col + posicion[0]] !== tablero.tablero[fila][col]){
                 posicion[1] = true;
             }else {
                 contador++;
                 posicion[0]++;
             }
         }else {
             posicion[1] = true;
         }
     }


    posicion = [1,false];

    while (!posicion[1]){
        // Manejo que la comprobación este dentro del tablero
        if (fila + posicion[0] < height && col - posicion[0] >= 0){
            // Miro cuantas Fichas seguidas hay arriba a la derecha
            if (tablero.tablero[fila + posicion[0]][col - posicion[0]] !== tablero.tablero[fila][col]){
                posicion[1] = true;
            }else {
                contador++;
                posicion[0]++;
            }
        }else {
            posicion[1] = true;
        }
    }

    // Comprobación Diagonal Descendente

    posicion = [1,false];

    console.log("Fila=" + (fila - posicion[0]))
    console.log("Columna=" + (col - posicion[0]))

    while (!posicion[1]){
        // Manejo que la comprobación este dentro del tablero
        if (fila - posicion[0] >= 0 && col - posicion[0] >= 0){
            // Miro cuantas Fichas seguidas hay arriba a la derecha
            if (tablero.tablero[fila - posicion[0]][col - posicion[0]] !== tablero.tablero[fila][col]){
                posicion[1] = true;
            }else {
                contador++;
                posicion[0]++;
            }
        }else {
            posicion[1] = true;
        }
    }

    if (contador >= win - 1){
        finPartida(jugador)
    }
    turno = (turno === 1) ? 2 : 1;
}
let Jugada = (col) => {
    if (tablero.tablero[0][col] === null){
        audio.play().then(() => {
            audio.currentTime = 0;
        });
        let jugador = (turno === 1) ? jugador1 : jugador2;
        tablero.setJugada(col, jugador).then((fila) => ComprobarGanador(col,fila,jugador));
    }
}
let AddEvents = () => {
    document.addEventListener('keypress',(key) => {
        if (key.key > 0 && key.key <= width && !teclaPresionada){
            teclaPresionada = true;
            Jugada(parseInt(key.key)-1);
        }
    })
    document.addEventListener('keyup',(key) => {
        teclaPresionada = false;
    })
}


setInterval(pintarFicha,50)
llenarTablero();
AddEvents();





