//podría poner const JUGADAS_VALIDAS = 5; para poner una constante en el proyecto (y reemplazo el 5 multiplicando)
function generarJugada () {
    let jugadaEnNumero = Math.floor(Math.random()*5) + 1;
    switch (jugadaEnNumero) {
        case 1: 
            return "piedra";
        case 2:
            return "papel";
        case 3:
            return "tijeras";
        case 4:
            return "lagarto";
        case 5: 
            return "spock";
    }
}
function recibirJugada () {
    let jugada = "";
    let valida = false;
    while (!valida) {
        jugada = prompt("Elegí piedra, papel, tijeras, lagarto o Spock").toLowerCase();
        if (jugada=="tijera") {
            jugada="tijeras";
        }
        valida = jugada=="piedra" || jugada=="papel" || jugada=="tijeras" || jugada=="lagarto" || jugada=="spock";
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
    //también se puede usar switch(o un if) adentro de un switch... me parece más claro como está
    let usuarioGano = (jugadaPC=="piedra"   && (jugadaUsuario=="papel"   || jugadaUsuario=="spock")) ||
                      (jugadaPC=="papel"    && (jugadaUsuario=="tijeras" || jugadaUsuario=="lagarto")) ||
                      (jugadaPC=="tijeras"  && (jugadaUsuario=="spock"   || jugadaUsuario=="piedra")) ||
                      (jugadaPC=="lagarto"  && (jugadaUsuario=="piedra"  || jugadaUsuario=="tijeras")) ||
                      (jugadaPC=="spock"    && (jugadaUsuario=="lagarto" || jugadaUsuario=="papel"));
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
        let jugadaUsuario = recibirJugada();
        // SOLO para tests: (comentar linea de arriba)(y el alert mas abajo para partidas largas)
        // let jugadaUsuario = generarJugada();
        res = resultado(jugadaPC, jugadaUsuario);
        alert("La PC jugó " + jugadaPC + ". " + res);
        console.log(nombreUsuario + " jugó " + jugadaUsuario + ".");
        console.log("PC jugó " + jugadaPC + ".");
        console.log("RESULTADO: " + res)
        console.log("--------------------------------------------")
    } while (res == "Empate")
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



alert("Bienvenidos a piedra, papel, tijeras, lagarto, Spock");
//son const pero no son realmente constantes, no tiene mucho sentido ponerlas en mayusculas(creo)
const nombreUsuario = prompt("Ingresá tu nombre:");
const cantRondas = Math.floor(Number(prompt("¿Cuantas rondas querés jugar?")));
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

if (cantRondas > 0) {
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
    } else{
        console.log("     ... pffft... no, no... no estuvo tan mal... pffffft...")
    }

    console.log("La cadena más larga de victorias consecutivas fue de " + victoriasConsecutivasMax + ".");
}
