import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import CContainer from '../components/CContainer';
import Navbar from '../components/Navbar';

function createData(name, phone, address, probability) {
    return { name, phone, address, probability };
  }
  
 

export default function Result()
{
    const location = useLocation();
    const { name } = location.state;

    const arr=[
        {
            name:'naveen',
            phone:'23432420',
            address:"asdlfkj",
            probability:"0.6"
        },
        {
            name:'naveen',
            phone:'23432420',
            address:"asdlfkj",
            probability:"0.6"
        },
        {
            name:'naveen',
            phone:'23432420',
            address:"asdlfkj",
            probability:"0.6"
        },
        {
            name:'naveen',
            phone:'23432420',
            address:"asdlfkj",
            probability:"0.6"
        }
    ]
    const rows=[]

    function myfunction(item)
    {
        rows.push(createData(item.name,item.phone,item.address,item.probability))
        console.log(item.name);
    } 
    arr.map(myfunction)

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];

    return (<>
        <CContainer>
            <Navbar></Navbar>
            <Typography variant='h5' sx={{mb:2}}>Probability Table</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Probability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.probability}</TableCell>
              {/* <TableCell align="right">{row.protein}</ableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </CContainer>
    </>)
}