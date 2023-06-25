const initialState = {
    counterTempData:[],
    selectedMainNavItem:"환불내역",
    selectedSubNavItem:"",
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setCounterTempData":
            return { ...state, counterTempData: action.payload };
        case "setSelectedMainNavItem":
            return {...state, selectedMainNavItem: action.payload};
        case "setSelectedSubNavItem":
            return {...state, selectedSubNavItem: action.payload};
        default:
            return state;
    }
  };
  
  export default rootReducer