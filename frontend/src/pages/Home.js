import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Navbar from '../components/Navbar'
import CContainer from '../components/CContainer';
import Body from '../components/Body'
import Footer from '../components/Footer';

const Home=()=>
{
    
    
    return (
    <>
    <CContainer>
    <Navbar></Navbar>
    <Body></Body>
    <Footer></Footer>
    </CContainer>
    </>
)}

export default Home;