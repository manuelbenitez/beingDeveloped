import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({ file, setFile, folder, caption }) => {
  const { url } = useStorage(file, folder, caption);

  useEffect(() => {
    if (file.name !== null) {
      if (url) {
        setFile(null);
      }
    }
    return () => {
      setFile(null);
    };
  }, [url, setFile, file.name]);

  return <CircularProgress />;
};

export default ProgressBar;
