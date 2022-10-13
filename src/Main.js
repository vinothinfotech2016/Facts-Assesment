import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Main = () => {
  const [facts, setFacts] = useState("Not reloading");
  const appApi = axios.create({
    baseURL: "http://localhost:3000",
  });

  const fetchFacts = async () => {
    axios.get("https://catfact.ninja/fact").then((response) => {
      setFacts(response.data);
    });
  };
  useEffect(() => {
    fetchFacts();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Fact Length -- {facts.length || "Loading Please Wait"}
          </Typography>
          <Typography variant="h5" component="div">
            Fact --- {facts.fact || "Loading Please Wait"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
