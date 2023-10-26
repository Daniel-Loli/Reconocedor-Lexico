class Analizador {
    constructor() {
        this.indice = 0;
        this.q_error = -1;
        this.q_final = 100;
        this.var_tipos = ["entero", "real"];
        this.entero = "entero";
        this.real = "real";
        this.main = "main";
        this.buffer = "";
        this.mientras = "mientras";
        this.fmientras = "fmientras";
        this.sino = "sino";
        this.fsi = "fsi";
        this.si = "si";
        this.ocurrio_error = false;
        this.filaActual = 1;
        this.filaError = 0;
        this.idReconocida = "";
        this.estructuraReconocida = "";
        this.estructuraMientras = "";
        this.estructuraSino = "";
        this.imprimir = "imprimir";
        this.idImprimir = "";
    }

    analizar_cadenaTemp(cadena) {
        console.log("Oración a analizar: \n" + cadena);
        let q = 0;
        this.indice = 0;
        this.buffer = "";
        this.estructuraSino = "";

        let cadenaTemp = cadena + '$';
        let caracter;

        while (q !== this.q_final && q !== this.q_error && this.indice < cadenaTemp.length) {
            caracter = cadenaTemp.charAt(this.indice);

            if (caracter === '\n' || caracter === ' ' || caracter === '\t') {
                do {
                    this.indice++;
                    caracter = cadenaTemp.charAt(this.indice);
                } while (caracter === '\n' || caracter === ' ' || caracter === '\t');
                this.filaActual++; // Incrementa la línea actual
            }

            switch (q) {
                case 0:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 0;
                        this.buffer += caracter;
                    } else {
                        q = this.q_error;
                    }

                    if (this.buffer === this.main) {
                        q = 7;
                        this.buffer = "";
                    } else if (this.buffer === this.entero) {
                        q = 17;
                        this.buffer = "";
                    } else if (this.buffer === this.real) {
                        q = 1;
                        this.buffer = "";
                    }
                    break;
                case 1:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 2;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 2:
                    if (caracter.match(/[a-zA-Z0-9]/)) {
                        q = 2;
                    } else if (caracter === '=') {
                        q = 20;
                    } else if (caracter === ';') {
                        q = 16;
                    } else {
                        if (caracter === '(') {
                            q = 3;
                        } else {
                            q = this.q_error;
                        }
                    }
                    break;
                case 3:
                    if (caracter === ')') {
                        q = 4;
                    } else {
                        if (caracter.match(/[a-zA-Z]/)) {
                            q = 12;
                            this.buffer = caracter;
                        } else {
                            q = this.q_error;
                        }
                    }
                    break;
                case 4:
                    if (caracter === '{') {
                        q = 5;
                    } else if (caracter === ';') {
                        q = 15;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 5:
                    if (caracter === '}') {
                        q = 6;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 6:
                    if (caracter === '$') {
                        q = this.q_final;
                        this.buffer = "";
                    } else if (caracter.match(/[a-zA-Z]/)) {
                        q = 6;
                        this.buffer += caracter;
                    } else {
                        q = this.q_error;
                    }
                    if (this.buffer === this.main) {
                        q = 7;
                        this.buffer = "";
                    }
                    break;
                case 7:
                    if (caracter === '(') {
                        q = 8;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 8:
                    if (caracter === ')') {
                        q = 9;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 9:
                    if (caracter === '{') {
                        q = 10;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 10:
                    if (caracter === '}') {
                        q = 11;
                    } else if (caracter.match(/[a-zA-Z]/)) {
                        q = 25;
                        this.estructuraReconocida = caracter;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 11:
                    if (caracter === '$') {
                        q = this.q_final;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 12:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 12;
                        this.buffer += caracter;
                    } else {
                        q = this.q_error;
                    }
                    if (this.buffer === this.entero || this.buffer === this.real) {
                        q = 13;
                        this.buffer = "";
                    }
                    break;
                case 13:
                    if (caracter.match(/[a-zA-Z0-9]/)) {
                        q = 13;
                    } else if (caracter === ',') {
                        q = 14;
                    } else if (caracter === ')') {
                        q = 4;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 14:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 12;
                        this.buffer = caracter;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 15:
                    if (caracter === '$') {
                        q = this.q_final;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 16:
                    if (caracter === '$') {
                        q = this.q_final;
                    } else if (caracter.match(/[a-zA-Z]/)) {
                        q = 0;
                        this.buffer = caracter;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 17:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 18;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 18:
                    if (caracter.match(/[a-zA-Z0-9]/)) {
                        q = 18;
                    } else if (caracter === '(') {
                        q = 3;
                    } else if (caracter === ';') {
                        q = 16;
                    } else if (caracter === '=') {
                        q = 19;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 19:
                    if (caracter.match(/[0-9]/)) {
                        q = 23;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 20:
                    if (caracter.match(/[0-9]/)) {
                        q = 21;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 21:
                    if (caracter.match(/[0-9]/)) {
                        q = 21;
                    } else if (caracter === '.') {
                        q = 22;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 22:
                    if (caracter.match(/[0-9]/)) {
                        q = 23;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 23:
                    if (caracter.match(/[0-9]/)) {
                        q = 23;
                    } else if (caracter === ';') {
                        q = 24;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 24:
                    if (caracter.match(/[a-zA-Z]/)) {
                        console.log(caracter);
                        q = 0;
                        this.buffer = caracter;
                    } else if (caracter === '(') {
                        q = 3;
                    } else if (caracter === '$') {
                        q = this.q_final;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 25:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 25;
                        this.estructuraReconocida += caracter;
                    } else {
                        q = this.q_error;
                    }

                    if (this.estructuraReconocida === this.si) {
                        q = 26;
                        this.estructuraReconocida = "";
                    } else if (this.estructuraReconocida === this.imprimir) {
                        q = 44;
                    } else if (this.estructuraReconocida === this.mientras) {
                        q = 36;
                        this.estructuraReconocida = "";
                    }
                    break;
                case 26:
                    if (caracter === '(') {
                        q = 27;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 27:
                    if (caracter === 'C') {
                        q = 28;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 28:
                    if (caracter === ')') {
                        q = 29;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 29:
                    if (caracter === '{') {
                        q = 30;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 30:
                    if (caracter === '}') {
                        q = 31;
                    } else if (caracter.match(/[a-zA-Z]/)) {
                        q = 35;
                        this.estructuraReconocida = caracter;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 31:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 32;
                        this.estructuraSino = caracter;
                    } else if (caracter === '}') {
                        q = 11;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 32:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 32;
                        this.estructuraSino += caracter;
                    } else {
                        q = this.q_error;
                    }

                    if (this.estructuraSino === this.sino) {
                        if (caracter === '{') {
                            q = 33;
                        }
                    }
                    break;
                case 33:
                    if (caracter === '}') {
                        q = 34;
                    } else if (caracter.match(/[a-zA-Z]/)) {
                        q = 35;
                        this.estructuraReconocida = caracter;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 34:
                    if (caracter === '}') {
                        q = 43;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 35:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 35;
                        this.estructuraReconocida += caracter;
                    } else {
                        q = this.q_error;
                    }

                    if (this.estructuraReconocida === this.si) {
                        q = 26;
                        this.estructuraReconocida = "";
                    } else if (this.estructuraReconocida === this.mientras) {
                        q = 36;
                        this.estructuraReconocida = "";
                    }
                    break;
                case 36:
                    if (caracter === '(') {
                        q = 37;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 37:
                    if (caracter === 'C') {
                        q = 38;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 38:
                    if (caracter === ')') {
                        q = 39;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 39:
                    if (caracter === '{') {
                        q = 40;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 40:
                    if (caracter === '}') {
                        q = 41;
                    } else if (caracter.match(/[a-zA-Z]/)) {
                        q = 35;
                        this.estructuraReconocida = caracter;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 41:
                    if (caracter === '}') {
                        q = 11;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 42:
                    if (caracter === '$') {
                        q = this.q_final;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 43:
                    if (caracter === '$') {
                        q = this.q_final;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 44:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 44;
                        this.idImprimir += caracter;
                    } else {
                        q = this.q_error;
                    }

                    if (this.idImprimir === this.imprimir) {
                        q = 45;
                    }
                    break;
                case 45:
                    if (caracter === '(') {
                        q = 46;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 46:
                    if (caracter.match(/[a-zA-Z]/)) {
                        q = 47;
                    } else if (caracter === ')') {
                        q = 48;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 47:
                    if (caracter.match(/[a-zA-Z0-9]/)) {
                        q = 47;
                    } else if (caracter === ')') {
                        q = 48;
                    } else {
                        q = this.q_error;
                    }
                    break;
                case 48:
                    if (caracter === '}') {
                        q = 11;
                    } else {
                        q = this.q_error;
                    }
                    break;
            }
            this.indice++;
        }

        if (q === this.q_final) {
            this.ocurrio_error = false;
            console.log("SIN ERROR");
        } else {
            this.ocurrio_error = true;
            console.log("ERROR en línea " + this.filaError);
        }
    }
}

    
  
    
// Código para cargar un archivo y llamar al analizador  
document.getElementById("fileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const texto = reader.result;
        document.getElementById("textInput").value = texto;
        document.getElementById("fileText").textContent = "Contenido del archivo:\n" + texto;
        analizarTexto();
    };

    reader.readAsText(file);
});

function analizarTexto() {
    const texto = document.getElementById("textInput").value;
    const analizador = new Analizador();

    const textResult = document.getElementById("textResult");
    analizador.analizar_cadenaTemp(texto);
    if (analizador.ocurrio_error) {
        textResult.textContent = "Resultado: ERROR en el caracter " + analizador.filaActual;
        textResult.style.color = "red";
    } else {
        textResult.textContent = "Resultado: SIN ERROR";
        textResult.style.color = "green";
    }
}