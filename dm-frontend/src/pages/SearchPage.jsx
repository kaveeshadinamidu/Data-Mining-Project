import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import searchService from "../services/searchService";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Select,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import LOGO from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const SEARCH_SYSTEM_TYPES = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "sound",
    label: "Sound",
  },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchText, setSearchText] = React.useState(searchParams.get("q"));
  const [selectedType, setSelectedType] = React.useState("text");

  const [searchResponse, setSearchResponses] = React.useState([]);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  async function getSearchResults() {
    try {
      const response = await searchService.searchQueryWithDates(
        searchText,
        fromDate,
        toDate,
        selectedType
      );
      setSearchResponses(response);
      //   if (!searchText) {
      //     setSearchResponses([]);
      //     return;
      //   }
      //   if (fromDate && toDate) {
      //     const response = await searchService.searchQueryWithDates(
      //       searchText,
      //       fromDate,
      //       toDate,
      //       selectedType
      //     );
      //     setSearchResponses(response);
      //     return;
      //   }
      //   if (selectedType === "sound") {
      //     const response = await searchService.searchSoundQuery(searchText);
      //     setSearchResponses(response);
      //   } else if (selectedType === "text") {
      //     const response = await searchService.searchQuery(searchText);
      //     setSearchResponses(response);
      //   }
    } catch (error) {
      console.log("Error is: ", error);
    }
  }

  React.useEffect(() => {
    getSearchResults();
  }, [searchText, selectedType, fromDate, toDate]);

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

          <TextField
            placeholder="Search"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
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
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-simple-select-label">
              Select Search type
            </InputLabel>
            <Select
              label="Select Search Type"
              labelId="demo-simple-select-label"
              value={selectedType}
              size="small"
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {SEARCH_SYSTEM_TYPES.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            placeholder="From"
            type="number"
            size="small"
            sx={{ width: 100 }}
            onChange={(event) => setFromDate(event.target.value)}
          />
          <TextField
            placeholder="To"
            type="number"
            size="small"
            sx={{ width: 100 }}
            onChange={(event) => setToDate(event.target.value)}
          />
        </Stack>
      </Box>
      <Divider sx={{ width: "100vw", mt: 2 }} />
      <Box sx={{ paddingLeft: 20, paddingTop: 5 }}>
        {searchResponse.length === 0 && (
          <Box>
            <Typography variant="body1">No results found</Typography>
          </Box>
        )}

        <Stack direction="column" spacing={2} sx={{ pb: 10 }}>
          {searchResponse.map((item, index) => {
            return (
              <Box key={index}>
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
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
