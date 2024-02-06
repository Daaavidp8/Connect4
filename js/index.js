const panel = document.getElementById('panel');
const width = 8;
const height = 6;
const audio = new Audio('../sounds/mixkit-short-whistle-fall-406.wav');
const tablero = new Tablero(width,height);


let turno = 0;
let teclaPresionada = false;
let win = 4;


let llenarTablero = () => {
    panel.style.setProperty('--miwidth', (width * 110) + 'px');
    panel.style.setProperty('--miheight', (height * 110) + 'px');
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
    if (tablero.tablero !== undefined){
        let color;
        tablero.tablero.forEach((filas,indiceFila) => {
            filas.forEach((columna,indiceColumna) => {
                if (columna === null){
                    color = 'white';
                }else{
                    color = jugadores[columna].color;
                }
                document.getElementById(indiceFila + "" + indiceColumna).style.background = color;
            })
        })
    }
}

let finPartida = (jugador) => {
    paused = true;
    localStorage.paused = true;
    alert("Ha ganado " + jugador.name)
}

let ComprobarGanador = (col,fila,jugador) => {
    let ganado = false;
    let contador = 0;
    // Comprobación Horizontal
    tablero.tablero[fila].forEach((columna,indice) => {
        if (columna === jugador.number && tablero.tablero[fila][indice + 1] === columna){
            contador++;
        }else{
            contador = 0;
        }
        if (contador === win - 1){
            ganado = true;
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
                ganado = true;
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
         if (contador === win - 1){
             posicion[1] = true;
             ganado = true;
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
        if (contador === win - 1){
            posicion[1] = true;
            ganado = true;
        }
    }

    // Comprobación Diagonal Descendente

    contador = 0;
    posicion = [1,false];

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
        if (contador === win - 1){
            posicion[1] = true;
            ganado = true;
        }
    }

    posicion = [1,false];

    while (!posicion[1]){
        // Manejo que la comprobación este dentro del tablero
        if (fila + posicion[0] < height && col + posicion[0] >= 0){
            // Miro cuantas Fichas seguidas hay arriba a la derecha
            if (tablero.tablero[fila + posicion[0]][col + posicion[0]] !== tablero.tablero[fila][col]){
                posicion[1] = true;
            }else {
                contador++;
                posicion[0]++;
            }
        }else {
            posicion[1] = true;
        }
        if (contador === win - 1){
            posicion[1] = true;
            ganado = true;
        }
    }

    if (ganado){
        finPartida(jugador)
    }else{
        turno = (turno === 1) ? 0 : 1;
        paused = false;
    }
}
let Jugada = (col) => {
    if (tablero.tablero[0][col] === null && !paused){
        paused = true;
        audio.play().then(() => {
            audio.currentTime = 0;
        })
        tablero.setJugada(col, jugadores[turno]).then((fila) => {
            localStorage.tablero = JSON.stringify(tablero.tablero);
            ComprobarGanador(col,fila,jugadores[turno])
        });
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





