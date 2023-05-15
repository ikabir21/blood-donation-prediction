import * as react from 'react'
import { Grid ,Box, Typography} from '@mui/material'

import Navbar from '../components/Navbar'
import CContainer from '../components/CContainer'
import Datacard from '../components/Datacard'


export default function Data(){

    
    return (
        <>
        <CContainer>
            <Navbar></Navbar>
            <Box sx={{ width:"80%",maxWidth:500,borderRadius:3, boxShadow:"10px 10px 20px #698D96",padding:"30px",margin:"10px auto",background:"white"}}>
                <Typography sx={{mb:2}} variant='h4' color='primary' textAlign='center'>Data Collected</Typography>
                <Datacard></Datacard>
                <Datacard></Datacard>
            </Box>
            

            
        </CContainer>
        </>
    )
}