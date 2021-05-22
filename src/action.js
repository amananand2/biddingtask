import actionTypes from "./types";

export const customerApiSuccess = (data) => ({
    type: actionTypes.CUSTOMER_API_SUCCESS, payload: data 
});

export const customerApiStart = (payload) => ({
    type: actionTypes.CUSTOMER_API_START,
    payload
});

export const customerApiFailed = () => ({
    type: actionTypes.CUSTOMER_API_FAILED
});