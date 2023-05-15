import * as React from 'react';

import {useState,useContext} from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'

import { MyContext } from '../context/Context';


export default function Navbar() {

  const{isLogin,login,logout}=useContext(MyContext)

  //if login successfull login

  return (

    <Grid container justifyContent="space-between" sx={{marginBottom:2}} >
      <Grid item xs={6} ><Link to='/' style={{textDecoration:"none"}}><Typography variant="h5" color="primary">BDP</Typography></Link> </Grid>

      {isLogin&&(<><Grid item xs={3} sx={{ textAlign: "right" }}>
        <Link to='/Data' style={{ textDecoration: "none" }}>
          <Button color="primary" onClick={logout}><Typography variant="h5">Data</Typography></Button>
        </Link>
      </Grid><Grid item xs={3} sx={{ textAlign: "right" }}>
          <Button color="primary" onClick={() => {
            localStorage.clear();
            logout()
          }}><Typography variant="h5">Logout</Typography></Button>
        </Grid></>)}
      
      
      {!isLogin&&(<Grid item xs={6} sx={{textAlign:"right"}}><Link to='/login' style={{textDecoration:"none"}}><Button color="primary"><Typography variant="h5">Login</Typography> </Button></Link></Grid>)}
      
    </Grid>
  );
}
//   export default function Navbar() {
//   return (
//     <Box sx={{ flexGrow: 1,padding:0 }}>
//       <AppBar position="static" sx={{backgroundColor:'transparent',color:'black',boxShadow:'none',padding:0}}>
//         <Toolbar sx={{padding:0}}>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,padding:0}}>
//             BDP
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//     // <></>
//   );
// }