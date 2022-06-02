import { cartActions } from "./cart-slice";
import { uiActions } from "./UI-Slice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('https://redux-shopping-cart-58b0d-default-rtdb.firebaseio.com/cartItems.json')
            const data = await res.json()
            return data
        }
        try {
                const cartData = await fetchHandler();
                dispatch(cartActions.replaceData(cartData))
            }catch(err) {
                dispatch(uiActions.showNotification({
                    open:true,
                    message: "Failed to retrieve data",
                    type: 'error'
                }))
            }
    }
}
export const sendCartData = (cart)=> {
    return async (dispatch) => {
        const sendRequest = async () => {
        //send state as sending request
        dispatch(uiActions.showNotification({
            open:true,
            message: "Sending request",
            type: 'warning'
        }))
        const res = await fetch('https://redux-shopping-cart-58b0d-default-rtdb.firebaseio.com/cartItems.json',{
        method:"PUT",
        body:JSON.stringify(cart)
        });
        const data = await res.json()
        //send state as request is successful
        dispatch(uiActions.showNotification({
            open:true,
            message: "Sent request to database successfully",
            type: 'success'
        }));
        };
        try {
            await sendRequest();
        } catch(err) {
            dispatch(uiActions.showNotification({
                open:true,
                message: "Failed to send request",
                type: 'error'
            }))
        }
    }
}