import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

function savedTransactions() {
  const savedTrans = Object.entries(localStorage);

  if (savedTrans === null || savedTrans === [] || savedTrans === undefined) {
    return []; // no saved transactions on local storage
  } else {
    var tmp = [];

    for (var i = 0; i < savedTrans.length; i++) {
      const trans = {
        id: Math.floor(Math.random() * 100000000),
        text: savedTrans[i][0],
        amount: +savedTrans[i][1]
      };

      tmp.push(trans);
    }

    // return saved transactions
    return tmp;
  }
}

// initial state
const initialState = {
  transactions: savedTransactions()
};

// Create context
export const GlobalContext = createContext(initialState);

// provider component
export default function GlobalState({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  function deleteTransaction(transaction) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transaction
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
