import { createContext, useContext, useState } from "react";
import Toast from "../assets/components/Toast";




 const ToastContext = createContext({})

 export const ToastProvider = ({children}) =>{
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    function openUntil(message){
        setOpen(true)
        setMessage(message)
        setTimeout(()=>{
          setOpen(false)
        }, 2000)
      }
    return (
        <ToastContext.Provider value={{openUntil}}>
            <Toast open={open} message={message}/>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () =>{
    return useContext(ToastContext)
}