class Jugador {
    static contador = 0;

    constructor(name, color, sound) {
        this.name = name;
        this.color = color;
        this.sound = new Audio(sound);
        this.number = Jugador.contador++;
    }
}