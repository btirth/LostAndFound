import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import axios from "axios";
import { API_URL } from "../config/api-end-points";
import sensitiveImg from "../Assets/Images/sensitive.jpg";
import Button from "@mui/material/Button";
import DashboardOptions from "../constants/DashboardOptions";
import { ApiRequest } from "../helpers/api-request";
import {
  Form,
  Modal,
  Row,
  Col,
  Image
} from "react-bootstrap";
import { BsImage } from "react-icons/bs";

const Album = (props) => {
  const [revokeRequest, setRevokeRequest] = useState({
    // Your data or state
    itemId: "",
    userId: localStorage.getItem("user_email"),
    // Add other parameters as needed
  });

  const [currentLoggedinUser, setcurrentLoggedinUser] = useState(
    localStorage.getItem("user_email")
  );

  const [linkedLostItem, setLinkedLostItem] = useState(null);
  const [currentSelectedItemID, setcurrentSelectedItemID] = useState(null);
  const [filterClaimStatus, setfilterClaimStatus] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: 3,
    transition: "transform 0.3s, boxShadow 0.3s, border 0.3s", // Add transitions for a smoother hover effect
    outline: "0.5px solid black",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 5,
      outline: "2px solid #75E6A3", // Adjust the border color and size on hover
    },
  };

  const gridItemStyle = {
    flex: 1, // Allow the Grid item to grow and shrink, but don't let it shrink below its content's intrinsic size
    // maxWidth: '300px', // Adjust the maximum width as needed
  };

  const noDataStyler = {
    display: "flex",
    justifyContent: "center",
  };

  const [searchFilter, setSearchFilter] = useState({
    filters: {
      // Example filters
    },
    page: 0,
    size: 2,
    sortField: "postedAt",
    sortDirection: "DESC", // or 'DESC' depending on your requirement
  });
  // const { value } = props;
  console.log("value:", props.value);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
    
    const fetchData = async () => {
      await getResult();
    };

    fetchData();
  }, [props.value, props.filterParams]);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   // This will run whenever currentPage changes
  //   console.log("currentPage changed:", currentPage);
  //   getResult(currentPage); // Assuming getResult is defined in your component
  // }, [currentPage]);

  const addFilter = (attributeName, value, mode) => {
    setSearchFilter((prevFilter) => ({
      ...prevFilter,
      filters: {
        ...prevFilter.filters,
        [attributeName]: { value, mode },
      },
    }));
  };

  const handleRevok = async (event) => {
    console.log("ItemID clicked", event);
    // const fetchData = async () => {

    setRevokeRequest((prevData) => ({
      ...prevData,
      itemId: event,
      // Update other properties as needed
    }));

    try {
      await ApiRequest.fetch({
        method: "put",
        url: `${API_URL}/api/v1/items/claims/revoke?itemId=${event}&userId=${revokeRequest.userId}`,
      });
      // console.log("GET request successful:", response.content);
      // setItems(response.content);
      await getResult();

      // });
      // const response = await axios.put(
      //   `${API_URL}items/claims/revoke?itemId=${event}&userId=${revokeRequest.userId}`,
      //   "",
      //   { headers }
      // );
      // console.log("GET request successful:", response.data.content);
      // setItems(response.data.content);
    } catch (error) {
      console.error("Error:", error);
    }
    // }
    // fetchData();
  };

  const handleAccept = async (itemId, claimRequestUserId) => {
    console.log("ItemID clicked", itemId, claimRequestUserId);
    console.log("selectedItem", currentSelectedItemID);
    // const fetchData = async () => {

    // setRevokeRequest((prevData) => ({
    //   ...prevData,
    //   itemId: event,
    //   // Update other properties as needed
    // }));

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      // const response = await axios.put(
      //   `${API_URL}items/claims/accept?itemId=${itemId}&userId=${revokeRequest.userId}&claimRequestUserId=${claimRequestUserId}`,
      //   "",
      //   { headers }
      // );
      await ApiRequest.fetch({
        method: "put",
        url: `${API_URL}/api/v1/items/claims/accept?itemId=${currentSelectedItemID}&userId=${revokeRequest.userId}&claimRequestLostItemId=${itemId}`,
      });
      await getResult();
      setShowModal(false);
      // console.log("GET request successful:", response.data.content);
      // setItems(response.data.content);
    } catch (error) {
      console.error("Error:", error);
    }
    // }
    // fetchData();
  };

  const renderClaims = (item) => {
    const getValueArray = () => {
      switch (filterClaimStatus) {
        case 1:
          return item.claimRequested;
        case 2:
          return item.claimApproved;
        case 3:
          return item.claimReject;
        default:
          return null;
      }
    };
    const selectedArray = getValueArray();

    return selectedArray ? (
      <React.Fragment>
        {Object.entries(selectedArray).map(([key, value]) => (
          <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
            <Card key={key} sx={cardStyle}>
              <CardMedia
                component="div"
                sx={{
                  pt: "70%",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                image={item.image ? item.image[0] : ""}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom>{item.title}</Typography>
                <Typography sx={{ color: "grey" }}>
                  {item.description}
                </Typography>
                <br />
                <Typography style={{ wordWrap: "break-word" }} gutterBottom>
                  User: {value}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleReviewRequest(key, item.id)}
                  size="large"
                  style={{
                    backgroundColor: "green",
                    width: "100%",
                    color: "white",
                  }}
                >
                  Review
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </React.Fragment>
    ) : null;
  };

  async function getResult(currentPage = 0) {
    const currentLoggedinUser = localStorage.getItem("user_email");

    console.log("filter props", props.filterParams);
    setItems([]);

    // Assuming `value` is defined somewhere in your component
    if (props.value === 0) {
      console.log("current Page", currentPage);
      const updatedFilter = {
        ...searchFilter,
        page: currentPage,
        filters: {
          ...searchFilter.filters,
          foundItem: { value: true, mode: "equals" },
          createdBy: { value: currentLoggedinUser, mode: "equals" },
        },
      };
      if (
        typeof props.filterParams === "object" &&
        props.filterParams !== null
      ) {
        // Iterate over key-value pairs in props.filterParams and add filters
        Object.entries(props.filterParams).forEach(([key, value]) => {
          // if (value != "") {
          if (key === "keyword")
            updatedFilter.filters[key] = {
              value: value,
              mode: "contains",
            };
          // You can customize the mode if needed
          else if (key === "category")
            updatedFilter.filters[key] = { value: value, mode: "equals" };
          else if (key === "location")
            updatedFilter.filters[key] = { value: value, mode: "geo" };
          else if (key === "date") {
            const endDate = `${value}T23:59:59.000Z `;
            updatedFilter.filters.postedAt = {
              value: `${value}, 00:00:00 AM`,
              mode: "gte",
            };
            updatedFilter.filters.postedAt = {
              value: new Date(endDate).toISOString(),
              mode: "lte",
            };
          }
          // }
          // You can customize the mode if needed
        });
      }
      // if (keywordValue != "") {
      //   updatedFilter.filters.keyword = {
      //     value: keywordValue,
      //     mode: "contains",
      //   };
      // }
      getFilteredData(updatedFilter, setItems);
    } else if (props.value === 1) {
      const updatedFilter = {
        ...searchFilter,
        page: 0,
        size: 1000,
        filters: {
          ...searchFilter.filters,
          claimRequested: { value: currentLoggedinUser, mode: "contains" },
        },
      };
      getFilteredData(updatedFilter, setItems);
    } else {
      console.log("in else");
      // const currentLoggedinUser = localStorage.getItem("user_email");

      const updatedFilter = {
        ...searchFilter,
        page: 0,
        size: 1000,
        filters: {
          ...searchFilter.filters,
          createdBy: { value: currentLoggedinUser, mode: "equals" },
        },
      };
      getFilteredData(updatedFilter, setItems);
    }
  }

  function getFilteredData(updatedFilter, setItems) {
    try {
      ApiRequest.fetch({
        method: "post",
        url: `${API_URL}/api/v1/items/search`,
        data: updatedFilter,
      }).then((response) => {
        console.log("GET request successful:", response.content);
        setItems(response.content);
        setTotalPages(response.totalPages);
        setCurrentPage(response.number + 1);
      });
      // const response = await axios.post(
      //   `${API_URL}items/search`,
      //   updatedFilter,
      //   { headers }
      // );
      // console.log("GET request successful:", response.data.content);
      // setItems(response.data.content);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const handleCloseModal = () => {
    setShowModal(false);
    // setSelectedLostItem(null);
    // setNewImages([]);
  };
  const handleReviewRequest = (key, primeItemID) => {
    console.log("key", key);
    setcurrentSelectedItemID(primeItemID);
    try {
      ApiRequest.fetch({
        method: "get",
        url: `${API_URL}/api/v1/items/`+key,
      }).then((response) => {
        console.log("GET item requested successful:", response.content);
        setLinkedLostItem(response);
        setShowModal(true);

      });
      // const response = await axios.post(
      //   `${API_URL}items/search`,
      //   updatedFilter,
      //   { headers }
      // );
      // console.log("GET request successful:", response.data.content);
      // setItems(response.data.content);
    } catch (error) {
      console.error("Error:", error);
    }
    // setSelectedLostItem(null);
    // setNewImages([]);
  };

  const Pagination = () => {
    // const totalPages = Math.ceil(totalItems / itemsPerPage);
    // const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
      const newPage = Math.min(currentPage + 1, totalPages);
      console.log("newPage", newPage);
      setCurrentPage(newPage); //, () => {
      // });
      console.log("currentPage", currentPage);
      getResult(newPage - 1);
    };

    const handlePrevPage = () => {
      const newPage = Math.max(currentPage - 1, 1);
      setCurrentPage(newPage, () => {
        console.log("currentPage", currentPage);
      });
      getResult(newPage - 1);
    };

    return (
      <div>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {/* Render your content for the current page */}
      </div>
    );
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <main>
      {/* Hero unit */}
      {items !== undefined && items !== null && items.length !== 0 ? (
        <Container sx={{ py: 3 }}>
          {/* End hero unit */}
          {props.value !== 2 ? (
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={cardStyle}>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "70%",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                      }}
                      image={item.image ? item.image[0] : ""}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography>{item.title}</Typography>
                      <Typography sx={{ color: "grey" }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {props.value === 1 ? (
                        <Button
                          onClick={() => handleRevok(item.id)}
                          size="large"
                          style={{
                            backgroundColor: "red",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          Revoke
                        </Button>
                      ) : (
                        ""
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  {renderClaims(item)}
                </React.Fragment>
              ))}
            </Grid>
          )}
        </Container>
      ) : (
        <div style={noDataStyler}>No Data</div>
      )}

{props.value === 0 ? (<div>
        <Pagination />
      </div>) : ""}

      <Modal
          show={showModal}
          onHide={handleCloseModal}
          dialogClassName="custom-modal"
          size="lg">
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#75e6a3" }}>
              {"Linked Lost Item"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label
                  style={{
                    color: "#333",
                    marginRight: "5px",
                    fontWeight: "bold",
                  }}>
                  Title
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={linkedLostItem?.title || ""}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label
                  style={{
                    color: "#333",
                    marginRight: "5px",
                    fontWeight: "bold",
                  }}>
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  value={linkedLostItem?.description || ""}
                />
              </Form.Group>
              <Form.Label
                style={{
                  color: "#333",
                  marginRight: "5px",
                  fontWeight: "bold",
                }}>
                Item Category
              </Form.Label>
              <Form.Select
                style={{ width: "100%", height: "40px" }}
                aria-label="personal"
                value={linkedLostItem?.category || "personal"}>
                <option>Select Category</option>
                <option value="personal">Personal Item</option>
                <option value="electronics">Electronics</option>
                <option value="document">Document</option>
              </Form.Select>
              <Form.Label
                style={{
                  color: "#333",
                  marginRight: "5px",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}>
                Images:
              </Form.Label>
              <Container>
                <Row>
                  {(linkedLostItem?.image || []).map((img, index) => (
                    <Col
                      xs={4}
                      className="text-center p-2 shadow mb-4 item-edit-card"
                      key={index}>
                      <div>
                        <Image
                          src={img}
                          alt={`Image ${index + 1}`}
                          style={{ height: "150px", width: "150px" }}
                        />
                      </div>
                      {/* <Button
                        className="delete-image-button mt-2"
                        onClick={() => handleDeleteImage(img)}
                        variant="danger"
                        size="sm"
                        block>
                        Delete
                      </Button> */}
                    </Col>
                  ))}

                  {/* {newImages?.map((img, index) => (
                    <Col
                      xs={4}
                      className="text-center p-2 shadow mb-4 item-edit-card"
                      key={index}>
                      <div>
                        <Image
                          src={URL.createObjectURL(newImages[index])}
                          alt={`Image ${index + 1}`}
                          style={{ height: "150px", width: "150px" }}
                        />
                      </div>
                      <Button
                        className="delete-image-button mt-2"
                        onClick={() => handleDeleteNewImage(index)}
                        variant="danger"
                        size="sm"
                        block>
                        Delete
                      </Button>
                    </Col>
                  ))} */}
                </Row>
              </Container>
              {/* <Form.Group controlId="formImages">
                    
                            <Form.Control
                                style={{ marginTop: '10px' }}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleNewImagesChange}
                                className="lost-item-input"
                            />
                    </Form.Group> */}

              {/* <Row className="mb-3 align-items-center">
                <Col xs={6} md={4} className="d-flex">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Add New Images:
                  </Form.Label>
                </Col>
                <Col xs={6} md={8} className="d-flex align-items-center">
                  <label
                    htmlFor="fileInput"
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <BsImage style={{ marginRight: "5px" }} />
                    Choose Images
                  </label>
                </Col>
              </Row> */}

              {/* <div className="lost-item-group  mt-3">
                <Form.Label style={{ color: "#333", fontWeight: "bold" }}>
                  Location Picker
                </Form.Label>
                <MapWrapper
                  locations={
                    locations.length > 0
                      ? locations
                      : [
                          {
                            lat: editedLostItem?.location?.y,
                            lng: editedLostItem?.location?.x,
                          },
                        ]
                  }
                  setLocationsFun={setLocations}
                  isEdit={true}
                />
              </div> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="contained" onClick={() => handleAccept(linkedLostItem.id, linkedLostItem.createdBy)} color="success">
              Accept
            </Button>
            <Button variant="contained" color="error">
              Reject
            </Button>
            <Button variant="secondary">
              Close
            </Button>
            <Button
              variant="primary"
              // onClick={handleSaveChanges}
              className="save-color-button">
              {/* {selectedLostItem ? "Save Changes" : "Confirm"} */}
            </Button>
          </Modal.Footer>
        </Modal>
    </main>

    // </ThemeProvider>
  );
};

export default Album;
