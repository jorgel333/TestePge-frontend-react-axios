import { Link } from "react-router-dom"

import "./Navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to={`/`}>Gerenciador de processos</Link>
        </h2>
        <ul>
            <li>
                <Link to={`/`}>Home</Link>
            </li>
            <li>
                <Link to={`/clientes`}>Clientes</Link>
            </li>
            <li>
                <Link to={`/advogados`}>Advogados</Link>
            </li>
            <li>
                <Link to ={`/clientesadvogados`}>Cadastrar Cliente e Advogado</Link>
            </li>
            <li>
                <Link to={`/new`} className="new-btn">
                    Registrar novo processo
                </Link>
            </li>

        </ul>
    </nav>
  );
}

export default NavBar