// Variables globals
let tauler;
let mines;
let files = 8;  // Tauler de 8x8
let columnes = 8;
let taulerHTML;
let cellesDestapades = 0;
let minesMarcades = 0;
let totalMines;

// Funció per iniciar el joc
document.getElementById('iniciarJoc').addEventListener('click', () => {
    mines = parseInt(document.getElementById('mines').value);
    if (mines > 5 && mines <= 63) {
        iniciarTauler(mines);
    } else {
        alert("El nombre de mines ha de ser entre 5 i 63.");
    }
});

// Funció per crear el tauler de joc
function iniciarTauler(cantMines) {
    tauler = Array(files).fill().map(() => Array(columnes).fill(0));
    cellesDestapades = 0;
    minesMarcades = 0;
    totalMines = cantMines;

    // Col·locarem mines de forma aleatòria
    for (let i = 0; i < cantMines; i++) {
        let fila, col;
        do {
            fila = Math.floor(Math.random() * files);
            col = Math.floor(Math.random() * columnes);
        } while (tauler[fila][col] === 'M');
        tauler[fila][col] = 'M';
    }

    // Comptar mines al voltant
    for (let i = 0; i < files; i++) {
        for (let j = 0; j < columnes; j++) {
            if (tauler[i][j] !== 'M') {
                let minesAlVoltant = comptarMinesAlVoltant(i, j);
                tauler[i][j] = minesAlVoltant;
            }
        }
    }

    // Crear les celles al DOM
    taulerHTML = '';
    for (let i = 0; i < files; i++) {
        for (let j = 0; j < columnes; j++) {
            taulerHTML += `<div class="cella" data-fila="${i}" data-columna="${j}"></div>`;
        }
    }
    document.getElementById('tauler').innerHTML = taulerHTML;

    // Afegim els esdeveniments de clic a les celles
    document.querySelectorAll('.cella').forEach(cella => {
        cella.addEventListener('click', revelarCella);
        cella.addEventListener('contextmenu', marcarMina);
    });
}

// Funció per comptar les mines al voltant d'una cella
function comptarMinesAlVoltant(fila, col) {
    let minesAlVoltant = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let novaFila = fila + i;
            let novaColumna = col + j;
            if (novaFila >= 0 && novaFila < files && novaColumna >= 0 && novaColumna < columnes) {
                if (tauler[novaFila][novaColumna] === 'M') {
                    minesAlVoltant++;
                }
            }
        }
    }
    return minesAlVoltant;
}

// Funció per revelar una cella
function revelarCella(evente) {
    let fila = parseInt(evente.target.getAttribute('data-fila'));
    let col = parseInt(evente.target.getAttribute('data-columna'));

    // Si la cella ja ha estat destapada o marcada amb bandera, no fer res
    if (evente.target.classList.contains('destapada') || evente.target.classList.contains('flag')) return;

    // Revelar la cella
    evente.target.classList.add('destapada');
    let minesAlVoltant = tauler[fila][col];

    // Si la cella és una mina, es mostrarà la mina i el joc acaba
    if (tauler[fila][col] === 'M') {
        evente.target.classList.add('mina');
        evente.target.textContent = '💣';
        alert("¡Has perdut! Has tocat una mina.");

        // Revelar totes les mines
        document.querySelectorAll('.cella').forEach(cella => {
            let fila = parseInt(cella.getAttribute('data-fila'));
            let col = parseInt(cella.getAttribute('data-columna'));
            if (tauler[fila][col] === 'M') {
                cella.classList.add('mina');
                cella.textContent = '💣';  // Mostrar mina
                setTimeout("location. reload()", 5000);

            }
        });

        // Bloquejar les celles després de perdre
        document.querySelectorAll('.cella').forEach(cella => {
            cella.removeEventListener('click', revelarCella); // Desactivar el clic
            cella.removeEventListener('contextmenu', marcarMina); // Desactivar el clic dret
        });
    } else {
        evente.target.textContent = minesAlVoltant > 0 ? minesAlVoltant : '';

        // Assignar color al text segons el nombre de mines al voltant
        if (minesAlVoltant === 1) {
            evente.target.style.color = 'blue';
        } else if (minesAlVoltant === 2) {
            evente.target.style.color = 'green';
        } else if (minesAlVoltant === 3) {
            evente.target.style.color = 'red';
        } else if (minesAlVoltant === 4) {
            evente.target.style.color = 'black';
        } else if (minesAlVoltant === 5) {
            evente.target.style.color = 'purple';
        } else if (minesAlVoltant === 6) {
            evente.target.style.color = 'brown';
        } else if (minesAlVoltant === 7) {
            evente.target.style.color = 'orange';
        } else if (minesAlVoltant === 8) {
            evente.target.style.color = 'gray';
        }

        cellesDestapades++;

        // Si és una cel·la buida (0 mines al voltant), destapem també les cel·les adjacents
        if (minesAlVoltant === 0) {
            destaparAdjacents(fila, col);
        }
    }
}

// Funció per revelar automàticament les cel·les adjacents (exploració en profunditat)
function destaparAdjacents(fila, col) {
    // Definir la direcció de les cel·les adjacents (8 direccions)
    const direccions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let i = 0; i < direccions.length; i++) {
        let novaFila = fila + direccions[i][0];
        let novaColumna = col + direccions[i][1];

        // Comprovar que la nova fila i columna estan dins del tauler
        if (novaFila >= 0 && novaFila < files && novaColumna >= 0 && novaColumna < columnes) {
            let cella = document.querySelector(`[data-fila="${novaFila}"][data-columna="${novaColumna}"]`);
            // Si la celda no ha estat destapada i no té bandera, la destapem
            if (!cella.classList.contains('destapada') && !cella.classList.contains('flag')) {
                revelarCella({ target: cella });
            }
        }
    }
}

// Funció per marcar una mina amb bandera (clic dret)
function marcarMina(evente) {
    evente.preventDefault();  // Evitar el menú de context per defecte

    let fila = parseInt(evente.target.getAttribute('data-fila'));
    let col = parseInt(evente.target.getAttribute('data-columna'));

    if (evente.target.classList.contains('destapada')) return; // No permet marcar una cella destapada

    if (evente.target.classList.contains('flag')) {
        evente.target.classList.remove('flag');
        evente.target.textContent = '';
        minesMarcades--;
    } else {
        if (minesMarcades < totalMines) {
            evente.target.classList.add('flag');
            evente.target.textContent = '🚩';  // Coloca un emoji de bandera
            minesMarcades++;
        } else {
            alert("Has arribat al màxim de banderes!");
        }
    }

    // Comprovar si ha guanyat el jugador
    if (minesMarcades === totalMines) {
        let totesCorrectes = true;
        document.querySelectorAll('.cella.flag').forEach(cella => {
            let fila = parseInt(cella.getAttribute('data-fila'));
            let col = parseInt(cella.getAttribute)
            alert("¡Has guanyat! Has destapat totes les celles sense mines.")
            setTimeout("location. reload()", 5000);
        })}}
