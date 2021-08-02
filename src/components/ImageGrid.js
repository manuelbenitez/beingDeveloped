import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { motion } from 'framer-motion'



const ImageGrid = ({ folder, setSelectedImage }) => {

    const { docs } = useFirestore(folder)

    const imgWrap = {
        hidden: { y: 600, x: 500, opacity: 0},
        visible: {
            x: 0,
            y: 0,
            opacity: 0.8,
        },
    }

    return (
        <motion.div className='img-grid'
        >
            {docs && docs.map(doc => (
                <motion.div className='img-wrap' key={doc.id}
                    layout
                    whileHover={{ opacity: 1 , delay: 3}}
                    initial='hidden'
                    animate='visible'
                    variants={imgWrap}
                    onClick={() => { setSelectedImage(doc.url) }}
                >
                    <motion.img src={doc.url} alt={doc.id}
                        className='img'
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}

export default ImageGrid