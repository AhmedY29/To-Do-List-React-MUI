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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState, useContext, useEffect , useMemo} from 'react';

import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from '../../context/TodoContext';
import { useToast } from '../../context/ToastContext';
import { useReducer } from 'react';
import todoReducer from '../../reducers/todoReducer';






export default function Todolist() {
  const {todos2 , setTodos} = useContext(TodoContext);
  const { openUntil } = useToast();
  const [titleInput , setTitleInput] = useState('');
  const [dialogTodo , setDialogTodo] = useState(null);
  const [displayFilter , setDisplayFilter] = useState('all');
  const [showDelateDialog, setShowDelateDialog] =useState(false);
  const [showUpdateDialog, setShowUpdateDialog] =useState(false);
  const [update, setUpdate] = useState({title:null , details:null});

  const [todos, dispatch] = useReducer(todoReducer, [])

  //add useMemo
  const completedTodos = useMemo(()=>{
    return todos.filter((t)=> {return t.completed});
  }, [todos])
  const non_completedTodos = useMemo(() => {
    return todos.filter((t)=> {return !t.completed});
  },[todos])

  let displayToBeRendered = todos

  if(displayFilter == "completed"){
    displayToBeRendered = completedTodos;
  }else if(displayFilter == 'non-completed'){
    displayToBeRendered = non_completedTodos;
  }else{
    displayToBeRendered = todos;
  }
  const todolst = displayToBeRendered.map((t)=>{
    return <Todo key={t.id} todo={t} showDelete={handleDelateOpen} showUpdate={handleUpdateOpen}/>
  });

  useEffect(()=> {
    dispatch({type:'get'})
  },[]);

  function changeDisplayFilter(e){
    setDisplayFilter(e.target.value);
  }
  function handleClickAdd(){
    // const newTodo = {
    //   id: uuidv4(),
    //   title: titleInput,
    //   details: '',
    //   completed: false,
    // }
    // const updatedTodos =[...todos , newTodo]
    // setTodos(updatedTodos);
    // localStorage.setItem('todos', JSON.stringify(updatedTodos));
    //  details:{Utitle:update.title, Udetails:update.details}}
    dispatch({type:'add', payload:{title:titleInput}})
    setTitleInput('');
    openUntil("تم اضافة مهمة جديدة بنجاح")
  }

  function handleDelateClose(){
    setShowDelateDialog(false);
  }
  function handleDelateOpen(todo){
    setDialogTodo(todo)
    setShowDelateDialog(true);
  }

  function handleDelateConfirm(){
    // const newTodos = todos.filter((t) =>{
    //   return t.id !== dialogTodo.id;
    // })
    // setTodos(newTodos);
    // localStorage.setItem('todos', JSON.stringify(newTodos));
    dispatch({type: 'delete', payload:{id:dialogTodo.id}})
    handleDelateClose()
    openUntil('تم حذف المهمة بنجاح')
  }


  function handleUpdate(){
    // const newTodos = todos.map((t) =>{
    //   if(t.id == dialogTodo.id){
    //     return {...t, title: update.title, details: update.details}
    //   }else{
    //     return t;
    //   }
    // });
    // setTodos(newTodos);
    // localStorage.setItem('todos', JSON.stringify(newTodos));
    dispatch({type:'update', payload:{id:dialogTodo.id, title:update.title, details:update.details}})
    setShowUpdateDialog(false);
    openUntil("تم تعديل المهمة بنجاح")
  }

  function handleUpdateClose(){
    setShowUpdateDialog(false);
  }

  function handleUpdateOpen(todo){
    setUpdate(
      {
        title:todo.title ,
         details:todo.details
      }
    )
    setDialogTodo(todo)
    setShowUpdateDialog(true);
  }

  
  return (
      <>
      {/* dialog Delate*/}
      <Dialog
        style={{direction: 'rtl'}}
        open={showDelateDialog}
        onClose={handleDelateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من حذف المهمة"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لن تتمكن من ارجاع المهمة بعد الحذف نهائيًا!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelateClose}>اغلاق</Button>
          <Button onClick={handleDelateConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* == dialog Delate == */}

            {/* Dialog Update */}
            <Dialog
        style={{direction: 'rtl'}}
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من حذف المهمة"}
        </DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="عنوان المهمة"
              value={update.title}
              onChange={(e)=>{
                setUpdate({...update, title:e.target.value})
              }}
              fullWidth
              variant="standard"
              />
          <TextField
              required
              margin="dense"
              id="name"
              name="email"
              label="التفاصيل"
              value={update.details}
              onChange={(e)=>{
                setUpdate({...update, details:e.target.value})
              }}
              fullWidth
              variant="standard"
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button onClick={handleUpdate} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* == Dialog Update == */}

        <Container maxWidth="sm">
            {/* Card */}
            <Card sx={{ minWidth: 275 }} style={{maxHeight:"90vh" , overflowY:'scroll'}}>
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
      </>
    
  );
}
