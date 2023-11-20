import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "./RewardsPage.css";

const dummyData = [
  {
    id: 1,
    title: "Reward 1",
    description: "This is the description for Reward 1.",
    code: "ABC123",
    issuedAt: "2023-01-01",
    expiryDate: "2023-12-31",
    itemName: "Item 1",
  },
  {
    id: 2,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 3,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 4,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 5,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 6,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 7,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 8,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 9,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 10,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
  {
    id: 11,
    title: "Reward 2",
    description: "This is the description for Reward 2.",
    code: "ABCguuuui",
    issuedAt: "2022-01-01",
    expiryDate: "2022-12-31",
    itemName: "Item 2",
  },
];

const RewardsPage = () => {
  const [showCode, setShowCode] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [filteredRewards, setFilteredRewards] = useState(dummyData)

  const toggleCodeVisibility = (id) => {
    setShowCode((prevShowCode) => ({
      ...prevShowCode,
      [id]: !prevShowCode[id],
    }));
  };

  // const filterRewards = (reward) => {
  //   const currentDate = new Date().toISOString().split("T")[0];

  //   if (activeTab === "active") {
  //     return reward.expiryDate >= currentDate;
  //   } else if (activeTab === "expired") {
  //     return reward.expiryDate < currentDate;
  //   }

  //   return true;
  // };

  useEffect(() => {
    console.log("tab changed");
    const currentDate = new Date().toISOString().split("T")[0];

    if (activeTab === "active") {
      setFilteredRewards(dummyData.filter((item) => item.expiryDate >= currentDate))
      // return reward.expiryDate >= currentDate;
    } else if (activeTab === "expired") {
      setFilteredRewards(dummyData.filter((item) => item.expiryDate < currentDate))
      // return reward.expiryDate < currentDate;
    }
    else{
      setFilteredRewards(dummyData)
    }
  }, [activeTab])
  

  const copyCodeToClipboard = (code) => {
    const textarea = document.createElement("textarea");
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    console.log(`Code ${code} copied to clipboard!`);
  };

  return (
    <Container className="mt-4">
      <div className="filter-buttons">
        <Button
          variant={activeTab === "all" ? "success" : "outline-success"}
          onClick={() => setActiveTab("all")}
          className="mr-2">
          All
        </Button>
        <Button
          variant={activeTab === "active" ? "success" : "outline-success"}
          onClick={() => setActiveTab("active")}
          className="mr-2">
          Active
        </Button>
        <Button
          variant={activeTab === "expired" ? "success" : "outline-success"}
          onClick={() => setActiveTab("expired")}>
          Expired
        </Button>
      </div>

      <Row className="mt-4">
        {filteredRewards?.map((reward) => (
          <Col key={reward.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-4 reward-card">
              <Card.Body>
                <Card.Title>{reward.title}</Card.Title>
                <Card.Text>{reward.description}</Card.Text>
                <Card.Text>
                  <strong>Item:</strong> {reward.itemName}
                </Card.Text>
                <Card.Text>
                  <strong>Issued At:</strong> {reward.issuedAt}
                </Card.Text>
                <Card.Text>
                  <strong>Expiry Date:</strong>{" "}
                  <Badge bg="danger">{reward.expiryDate}</Badge>
                </Card.Text>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              
                    <Button
                      variant="link"
                      onClick={() => copyCodeToClipboard(reward.code)}
                      className="copy-icon-button">
                      <FileCopyIcon className="icon" />
                    </Button>
                    {showCode[reward.id] ? (
                      <span className="code-text">{reward.code}</span>
                    ) : (
                      <span
                        className={`blurred-code ${
                          reward.expiryDate <
                          new Date().toISOString().split("T")[0]
                            ? "expired"
                            : ""
                        }`}>
                        ********
                      </span>
                    )}

                      <Button
                        variant="link"
                        onClick={() => toggleCodeVisibility(reward.id)}
                        className="code-toggle-button">
                        {showCode[reward.id] ? (
                          <VisibilityOff className="icon" />
                        ) : (
                          <Visibility className="icon" />
                        )}
                      </Button>
                   
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RewardsPage;
// change
// change
// change