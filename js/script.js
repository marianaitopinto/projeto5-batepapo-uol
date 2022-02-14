let nome = "";

function entrarLogin() {
    nome = document.querySelector(".login").value;
    if (nome == "") {
        alert("É necessário digitar o usuário")
    } else {
        entrarSala();
    }
}

function entrarSala() {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",
        {
            name: nome
        }
    );

    promessa.then(entrar);
    promessa.catch(deuErro);
}

function entrar() {
    const batePapo = document.querySelector(".principal");
    batePapo.classList.remove("escondido");
    const esconder = document.querySelector(".telaLogin");
    esconder.classList.add("escondido")
    setInterval(verificarConexaoUsuarios, 5000);
    setInterval(atualizarMensagens, 3000);
    carregarMensagens();
}

function deuErro(erro) {
    let statusErro = erro.response.status;

    if (statusErro === 400) {
        alert("Esse usuário já está sendo utilizado!! Utilize outro.");
        nome = prompt("Digite o seu usuário:");
        entrarSala();
    }
}

function verificarConexaoUsuarios() {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",
        {
            name: nome
        }
    );

    promessa.then();
}

function carregarMensagens() {
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    mensagens.then(renderizarMensagensTela);
    mensagens.catch(alertar);
}

function renderizarMensagensTela(mensagem) {
    let dadosMensagens = mensagem.data;
    let corpoMensagem = document.querySelector(".mensagensBatePapo");
    corpoMensagem.innerHTML = "";

    dadosMensagens.forEach(item => {

        if (item.type === 'message') {
            corpoMensagem.innerHTML += `
            <div class="mensagemParaTodos mensagem" data-identifier="message">
                <span>(${item.time})  </span> <b>${item.from}</b> para <b>${item.to}</b>: ${item.text}
            </div>           
            `
        } else if (item.type === 'private_message') {

            corpoMensagem.innerHTML += `
            <div class="mensagemPrivada mensagem" data-identifier="message">
            <span>(${item.time})  </span> <b>${item.from}</b> para <b>${item.to}</b>: ${item.text}
            </div>
            `
        } else if (item.type === 'status') {
            corpoMensagem.innerHTML += `
            <div class="status mensagem" data-identifier="message">
            <span>(${item.time})  </span> <b>${item.from}</b>  ${item.text}
            </div>
            `
        }

    })

    corpoMensagem.children[corpoMensagem.children.length - 1].scrollIntoView();
}

function alertar() {
    alert("Não foi possível carregar novas mensagens.");
}

function enviarMensagem() {
    let para = "Todos";
    let tipo = "message";
    let input = document.querySelector("footer input").value;

    if (input == "") {
        alert("Não é possível enviar uma mensagem vazia.")
    } else {
        const inputs = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
            {
                from: nome,
                to: para,
                text: input,
                type: tipo
            }
        );

        inputs.then(carregarMensagens);
        inputs.catch(deslogado);
        atualizarMensagens();
        limparinput();
    }
}

const enviarEnter = (buttonId) => {
    if (event.keyCode == 13) {
        document.getElementById(`${buttonId}`).click()
    }
}

function deslogado() {
    window.location.reload();
}

function atualizarMensagens() {
    carregarMensagens();
}

function limparinput() {
    document.querySelector("footer input").value = "";
}