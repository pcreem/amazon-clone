import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import Sell from "./Sell";
import ProductList from "./ProductList";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HiDUkD2kqY8mgtxX7dPyk3DcaEuHcKJvNvLuD2S5PbXNQxndWWamnF5Ci3EJlYQ1mQPapWkEQ5EOOqfrUPWzeqL00EqB8wRx9"
);

function App() {
  const [{}, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
    

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/sell">
            <Header />
            <Sell />
          </Route>
          <Route path="/list">
            <Header />
            <ProductList />
          </Route>
          <Route path="/">
            <Header setSearchTerm={setSearchTerm} />
            <Home searchTerm={searchTerm} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
