import { StrictMode,useState,createContext} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const Context = createContext({
  isAuthorized : false,
})

// eslint-disable-next-line react-refresh/only-export-components
const AppWrapper = () => {
   const [isAuthorized, setIsAuthorized] = useState(false);
   const [user, setUser] = useState({});

   return(
     <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
      >
      <App />
      </Context.Provider>
   )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
    {/* <App /> */}
  </StrictMode>,
)
