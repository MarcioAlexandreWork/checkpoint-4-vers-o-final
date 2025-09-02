//declaração de variáveis
let todosProdutos = []
let URL = "https://raw.githubusercontent.com/MarcioAlexandreWork/API-minhas--faculdade-/refs/heads/main/api.json" //declarando uma variada para armazenar a API
let inserirProdutos = document.getElementById('cards-produtos') //inserir as informações em um 
let inserirProdutosCarrinho = document.getElementById('carrinho-produtos')
let spinner = document.getElementById('spinner')

    





async function pegarOsProdutosPorAPI(){
    try{
        const res = await fetch(URL);
        if (!res.ok){
            throw new Error('Não foi possível encontrar os produtos. Erro: '+ res.statusText);
            
        }
        todosProdutos = await res.json();
        mostrarProdutos(todosProdutos)
    }
    catch(erro){
        console.log('Não foi possível carregar tudo: ', erro)
    }
        
}


async function comprartudo(){
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!res.ok){
            throw new Error('Não foi possível fazer a compra. Erro: '+ res.statusText);
        }
        spinner.style.visibility='visible'
        window.alert('Compra feita!')
        localStorage.clear()
        inserirProdutosCarrinho.innerHTML=``
        spinner.style.visibility='invisible'

    }
    catch(erro){
        window.alert('Não foi possível realizar a compra, tente mais tarde')
            
            
    }
}


//Botoões



function abrirCarrinho(id){
    if (document.getElementById(id).style.visibility=='hidden'){
        document.getElementById(id).style.visibility='visible'
    }
    else{
        document.getElementById(id).style.visibility='hidden'
    }
}





//função de adição ao carrinho
function coloCarrinho(nome, preco, img){
    let item = {nome, preco, img}

    let itemExiste = false


    //Se o carrinho existir, pegar o carrinho do localStorag
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    //Percorre o carrinho para ver se 'img' está na lista (Img sendo utilizado como fator princripal de procura, seria melhor colocar um Id, mas quando
    //mas quando percebi, achei melhor usar img do que ir na API e criar um ID para cada objeto pois iria levar muito tempo)
    for(let i=0;i<carrinho.length; i++){
        if(carrinho[i].img===img){
            itemExiste = true //Torna a variável "itemExiste" no caso do "img" (sendo usado como indentificador) existe
            break //Quebrar ao achar, é improvável que dê false já que a essa procura está associada à API que é assincrona, então se a API não carregar, não terá botão de colocar produto no carrinho
        }
    }

    if(itemExiste){
        window.alert('O produto já está no carrinho!') // Se o item já está existe, a ação de adição não ocorrerá e o usuário será avisado

    }
    else{
        carrinho.push(item) //Adicionar o item ao carrinho
        localStorage.setItem('carrinho', JSON.stringify(carrinho)) //Colocar no localStorage por conta da persistência
        window.alert('Item adicionado ao carrinho! Clique o no incone para ve-lo') //Quando adicionado, avisar o usuário
    }
    //Update o carrinho
    upCarrinho()

}
//carrinho(
//Função de update do carrinho
function upCarrinho(){
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [] //Peguar os valores do carrinho
    inserirProdutosCarrinho.innerHTML ='' //Deixa a página vazia antes da proxima ação
    carrinho.forEach(item =>{  //Para cara item dentro de carrinho
        inserirProdutosCarrinho.innerHTML += //colocar dentro da área  informação em HTML
        `
            <li class="produto-carrinho">
                <div>
                    <img src="${item.img}" alt="teste" class="img-carrinho">
                    <a href="#" class="remover" onclick="removerDoCarrinho('${item.img}')">Remover do Carrinho</a>
                    <div><h5>${item.nome}</h5></div>
                    <div style="float: left;">
                            <span>Preço: ${item.preco}</span>
                        </div>   
                    </div> 
                </div>
            </li>
        `
        

    })
    

}

//Função de remoção dos itens do carrinho
function removerDoCarrinho(img) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [] //Peguar os valores do carrinho
    carrinho = carrinho.filter(item => item.img !== img) // filtra o carrinho para remover "img" (Sendo utilizado como ID)
    localStorage.setItem('carrinho', JSON.stringify(carrinho)) //Atualizar o carrinho
    upCarrinho() //Update o carrinho
}
    //Função para aparecer os produtos na página de loja
function mostrarProdutos(todosProdutos){
    
    todosProdutos.forEach(produto =>{
        
        inserirProdutos.innerHTML+=
        `
        <li class="card-produto" id="${produto.tipo}">
            <h1 class="titulo-produto">${produto.prdt}</h1>
            <div class="compra">
                <img src="${produto.img}" alt="prdt-img" class="imgs-produto-loja">
                <div class="desc-produto">
                    <p>${produto.desc}</p>
                    <h4 id='tipoFiltro'>Tipo: ${produto.tipo}</h4>
                    <div class="qnt">
                        <h3 >R$ ${produto.preco}</h3>
                        <a class="colocar-carrinho" id='botao ${produto.prdt}' href="#" data-nome="${produto.prdt}" data-preco="${produto.preco}" data-img="${produto.img}" >Colocar no carrinho</a>
                    </div>    
                </div>
            </div>
        </li>
        `;
    })

    //Ação de "colocar no carrinho"
    document.querySelectorAll('.colocar-carrinho').forEach(botao => {
    botao.addEventListener('click', (e) => {
        e.preventDefault()
        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco);
        const img = botao.dataset.img;
        coloCarrinho(nome, preco, img);
    });
});

}




















pegarOsProdutosPorAPI()
upCarrinho()