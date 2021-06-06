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
        const icon = direction === 'left' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />

        return <button className='arrow-button' onClick={clickFunction}>{icon}</button>
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

    return (
        <div className='backdrop'
            onClick={handleClick}
        >

            {firebase.auth().currentUser && <Button style={{ display: 'flex', marginLeft: '48%', color: 'white' }} onClick={() => setOpen(true)}>Delete</Button>}

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
                src={selectedImage} alt='enlarged pic' />
            <Arrow
                direction='left'
                clickFunction={() => onArrowClick('left')}
            />
            <Arrow
                direction='right'
                clickFunction={() => onArrowClick('right')}
            />

        </div>
    )
}

export default Modal