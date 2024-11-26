async function obtenirDadesMeteo() {
    try {
        // Realitzem la sol·licitud de dades al JSON
        const resposta = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.4534225&lon=2.1837151&appid=aaffac333d8385f02a2a468ccae3d403&units=metric&lang=ca');

        // Verifiquem que la resposta sigui correcta
        if (!resposta.ok) {
            throw new Error(`Error en la petició: ${resposta.status}`);
        }

        // Convertim la resposta en JSON
        const dades = await resposta.json();
        console.log("Dades meteorològiques rebudes:", dades);

        // Obtenim el div amb id 'meteo' per mostrar les dades
        const divMeteo = document.getElementById("meteo");

        // Netegem el contingut del div abans de mostrar noves dades
        divMeteo.innerHTML = "";

        // Comprovem si existeixen dades meteorològiques
        if (dades && dades.weather) {
            dades.weather.forEach((element) => {
                // Lògica per mostrar un emoji segons la condició meteorològica
                let emoji;
                let climatologia, descripcio;

                switch (element.main.toLowerCase()) {
                    case 'clear':
                        emoji = "&#9728;&#65039;";  // Emoji per al sol (despejat)
                        climatologia = "Cel net";
                        descripcio = "Cel des de clar";
                        break;
                    case 'rain':
                        emoji = "&#9730;&#65039;";  // Emoji per a la pluja
                        climatologia = "Pluja";
                        descripcio = "Pluja lleugera";
                        break;
                    case 'clouds':
                        emoji = "&#9729;&#65039;";  // Emoji per a núvols
                        climatologia = "Núvols";
                        descripcio = "Núvols dispersos";
                        break;
                    case 'snow':
                        emoji = "&#10052;&#65039;";  // Emoji per a la neu
                        climatologia = "Neu";
                        descripcio = "Neu lleugera";
                        break;
                    case 'storm':
                        emoji = "&#9889;&#65039;";  // Emoji per a la tempesta
                        climatologia = "Tempesta";
                        descripcio = "Tempesta amb llamps";
                        break;
                    default:
                        emoji = "&#127780;";  // Emoji per defecte (símbol general)
                        climatologia = "Condicions desconegudes";
                        descripcio = "Descripció no disponible";
                        break;
                }

                // Creem un contenidor per a l'emoji i la informació
                const contenedor = document.createElement("div");
                contenedor.style.textAlign = 'center';  // Centrem el text
                contenedor.style.marginBottom = '20px';  // Afegim espai a sota

                // Creem un element de paràgraf per mostrar l'emoji
                const emojiElement = document.createElement("p");
                emojiElement.innerHTML = emoji;  // Mostrem l'emoji amb innerHTML
                emojiElement.style.fontSize = '100px';  // Mida de l'emoji
                emojiElement.style.margin = '0';  // Sense marges

                // Creem els elements de text a sota de l'emoji
                const climatologiaElement = document.createElement("p");
                climatologiaElement.textContent = `Climatologia: ${climatologia}`;
                climatologiaElement.style.fontSize = '18px';

                const descripcioElement = document.createElement("p");
                descripcioElement.textContent = `Descripció: ${descripcio}`;
                descripcioElement.style.fontSize = '18px';

                // **Ja no cal convertir la temperatura, perquè OpenWeather ja la retorna en Celsius**
                const temperaturaCelsius = dades.main.temp;  // La temperatura ja està en Celsius, així que utilitzem aquest valor

                // Comprovem que la temperatura no sigui un valor massa baix o massa alt
                if (temperaturaCelsius < -100 || temperaturaCelsius > 60) {
                    throw new Error("Temperatura fora de rang: " + temperaturaCelsius + "ºC");
                }

                // Mostrem la temperatura en graus Celsius
                const temperaturaElement = document.createElement("p");
                temperaturaElement.textContent = `Temperatura: ${temperaturaCelsius}ºC`;  // Mostrem en graus Celsius
                temperaturaElement.style.fontSize = '18px';

                const humitatElement = document.createElement("p");
                humitatElement.textContent = `Humitat: ${dades.main.humidity}%`;  // Mostrem la humitat de la resposta
                humitatElement.style.fontSize = '18px';

                // Afegim els elements al contenidor
                contenedor.appendChild(emojiElement);
                contenedor.appendChild(climatologiaElement);
                contenedor.appendChild(descripcioElement);
                contenedor.appendChild(temperaturaElement);
                contenedor.appendChild(humitatElement);

                // Afegim el contenidor al div principal
                divMeteo.appendChild(contenedor);
            });
        } else {
            divMeteo.textContent = "No hi ha dades disponibles.";
        }
    } catch (error) {
        console.error("Error:", error);

        // Comprovem si el div amb id 'meteo' existeix
        const divMeteo = document.getElementById("meteo");
        if (divMeteo) {
            divMeteo.textContent = "Error en carregar les dades meteorològiques.";
        } else {
            console.error("L'element 'meteo' no existeix al DOM.");
        }
    }
}

// Cridem la funció quan el DOM estigui carregat
document.addEventListener("DOMContentLoaded", () => {
    console.log("Pàgina carregada, cridant la funció obtenirDadesMeteo");
    obtenirDadesMeteo();
});
