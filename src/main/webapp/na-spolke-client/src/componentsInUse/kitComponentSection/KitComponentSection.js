/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from '../../mkFiles/components/MKBox';
import MKTypography from '../../mkFiles/components/MKTypography';


function BuiltByDevelopers(props) {
  
  let position = (props.position == "positionR") ? "flex-end" : "flex-start"
  
  return (

    <MKBox
      display="flex"
      alignItems="center"
      borderRadius="xl"
      my={2}
      py={12}
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.dark.main, 0.8),
            rgba(gradients.dark.state, 0.8),
          )}, url(${props.photoPath})`,
        backgroundSize: "cover",
        backgroundPosition: 'center',
      }}
    >
      <Grid container justifyContent={position}>
        <Grid container justifyContent={position} item xs={12} lg={6} sx={{ ml: { xs: 0, lg: 6 }, mr: { xs: 0, lg: 6 }}}>
          <MKTypography variant="h1" color="white" mb={1}>
            {props.title}
          </MKTypography>
          <MKTypography variant="body1" color="white" opacity={0.8} 
              mb={2} align={(props.position == "positionR") ? "right" : "left" }>
          {props.textContent}
          </MKTypography>
          <MKTypography
            component="a"
            href="https://www.creative-tim.com/learning-lab/react/overview/material-kit/"
            target="_blank"
            rel="noreferrer"
            variant="body2"
            color="white"
            fontWeight="regular"
            sx={{
              display: "flex",
              alignItems: "center",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translateX(3px)`,
                transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
              },

              "&:hover .material-icons-round, &:focus .material-icons-round": {
                transform: `translateX(6px)`,
              },
            }}
          >
            Read docs <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default BuiltByDevelopers;
