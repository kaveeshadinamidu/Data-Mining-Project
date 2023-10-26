import React from "react";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LOGO from "../assets/logo.png";

export default function HomePage() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = React.useState("");

  const routeToSearchPage = () => {
    if (!searchText) return;
    navigate(`/search?q=${searchText}`);
  };

  const routeToSearchAllPage = () => {
    navigate("/search-all");
  };

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
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          InputProps={{
            sx: { borderRadius: 8, p: 0.5, pl: 2 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" sx={{ mt: 2 }} spacing={2}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", width: 100 }}
            onClick={routeToSearchPage}
          >
            Search
          </Button>
          <Button variant="contained" onClick={routeToSearchAllPage}>
            Get All
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
