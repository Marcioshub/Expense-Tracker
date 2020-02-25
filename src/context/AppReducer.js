export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      localStorage.removeItem(action.payload.text);
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload.id
        )
      };

    case "ADD_TRANSACTION":
      localStorage.setItem(action.payload.text, action.payload.amount);
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };

    default:
      return state;
  }
};
