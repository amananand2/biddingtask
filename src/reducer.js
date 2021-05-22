import UserActionTypes from "./types";


  const initialState = {
       productData:[],
      loading: false,
      error: false,
      isAuthenticated:false,
    };
    const reducer = (state = initialState, action) => {
      console.log(action,"action");
      switch (action.type) {
        case UserActionTypes.CUSTOMER_API_START:
          return {
            ...state,
            loading: true,
            isAuthenticated:false,
            error: false,
          };
          case UserActionTypes.CUSTOMER_API_SUCCESS:
          return {
            ...state,
            productData: [...action.payload],
            loading: false,
            isAuthenticated:true,
            error: false,
          };
        case UserActionTypes.CUSTOMER_API_FAILED:
          return {
              ...state,
            url: '',
            loading: false,
            error: true,
          };
          default:
          return state;
      }
    };

    export default reducer;