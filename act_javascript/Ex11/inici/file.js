// Funció per validar el formulari
function validarFormulari(event) {
    // Obtenir els valors dels camps
    const nom = document.getElementById('name').value;
    const correu = document.getElementById('mail').value;
    const titol = document.getElementById('title').value;
    const missatge = document.getElementById('msg').value;

    // Esborrar missatges d'error previs
    const nomError = document.getElementById('nomError');
    const correuError = document.getElementById('correuError');
    const titolError = document.getElementById('titolError');
    const missatgeError = document.getElementById('missatgeError');
    nomError.textContent = '';
    correuError.textContent = '';
    titolError.textContent = '';
    missatgeError.textContent = '';

    // Variable per controlar si hi ha errors
    const errors = [];

    // Validar el camp de "Nom" (no pot contenir números ni caràcters especials)
    const nomRegex = /^[a-zA-ZáéíóúàèòÁÉÍÓÚÀÈÒ\s]+$/; // Accepta només lletres i espais
    if (nom.trim() === "") {
        errors.push("El Nom no pot estar buit.");
        nomError.textContent = "El Nom no pot estar buit.";
    } else if (!nomRegex.test(nom)) {
        errors.push("El Nom no pot contenir números ni caràcters especials.");
        nomError.textContent = "El Nom no pot contenir números ni caràcters especials.";
    }

    // Validar el correu electrònic (ha de ser vàlid)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;
    if (correu.trim() === "") {
        errors.push("El correu electrònic no pot estar buit.");
        correuError.textContent = "El correu electrònic no pot estar buit.";
    } else if (!emailRegex.test(correu)) {
        errors.push("El correu electrònic no és vàlid.");
        correuError.textContent = "El correu electrònic no és vàlid.";
    }

    // Validar el camp de "Titol" (opcional, però no pot estar buit si es vol enviar)
    if (titol.trim() === "") {
        errors.push("El titol no pot estar buit.");
        titolError.textContent = "El titol no pot estar buit.";
    }

    // Validar el camp de "Missatge" (no pot estar buit)
    if (missatge.trim() === "") {
        errors.push("El missatge no pot estar buit.");
        missatgeError.textContent = "El missatge no pot estar buit.";
    }

    // Si hi ha errors, evitar el submit del formulari
    if (errors.length > 0) {
        event.preventDefault(); // Evitar que el formulari es presenti
    }
}

// Afegir l'esdeveniment al formulari
document.getElementById('contactForm').addEventListener('submit', validarFormulari);
