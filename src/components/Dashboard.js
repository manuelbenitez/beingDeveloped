import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { motion } from "framer-motion";

import {
  Box,
  Button,
  IconButton,
  Divider,
  Input,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { firebase } from "../firebase/config";

import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import logo from "../logo.png";
import About from "./About";

const makeDashboardStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    background: "inherit",
  },
  dropdownButton: {
    alignItems: 'center',
    justifyContent: 'center',
    border: "none",
    background: "none",
    color: "rgba(0, 0, 0, 0.651)",
  },
  logo: {
    width: "10%",
    height: "10%",
    marginRight: `${theme.spacing(5.2)}vw`,
    flexShrink: 1,
    margin: theme.spacing(1),
  },
  loggedInComponents: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  imagesContainer: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageCaption, setSelectedImageCaption] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState("");
  const [componentToRender, setComponentToRender] =
    React.useState("New Zealand");
  const [clickedAlbum, setClickedAlbum] = useState(null);
  const [open, setOpen] = useState(false);
  const styles = makeDashboardStyles();

  const getAlbums = async () => {
    try {
      await firebase
        .firestore()
        .doc("Albums/lista")
        .get()
        .then((doc) => {
          setAlbums(doc.data().AlbumsList.split(","));
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  //Every time albums is updated run this useEffect to get the new albums list
  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    setComponentToRender(albums[0]);
  }, [albums]);

  /**
   * Firebase functions
   */
  const logout = async () => {
    await firebase.auth().signOut();
    props.history.push("/");
  };

  //Set a value and add it to the data base
  const addAlbum = async () => {
    if (newAlbum !== "") {
      try {
        if (albums[0] === undefined) {
          await firebase.firestore().doc("Albums/lista").update({
            AlbumsList: newAlbum,
          });
        } else {
          await firebase
            .firestore()
            .doc("Albums/lista")
            .update({
              AlbumsList: albums + "," + newAlbum,
            });
        }
        getAlbums();
        setNewAlbum("");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Please insert a name for the new album");
    }
  };

  //Delete album and refresh the page with useEffect

  const handleDelete = async (albumToDelete) => {
    const newAlbumsList = albums;

    for (var i = 0; i < newAlbumsList.length; i++) {
      if (newAlbumsList[i] === albumToDelete) {
        newAlbumsList.splice(i, 1);
        i--;
      }
    }
    try {
      await firebase.firestore().collection("Albums").doc("lista").update({
        AlbumsList: newAlbumsList.toString(),
      });
      setOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Open dialog

  const setDialogOpen = (album) => {
    setOpen(true);
    setClickedAlbum(album);
  };

  //Dropdown Menu

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlbumClick = (album) => {
    setComponentToRender(album);
    handleClose();
  };

  return (
    <Box className={styles.root}>
      <div className={styles.navbar}>
        <motion.img
          src={logo}
          alt=""
          className={styles.logo}
          initial={{ scale: 0, y: 600 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
        ></motion.img>

        <Box>
          <motion.button
            className={styles.dropdownButton}
            whileTap={{ scale: 1.4 }}
            onClick={handleClick}
          >
            <ListIcon />
          </motion.button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          style={{
            padding: "1vh",
            background: "rgba(0, 0, 0, 0.712)",
            display: "flex",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {albums.map((album) => (
            <>
              <MenuItem
                key={album}
                button
                onClick={() => handleAlbumClick(album)}
                style={{
                  background: "inherit",
                  margin: "0.2em",
                  borderRadius: "50px",
                  color: "rgba(51, 0, 51, 0.726)",
                }}
              >
                {album}
              </MenuItem>
              <MenuItem>
                {firebase.auth().currentUser && (
                  <IconButton onClick={() => setDialogOpen(album)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </MenuItem>
            </>
          ))}
          <Divider></Divider>
          <MenuItem
            button
            onClick={() => setComponentToRender("About")}
            style={{
              background: "inherit",
              margin: "0.2em",
              borderRadius: "50px",
              color: "rgba(51, 0, 51, 0.726)",
            }}
          >
            About
          </MenuItem>
        </Menu>

        <Dialog open={open}>
          <DialogContent>
            <DialogTitle>You are about to delete '{clickedAlbum}'</DialogTitle>
            <DialogContentText>
              Are you sure you want to delete this album?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDelete(clickedAlbum)}>Yes</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <br />
      </div>
      <Box className={styles.loggedInComponents}>
        {/* Logout Button */}
        {firebase.auth().currentUser && (
          <Fragment>
            <Button
              style={{ fontSize: "1.5vh", overflow: "auto" }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Fragment>
        )}
        {firebase.auth().currentUser && (
          <Box>
            <Input
              value={newAlbum}
              onChange={(e) => setNewAlbum(e.target.value)}
              placeholder="Add Ablums"
            ></Input>
            <IconButton onClick={() => addAlbum()}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
        {firebase.auth().currentUser && (
          <UploadForm folder={componentToRender + "/"} />
        )}
      </Box>
      <Box className={styles.imagesContainer}>
        {componentToRender === "About" ? (
          <About />
        ) : (
          <Fragment>
            <ImageGrid
              folder={componentToRender + "/"}
              setSelectedImageCaption={setSelectedImageCaption}
              setSelectedImage={setSelectedImage}
            />
            {selectedImage && (
              <Modal
                caption={selectedImageCaption}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                currentAlbum={componentToRender + "/"}
              />
            )}
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;