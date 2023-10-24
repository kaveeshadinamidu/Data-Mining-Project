import React from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LOGO from "../assets/logo.png";

export default function HomePage() {
  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        width="100vw"
        justifyContent="center"
        alignItems="center"
      >
        <img src={LOGO} height={120} />

        <TextField
          placeholder="Search"
          sx={{ width: 600, mt: 5 }}
          size="small"
          InputProps={{
            sx: { borderRadius: 8, p: 0.5, pl: 2 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={{ mt: 2 }}>Search anything</Typography>
      </Box>
    </React.Fragment>
  );
}
