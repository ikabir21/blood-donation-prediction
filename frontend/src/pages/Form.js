import * as React from 'react';
import {useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { MyContext } from '../context/Context';
import CContainer from '../components/CContainer';
import Navbar from '../components/Navbar';

export default function Form(props){

    const {isLogin}=useContext(MyContext)
 
    const { surveyname } = useParams();

    console.log(surveyname);
    const [values,setValues]=useState({
        name:"",
        email:"",
        phone:"",
        blood_group:"",
        address:"",
        first_donation_date:null,
        last_donation_date:null,
        num_donations:"",
        age:""
    })

    function onChange(e){

        setValues({...values,[e.target.name]:e.target.value})
 
    }

    function onSubmit(e){
        e.preventDefault();

        if(values.age<18)
        {
          alert('Below 18 age is not allowed to donate.')
 
        }
        console.log(values);
        setValues({
            name:"",
            email:"",
            phone:"",
            address:"",
            first_donation_date:"",
            last_donation_date:"",
            num_donations:"",
            age:""
        })
    }

    return (
        <CContainer>
        <Navbar></Navbar>
        <Box sx={{ '& .MuiTextField-root': { mb:3, width: '100%'} , width:"80%",maxWidth:500,borderRadius:3, boxShadow:"10px 10px 20px #698D96",padding:"30px",margin:"10px auto",background:"white"}}>
            <h2 style={{textAlign:"center",marginBottom:"10px"}}>{surveyname+" blood donation details Form"}</h2>
      <form onSubmit={onSubmit} style={{textAlign:"center"}}>
        <div>
          <TextField sx={{width:"100px"}} required value={values.name} name="name" onChange={onChange} label="Name" variant="outlined" />
        </div>
        <div>
          <TextField sx={{width:"100px"}} required value={values.age} name="age" onChange={onChange} label="Age" variant="outlined" />
        </div>
        <div>
          <TextField sx={{width:"100px"}} required value={values.phone} onChange={onChange}  name="phone" label="Phone No" variant="outlined" />
        </div>
        <div>
          <TextField sx={{width:"100px"}} required value={values.email} onChange={onChange} name="email" label="Email" variant="outlined" />
        </div>
        <div>
          <TextField sx={{width:"100px"}} required value={values.address} onChange={onChange} name="address" label="Address" variant="outlined" />
        </div>
        <FormControl sx={{width:"100%",mb:3}}>
        <InputLabel id="demo-simple-select-label" name="blood_group" sx={{width:"100%",textAlign:'left'}}>Blood Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{width:"100%"}}
          label="Blood Group"
          name="blood_group"
          value={values.blood_group}
          onChange={onChange}
        >
          <MenuItem value={'O+'}>O+</MenuItem>
          <MenuItem value={"O-"}>O-</MenuItem>
          <MenuItem value={"A+"}>A+</MenuItem>
          <MenuItem value={"A-"}>A-</MenuItem>
          <MenuItem value={"B+"}>B+</MenuItem>
          <MenuItem value={"B-"}>B-</MenuItem>
          <MenuItem value={"AB+"}>AB+</MenuItem>
          <MenuItem value={"AB-"}>AB-</MenuItem>
        </Select>
        </FormControl>
        <div>
          <TextField sx={{width:"100px"}} required name="num_donations" onChange={onChange} value={values.num_donations} label="No of Donations" variant="outlined" />
        </div>
        <div>
          <TextField sx={{width:"100px"}} InputLabelProps={{ shrink: true }} required name="first_donation_date" onChange={onChange} value={values.first_donation_date} label="First donation date" type="date" variant="outlined" />
        </div>
        <div>
          <TextField sx={{width:"100px"}} InputLabelProps={{ shrink: true }} required name="last_donation_date" onChange={onChange} value={values.last_donation_date} label="Last donation date" type="date" variant="outlined" />
        </div>
        
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer components={['DatePicker']}>
         <DatePicker onChange={onChange} name="first_donation_date" value={values.first_donation_date} label="First donation date" />
         <DatePicker onChange={onChange} name="last_donation_date" value={values.last_donation_date} label="Last donation date" />
       </DemoContainer>
     </LocalizationProvider> */}
        {isLogin&&(<Button variant="outlined" type="submit" sx={{width:"100%",}}>Generate</Button>)}
        <Button variant="contained" type="submit" sx={{width:"100%",}}>Submit</Button>
      </form>
    </Box>

        </CContainer>
    );
}




// export default function BasicDatePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker label="" />
//         <DatePicker label="Basic date picker" />
//         <DatePicker label="Basic date picker" />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }