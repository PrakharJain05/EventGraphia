import React, { useState } from "react";
import { Image } from "./Image";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const App = () => {
  const [count, setCount] = useState(0);
  const [imageNumbers, setImageNumbers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageNumber, setModalImageNumber] = useState(null);

  const showThumb = (imageNumber) => {
    setModalImageNumber(imageNumber);
    setIsModalOpen(true);
  };

  useEffect(() => {
    showThumb(modalImageNumber);
  }, [modalImageNumber]);

  const keyPress = (e) => {
    if (modalImageNumber) {
      if (e.key === "ArrowRight") {
        setModalImageNumber(modalImageNumber + 1);
        document.getElementById(`${modalImageNumber}`)?.scrollIntoView(true);
      }
      if (e.key === "ArrowLeft") {
        setModalImageNumber(modalImageNumber - 1);
        document.getElementById(`${modalImageNumber}`)?.scrollIntoView(true);
      }
    }
  };

  const handleDownload = async () => {
    await fetch(
      `http://via.placeholder.com/3900x3900?text=${modalImageNumber}`,
      {
        mode: "no-cors",
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    ).then(async (response) => {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    });
  };

  const fetchImages = () => {
    let arr = [];
    for (let i = 1; i <= 15; i++) {
      arr.push(count + i);
    }
    setCount((count) => count + 15);
    setImageNumbers([...imageNumbers, ...arr]);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      {modalImageNumber && (
        <div onKeyDown={(e) => keyPress(e)}>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              setModalImageNumber(null);
            }}
          >
            <button onClick={() => handleDownload()}>Download Image</button>
            <button
              style={{ color: "red" }}
              onClick={() => {
                setIsModalOpen(false);
                setModalImageNumber(null);
              }}
            >
              Close
            </button>
            <img
              src={`https://via.placeholder.com/2000x2000?text=${modalImageNumber}`}
              alt={`${modalImageNumber}`}
            />
          </Modal>
        </div>
      )}
      <InfiniteScroll
        dataLength={imageNumbers.length}
        next={() => fetchImages()}
        hasMore={true}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          {imageNumbers.map((imageNumber) => (
            <div
              key={imageNumber}
              id={`${imageNumber}`}
              onClick={() => showThumb(imageNumber)}
            >
              <Image imageNumber={imageNumber} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
