import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { motion } from 'framer-motion'



const ImageGrid = ({ folder, setSelectedImage }) => {

    const { docs } = useFirestore(folder)

    const img = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
        }
    };

    const imgWrap = {
        hidden: { y: 600, opacity: 0},
        visible: {
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
                    whileHover={{ opacity: 1, delay: 0.1 }}
                    initial='hidden'
                    animate='visible'
                    variants={imgWrap}
                    transition={{ delay: 0.2 }}
                    onClick={() => { setSelectedImage(doc.url) }}
                >
                    <motion.img src={doc.url} alt={doc.id}
                        initial='hidden'
                        animate='visible'
                        transition={{ delay: 0.2 }}
                        className='img'
                        variants={img}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}

export default ImageGrid