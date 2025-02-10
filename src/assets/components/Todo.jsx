import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import '../../style.css'
import { useContext, useState } from 'react';
// import { TodoContext } from '../../context/TodoContext';
import { useToast } from '../../context/ToastContext';



// ICONS
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodos } from '../../context/TodoContext';


export default function Todo({todo , showDelete , showUpdate }) {
  // const { todos, setTodos } = useContext(TodoContext);
  const { todos, dispatch } = useTodos()
  const { openUntil } = useToast();
  

  function handleClickCheck(){
    dispatch({type:'completed', payload:todo})
    openUntil("تم تعديل حالة المهمة")
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
