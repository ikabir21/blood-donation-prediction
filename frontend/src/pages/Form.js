import * as React from 'react';
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import Swal from "sweetalert2"

import { MyContext } from '../context/Context';
import CContainer from '../components/CContainer';
import Navbar from '../components/Navbar';

export default function Form(props) {

  const { isLogin } = useContext(MyContext)

  const { surveyname } = useParams();

  console.log(surveyname);
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name: "",
    username: "",
    gender:"",
    phone_number: "",
    blood_group: "",
    address: "",
    first_donation_date: null,
    last_donation_date: null,
    num_donations: "",
    age: ""
  })

  function onChange(e) {

    setValues({ ...values, [e.target.name]: e.target.value })

  }

  const handlePredictDonation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify({
          first_donation_date: values.first_donation_date,
          last_donation_date: values.last_donation_date,
          num_donations: values.num_donations,
          survey: surveyname
        }),
      });
      const data = await response.json();
      console.log("data", data, data.result)
      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully!', data);
        Swal.fire(
          "Prediction probality",
          `${(data.result * 100).toFixed(2)}%`,
          'info'
        )
      } else {
        setErrors({ ...errors, ...data })
        console.error('Form submission failed.', errors);
      }
    } catch (error) {
      Swal.fire(
        "error",
        error,
        'error'
      )
      console.error('Error submitting form:', error);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (values.age < 18) {
      alert('Below 18 age is not allowed to donate.')

    }
    console.log(values);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/add-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify({
          user: {
            name: values.name,
            username: values.username,
            phone_number: values.phone_number,
            address: values.address,
            blood_group: values.blood_group
          },
          donation: {
            first_donation_date: values.first_donation_date,
            last_donation_date: values.last_donation_date,
            num_donations: values.num_donations,
            survey: surveyname
          }
        }),
      });
      const data = await response.json();
      console.log("data", data)
      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully!', data);
        Swal.fire(
          data.status,
          data.message,
          'success'
        )
      } else {
        // Handle error
        setErrors({ ...errors, ...data.errors })
        console.error('Form submission failed.', errors);
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
      name: "",
      username: "",
      phone_number: "",
      address: "",
      first_donation_date: "",
      last_donation_date: "",
      num_donations: "",
      age: "",
      gender:""

    })
  }

  return (
    <CContainer>
      <Navbar></Navbar>
      <Box sx={{ '& .MuiTextField-root': { mb: 3, width: '100%' }, width: "80%", maxWidth: 500, borderRadius: 3, boxShadow: "10px 10px 20px #698D96", padding: "30px", margin: "10px auto", background: "white" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{surveyname + "'s blood donation details Form"}</h2>
        <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
          <div>
            <TextField sx={{ width: "100px" }} required value={values.name} name="name" onChange={onChange} label="Name" variant="outlined" error={Boolean(errors?.["name"])} />
            {errors?.["name"] && <FormHelperText>{errors?.["name"]?.[0]}</FormHelperText>}
          </div>
          <div>
            <TextField sx={{ width: "100px" }} required value={values.age} name="age" onChange={onChange} label="Age" variant="outlined" />
          </div>
          <FormControl sx={{ width: "100%", mb: 3 }} error={Boolean(errors?.["gender"])}>
            <InputLabel id="demo-simple-select-label" name="gender" sx={{ width: "100%", textAlign: 'left' }}>Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "100%",textAlign:"left" }}
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={onChange}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            {errors?.["gender"] && <FormHelperText>{errors?.["gender"]?.[0]}</FormHelperText>}
          </FormControl>
          
          <div>
            <TextField sx={{ width: "100px" }} required value={values.phone_number} onChange={onChange} name="phone_number" label="Phone No" variant="outlined" error={Boolean(errors?.["phone_number"])} />
            {errors?.["phone_number"] && <FormHelperText>{errors?.["phone_number"]?.[0]}</FormHelperText>}
          </div>
          <div>
            <TextField sx={{ width: "100px" }} type={"email"} required value={values.username} onChange={onChange} name="username" label="Email" variant="outlined" error={Boolean(errors?.["username"])} />
            {errors?.["username"] && <FormHelperText>{errors?.["username"]?.[0]}</FormHelperText>}
          </div>
          <div>
            <TextField sx={{ width: "100px" }} required value={values.address} onChange={onChange} name="address" label="Address" variant="outlined" error={Boolean(errors?.["address"])} />
            {errors?.["address"] && <FormHelperText>{errors?.["address"]?.[0]}</FormHelperText>}
          </div>
          <FormControl sx={{ width: "100%", mb: 3 }} error={Boolean(errors?.["blood_group"])}>
            <InputLabel id="demo-simple-select-label" name="blood_group" sx={{ width: "100%", textAlign: 'left' }}>Blood Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "100%",textAlign:"left"}}
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
            {errors?.["blood_group"] && <FormHelperText>{errors?.["blood_group"]?.[0]}</FormHelperText>}
          </FormControl>
          <div>
            <TextField sx={{ width: "100px" }} required name="num_donations" onChange={onChange} value={values.num_donations} label="No of Donations" variant="outlined" error={Boolean(errors?.["num_donations"])} />
            {errors?.["num_donations"] && <FormHelperText>{errors?.["num_donations"]?.[0]}</FormHelperText>}
          </div>
          <div>
            <TextField sx={{ width: "100px" }} InputLabelProps={{ shrink: true }} required name="first_donation_date" onChange={onChange} value={values.first_donation_date} label="First donation date" type="date" variant="outlined" error={Boolean(errors?.["first_donation_date"])} />
            {errors?.["first_donation_date"] && <FormHelperText>{errors?.["first_donation_date"]?.[0]}</FormHelperText>}
          </div>
          <div>
            <TextField sx={{ width: "100px" }} InputLabelProps={{ shrink: true }} required name="last_donation_date" onChange={onChange} value={values.last_donation_date} label="Last donation date" type="date" variant="outlined" error={Boolean(errors?.["last_donation_date"])} />
            {errors?.["last_donation_date"] && <FormHelperText>{errors?.["last_donation_date"]?.[0]}</FormHelperText>}
          </div>
          {isLogin && (<Button variant="outlined" onClick={handlePredictDonation} sx={{ width: "100%", }}>Generate</Button>)}
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