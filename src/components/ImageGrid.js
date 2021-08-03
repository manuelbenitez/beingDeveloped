import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

import { makeStyles } from "@material-ui/styles";

const makeGridStyles = makeStyles((theme) => ({
  imgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gridGap: '30px',
    marginTop: '2vh',
    marginBottom: '2vh',
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: 50,
    }
  },
  imgWrap: {
    overflow: 'hidden',
    height: 0,
    padding: '50% 50%',
    position: 'relative',
    opacity: '0.8',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down("sm")]: {
        marginLeft: '2em',
    }
  },
  img: {
    minWidth: '100%',
    minHeight: '100%',
    maxWidth: '150%',
    position: 'absolute',
    top: 0,
    left: 0,
  }
      
}));


const ImageGrid = ({ folder, setSelectedImage, setSelectedImageCaption }) => {
  const styles = makeGridStyles();
  const { docs } = useFirestore(folder);

  const imgWrap = {
    hidden: { y: 600, x: 500, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 0.8,
    },
  };

  return (
    <motion.div className={styles.imgGrid}>
      {docs &&
        docs.map((doc) => (
          <motion.div
            className={styles.imgWrap}
            key={doc.id}
            layout
            whileHover={{ opacity: 1, delay: 3 }}
            initial="hidden"
            animate="visible"
            variants={imgWrap}
            onClick={() => {
              setSelectedImage(doc.url);
              setSelectedImageCaption(doc.caption);
            }}
          >
            <motion.img src={doc.url} alt={doc.id} className={styles.img}/>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default ImageGrid;
