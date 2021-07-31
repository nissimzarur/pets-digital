import "bootstrap/dist/css/bootstrap.min.css";

import NavbarMenu from "./components/NavbarMenu/NavbarMenu";
import Homepage from "./views/Homepage/Homepage";
import Products from "./views/Products/Products";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavbarMenu />
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
