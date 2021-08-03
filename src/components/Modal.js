import React, { useState, useEffect } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { firebase } from "../firebase/config";

import useFirestore from "../hooks/useFirestore";

import { motion } from "framer-motion";
import clsx from "clsx";

const makeModalStyles = makeStyles((theme) => ({
  backdrop: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#111111d0",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  image: {
    width: "75vw",
    height: "50vw",
    margin: "3vh auto",
    border: "3px solid white",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80%",
      maxHeight: "100%",
      margin: "3vh auto",
      border: "3px solid white",
    },
  },
  arrowButton: {
    background: "#cabebe00",
    color: "white",
    border: "transparent",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {},
  },
  caption: {
    color: "white",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  delete: {
    display: "flex",
    color: "white",
  },
}));

const Modal = ({ selectedImage, setSelectedImage, currentAlbum, caption }) => {
  const styles = makeModalStyles();
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImage(null);
    }
  };
  const [open, setOpen] = useState(false);
  const { docs } = useFirestore(currentAlbum);

  const handleDelete = () => {
    docs.map((doc) => {
      if (doc.url === selectedImage) {
        var docRef = firebase
          .storage()
          .ref()
          .child(currentAlbum + doc.fileName);
        try {
          docRef.delete().then(async () => {
            await firebase
              .firestore()
              .collection(currentAlbum)
              .doc(doc.id)
              .delete();
          });
          setOpen(false);
          setSelectedImage(null);
        } catch (err) {
          console.log(err.message);
        }
      }
      return null;
    });
  };

  function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon =
      direction === "left" ? (
        <ArrowBackIosIcon style={{ fontSize: "5vh", padding: "1vh auto" }} />
      ) : (
        <ArrowForwardIosIcon style={{ fontSize: "5vh" }} />
      );

    return (
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.4 }}
        className={styles.arrowButton}
        onClick={clickFunction}
      >
        {icon}
      </motion.button>
    );
  }

  const getIndex = () => {
    var increment = 0;
    docs.map((doc) => {
      if (doc.url === selectedImage) {
        setIndex(increment);
      } else {
        increment++;
      }
      return null;
    });
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    getIndex();
  });

  const numSlides = docs.length;

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    setIndex(newIndex);
    setSelectedImage(docs[newIndex].url);
  };
  return (
    <div className={clsx("backdrop", styles.backdrop)} onClick={handleClick}>
      {firebase.auth().currentUser && (
        <Button className={styles.delete} onClick={() => setOpen(true)}>
          Delete
        </Button>
      )}

      <Dialog open={open}>
        <DialogContent>
          <DialogTitle>Delete current picture</DialogTitle>
          <DialogContentText>
            Are you sure you want to delete this picture?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete()}>Yes</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, times: [1] }}
        src={selectedImage}
        alt="enlarged pic"
        className={styles.image}
      />
      <Typography className={styles.caption}>{caption}</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Arrow direction="left" clickFunction={() => onArrowClick("left")} />
        <Arrow direction="right" clickFunction={() => onArrowClick("right")} />
      </div>
    </div>
  );
};

export default Modal;
