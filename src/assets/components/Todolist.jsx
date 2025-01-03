import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import {useState, useContext, useEffect} from 'react';

import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from '../../context/TodoContext';






export default function Todolist() {
  const {todos , setTodos} = useContext(TodoContext);
  const [titleInput , setTitleInput] = useState('');
  const [displayFilter , setDisplayFilter] = useState('all');

  const completedTodos = todos.filter((t)=>t.completed);
  const non_completedTodos = todos.filter((t)=>!t.completed);

  let displayToBeRendered = todos

  if(displayFilter == "completed"){
    displayToBeRendered = completedTodos;
  }else if(displayFilter == 'non-completed'){
    displayToBeRendered = non_completedTodos;
  }else{
    displayToBeRendered = todos;
  }
  const todolst = displayToBeRendered.map((t)=>{
    return <Todo key={t.id} todo={t}/>
  });

  useEffect(()=> {
    console.log('Use Effect');
    const storedTodos = JSON.parse(localStorage.getItem('todos'))?? [];
    setTodos(storedTodos);
  },[]);

  function changeDisplayFilter(e){
    setDisplayFilter(e.target.value);
  }
  function handleClickAdd(){
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: '',
      completed: false,
    }
    const updatedTodos =[...todos , newTodo]
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTitleInput('');
  }

  return (
    
      <Container maxWidth="sm">
        {/* Card */}
        <Card sx={{ minWidth: 275 }} style={{maxHeight:"90vh" , overflow:'scroll'}}>
      <CardContent>
        <Typography variant="h2" sx={{textAlign:'center'}}>
          مهامي
        </Typography>
        <Divider/>
        {/* Filter Buttons */}
        <ToggleButtonGroup
      value={displayFilter}
      exclusive
      onChange={changeDisplayFilter}
      aria-label="text alignment"
      sx={{marginTop:'30px' , display: 'flex',justifyContent: 'center' , direction:'ltr'}}
      color='primary'
    >
      <ToggleButton value="non-completed" aria-label="right aligned">
        غير المنجز
      </ToggleButton>
      <ToggleButton value="completed" aria-label="centered">
        المنجز
      </ToggleButton>
      <ToggleButton value="all" aria-label="left aligned">
        الكل
      </ToggleButton>
    </ToggleButtonGroup>

        {/*== Filter Buttons ==*/}
        {/* To do */}
        {todolst}
        {/* == To do == */}
        {/* Add button and Text Field */}
        <Grid container spacing={2} style={{marginTop:'20px'}}>
            <Grid size={8}>
              <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{width:'100%'}} value={titleInput} onChange={(e)=>{
                setTitleInput(e.target.value)
              }} />
            </Grid>
            <Grid size={4}  display="flex" justifyContent="space-around" alignItems="center">
              <Button variant="contained" style={{height:'100%' , width:'100%'}} onClick={handleClickAdd} disabled={titleInput.length == 0}>اضافة</Button>

            </Grid>
          </Grid>
        {/* == Add button and Text Field == */}
      </CardContent>
    </Card>
      </Container>
    
  );
}
