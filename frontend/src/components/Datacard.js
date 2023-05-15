
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {Link} from 'react-router-dom'

export default function Datacard({name}){
    return (
        <>
            <Grid container sx={{mb:2}} >
                    <Grid item xs={6}><Typography variant="h5">{name}</Typography></Grid>
     
                <Grid item xs={6}><div style={{textAlign:'right'}}><Link to="/result" state={{name: name}}><Button  variant="contained">Generate</Button></Link></div></Grid>
            </Grid>
        </>
    )
}