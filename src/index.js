document.getElementById('inputfile').addEventListener('change', function () {
    let fr = new FileReader();
    
    fr.onload = function () {
        document.body.innerHTML = "";
        createSlides(fr.result);
    }

    fr.readAsText(this.files[0]);
});

const createSlides = tsv => {
    const lines = tsv.split('\n');
    lines.shift();

    for (const line of lines) {
        /**
         * 0 - nombre
         * 1 - municipio
         * 2 - contratista
         * 3 - inversion
         * 4 - beneficiarios
         * 5 - inicio
         * 6 - fin
         * 7 - avance
         * 8 - alcances
         * 9 - mapa
         * 10 - antes
         * 11 - despues
         */
        const columns = line.split('\t');

        // create html for each goal
        const goals = columns[8].split(';');
        let goalsHTML = "";

        for (const goal of goals) {
            goalsHTML += `<div class="alcance">${goal}</div>\n`;
        }

        const slide = `<div class="diapositiva">
            <div class="nombre">
                <p>${columns[0]}</p>
            </div>
    
            <div class="lugar">
                <p>${columns[1]}</p>
            </div>

            <div class="contratista">
                <p>${columns[2]}</p>
            </div>
    
            <div class="alcances">
                ALCANCES
                ${goalsHTML}
            </div>
    
            <div class="mapa">
                <img src="./imagenes/${columns[9]}" alt="Verifica el nombre de la imagen">
            </div>
    
            <div class="antes">
                <img src="./imagenes/${columns[10]}" alt="Verifica el nombre de la imagen">
            </div>
    
            <div class="despues">
                <img src="./imagenes/${columns[11]}" alt="Verifica el nombre de la imagen">
            </div>
    
            <div class="sobre"></div>
    
            <div class="avance">${columns[7]}</div>
            <div class="inversion">${columns[3]}</div>
            <div class="bene">${columns[4]}</div>
    
            <div class="inicio">${columns[5]}</div>
            <div class="termino">${columns[6]}</div>
        </div>`;

        document.body.innerHTML += slide;
    }
};