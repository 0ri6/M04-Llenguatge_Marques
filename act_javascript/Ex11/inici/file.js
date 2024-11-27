// Funció per validar i gestionar l'enviament del formulari
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
    } else {
        // Si no hi ha errors, mostrar missatge d'èxit i aplicar animació
        event.preventDefault(); // Evitar el submit per provar la simulació
        const successMessage = document.createElement('div');
        successMessage.id = 'successMessage';
        successMessage.textContent = 'S\'ha enviat correctament! Gràcies per tot!';
        document.querySelector('section').appendChild(successMessage);

        // Aplicar animació al missatge d'èxit
        successMessage.style.animation = 'successAnimation 1s forwards';

        // Fer desaparèixer el formulari després de l'enviament
        setTimeout(function() {
            document.getElementById('contactForm').style.animation = 'formDisappear 1s ease forwards';
            successMessage.style.display = 'block';  // Mostrar el missatge d'èxit
        }, 2000); // Després de 2 segons, comença a desaparèixer el formulari

        // Fer tornar a aparèixer el formulari després de 10 segons i netejar-lo
        setTimeout(function() {
            // Netejar els camps del formulari
            document.getElementById('contactForm').reset(); // Neteja tots els camps del formulari

            // Fer tornar a aparèixer el formulari
            document.getElementById('contactForm').style.display = 'block';
            successMessage.style.display = 'none';  // Amagar el missatge d'èxit
            document.getElementById('contactForm').style.animation = '';  // Eliminar animació de desaparició
        }, 12000); // Després de 10 segons, el formulari torna a aparèixer
    }
}

// Afegir l'esdeveniment al formulari
document.getElementById('contactForm').addEventListener('submit', validarFormulari);
