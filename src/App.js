import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [e, se] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagesArray, setImagesArray] = useState({
    liked: [],
    disliked: []
  });

  const fetchAgain = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      se("");
      setImage(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      se(error.message);
    }
  };
  useEffect(() => {
    fetchAgain();
  }, []);

  let ref = (type, image) => {
    setImagesArray({
      ...imagesArray,
      [type]: [...imagesArray[type], image]
    });
    //then call the api to fetch new image
    fetchAgain();
  };
  console.log(imagesArray);
  return (
    <div className="App">
      <h1>Tider Clone</h1>
      <button
        disabled={loading && true}
        onClick={() => {
          ref("disliked", image);
        }}
      >
        swipe left
      </button>
      <br />
      {!loading ? (
        <img
          src={image}
          alt="no imge..."
          style={{ height: "95px", width: "95px" }}
        />
      ) : (
        <div
          style={{
            height: "95px",
            width: "95px",
            border: "1px solid black",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <p>Loading...</p>
        </div>
      )}
      <br />
      <button
        disabled={loading && true}
        onClick={() => {
          ref("liked", image);
        }}
      >
        swipe right
      </button>{" "}
      <br />
      <div>{e}</div>
      <div>
        <ul style={{ display: "flex", gap: "5px" }}>
          liked
          {imagesArray.liked.map((img) => {
            return (
              <li style={{ listStyleType: "none" }}>
                <img
                  src={img}
                  alt="no img"
                  style={{ height: "60px", width: "60px" }}
                />
              </li>
            );
          })}
        </ul>

        <ul style={{ display: "flex", gap: "5px" }}>
          disliked
          {imagesArray.disliked.map((img) => {
            return (
              <li style={{ listStyleType: "none" }}>
                <img
                  src={img}
                  alt="no img"
                  style={{ height: "60px", width: "60px" }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// In this task you have to create a
// simple tinder app for dogs.
// It does not have to be a full scale app,
//  all we need to do is write a component in React
//   that fetches images of dogs and a way to swipe yes or no.
//    You can fetch random dog images form this link
//    ere => https://dog.ceo/api/breeds/image/random. Once fetched, an image can be swiped yes or no.
//     The swiping functionality does not need to be connected to any data. It can be implemented as bare minimum.
