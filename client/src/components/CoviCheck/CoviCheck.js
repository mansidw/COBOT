import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const CoviCheck = (props) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()
    const [send,setSend] = React.useState([])
    const [res,setRes]= React.useState()
  
    
    const handleClose = (e) => {
        e.preventDefault();
        let symptoms=[];
        for(var i=0;i<10;i++){
            if(send.includes(i)){
                symptoms[i]=1
            }
            else{
                symptoms[i]=0
            }
        }
        console.log(symptoms)
        axios.post('https://reqres.in/api/articles', symptoms)
        .then(response => console.log(response));
        setOpen(false);
        navigate('/home')
    };

    const handleChange=(a)=>{
        setSend((old)=>[...old,a-1])
    }
  
    return (
      res?<>
      <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
        <form onSubmit={handleClose}>
      <FormGroup >
      
    
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      <span style={{fontSize:'20px',fontWeight:'bold'}}>Just Check the Boxes!</span>
       
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox  />} label="Breathing Problem" onChange={()=>handleChange(1)}/>
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox />} label="Fever" onChange={()=>handleChange(2)}/>
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(3)}/>} label="Dry Cough" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(4)}/>} label="Sore throat" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(5)}/>} label="Hyper Tension" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(6)}/>} label="Abroad travel" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(7)}/>} label="Contact with COVID Patient" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(8)}/>} label="Attended Large Gathering" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(9)}/>} label="Visited Public Exposed Places" />
          
        
        </Typography>
        <Typography gutterBottom>
          <FormControlLabel control={<Checkbox onChange={()=>handleChange(10)}/>} label="Family working in Public Exposed Places" />
          
        
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type="submit">
          Done
        </Button>
      </DialogActions>
      </FormGroup>
      </form>
    </BootstrapDialog>
    </>:<></>
    );
  };
  
  export default CoviCheck;
  