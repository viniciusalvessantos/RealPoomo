
//Conexão 
var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();
//Inicialixar Conexão
connection.start().then(function () {
    console.info("Connected!");
}).catch(function (err)
{
    console.error(err.toString());
});

connection.on("CadastrardoSucesso", function () {
    var mensagem = document.getElementById("Mensagem");
    mensagem.innerHTML = "Cadastrar de promoção realizado com sucesso!";

});

connection.on("ReceberPromocao", function (promocao)
{
    var containerLogin = document.getElementById("container-login");
    var containerPromo = document.createElement("div");
    containerPromo.setAttribute("class", "container-promo");
    var containerChamada = document.createElement("div");
    containerChamada.setAttribute("class", "container-chamada");
    var titulo = document.createElement("h1");
    titulo.innerText = promocao.empresa;
    var p1 = document.createElement("p");
    p1.innerText = promocao.chamada;
    var p2 = document.createElement("p");
    p2.innerText = promocao.regras;
    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao");

    var link = document.createElement("a");
    link.setAttribute("href", promocao.enderecoURL);
    link.innerText = "Pegar";
    containerChamada.appendChild(titulo);
    containerChamada.appendChild(p1);
    containerChamada.appendChild(p2);
    containerBotao.appendChild(link);
    containerPromo.appendChild(containerChamada);
    containerPromo.appendChild(containerBotao);
    containerLogin.appendChild(containerPromo);
    console.info(promocao);
});

var btnCadastrar = document.getElementById("BtnCadastrar");
if (btnCadastrar != null)
{
    btnCadastrar.addEventListener("click", function ()
    {
        var empresa = document.getElementById("Empresa").value;
        var chamada = document.getElementById("Chamada").value;
        var regras = document.getElementById("Regras").value;
        var enderecoURL = document.getElementById("EnderecoURL").value;

        var promocao = { Empresa: empresa, Chamada: chamada, Regras: regras, EnderecoURL: enderecoURL };
       
        //TODO - SignalR chamar o cadastro de promoção
        connection.invoke("CadastrarPromocao", promocao).then(function () {
            console.info("cadastrado com sucesso!");

        }).catch(function (err) {
            console.error(err.toString());
        });

    });
}
