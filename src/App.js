import './App.css';
import Listar from "./Components/Listar";
import Crear from "./Components/Crear";
import Editar from "./Components/Editar";
import { Route,BrowserRouter as Router,Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
              <div className="nav navbar-nav">
                  <Link className="nav-item nav-link active" to={"/"}>Sistema<span className="sr-only"></span></Link>
                  
              </div>
          </nav>
      <div className="container">
          <h1>CRUD EMPLEADOS</h1>
          <Route exact path="/" component={Listar}></Route>
          <Route exact path="/crear" component={Crear}></Route>
          <Route exact path="/editar" component={Editar}></Route>
          <Route exact path="/editar/:id" component={Editar}></Route>
      </div>
    </Router>
  );
}

export default App;
