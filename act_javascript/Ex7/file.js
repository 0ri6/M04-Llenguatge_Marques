// Variables inicials per als gols de cada equip i el temporitzador
let golsEquipLocal = 0;
let golsEquipVisitant = 0;
let temporitzador = null;
let segons = 0;
let minuts = 0;

// Funció per incrementar el marcador d'un equip
function incrementarGols(equip) {
    if (equip === 'local') {
        golsEquipLocal++;
        document.getElementById('scoreHome').innerText = formatarGols(golsEquipLocal);
    } else {
        golsEquipVisitant++;
        document.getElementById('scoreAway').innerText = formatarGols(golsEquipVisitant);
    }
}

// Funció per reduir el marcador d'un equip, sense baixar de zero
function reduirGols(equip) {
    if (equip === 'local' && golsEquipLocal > 0) {
        golsEquipLocal--;
        document.getElementById('scoreHome').innerText = formatarGols(golsEquipLocal);
    } else if (equip === 'visitant' && golsEquipVisitant > 0) {
        golsEquipVisitant--;
        document.getElementById('scoreAway').innerText = formatarGols(golsEquipVisitant);
    }
}

// Funció per formatar els gols amb dos dígits (per exemple, 01, 02...)
function formatarGols(gols) {
    return gols < 10 ? `0${gols}` : gols;
}

// Funció per iniciar el temporitzador si encara no està en marxa
function iniciarTemporitzador() {
    if (!temporitzador) {
        temporitzador = setInterval(actualitzarTemporitzador, 1000);
    }
}

// Funció per aturar el temporitzador
function pararTemporitzador() {
    clearInterval(temporitzador);
    temporitzador = null;
}

// Funció per reiniciar el temporitzador i posar-lo a zero
function reiniciarTemporitzador() {
    pararTemporitzador();
    segons = 0;
    minuts = 0;
    document.getElementById('time').innerText = "00:00";
}

// Funció per actualitzar el temporitzador cada segon
function actualitzarTemporitzador() {
    segons++;
    if (segons === 60) {
        segons = 0;
        minuts++;
    }
    document.getElementById('time').innerText =
        `${minuts < 10 ? '0' : ''}${minuts}:${segons < 10 ? '0' : ''}${segons}`;
}
