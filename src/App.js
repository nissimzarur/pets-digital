import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
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

import OrderReducer from "./redux/Order/reducer";
import Cart from "./views/Cart/Cart";

const rootReducer = combineReducers({
  OrderReducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarMenu />
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={Products} />
          <Route path="/" component={Homepage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
