//quiero hacer piedra, papel, tijeras, lagarto, spock

//podría poner const JUGADAS_VALIDAS = 3; para poner una constante en el proyecto (y reemplazo el 3 multiplicando)
function generarJugada () {
    let jugadaEnNumero = Math.ceil(Math.random()*3);
    switch (jugadaEnNumero) {
        case 1: 
            return "piedra";
        case 2:
            return "papel";
        case 3:
            return "tijeras";
    }
}
function recibirJugadaUsuario () {
    let jugada = "";
    let valida = false;
    while (!valida) {
        jugada = prompt("Elegí piedra, papel o tijeras").toLowerCase();
        if (jugada=="tijera") {
            jugada="tijeras";
        }
        valida = jugada=="piedra" || jugada=="papel" || jugada=="tijeras";
        if(!valida) {
            alert("ERROR: jugada inválida, ingresa otra jugada.");
        }
    } 
    return jugada;
}
function actualizarVictConsectutivas() {
    if (victoriasConsecutivas > victoriasConsecutivasMax) {
        victoriasConsecutivasMax = victoriasConsecutivas;
    }
    victoriasConsecutivas = 0;
}
function resultado (jugadaPC , jugadaUsuario) {
    if (jugadaPC == jugadaUsuario) {
        return "Empate";
    } 
    let usuarioGano = (jugadaPC=="piedra" && jugadaUsuario=="papel") ||
                      (jugadaPC=="papel" && jugadaUsuario=="tijeras") ||
                      (jugadaPC=="tijeras" && jugadaUsuario=="piedra");
    if (usuarioGano) {
        cantVictorias++;
        victoriasConsecutivas++;
        return "Ganó " + nombreUsuario;
    }
    else {
        actualizarVictConsectutivas();
        return "Ganó la PC";
    }
}

function ronda () {
    let res = "";
    do {
        let jugadaPC = generarJugada();
        let jugadaUsuario = recibirJugadaUsuario();
        // SOLO para tests: (comentar linea de arriba)(y el alert mas abajo para partidas largas)
        // let jugadaUsuario = generarJugada();
        res = resultado(jugadaPC, jugadaUsuario);
        alert(res);
        console.log(nombreUsuario + " jugó " + jugadaUsuario + ".");
        console.log("PC jugó " + jugadaPC + ".");
        console.log("RESULTADO: " + res + ".")
        console.log("--------------------------------------------")
    } while (res == "Empate")
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



alert("Bienvenidos a piedra, papel o tijeras");
//son const pero no son realmente constantes, no tiene mucho sentido ponerlas en mayusculas(creo)
const nombreUsuario = prompt("Ingresá tu nombre:");
const cantRondas = Number(prompt("¿Cuantas rondas querés jugar?"));
console.log("      ~ · " + nombreUsuario + " contra PC · ~      ")
console.log("Juego al mejor de " + cantRondas + ".")

let cantVictorias = 0;
let victoriasConsecutivas = 0;
let victoriasConsecutivasMax = 0;

for(let i=1; i<=cantRondas; i++) {
    console.log("----------------- RONDA: " + i + " -----------------");
    ronda();
}
actualizarVictConsectutivas();

console.log("--------------------------------------------");
console.log("Ganaste " + cantVictorias + " de " + cantRondas + " rondas jugadas.");
let porcentajeExito = (cantVictorias / cantRondas) * 100;
console.log("Tu porcentaje de éxito fue de " + porcentajeExito + "%.");

//comentarios extra reaccionando al resultado
if (porcentajeExito > 75) {
    console.log("     ... tuviste suerte esta vez...")
} else if (porcentajeExito > 50) {
    console.log("     ... ya casi te ganaba...")
} else if (porcentajeExito > 25) {
    console.log("     ... jeje, ¡recién estaba empezando!")
} else {
    console.log("     ... pffft... no, no... no estuvo tan mal... pffffft...")
}

console.log("La cadena más larga de victorias consecutivas fue de " + victoriasConsecutivasMax + ".");

