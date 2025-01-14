import './App.css'
import Todolist from './assets/components/Todolist.jsx'
import { createTheme , ThemeProvider } from '@mui/material/styles';

import { TodoContext } from './context/TodoContext.jsx';
import { v4 as uuidv4 } from 'uuid';
import {useState} from 'react';


const theme = createTheme({
  typography:{
    fontFamily:['Rubik']
  },
  palette:{
    primary:{
      main:'#FF6347'
    }
  }
  
});

const lst = [
  {
    id: uuidv4(),
    title: 'المهمة الاولى',
    details: 'الوصف',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'المهمة الاولى',
    details: 'الوصف',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'المهمة الاولى',
    details: 'الوصف',
    completed: false,
  },
]

function App() {
  const [todos , setTodos] = useState(lst)

  return (
    <>
    <ThemeProvider theme={theme}>
      <TodoContext.Provider value={{todos , setTodos}}>
      <div className='app' style={{direction:"rtl", display:'flex' ,justifyContent:'center' , alignItems:'center', height:'100%', width:'100%' }}>
        <Todolist/>
      </div>
      </TodoContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
