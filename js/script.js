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

function entrar(status) {
    alert("Deu certo");
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
    })

}

function alertar() {
    alert("Deu ruim no carregamento")
}

entrarSala();