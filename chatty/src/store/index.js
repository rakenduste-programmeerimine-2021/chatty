import { createContext, useReducer } from "react";
import { authReducer } from "./reducer";

const initialAuth = {
  token: null,
  user: null
}

export const Context = createContext(initialAuth)

function Store({ children }){
  const [state, dispatch] = useReducer(authReducer, initialAuth)

  return (
    <Context.Provider value={[ state, dispatch ]}>
      { children }
    </Context.Provider>
  )
}

export default Store