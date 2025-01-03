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


export default function Todo({todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [showDelateDialog, setShowDelateDialog] =useState(false);
  const [showUpdateDialog, setShowUpdateDialog] =useState(false);
  const [update, setUpdate] = useState({title:todo.title , details:todo.details});

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
    setShowDelateDialog(true);
  }

  function handleDelateClose(){
    setShowDelateDialog(false);
  }

  function handleDelateConfirm(){
    const newTodos = todos.filter((t) =>{
      return t.id !== todo.id;
    })
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
  function handleUpdate(){
    const newTodos = todos.map((t) =>{
      if(t.id == todo.id){
        return {...t, title: update.title, details: update.details}
      }else{
        return t;
      }
    });
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setShowUpdateDialog(false);
  }

  function handleUpdateClose(){
    setShowUpdateDialog(false);
  }

  function handleClickUpdate(){
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
