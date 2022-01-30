import React,{useEffect,useState} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  {
    markerOffset: -30,
    name: "Amey Hospital",
    coordinates: [73.871170, 19.107020],
    address:" 6, Kavivar Pandit Indra Marg, Bamanpuri, Kanti Nagar, J B Nagar, Andheri East, Mumbai, Maharashtra 400059",
    phone:'022 6156 2000',
    resources:`Oxygen availability: Yes
    Covaxin doses available: 1000
    Covishield doses available: 50
    Remdesivir availability: 150
    Available beds: 12
    Available ventilators: 10`
    
  },
  {
    markerOffset: -30,
    name: "Goel Hospital",
    coordinates: [72.871170, 20.107020],
    address:"Wireless Rd, Ekta Nagar, J B Nagar, Andheri East, Andheri, Maharashtra 400059",
    phone:' 022 2834 9714',
    resources:`Oxygen availability: No
    Covaxin doses available: 10
    Covishield doses available: 5
    Remdesivir availability: 30
    Available beds: 8
    Available ventilators: 2 `
    
  },
  {
    markerOffset: -30,
    name: "Kiran Care and Cure Hospital",
    coordinates: [72.848002,18.118230],
    address:"Ground Floor, Sankalp Building, Mistry Complex, Sahar Airport Road, Near Greater bank, JB Nagar, Andheri East, Mumbai, Maharashtra 400059",
    phone:'022 6156 2000',
    resources:`Oxygen availability: Yes
    Covaxin doses available: 100
    Covishield doses available: 0
    Remdesivir availability: 100
    Available beds: 20
    Available ventilators: 11`
    
  },
  {
    markerOffset: -30,
    name: "Mukund Hospital",
    coordinates: [72.873290,19.103320],
    address:"Metro Station, Mukund nagar society Andheri-kurla road, near airport road, Mumbai, Maharashtra 400059",
    phone:' 022 6111 6888',
    resources:`Oxygen availability: No
    Covaxin doses available: 120
    Covishield doses available: 15
    Remdesivir availability: 50
    Available beds: 12
    Available ventilators: 3`
    
  },
  {
    markerOffset: -30,
    name: "Siddhi Nursing Home",
    coordinates: [74.71170,19.107020],
    address:"Bamanpuri, Ajit Nagar, J B Nagar, Andheri East, Mumbai, Maharashtra 400053",
    phone:'022 6156 6700',
    resources:`Oxygen availability: Yes
    Covaxin doses available: 120
    Covishield doses available: 75
    Remdesivir availability: 170
    Available beds: 25
    Available ventilators: 15`
    
  },
];

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

const DisplayMap = (props) => {
  const [open, setOpen] = React.useState(false);
  const [namu,setNamu] = React.useState();
  const [resources,setResources] = React.useState();
  const [address,setAddress] = React.useState();
  const [phone,setPhone] = React.useState();

  const handleClickOpen = (name,address,phone,resources) => {
    setNamu(name);
    setAddress(address);
    setPhone(phone)
    setResources(resources)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [100, 200, -180],
        scale: 1200
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .filter(d => d.properties.REGION_UN === "Asia")
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset,address,phone,resources }) => (
        <Marker key={name} coordinates={coordinates} onMouseOver={()=>handleClickOpen(name,address,phone,resources)}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          
        </Marker>
      ))}
    </ComposableMap>
    {namu?
    <>
    <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
  >
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
    <span style={{fontSize:'20px',fontWeight:'bold'}}> {namu}</span>
     
  
    </BootstrapDialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>
        <span style={{fontSize:'20px',fontWeight:'bold'}}>Address :</span>
        {address}
      </Typography>
      <Typography gutterBottom>
      <span style={{fontSize:'20px',fontWeight:'bold'}}>For More Information Contact :</span>
        {phone}
      </Typography>
      <Typography gutterBottom>
      <span style={{fontSize:'20px',fontWeight:'bold'}}>Available resources :</span>
      {resources}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose}>
        Done
      </Button>
    </DialogActions>
  </BootstrapDialog>
  </>:<></>}
  </>
  );
};

export default DisplayMap;
