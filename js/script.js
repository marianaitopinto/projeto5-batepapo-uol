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

    function entrar(status) {
        alert("Deu certo");
        setInterval(verificarConexaoUsuarios, 5000);
    }

    function deuErro(erro) {
        let statusErro = erro.response.status;

        if (statusErro === 400) {
            alert("Esse usuário já está sendo utilizado!! Utilize outro.");
            entrarSala();
        }
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

entrarSala();