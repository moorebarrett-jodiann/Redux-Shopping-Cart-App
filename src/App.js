import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

// reduc toolkit uses Immer package to mutate the state directly

function App() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(loggedIn);
  const cartItems = useSelector((state) => state.cart.itemsList);
  console.log(cartItems);

  return (
    <div className="App">
      {!loggedIn && <Auth />}
      {loggedIn && <Layout />}
    </div>
  );
}

export default App;
