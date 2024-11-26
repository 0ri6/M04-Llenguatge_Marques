document.addEventListener("DOMContentLoaded", function() {
    const campEdat = document.getElementById("edat");
    const campsTutor = document.getElementById("campsTutor");
    const formulari = document.getElementById("formulariPersonal");
    const missatgeExit = document.getElementById("missatgeExit");
    const missatgeError = document.getElementById("missatgeError");

    const campsObligatoris = [
        { id: "nom", nom: "Nom" },
        { id: "cognoms", nom: "Cognoms" },
        { id: "adreca", nom: "Adreça" },
        { id: "edat", nom: "Edat" },
        { id: "email", nom: "Email" },
        { id: "telefon", nom: "Telèfon" }
    ];

    const campsTutorObligatoris = [
        { id: "nomTutor", nom: "Nom del tutor" },
        { id: "cognomsTutor", nom: "Cognoms del tutor" }
    ];

    // Activem els camps obligatoris
    function activaCampsObligatoris() {
        campsObligatoris.forEach(camp => {
            document.getElementById(camp.id).required = true;
        });
    }

    activaCampsObligatoris();

    // Mostra/oculta els camps del tutor basat en l'edat
    function comprovaEdat() {
        const edat = parseInt(campEdat.value);
        if (!isNaN(edat) && edat < 18) {
            campsTutor.style.display = "block";
            campsTutorObligatoris.forEach(camp => {
                document.getElementById(camp.id).required = true;
            });
        } else {
            campsTutor.style.display = "none";
            campsTutorObligatoris.forEach(camp => {
                document.getElementById(camp.id).required = false;
            });
        }
    }

    // Comprovar canvis d'edat
    campEdat.addEventListener("input", comprovaEdat);

    // Validació abans de l'enviament
    function validaFormulari(event) {
        event.preventDefault(); //(Prevenir l'enviament)

        const errors = [];
        missatgeError.innerHTML = ""; // Nateja els errors previs
        missatgeError.style.display = "none"; // Oculta el missatge d'error

        // Validar camps obligatoris
        campsObligatoris.forEach(camp => {
            const element = document.getElementById(camp.id);
            if (element.value.trim() === "") {
                errors.push(`El camp "${camp.nom}" és obligatori.`);
            }
        });

        // Validar camps del tutor si és menor d'edat
        const edat = parseInt(campEdat.value);
        if (!isNaN(edat) && edat < 18) {
            campsTutorObligatoris.forEach(camp => {
                const element = document.getElementById(camp.id);
                if (element.value.trim() === "") {
                    errors.push(`El camp "${camp.nom}" és obligatori per a menors d'edat.`);
                }
            });
        }

        // Si hi ha errors, mostrar-los tots
        if (errors.length > 0) {
            missatgeError.innerHTML = errors.join("<br>"); // Mostra tots els errors
            missatgeError.style.display = "block"; // Mostrar el missatge d'error
            return; // No enviar el formulari
        }

        // Si tot és correcte, mostrar missatge d'èxit
        formulari.style.display = "none";
        missatgeExit.style.display = "block";
    }

    // Afegir esdeveniment submit al formulari
    formulari.addEventListener("submit", validaFormulari);

});
