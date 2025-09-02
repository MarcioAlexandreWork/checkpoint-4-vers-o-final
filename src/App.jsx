import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'src/assets/script.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <>
      <header>
        <h1 className="titulo-header">Zettalab</h1>
        <nav>
          <ul>
            <li>
              <a href="#" className="infos">
                Menu
              </a>
              <a href="#" className="infos">
                Produtos
              </a>
              <a href="#" className="infos">
                Pedidos
              </a>
              <a href="#" className="infos">
                Contato
              </a>
            </li>
          </ul>
        </nav>
        <div className="icons">
          <a
            className="fa-solid fa-cart-shopping"
            href="#"
            id="icon-carrinho"
            onclick="abrirCarrinho('carrinho')"
          />
        </div>
      </header>
      <input
        id="filtrador"
        className="filtragem"
        type="text"
        placeholder="Filtro: Ex: Roupas e acessórios sustentáveis"
      />
      <div className="side-carrinho" id="carrinho" style={{ visibility: "hidden" }}>
        <h1>Carrinho</h1>
        <ul id="carrinho-produtos"></ul>
        <button className="botao-comprar" onclick="comprartudo()">
          comprar
        </button>
        <div id="spinner" style={{ visibility: "hidden" }}>
          <div className="spinner" />
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
      <div>
        <ul id="cards-produtos"></ul>
      </div>
      <footer>
        <p>© 2025 ZettaLab - Todos os direitos</p>
      </footer>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </>

    </>
  )
}

export default App
