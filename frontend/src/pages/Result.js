import * as react from 'react'
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import CContainer from '../components/CContainer';
import Navbar from '../components/Navbar';

export default function Result() {
  const location = useLocation();
  // const { name } = location.state;

  const name="hoste 6"
  const [data, setData] = react.useState([])
  const [survey, setSurvey] = react.useState("")
  const potentialDonors=34
  const groupProbability=57
  const fetchSurveys = async (d) => {
    try {
      const params = new URLSearchParams();
      params.append('name', d);
      const response = await fetch(`http://127.0.0.1:8000/api/predict-all/?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("accessToken")
        },
      });
      const jsonData = await response.json();
      console.log(jsonData, "jsonData")
      setData(jsonData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  react.useEffect(() => {
    setSurvey(name)
    fetchSurveys(name);
  }, [name])

  const rows = []

  data.filter(item => item.survey === survey).map((item) => {
    rows.push({ name: item.user.name, phone: item.user.phone_number, username: item.user.username, address: item.user.address, blood_group: item.user.blood_group, probability: item.output })
  })

  return (<>
    <CContainer>
      <Navbar></Navbar>
      <Typography variant='h5' sx={{ mb: 2 }}>Probability Table for</Typography>
      <TextField value={survey} onChange={(e) => setSurvey(e.target.value)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Blood Group</TableCell>
              <TableCell align="right">Probability (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.blood_group}</TableCell>
                <TableCell align="right">{row.probability}</TableCell>
                {/* <TableCell align="right">{row.protein}</ableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{width:"50vw",m:"20px auto"}}>
        <Stack sx={{background:"white",p:2,borderRadius:"4px",boxShadow:"10px 10px 10px grey"}}>
          <Typography sx={{display:"inline-block",textAlign:"center"}} variant="h5">Group Results</Typography>
          <Typography sx={{display:"inline-block"}} variant='body1' ><span style={{fontWeight:"bold"}}>Potential Donors:</span>{" "+potentialDonors}</Typography>
          <Typography sx={{display:"inline-block"}} variant='body1' ><span style={{fontWeight:"bold"}}>Group Probability:</span>{" "+groupProbability+'%'}</Typography>
        </Stack>
      </Box>
    </CContainer>
  </>)
}