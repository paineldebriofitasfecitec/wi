const frase = "EU TE AMO MIL MILOES";
let tentativas = 7;
let letrasAdivinhadas = [];
let fraseCompleta = "_ ".repeat(frase.length).trim();

const forcaImg = document.getElementById("forca-img");
const palavraEl = document.getElementById("palavra");
const letraInput = document.getElementById("letra");
const enviarBtn = document.getElementById("enviar");
const mensagemEl = document.getElementById("mensagem");
const tentarNovamenteBtn = document.getElementById("tentar-novamente");

function atualizarPalavra() {
    let display = "";
    for (let char of frase) {
        if (letrasAdivinhadas.includes(char) || char === " ") {
            display += char + " ";
        } else {
            display += "_ ";
        }
    }
    palavraEl.textContent = display.trim();
}

function verificarLetra() {
    const letra = letraInput.value.toUpperCase();
    letraInput.value = "";
    mensagemEl.textContent = "";

    if (letra.length !== 1 || !/[A-Z]/.test(letra)) {
        mensagemEl.textContent = "Por favor, digite uma única letra.";
        return;
    }

    if (letrasAdivinhadas.includes(letra)) {
        mensagemEl.textContent = `Você já adivinhou a letra ${letra}`;
        return;
    }

    letrasAdivinhadas.push(letra);

    if (frase.includes(letra)) {
        mensagemEl.textContent = `Parabéns, ${letra} está na frase!`;
    } else {
        mensagemEl.textContent = `${letra} não está na palavra.`;
        tentativas--;
        forcaImg.src = `${tentativas}.png`;
    }

    atualizarPalavra();

    if (!palavraEl.textContent.includes("_")) {
        mensagemEl.textContent = "Parabéns! Você acertou a frase completa!";
        enviarBtn.disabled = true;
        tentarNovamenteBtn.style.display = "block";
    } else if (tentativas <= 0) {
        mensagemEl.textContent = "Você perdeu!";
        enviarBtn.disabled = true;
        tentarNovamenteBtn.style.display = "block";
    }
}

function reiniciarJogo() {
    tentativas = 7;
    letrasAdivinhadas = [];
    fraseCompleta = "_ ".repeat(frase.length).trim();
    forcaImg.src = "7.png";
    mensagemEl.textContent = "";
    enviarBtn.disabled = false;
    tentarNovamenteBtn.style.display = "none";
    atualizarPalavra();
}

enviarBtn.addEventListener("click", verificarLetra);
tentarNovamenteBtn.addEventListener("click", reiniciarJogo);

atualizarPalavra();
