import React from "react";
import styles from "./Loader.module.scss";

const Loader = ({ isLoading, message = "Loading..." }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loader;
