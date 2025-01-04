import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import '../../style.css'
import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



// ICONS
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Todo({todo , showDelete , showUpdate }) {
  const { todos, setTodos } = useContext(TodoContext);

  function handleClickCheck(){
    const newTodos = todos.map((t)=>{
      if(t.id === todo.id){
        return {...t, completed:!t.completed}
      }
      return t;
    })
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
  function handleClickDelate(){
    showDelete(todo)
  }

  function handleClickUpdate(){
    showUpdate(todo)
  }

  return (
    <>
      <Card className='card' sx={{ minWidth: 275 , backgroundColor: 'blue', marginTop: 5}}>
        <CardContent>
          <Grid container>
            <Grid size={8}>
            <Typography variant="h5" sx={{textAlign:'right' ,color:'white', textDecoration:todo.completed ? 'line-through': 'none'}}>{todo.title}</Typography>
            <Typography variant="h6" sx={{textAlign:'right' ,color:'white'}}>{todo.details}</Typography>
            </Grid>
            <Grid size={4}  display="flex" justifyContent="space-around" alignItems="center">
            <IconButton className='iconButton' sx={{color: todo.completed ? 'white' : 'green' , backgroundColor:todo.completed ? 'green' : 'white' , border: 'green solid 2px'}} onClick={handleClickCheck}>
                <CheckIcon />
            </IconButton>
            <IconButton className='iconButton' sx={{color:'lightblue' , backgroundColor:'white' , border: 'lightblue solid 2px'}} onClick={handleClickUpdate}>
                <EditIcon />
            </IconButton>
            <IconButton className='iconButton' sx={{color:'red' , backgroundColor:'white' , border: 'red solid 2px'}} onClick={handleClickDelate}>
                <DeleteIcon />
            </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
