let nome = "";

function entrarSala() {

    nome = prompt("Digite o seu usuário:");

    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",
        {
            name: nome
        }
    );

    promessa.then(entrar);
    promessa.catch(deuErro);

}

function entrar() {
    setInterval(verificarConexaoUsuarios, 5000);
    carregarMensagens();
}

function deuErro(erro) {
    let statusErro = erro.response.status;

    if (statusErro === 400) {
        alert("Esse usuário já está sendo utilizado!! Utilize outro.");
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
    console.log(dadosMensagens);

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

        //const elementoScrolavel = document.querySelector(".mensagem");
        //elementoScrolavel.scrollIntoView();
    })

}

function alertar() {
    alert("Deu ruim no carregamento");
}

function enviarMensagem() {
    let para = "Todos";
    let tipo = "message";
    let input = document.querySelector("input").value;
    const inputs = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
        {
            from: nome,
            to: para,
            text: input,
            type: tipo
        }
    );

    inputs.then(renderizarMensagensTela);
}

function atualizarMensagens() {
    let corpoMensagem = document.querySelector(".mensagensBatePapo");
    corpoMensagem.innerHTML = "";
    entrar();
}

entrarSala();
setInterval(atualizarMensagens, 3000);