import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import NFTCard from "./component/NFTCard";
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [wallet, setWallet] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [nft, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const fetchNFTs = async () => {
    let nfts;
    const baseURL = `https://eth-goerli.g.alchemy.com/v2/${API_KEY}/getNFTs/`;
    try {
      if (!collectionAddress.length) {
        const url = `${baseURL}?owner=${wallet}`;
        const config = {
          method: "get",
          url: url,
        };
        const response = await axios(config);
        nfts = await response.data;
      } else {
        const url = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collectionAddress}`;
        const config = {
          method: "get",
          url: url,
        };
        const response = await axios(config);
        nfts = await response.data;
      }
      if (nfts) {
        console.log(nfts);
        setNFTs(nfts.ownedNfts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      const baseURL = `https://eth-goerli.g.alchemy.com/v2/${API_KEY}/getNFTs/`;
      const url = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const config = {
        method: "get",
        url: url,
      };
      const response = await axios(config);
      const nfts = await response.data;
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };
  return (
    <Box>
      <Stack spacing={2} sx={{ width: "400px", p: "10px", margin: "auto" }}>
        <TextField
          value={wallet}
          label="Wallet"
          size="small"
          onChange={(event) => setWallet(event.target.value)}
        />
        <TextField
          value={collectionAddress}
          label="Colection Address"
          size="small"
          onChange={(event) => setCollectionAddress(event.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setFetchForCollection(!fetchForCollection)}
            />
          }
          label="Fetch the Collection"
        />
        <Button
          variant="contained"
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }}
        >
          Submit
        </Button>
      </Stack>
      <Grid
        container
        spacing={1}
        direction="row"
        sx={{ width: "80%", margin: "10px auto" }}
      >
        {nft.length !== 0 &&
          nft.map((nft, index) => {
            return <NFTCard key={index} nft={nft}></NFTCard>;
          })}
      </Grid>
    </Box>
  );
};
export default App;
