const btnEnviar = document.querySelector("button");
let inputPalpite = document.querySelector("#palpite");
let divFormJogo = document.querySelector(".form-jogo");
let divResultados = document.querySelector(".resultados");
let spanPalpites = document.querySelector(".palpitesUsados");
let spanResultado = document.querySelector(".resultado");
let spanBaixoAlto = document.querySelector(".baixoOuAlto");

let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let qtdTentativas = 10;
let palpitesUsados = [];

btnEnviar.addEventListener("click", verificaPalpite);

function verificaPalpite() {
  let valorPalpite = Number(inputPalpite.value);
  divResultados.classList.add("ativo");

  while (qtdTentativas > 1) {
    if (valorPalpite === numeroAleatorio) {
      spanResultado.classList.add("certo");
      spanResultado.textContent = "Parabéns! Você Acertou";
      spanBaixoAlto.textContent = "";
      palpitesAnteriores(valorPalpite);
      configFimDeJogo();
      return;
    } else if (valorPalpite < numeroAleatorio) {
      spanBaixoAlto.textContent = "Seu palpite está muito baixo!";
      inputPalpite.value = "";
      inputPalpite.focus();
      qtdTentativas--;
      palpitesAnteriores(valorPalpite);
      return;
    } else if (valorPalpite > numeroAleatorio) {
      spanBaixoAlto.textContent = "Seu palpite está muito alto!";
      inputPalpite.value = "";
      inputPalpite.focus();
      qtdTentativas--;
      palpitesAnteriores(valorPalpite);
      return;
    }
  }

  if (qtdTentativas === 1) {
    inputPalpite.disabled = true;
    spanResultado.classList.add("errado");
    spanBaixoAlto.textContent = "";
    spanResultado.textContent = "Você perdeu! Suas tentativas acabaram.";
    inputPalpite.value = "";
    qtdTentativas--;
    palpitesAnteriores(valorPalpite);
    configFimDeJogo();
    return;
  }
}

function palpitesAnteriores(numero) {
  palpitesUsados.push(numero);
  spanPalpites.textContent = `Palpites Anteriores: ${palpitesUsados.join(
    ", "
  )}`;
}

function configFimDeJogo() {
  const btnReset = document.createElement("button");
  btnReset.textContent = "Reiniciar Jogo";
  btnReset.style = "background-color: #ffcc2c";

  divFormJogo.appendChild(btnReset);

  btnReset.addEventListener("click", reiniciaJogo);
}

function reiniciaJogo() {
  let spans = document.querySelectorAll("span");

  spans.forEach((span) => {
    span.textContent = "";
  });

  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  qtdTentativas = 10;
  palpitesUsados = [];
  inputPalpite.disabled = false;
  inputPalpite.value = "";
  divResultados.classList.remove("ativo");
  this.parentNode.removeChild(this);
}
