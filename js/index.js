const panel = document.getElementById('panel');
const width = 8;
const height = 6;
let turno = 1;

let tablero = new Tablero(width,height);

let llenarTablero = () => {
    panel.style.setProperty('--miwidth', (width * 107) + 'px');
    panel.style.setProperty('--miheight', (height * 107) + 'px');
    for (let i = 0; i < height; i++) {
        for (let p = 0; p < width; p++) {
            let div = document.createElement('div');
            div.classList.add('circle');
            div.id = i + "" + p;
            div.addEventListener('click', () => Jugada(div.id.substring(1,div.id.length)));
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
            document.getElementById(indiceFila + "" + indiceColumna).style.backgroundColor = color;
        })
    })
}

let jugador1 = new Jugador("David","red");
let jugador2 = new Jugador("Adrian","yellow");
let Jugada = (col) => {
    if (turno === 1){
        tablero.setJugada(col,jugador1);
        turno = 2;
    }else {
        tablero.setJugada(col,jugador2);
        turno = 1;
    }
}


setInterval(pintarFicha,50)
llenarTablero();
document.addEventListener('keypress',(key) => {
    if (key.key > 0 && key.key <= width){
        Jugada(key.key - 1);
    }
})




