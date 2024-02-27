import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function CustomFooterTotalComponent(props) {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      sx={{ padding: "10px", mr: 20, display: "flex" }}
    >
      <b>Grand Total : </b> {props.total}
      {props.totall}
    </Box>
  );
}

CustomFooterTotalComponent.propTypes = {
  total: PropTypes.number,
};
CustomFooterTotalComponent.propTypes = {
  totall: PropTypes.number,
};
export { CustomFooterTotalComponent };
