
const withdrawalReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_WITHDRAWAL":
        console.log('requesting withrawal')
      return {
        ...state,
        withdrawals: [action.item],
      };
    
    default:
      return state;
  }
};

export default withdrawalReducer;
