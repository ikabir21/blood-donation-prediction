import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const CContainer = ({ children, ...rest }) => (
  <Box
    sx={{background:"#b4e1ed"}}
    maxWidth={{ sm: 720, md: 1236 }}
    minHeight="100vh"
    width={"100%"}
    margin={"0 auto"}
    paddingX={10}
    paddingY={{ xs: 4, sm: 6, md: 8 }}
    {...rest}>
    {children}
  </Box>
);

CContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default CContainer;