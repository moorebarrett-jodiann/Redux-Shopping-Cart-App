import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/uiSlice";
import { fetchData, sendCartData } from "./store/cartActions";

// redux toolkit uses Immer package to mutate the state directly

let firstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);
  
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  // allow firebase database to have the latest snapshot of the state of the cart
  useEffect(() => {
    if(firstRender) {
      firstRender = false;
      return;
    }
    
    if(cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message}/>}
      {!loggedIn && <Auth />}
      {loggedIn && <Layout />}
    </div>
  );
}

export default App;
