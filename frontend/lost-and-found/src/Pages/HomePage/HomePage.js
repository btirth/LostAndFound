import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar"; // Import the Navbar component
import FoundItemForm from "../FoundItemForm/FoundItemForm";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Album from "../Album";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./HomePage.css"; // Import the CSS file
import { ToastContainer, toast } from "react-toastify";
import MapWrapper from "../../Components/MapWrapper";
import { API_URL } from "../../config/api-end-points";
import axios from "axios";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  const [value, setValue] = React.useState(0);
  const [isFilterOpen, setFilterOpen] = useState(true);
  const toggleFilter = () => setFilterOpen(!isFilterOpen);

  const BaseColor = "#75e6a3";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const openLostForm = () => {
    window.location = "/lost-form";
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [resetVariable, setResetVariable] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterParams, setFilterParams] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openForm = () => {
    setIsFormOpen(true);
    setResetVariable(false);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setResetVariable(true);
  };

  const stackButton = {
    marginTop: "20px",
    marginLeft: "20px",
  };

  const albumContainer = {
    width: "100%",
  };

  const containerFlexStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  };
  const componentAStyle = {
    flex: "1",
    padding: "16px",
  };

  const componentBStyle = {
    flex: "3",
    padding: "16px",
    // paddingLeft: '5%',
    // display: 'flex',
    // justifyContent: 'space-between',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    cursor: "pointer",
    overflow: "hidden",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  };

  const imageStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
    objectFit: "cover",
  };

  const itemInfoStyle = {
    flex: "1",
    marginLeft: "16px",
    textAlign: "center",
  };

  const itemNameStyle = {
    color: BaseColor,
    fontSize: "24px",
    margin: "0",
  };

  const itemTextStyle = {
    color: "#333",
    fontSize: "18px",
    margin: "4px 0",
  };

  const defaultImageStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
    objectFit: "cover",
    background: "#f0f0f0",
  };

  const buttonStyle = {
    backgroundColor: BaseColor,
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
  };

  const itemContainerStyle = {
    display: "flex",
    // justifyContent: 'space-between',
    flexWrap: "wrap",
    width: "100%",
  };

  const filterContainerStyle = {
    width: "100%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const filterHeadingStyle = {
    fontSize: "20px",
    color: BaseColor,
  };

  const filterOptionsStyle = {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "8px",
    margin: "8px 0",
  };

  const filterButtonStyle = {
    backgroundColor: BaseColor,
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    margin: "8px 0",
    cursor: "pointer",
  };
  const clearButtonStyle = {
    backgroundColor: "#cf534e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    margin: "8px 0",
    cursor: "pointer",
  };
  const filterLabelStyle = {
    width: "75%",
    background: BaseColor,
    color: "#fff",
    fontSize: "20px",
    padding: "5px 0",
    textAlign: "center",
    cursor: "pointer",
  };
  const filterLabelContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };
  const filterOptionsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const labelCheckBox = {
    margin: "0 15px 0 11px",
    display: "unset",
  };

  const [items, setItems] = useState([]);

  const FilterOptions = ({ filterParams }) => {
    // const { filterParamKeyword } = filterParams;
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState("");
    const [keyword, setKeyword] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    //   const [formData, setFormData] = useState({
    //   keyword: filterParams.keyword || '',
    //   date: filterParams.date || '',
    //   category: filterParams.category || '',
    //   latitude: filterParams.latitude || '',
    //   longitude: filterParams.longitude || '',
    //   distance: filterParams.distance || '',
    // });

    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
    // };

    // useEffect(() => {
    //   setKeyword(filterParamKeyword);
    // }, [filterParamKeyword]);
    const handleFilterChange = (event) => {
      const value = event.target.value;
      if (selectedFilters.includes(value)) {
        setSelectedFilters(
          selectedFilters.filter((filter) => filter !== value)
        );
      } else {
        setSelectedFilters([...selectedFilters, value]);
      }
    };

    const handleClearFilters = () => {
      // Clear all filter values and reset the filters
      setSelectedFilters([]);
      setLocation("");
      setRadius("");
      setKeyword("");
      setSelectedDate("");
      setSelectedCategory("");
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (selectedFilters.includes("category") && selectedCategory === "") {
        toast.error("Please select a category!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (selectedFilters.includes("date") && selectedDate === "") {
        toast.error("Please select a date!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (selectedFilters.includes("keyword") && keyword === "") {
        toast.error("Please enter a keyword!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        // Handle form submission with selectedFilters, radius, name, selectedDate, and locationFile
        console.log("Selected Filters:", selectedFilters);
        console.log("Radius:", radius);
        console.log("Date:", selectedDate);
        console.log("Location:", location);
        console.log("Keyword:", keyword);
        console.log("Category:", selectedCategory);

        // Check if "Location" filter is checked
        const isLocationFilterChecked = selectedFilters.includes("location");

        if (isLocationFilterChecked && (!location || !radius)) {
          toast.error("please select location and radius!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

        const filterParams = {};

        // Check if "Keyword" filter is checked
        if (selectedFilters.includes("keyword") && keyword) {
          filterParams.keyword = keyword;
        }

        // Check if "Date" filter is checked
        if (selectedFilters.includes("date") && selectedDate) {
          filterParams.date = selectedDate;
        }

        // Check if "Location" filter is checked
        if (selectedFilters.includes("location") && location && radius) {
          let selectedLong = location[0]?.lng ? location[0]?.lng : "";
          let selectedLat = location[0]?.lat ? location[0]?.lat : "";
          filterParams.location = {
            x: selectedLong,
            y: selectedLat,
            radius: radius,
          };
          // filterParams.longitude = selectedLong;
          // filterParams.latitude = selectedLat;
          // filterParams.distance = radius;
        }

        // Check if "Category" filter is selected
        if (selectedCategory) {
          filterParams.category = selectedCategory;
        }

        // Handle form submission with the filtered parameters
        console.log("Filter Parameters:", filterParams);
        setFilterParams(filterParams);

        // const headers = {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        // };

        // axios.get(`${API_URL}/api/v1/item/get-list-by-filter?isFoundItem=true`, {
        //   headers,
        //   params: filterParams,
        // })
        //   .then(response => {
        //     console.log('GET request successful:', response.data);
        //     setItems(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
      }
    };

    const setFilterParamKeyword = (event) => {
      console.log("event captured", event);
      filterParams.keyword = event;
    };

    return (
      <form style={{ textAlign: "center" }}>
        <div style={filterContainerStyle}>
          <div>
            <label style={labelCheckBox}>
              <input
                type="checkbox"
                value="keyword"
                checked={selectedFilters.includes("keyword")}
                onChange={handleFilterChange}
              />
              Keyword
            </label>
            <label style={labelCheckBox}>
              <input
                type="checkbox"
                value="date"
                checked={selectedFilters.includes("date")}
                onChange={handleFilterChange}
              />
              Date
            </label>
            <label style={labelCheckBox}>
              <input
                type="checkbox"
                value="location"
                checked={selectedFilters.includes("location")}
                onChange={handleFilterChange}
              />
              Location
            </label>
          </div>
          <label>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="personal">Personal Item</option>
              <option value="electronics">Electronics</option>
              <option value="document">Document</option>
            </select>
          </label>
          <input
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={filterOptionsStyle}
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={filterOptionsStyle}
          />
          <MapWrapper setLocation={setLocation} />
          <input
            type="number"
            placeholder="Radius (meters)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={filterOptionsStyle}
          />

          <div>
            <button onClick={handleSubmit} style={filterButtonStyle}>
              Apply Filter
            </button>

            <button onClick={handleClearFilters} style={clearButtonStyle}>
              Clear Filter
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
      {/* <Navbar /> */}
      {/* <h2>Welcome to the Home Page</h2> */}
      {/* <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div> */}
      {/* <div className="align-report-buttons-and-tab"> */}
      {/* <div> */}
      {/* <div>
          <Stack style={stackButton} spacing={2} direction="row">

            <Button onClick={openLostForm} variant="contained">
              Report Lost Item
            </Button>
            <Button onClick={openForm} variant="contained">
              Report Found Item
            </Button>
          </Stack>
        </div> */}

      {/* <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={1}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box> */}
      <div className="margin-left-20 margin-bottom-20">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="disabled tabs example"
            centered
          >
            <Tab
              label={
                <Typography
                  variant="body1"
                  fontWeight={value === 0 ? "bold" : "normal"}
                >
                  Item Posted
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  variant="body1"
                  fontWeight={value === 1 ? "bold" : "normal"}
                >
                  Claim Request Raised
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  variant="body1"
                  fontWeight={value === 2 ? "bold" : "normal"}
                >
                  Claim Request Received
                </Typography>
              }
            />
          </Tabs>
        </Box>
      </div>
      {/* </div> */}
      <div className="flex">
        {value === 0 ? (
          <div>
            <div style={componentAStyle} className="filter-container">
              <div style={filterLabelContainerStyle}>
                <div
                  style={filterLabelStyle}
                  className="filter-toggle "
                  onClick={toggleFilter}
                >
                  {isFilterOpen ? "Hide Filter Options" : "Show Filter Options"}
                </div>
              </div>
              {isFilterOpen && (
                <div style={filterOptionsContainerStyle}>
                  <FilterOptions filterParams={filterParams} />
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <div style={albumContainer}>
          <Album value={value} filterParams={filterParams}></Album>
        </div>
      </div>

      <FoundItemForm
        isOpen={isFormOpen}
        onRequestClose={closeForm}
        resetVariable={resetVariable}
      />
      {/* Other content */}
    </div>
  );
};

export default HomePage;
