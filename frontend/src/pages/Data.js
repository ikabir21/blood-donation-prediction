import * as react from 'react'
import { Box, Typography} from '@mui/material'

import Navbar from '../components/Navbar'
import CContainer from '../components/CContainer'
import Datacard from '../components/Datacard'


export default function Data(){
    const [data, setData] = react.useState([])

    const fetchSurveys = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/get-surveys/');
            const jsonData = await response.json();
            console.log(jsonData, "jsonData")
            setData(jsonData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    react.useEffect(() => {
        fetchSurveys();
    }, [])
    
    return (
        <>
        <CContainer>
            <Navbar></Navbar>
            <Box sx={{ width:"80%",maxWidth:500,borderRadius:3, boxShadow:"10px 10px 20px #698D96",padding:"30px",margin:"10px auto",background:"white"}}>
                <Typography sx={{mb:2}} variant='h4' color='primary' textAlign='center'>Data Collected</Typography>
                {data && data.map((item) => (<Datacard name={item} />))}
            </Box>
            

            
        </CContainer>
        </>
    )
}