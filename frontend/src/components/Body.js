import * as React from 'react';
import {useState} from 'react'
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import Img from '../assets/images/illustration.png';
import Step1 from '../assets/images/step1.png'
import Step2 from '../assets/images/step2.png'
import Step3 from '../assets/images/step3.png'
import CContainer from './CContainer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Body() {
  const [open, setOpen] = useState(false);

  const [surveyName,setSurveyName]=useState('')
  const [isSurveyCreate,setIsSurveyCreate]=useState(false)

  function onChange(e)
  {
    console.log(e.target.value);
    setSurveyName(e.target.value)
  }

  function onSubmit(e)
  {
    console.log("log");
    e.preventDefault()
    console.log(surveyName);
  }

  const handleToggle = () => {
    setOpen(!open);
  };

  function handleSubmit()
  {
    setIsSurveyCreate(false);
    handleToggle()
  }

  function handleCopy()
  {
    const val='http://localhost:3000/form/'+surveyName
    navigator.clipboard.writeText('http://localhost:3000/form/'+surveyName);
    
  }

  return (
    <>
    <Grid container justifyContent="space-between" alignItems='center' sx={{background:"#b4e1ed"}} spacing={5}>
      <Grid item xs={12} md={6}>
        <Typography variant="h2" color="primary" sx={{fontWeight:'bold'}}>Blood Donation Prector</Typography>
        <Typography variant="h5" color="primary">
        Our website helps to determine the likelihood of a user donating blood within a given time window based on their past donation record. By using user's basic information about blood donation history, we can use our advanced algorithm to calculate the probability of user donating blood again in the future.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{textAlign:{md:'right',xs:'center'}}}>
        <Box component="img" src={Img} sx={{ maxHeight: { md: 300,xs:200 }}} />
        </Box>
      </Grid>
    </Grid>
    {/* <Link to='./Form'> */}
    {isSurveyCreate&&(
      <><form onSubmit={handleSubmit}><TextField sx={{width:{xs:"100%",md:'20%'},mt:4,mr:2}} required  name="surveyName" label="Survey name" variant="outlined" onChange={onChange}/>
      <Button variant='contained' type="submit" sx={{width:{xs:"100%",md:'10%'},padding:"15px 10px",mt:4}}  >Submit</Button></form>
      </>
    )}
    {!isSurveyCreate&&(<Button variant='contained' size='large' sx={{width:{xs:'100%', md:"20%"},mt:4,padding:"15px 10px"}} onClick={()=>{setIsSurveyCreate(true)}} >Create Survey</Button>)}
    <Modal open={open} onClose={handleToggle}>
      <Box sx={style}>
        <Typography variant='h5' sx={{color:"green",fontWeight:"bold"}}>Survey successfully created</Typography>
        <Typography variant='h6' >Survey Link:</Typography>
        <TextField sx={{width:"100%"}} type="text" value={'http://localhost:3000/form/'+surveyName} />
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
        Copy Link
      </Button>
      </Box>
      </Modal>
    {/* </Link> */}
    <hr style={{marginTop:"30px",border:"1px solid black"}}/>
    <Typography variant='h2' sx={{mt:2,fontWeight:"bold"}}>How It works</Typography>
    <Grid container direction="column">
            <Box
              sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  Step 1
                </Typography>
                <Typography
                  sx={{ my: 1, fontWeight: 700, fontSize: "24px !important" }}
                  variant="h6">
                  Create survey
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                The first step is to create a survey which collects the blood donation details of people. Once the survey is created, a link will be generated that can be shared with the target audience.  
                </Typography>
              </Box>
              <Box
                xs={9}
                component="img"
                src={Step1}
                sx={{
                  height: { md: 350 },
                  display: { xs: "none", md: "block" },
                  ml: 3
                }}></Box>
            </Box>
            <Box
              sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
              <Box
                xs={9}
                component="img"
                src={Step2}
                sx={{
                  height: { md: 350 },
                  display: { xs: "none", md: "block" },
                  mr: 3
                }}></Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  Step 3
                </Typography>
                <Typography
                  sx={{ my: 1, fontWeight: 700, fontSize: "24px !important" }}
                  variant="h6">
                  Circulate survey form
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                In this step, the survey link should be circulated to the target people and their response collected. This can be done through various means such as social media, email, or by physically distributing printed copies of the survey. Once the survey responses have been collected, they can be compiled and analyzed to determine the probability of each person being a potential blood donor.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  Step 3
                </Typography>
                <Typography
                  sx={{ my: 1, fontWeight: 700, fontSize: "24px !important" }}
                  variant="h6">
                  Generate prediction table
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                The last step is to generate the probability table which contains the contact details of people and their probability of donating blood. Each person who responded to the survey, as well as their probability of donating blood.The probability table can then be used to reach out to potential blood donors and request their participation in blood donation drives or campaigns. 
                </Typography>
              </Box>
              <Box
                xs={9}
                component="img"
                src={Step3}
                sx={{
                  height: { md: 400 },
                  display: { xs: "none", md: "block" },
                  ml: 3
                }}></Box>
            </Box>
          </Grid>
    </>
  );
}
