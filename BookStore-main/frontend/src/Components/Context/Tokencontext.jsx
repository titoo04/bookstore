import { createContext, useState } from "react"




export const TokenAuthContext = createContext()
export default function Tokencontext({children}) {
const [token, settoken] = useState(localStorage.getItem('token'))
const [id, setId] = useState(null);
  
  return (
    <TokenAuthContext.Provider value={{token ,settoken,id, setId}}>
      {children}
    </TokenAuthContext.Provider>
  )
}
