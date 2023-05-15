import * as React from 'react';
import { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from "sweetalert2"

import CContainer from '../components/CContainer';
import Navbar from '../components/Navbar'

import { MyContext } from '../context/Context';


export default function Form() {
  const { isLogin, login, logout } = useContext(MyContext)


  const [values, setValues] = useState({
    username: "",
    password: ""
  })

  function onChange(e) {

    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("data", data)
      if (response.ok) {
        console.log('Form submitted successfully!', data);
        const { access: accessToken, refresh: refreshToken } = data;
        Swal.fire(
          "",
          data.message,
          'success'
        )
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        login()
        window.location.href = "/"
      } else {
        Swal.fire(
          "",
          data.message,
          'error'
        )
        console.error('Form submission failed.');
      }
    } catch (error) {
      Swal.fire(
        "error",
        error,
        'error'
      )
      console.error('Error submitting form:', error);
    }

    setValues({
      username: "",
      password: ""
    })
  }

  return (
    <CContainer >
      <Navbar></Navbar>
      <Box sx={{ '& .MuiTextField-root': { mb: 3, width: '100%' }, width: "80%", maxWidth: 500, borderRadius: 3, boxShadow: "10px 10px 20px #698D96", padding: "30px", margin: "10px auto", background: "white" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h2>

        <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
          <div>
            <TextField sx={{ width: "100px" }} required value={values.username} onChange={onChange} name="username" label="Email" variant="outlined" />
          </div>
          <div>
            <TextField sx={{ width: "100px" }} required value={values.password} onChange={onChange} name="password" label="Password" variant="outlined" />
          </div>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer components={['DatePicker']}>
         <DatePicker onChange={onChange} name="first_donation_date" value={values.first_donation_date} label="First donation date" />
         <DatePicker onChange={onChange} name="last_donation_date" value={values.last_donation_date} label="Last donation date" />
       </DemoContainer>
     </LocalizationProvider> */}

          <Button variant="contained" type="submit" sx={{ width: "100%", }}>Submit</Button>
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