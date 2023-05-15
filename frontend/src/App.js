import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import CContainer from './components/CContainer';
import Body from './components/Body'
import './index.css'
import theme from './assets/theme/theme'

import Home from './pages/Home'
import Form from './pages/Form'
import Login from './pages/Login'
import Data from './pages/Data';
import Result from './pages/Result';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
    {/* <CContainer>
      <Navbar></Navbar>
      <Body></Body>
    </CContainer> */}
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/form/:surveyname' element={<Form/>}></Route>
        <Route path='/data' element={<Data/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
