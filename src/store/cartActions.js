import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async() => {
            const result = await fetch('https://redux-shopping-cart-fe545-default-rtdb.firebaseio.com/cartItems.json');
            const data = await result.json();
            return data;
        }
        try{
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));
        }
        catch(err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Error fetching data",
                type: 'error'
              })
            );
        }
    }
}

// dispatch using a thunk function
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: "Sending request",
            type: 'warning'
            })
        );   
        const sendRequest = async () => {
            // send state as sending request
            
            const result = await fetch(
              'https://redux-shopping-cart-fe545-default-rtdb.firebaseio.com/cartItems.json', 
              {
                method: 'PUT',
                body: JSON.stringify(cart)
              }
            );
      
            const data = await result.json();
            // send state as request is successful
            dispatch(uiActions.showNotification({
              open: true,
              message: "Request Sent to database successfully",
              type: 'success'
            }))
        }; 
        try {
            await sendRequest();
        }
        catch (error){
            dispatch(uiActions.showNotification({
                open: true,
                message: "Error sending request",
                type: 'error'
              })
            );
        }
    }
}