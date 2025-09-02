import { useEffect, useState } from "react";
import "./App.css";

const URL =
  "https://raw.githubusercontent.com/MarcioAlexandreWork/API-minhas--faculdade-/refs/heads/main/api.json"; //declarando uma variada para armazenar a API

function App() { //Função principal do React para passa informações para a página
  const [produtos, setProdutos] = useState([]);



  const [carrinho, setCarrinho] = useState(() => {
    //Carregar o carrinho do localStorage
    const saved = localStorage.getItem("carrinho");
    return saved ? JSON.parse(saved) : [];
  });








  const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
  const [spinner, setSpinner] = useState(false);











  // Dar fetch na URL com a API integrada
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then(setProdutos)
      .catch(console.error);
  }, [])







  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho])





  function adicionarCarrinho(produto) {
    if (carrinho.some((item) => item.img === produto.img)) {
      alert("O produto já está no carrinho!")
      return
    }
    setCarrinho([...carrinho, produto])
    alert("Item adicionado ao carrinho!")
  }

  function removerCarrinho(img) {
    setCarrinho(carrinho.filter((item) => item.img !== img))
  }

  async function comprartudo() {
    setSpinner(true)
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
      if (!res.ok) throw new Error()
      alert("Compra feita!")
      setCarrinho([])
      localStorage.clear()
    } catch {
      alert("Não foi possível realizar a compra, tente mais tarde")
    }
    setSpinner(false)
  }












  
  return (
    <>
      <header>
        <h1 className="titulo-header">Zettalab</h1>
        <nav>
          <ul>
            <li>
              <a href="#" className="infos">Menu</a>
              <a href="#" className="infos">Produtos</a>
              <a href="#" className="infos">Pedidos</a>
              <a href="#" className="infos">Contato</a>
            </li>
          </ul>
        </nav>
        <div className="icons">
          <button
            className="fa-solid fa-cart-shopping"
            id="icon-carrinho"
            onClick={() => setCarrinhoVisivel((v) => !v)}
          />
        </div>
      </header>
      {carrinhoVisivel && (
        <div className="side-carrinho" id="carrinho">
          <h1>Carrinho</h1>
          <ul>
            {carrinho.map((item) => (
              <li className="produto-carrinho" key={item.img}>
                <div>
                  <img src={item.img} alt="produto" className="img-carrinho" />
                  <button
                    className="remover"
                    onClick={() => removerCarrinho(item.img)}
                  >
                    Remover do Carrinho
                  </button>
                  <div>
                    <h5>{item.nome}</h5>
                  </div>
                  <div style={{ float: "left" }}>
                    <span>Preço: {item.preco}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="botao-comprar" onClick={comprartudo}>
            comprar
          </button>
          {spinner && (
            <div id="spinner">
              <div className="spinner" />
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          )}
        </div>
      )}
      <div>
        <ul id="cards-produtos">
          {produtos.map((produto) => (
            <li className="card-produto" key={produto.img}>
              <h1 className="titulo-produto">{produto.prdt}</h1>
              <div className="compra">
                <img
                  src={produto.img}
                  alt="prdt-img"
                  className="imgs-produto-loja"
                />
                <div className="desc-produto">
                  <p>{produto.desc}</p>
                  <h4 id="tipoFiltro">Tipo: {produto.tipo}</h4>
                  <div className="qnt">
                    <h3>R$ {produto.preco}</h3>
                    <button
                      className="colocar-carrinho"
                      onClick={() =>
                        adicionarCarrinho({
                          nome: produto.prdt,
                          preco: produto.preco,
                          img: produto.img,
                        })
                      }
                    >
                      Colocar no carrinho
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <p>© 2025 ZettaLab - Todos os direitos</p>
      </footer>
    </>
  );
}

export default App;
