import React, { useState, useEffect } from 'react'

import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { firebase } from '../firebase/config'


import useFirestore from '../hooks/useFirestore'

import { motion } from 'framer-motion'


const Modal = ({ selectedImage, setSelectedImage, currentAlbum }) => {

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImage(null)
        }
    }
    const [open, setOpen] = useState(false)
    const { docs } = useFirestore(currentAlbum)

    const handleDelete = () => {

        docs.map(doc => {
            if (doc.url === selectedImage) {

                var docRef = firebase.storage().ref().child(currentAlbum + doc.fileName)
                try {
                    docRef.delete().then(async () => {
                        await firebase.firestore().collection(currentAlbum).doc(doc.id).delete()
                    })
                    setOpen(false)
                    setSelectedImage(null)
                } catch (err) {
                    console.log(err.message)
                }
            }
            return null
        })


    }

    // Slider functions

    function Arrow(props) {
        const { direction, clickFunction } = props
        const icon = direction === 'left' ? <ArrowBackIosIcon style={{ fontSize: '5vh', padding: '1vh auto' }} /> : <ArrowForwardIosIcon style={{ fontSize: '5vh' }} />

        return <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.4 }}
            className='arrow-button' onClick={clickFunction}>{icon}</motion.button>
    }

    const [index, setIndex] = useState(0)

    useEffect(() => {
        getIndex()
    }, [docs])


    const getIndex = () => {
        var increment = 0
        docs.map(doc => {
            if (doc.url === selectedImage) {
                setIndex(increment)
            } else {
                increment++
            }
            return null
        })
    }



    const numSlides = docs.length

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1
        const newIndex = (index + increment + numSlides) % numSlides
        setIndex(newIndex)
        setSelectedImage(docs[newIndex].url)
    }


    // SwiperElement


    return (
        <div className='backdrop'
            onClick={handleClick}
        >

            {firebase.auth().currentUser && <Button style={{ display: 'flex', top: 20 ,right: 20, position: 'absolute', color: 'white' }} onClick={() => setOpen(true)}>Delete</Button>}

            <Dialog open={open}>
                <DialogContent>
                    <DialogTitle>Delete current picture</DialogTitle>
                    <DialogContentText>Are you sure you want to delete this picture?</DialogContentText>
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
                whileHover={{ scale: 1.02 }}
                src={selectedImage} alt='enlarged pic' />

            <div style={{ display: 'flex' }}>
                <Arrow
                    direction='left'
                    clickFunction={() => onArrowClick('left')}
                />
                <Arrow
                    direction='right'
                    clickFunction={() => onArrowClick('right')}
                />
            </div>


        </div>
    )
}

export default Modal