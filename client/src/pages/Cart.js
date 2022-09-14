import CartForm from "../components/CartForm";
import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
export default function Cart() {
  function getArtworks(data) {
    const artworksData = [];
    for (let item of data) {
      fetch(`/api/artworks/${item.artworkId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.log("FAILED GETTING ARTWORKS");
        })
        .then((data) => {
          artworksData.push(data);
          setArtworks(artworksData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    fetch("/api/carts")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log("FAILED");
      })
      .then((data) => {
        getArtworks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [artworks, setArtworks] = useState([]);
  return (
    <Container>
      <CartForm cartItems={artworks}></CartForm>
    </Container>
  );
}
