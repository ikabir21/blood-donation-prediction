
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {Link} from 'react-router-dom'

export default function Datacard(){
    const data={name:"hostel 9d"}
    return (
        <>
            <Grid container sx={{mb:2}} >
                    <Grid item xs={6}><Typography variant="h5">Hostel 9D</Typography></Grid>
     
                <Grid item xs={6}><div style={{textAlign:'right'}}><Link to="/result"state={{name:"hostel 9d"}}><Button  variant="contained">Generate</Button></Link></div></Grid>                
            </Grid>
        </>
    )
}