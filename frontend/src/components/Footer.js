import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";

// Project Imports
import CContainer from "../components/CContainer";

const Footer = () => {
  return (<>
  <Box sx={{ p: 3,mt:3, backgroundColor: "#82b8c6",color:"white" }}>
  <Typography variant="h4" align="center" sx={{ mb: 2 }}>
    Blood Donation Predictor
  </Typography>
  <Typography variant="body2" align="center" >
    &#169; Virtual Queue {new Date().getFullYear()}. All rights reserved
  </Typography>
</Box>
            </>
  );
};

export default Footer;