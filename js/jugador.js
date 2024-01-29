class Jugador {
    static contador = 0;

    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.number = Jugador.contador++;
    }
}