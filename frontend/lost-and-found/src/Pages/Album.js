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

const Album = (props) => {
  const [revokeRequest, setRevokeRequest] = useState({
    // Your data or state
    itemId: "",
    userId: localStorage.getItem("user_email"),
    // Add other parameters as needed
  });

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
      outline: "2px solid #35ac65", // Adjust the border color and size on hover
    },
  };

  const noDataStyler = {
    display: "flex",
    justifyContent: "center"
  }

  const [searchFilter, setSearchFilter] = useState({
    filters: {
      // Example filters
    },
    page: 0,
    size: 10,
    sortField: "postedAt",
    sortDirection: "DESC", // or 'DESC' depending on your requirement
  });
  // const { value } = props;
  console.log("value:", props.value);

  useEffect(() => {
    const fetchData = async () => {
      await getResult(props, setItems, searchFilter);
    };

    fetchData();
  }, [props.value, props.filterParams, searchFilter]);

  const [items, setItems] = useState([]);

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
      await getResult(props, setItems, searchFilter);

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

  const handleApprove = async (itemId, claimRequestUserId) => {
    console.log("ItemID clicked", itemId);
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
        url: `${API_URL}/api/v1/items/claims/accept?itemId=${itemId}&userId=${revokeRequest.userId}&claimRequestUserId=${claimRequestUserId}`,
      });
      await getResult(props, setItems, searchFilter);
      // console.log("GET request successful:", response.data.content);
      // setItems(response.data.content);
    } catch (error) {
      console.error("Error:", error);
    }
    // }
    // fetchData();
  };
  return (
    // <ThemeProvider theme={defaultTheme}>
    <main>
      {/* Hero unit */}
      {items !== undefined && items.length !== 0 ? (
        <Container sx={{ py: 3 }}>
          {/* End hero unit */}
          {props.value !== 2 ? (
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={cardStyle}
                  >
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
                      <Typography>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "grey" }}>{item.description}</Typography>
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
              {items.map((item) =>
                item.claimRequested?.map((requestMail, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={cardStyle}
                    >
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
                        <Typography gutterBottom>{item.title}</Typography>
                        <Typography sx={{ color: "grey" }}>
                          {item.description}
                        </Typography>
                        <br />
                        <Typography gutterBottom>User:{requestMail}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={() => handleApprove(item.id, requestMail)}
                          size="large"
                          style={{
                            backgroundColor: "green",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          Approve
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Container>
      ) : (
        <div style={noDataStyler}>No Data</div>
      )}
    </main>

    // </ThemeProvider>
  );
};

export default Album;

async function getResult(props, setItems, searchFilter) {
  console.log("filter props", props.filterParams);
  setItems([]);

  // Assuming `value` is defined somewhere in your component
  if (props.value === 0) {
    const updatedFilter = {
      ...searchFilter,
      filters: {
        ...searchFilter.filters,
        foundItem: { value: true, mode: "equals" },
      },
    };
    if (typeof props.filterParams === "object" && props.filterParams !== null) {
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
    const currentLoggedinUser = localStorage.getItem("user_email");
    getFilteredData(updatedFilter, setItems);
  } else if (props.value === 1) {
    const currentLoggedinUser = localStorage.getItem("user_email");

    const updatedFilter = {
      ...searchFilter,
      filters: {
        ...searchFilter.filters,
        claimRequested: { value: currentLoggedinUser, mode: "contains" },
      },
    };
    // if (
    //   typeof props.filterParams === "object" &&
    //   props.filterParams !== null
    // ) {
    //   // Iterate over key-value pairs in props.filterParams and add filters
    //   Object.entries(props.filterParams).forEach(([key, value]) => {
    //     if (key === "keyword")
    //       updatedFilter.filters[key] = {
    //         value: value,
    //         mode: "contains",
    //       }; // You can customize the mode if needed
    //     else if (key === "category")
    //       updatedFilter.filters[key] = { value: value, mode: "equals" }; // You can customize the mode if needed
    //   });
    // }
    // if (keywordValue != "") {
    //   updatedFilter.filters.keyword = {
    //     value: keywordValue,
    //     mode: "contains",
    //   };
    // }
    getFilteredData(updatedFilter, setItems);
    // try {
    //   ApiRequest.fetch({
    //     method: "post",
    //     url: `${API_URL}/api/v1/items/search`,
    //     data: updatedFilter,
    //   }).then((response) => {
    //     console.log("GET request successful:", response.content);
    //     setItems(response.content);
    //   });

    //   // const response = await axios.post(
    //   //   `${API_URL}items/search`,
    //   //   updatedFilter,
    //   //   { headers }
    //   // );
    //   // console.log("GET request successful:", response.data.content);
    //   // setItems(response.data.content);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  } else {
    console.log("in else");
    const currentLoggedinUser = localStorage.getItem("user_email");

    const updatedFilter = {
      ...searchFilter,
      filters: {
        ...searchFilter.filters,
        createdBy: { value: currentLoggedinUser, mode: "contains" },
      },
    };
    // try {
    //   ApiRequest.fetch({
    //     method: "post",
    //     url: `${API_URL}/api/v1/items/search`,
    //     data: updatedFilter,
    //   }).then((response) => {
    //     console.log("GET request successful:", response.content);
    //     setItems(response.content);
    //   });
    //   // const response = await axios.post(
    //   //   `${API_URL}items/search`,
    //   //   updatedFilter,
    //   //   { headers }
    //   // );
    //   // console.log(
    //   //   "GET request successful in claim request received:",
    //   //   response.data.content
    //   // );
    //   // setItems(response.data.content);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
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
// export default function Album(props) {
//   const { value } = props;
//   console.log("value:", value);

//   useEffect(() => {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     };
//     if (value == 0) {
//       axios
//         .get(`${API_URL}item/get-list?isFoundItem=true`, { headers })
//         .then((response) => {
//           console.log("GET request successful:", response.data);
//           setItems(response.data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   }, []);

//   const [items, setItems] = useState([]);
//   return (
//     // <ThemeProvider theme={defaultTheme}>

//     <main>
//       {/* Hero unit */}

//       <Container sx={{ py: 1 }}>
//         {/* End hero unit */}
//         <Grid container spacing={4}>
//           {items.map((item) => (
//             <Grid item key={item.id} xs={6} sm={6} md={3}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardMedia
//                   component="div"
//                   sx={{
//                     // 16:9
//                     pt: "70.25%",
//                     backgroundSize: "contain",
//                     backgroundPosition: "center",
//                     backgroundImage: `url(${item.image[0]})`,
//                   }}
//                   image={item.image[0]}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     {item.title}
//                   </Typography>
//                   <Typography>{item.description}</Typography>
//                 </CardContent>
//                 {/* <CardActions>
//                   <Button size="small">View</Button>
//                   <Button size="small">Edit</Button>
//                 </CardActions> */}
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </main>

//     // </ThemeProvider>
//   );
// }
