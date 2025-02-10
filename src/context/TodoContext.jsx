import { createContext, useContext, useReducer } from "react";
import todoReducer from "../reducers/todoReducer";

const TodoContext = createContext([]);

 const TodosProvider = ({children}) => {
    const [todos, todosDispatch] = useReducer(todoReducer, [])
    return(
        <TodoContext.Provider value={{todos:todos , dispatch:todosDispatch}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodos = () =>{
    return useContext(TodoContext)
}
export default TodosProvider;