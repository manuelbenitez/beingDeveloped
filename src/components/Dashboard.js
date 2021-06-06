import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';


import { Grid, Typography, List, ListItem, ListItemText, Button, IconButton, Divider, Input, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Menu, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ListIcon from '@material-ui/icons/List';

import { motion } from 'framer-motion'

import UploadForm from './UploadForm';
import Modal from './Modal'
import ImageGrid from './ImageGrid';

import { firebase } from '../firebase/config'

import logo from '../logo.png'
import About from './About';

const Dashboard = (props) => {



    const [selectedImage, setSelectedImage] = React.useState(null)
    const [albums, setAlbums] = useState([])
    const [newAlbum, setNewAlbum] = useState('')
    const [componentToRender, setComponentToRender] = React.useState('New Zealand')
    const [clickedAlbum, setClickedAlbum] = useState(null)

    const [open, setOpen] = useState(false)

    const getAlbums = async () => {

        try {
            await firebase.firestore().doc('Albums/lista').get().then((doc) => {
                setAlbums(doc.data().AlbumsList.split(','))
            })
        } catch (err) {
            console.log(err.message)
        }

    }

    //Every time albums is updated run this useEffect to get the new albums list
    useEffect(() => {
        getAlbums()
    }, [])

    useEffect(() => {
        setComponentToRender(albums[0])
    }, [albums])

    /**
     * Firebase functions
     */
    const logout = async () => {
        await firebase.auth().signOut()
        props.history.push('/')
    }

    //Set a value and add it to the data base
    const addAlbum = async () => {
        if (newAlbum !== '') {
            try {
                if (albums[0] === undefined) {
                    await firebase.firestore().doc('Albums/lista').update({
                        AlbumsList: newAlbum
                    })
                } else {
                    await firebase.firestore().doc('Albums/lista').update({
                        AlbumsList: albums + ',' + newAlbum
                    })
                }
                getAlbums()
                setNewAlbum('')
            } catch (error) {
                console.log(error.message)
            }
        } else {
            console.log('Please insert a name for the new album')
        }
    }

    //Delete album and refresh the page with useEffect


    const handleDelete = async (albumToDelete) => {

        const newAlbumsList = albums

        for (var i = 0; i < newAlbumsList.length; i++) {
            if (newAlbumsList[i] === albumToDelete) {
                newAlbumsList.splice(i, 1)
                i--
            }
        }
        try {
            await firebase.firestore().collection('Albums').doc('lista').update({
                AlbumsList: newAlbumsList.toString()
            })
            setOpen(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    //Open dialog

    const setDialogOpen = (album) => {
        setOpen(true)
        setClickedAlbum(album)
    }


    //Dropdown Menu 

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAlbumClick = (album) => {
        setComponentToRender(album)
        handleClose()
    }

    return (
        <Fragment>

            <div className='mobile-grid'>
                <div className='mobile-grid-btn'>
                    <button className='dropdown-button' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}><ListIcon style={{fontSize: '7vh'}} /></button>
                    <Menu className='dropdown-menu'
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {albums.map((album) => (
                            <MenuItem key={album} button onClick={() => handleAlbumClick(album)} style={{background: '#f7f5ec'}} dense>
                                {album}
                            </MenuItem>
                        ))}
                        <MenuItem button onClick={() => setComponentToRender('About')} style={{background: '#f7f5ec'}}>About</MenuItem>
                    </Menu>
                </div>

                <div className='mobile-grid-logo'>
                    <motion.img src={logo} alt='asd' className='logo-mobile'

                        initial={{ scale: 0, y: 600 }}
                        animate={{ scale: 1, y: 0 }}

                    ></motion.img>
                </div>
            </div>

            <Grid container direciton='row' className='grid'>


                <Grid item xs={2} className='drawer-grid'>

                    <div className='drawer'>

                        <motion.img src={logo} alt='asd' className='logo'

                            initial={{ scale: 0, y: 600 }}
                            animate={{ scale: 1, y: 0 }}

                        ></motion.img>

                        <Divider style={{ width: '80%', marginLeft: '10%' }} />

                        <List>

                            {firebase.auth().currentUser && <Fragment><Button style={{ fontSize: '1.5vh', overflow: 'auto' }} onClick={() => logout()}>Logout</Button></Fragment>}
                            {albums.map((album) => (
                                <Fragment key={album}>
                                    <ListItem
                                        key={album}
                                        button
                                        onClick={() => setComponentToRender(album)}
                                    >
                                        <motion.a className='album-span'
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 10
                                            }}
                                        >{album}</motion.a>
                                    </ListItem>
                                    {firebase.auth().currentUser && <IconButton onClick={() => setDialogOpen(album)}><DeleteOutlineIcon /></IconButton>}
                                </Fragment>
                            ))}

                            <Dialog open={open}>
                                <DialogContent>
                                    <DialogTitle>You are about to delete '{clickedAlbum}'</DialogTitle>
                                    <DialogContentText>Are you sure you want to delete this album?</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => handleDelete(clickedAlbum)}>Yes</Button>
                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                </DialogActions>
                            </Dialog>

                            <br />

                            {firebase.auth().currentUser && <Fragment><Input value={newAlbum} onChange={e => setNewAlbum(e.target.value)}></Input><IconButton onClick={() => addAlbum()}><AddIcon /></IconButton></Fragment>}

                            <Divider style={{ width: '80%', marginLeft: '10%', marginBottom: '1vh' }} />

                            <ListItem button onClick={() => setComponentToRender('About')}>
                                <ListItemText>
                                    <Typography style={{ fontSize: '1.5vh', overflow: 'hidden', fontFamily: 'Cairo', fontWeight: '600', marginTop: '1vh' }}>About</Typography>
                                </ListItemText>
                            </ListItem>

                        </List>

                    </div>

                </Grid>

                <Grid item xs={9} className='component-grid'>

                    <div>

                        {componentToRender === 'About' ? <About /> : <Fragment> {firebase.auth().currentUser && <UploadForm folder={componentToRender + '/'} />} <ImageGrid folder={componentToRender + '/'} setSelectedImage={setSelectedImage} /> {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} currentAlbum={componentToRender + '/'} />} </Fragment>}

                    </div>

                </Grid>

            </Grid>
        </Fragment>
    )
}

export default Dashboard
