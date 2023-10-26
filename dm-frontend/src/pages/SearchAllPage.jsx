import React from "react";
import searchService from "../services/searchService";
import {
  Box,
  Typography,
  Divider,
  Select,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from "@mui/material";
import LOGO from "../assets/logo.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";

export default function SearchAllPage() {
  const navigate = useNavigate();
  const [allData, setAddData] = React.useState([]);
  const [allPoets, setAllPoets] = React.useState([]);
  const [allBooks, setAllBooks] = React.useState([]);
  const [selectedPoet, setSelectedPoet] = React.useState("");
  const [selectedBook, setSelectedBook] = React.useState("");
  const [metaphorType, setMetaphorType] = React.useState("all");

  async function findPoetsWithAllCombinations() {
    try {
      const response = await searchService.findWithAllParams(
        selectedPoet,
        selectedBook,
        metaphorType === "all" ? null : metaphorType
      );
      setAddData(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  async function getBooksForPoet() {
    try {
      const response = await searchService.getBooksForPoet(selectedPoet);
      setAllBooks(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  async function getBookPoems() {
    try {
      const response = await searchService.searchForBook(selectedBook);
      setAddData(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  async function getAllBooks() {
    try {
      const response = await searchService.searchAllBooks();
      setAllBooks(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  async function getPoetPoems() {
    try {
      const response = await searchService.searchForPoet(selectedPoet);
      setAddData(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  async function getAllPoets() {
    try {
      const response = await searchService.searchAllPoets();
      setAllPoets(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  async function getAllData() {
    try {
      const response = await searchService.searchAll();
      setAddData(response);
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  React.useEffect(() => {
    if (selectedPoet) {
      getBooksForPoet();
      getPoetPoems();
    }
  }, [selectedPoet]);

  React.useEffect(() => {
    if (selectedBook) {
      getBookPoems();
    }
  }, [selectedBook]);

  React.useEffect(() => {
    if (selectedPoet && selectedBook && metaphorType) {
      findPoetsWithAllCombinations();
    }
  }, [selectedPoet, selectedBook, metaphorType]);

  React.useEffect(() => {
    getAllData();
    getAllPoets();
    getAllBooks();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
      height="100vh"
      width="100vw"
    >
      <Box marginTop={5} marginLeft={8}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ width: 100 }}>
            <img
              src={LOGO}
              style={{ width: 80, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Box>
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="demo-simple-select-label">
              Filter By Poet
            </InputLabel>
            <Select
              label="Select Poet"
              labelId="demo-simple-select-label"
              value={selectedPoet}
              size="small"
              onChange={(event) => setSelectedPoet(event.target.value)}
            >
              {allPoets.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.key}>
                    {item.key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="demo-simple-select-label-2">
              Filter By Book
            </InputLabel>
            <Select
              label="Select Book"
              labelId="demo-simple-select-label-2"
              value={selectedBook}
              size="small"
              onChange={(event) => setSelectedBook(event.target.value)}
            >
              {allBooks.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.key}>
                    {item.key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <ToggleButtonGroup
            value={metaphorType}
            color="primary"
            size="small"
            onChange={(event, newType) => {
              setMetaphorType(event.target.value);
            }}
            aria-label="text formatting"
          >
            <ToggleButton value="all" aria-label="bold">
              All
            </ToggleButton>
            <ToggleButton value="yes" aria-label="italic">
              Metaphor Only
            </ToggleButton>
            <ToggleButton value="no" aria-label="underlined">
              Not Metaphors
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Divider sx={{ width: "100vw", mt: 2 }} />
      <Box sx={{ paddingLeft: 5, paddingTop: 5 }}>
        {allData.length === 0 && (
          <Box>
            <Typography variant="body1">No results found</Typography>
          </Box>
        )}
        <Grid container spacing={2}>
          {allData.map((item, index) => {
            return (
              <Grid item key={index} xs={3}>
                <Box key={index} component={Paper} p={2} elevation={4}>
                  <Typography
                    variant="body"
                    fontWeight={800}
                    fontSize={25}
                    color="primary"
                  >
                    {item.poem_name}
                  </Typography>
                  {item?.highlight?.line?.length > 0 ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.highlight?.line[0],
                      }}
                    />
                  ) : (
                    <Typography>{`Metaphor: ${item.line}`}</Typography>
                  )}
                  <Typography>
                    {`Poet: ${item.poet}`}{" "}
                    {/* <div dangerouslySetInnerHTML={{ __html: "<b>Bold</b>" }} /> */}
                  </Typography>
                  <Typography>{`Metaphor: ${item.metaphorical_terms}`}</Typography>
                  <Typography>{`Book: ${item.book}`}</Typography>
                  <Typography>{`Year: ${
                    item.year.length > 0 ? item?.year : "unknown"
                  }`}</Typography>
                  {item.metaphor_present_or_not === "yes" ? (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircleOutlineIcon color="success" />
                      <Typography color="green">Metaphor Present</Typography>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <HighlightOffIcon color="error" />
                      <Typography color="red">Metaphor not found</Typography>
                    </Stack>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
