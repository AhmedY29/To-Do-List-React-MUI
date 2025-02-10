import { v4 as uuidv4 } from 'uuid';

export default function todoReducer(currentState, action){
    switch(action.type){
        case "add":{
            const newTodo = {
              id: uuidv4(),
              title: action.payload.title,
              details: '',
              completed: false,
            }
            const updatedTodos =[...currentState , newTodo]
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "delete":{
            const newTodos = currentState.filter((t) =>{
                return t.id !== action.payload.id;
              })
              localStorage.setItem('todos', JSON.stringify(newTodos));
              return newTodos
        }
        case "update":{
            const newTodos = currentState.map((t) =>{
                if(t.id == action.payload.id){
                  return {...t, title: action.payload.title, details: action.payload.details}
                }else{
                  return t;
                }})

             localStorage.setItem('todos', JSON.stringify(newTodos));
             return newTodos

        }
        case "completed":{
          const newTodos = currentState.map((t)=>{
            if(t.id === action.payload.id){
              return {...t, completed:!t.completed}
            }
            return t;
          })
          localStorage.setItem('todos', JSON.stringify(newTodos));
          return newTodos

        }
        case "get":{
            const storedTodos = JSON.parse(localStorage.getItem('todos'))?? [];
            return storedTodos

        }
        default:{
            throw Error("Error in type " + action.type)
        }
    }
}