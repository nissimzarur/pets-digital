import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarMenu from "./components/NavbarMenu/NavbarMenu";
import Homepage from "./views/Homepage/Homepage";
import Products from "./views/Products/Products";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import OrderReducer from "./redux/Order/reducer";
import UserReducer from "./redux/User/reducer";
import Cart from "./views/Cart/Cart";
import Orders from "./views/Orders/Orders";
import Login from "./views/Login/Login";

const rootReducer = combineReducers({
  OrderReducer,
  UserReducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarMenu />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/homepage" component={Homepage} />
          <Route path="/orders" component={Orders} />
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={Products} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
