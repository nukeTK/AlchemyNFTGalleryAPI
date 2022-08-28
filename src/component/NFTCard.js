import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import React from "react";

const NFTCard = ({ nft }) => {
  const tokenId = ethers.utils.formatUnits(nft.id.tokenId);
  return (
    <Grid sx={{ ml: "15px", marginBottom: "10px" }}>
      <Card
        elevation={3}
        sx={{ width: 300, height: 550, borderRadius: "20px" }}
      >
        <CardMedia
          component="img"
          alt="nft"
          height="300"
          image={nft.media[0].gateway}
          sx={{
            objectFit: "cover",
            objectPosition: "top",
            transition: "0.4s ease",
            borderStartStartRadius: "20px",
            "&:hover": {
              transform: "scale(1.10)",
              cursor: "pointer",
            },
          }}
        />
        <Divider />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {tokenId * 1e18}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {nft.title}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {nft.contract.address.substring(0, 10) +
              "..." +
              nft.contract.address.substring(30, 45)}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {nft.description.substring(0, 100)}...
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NFTCard;
