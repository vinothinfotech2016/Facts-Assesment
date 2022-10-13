import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Main = () => {
  const [facts, setFacts] = useState([]);
  const [factCount, setFactCount] = useState(10);

  let allFacts = [];
  const fetchFacts = async (newCount) => {
    let iterationCount = newCount;
    if (newCount === factCount) {
      setFacts(allFacts);
      return;
    } else {
      let newFact = await axios
        .get("https://catfact.ninja/fact")
        .then((response) => {
          return response.data;
        });

      allFacts = allFacts.concat([newFact]);
      fetchFacts((iterationCount += 1));
    }
  };
  useEffect(() => {
    fetchFacts(0);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        height: "100%",
      }}
    >
      {facts.length === 10 ? (
        facts.map((fact, factNo) => {
          return (
            <Card
              sx={{
                width: 300,
                height: 300,
                marginBottom: 10,
                overflow: "scroll",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" color={"blue"}>
                  Fact -{factNo + 1}
                </Typography>

                <Typography variant="h5" component="div">
                  Fact --- {fact.fact || "Loading Please Wait"}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, marginLeft: 10 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Fact Length -- {fact.length || "Loading Please Wait"}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography variant="h5" component="div" sx={{ margin: 20 }}>
          If You need some goods you should wait...
        </Typography>
      )}
    </div>
  );
};
