import React from "react";
import { Link } from "react-router-dom";
import styles from ".././error.module.css"

function Error() {
  return (
    <div className={styles.error_body}>
      <h1 className={styles.error_h1}>404</h1>
      <p className={styles.error_p}>Oops! The page you're looking for can't be found.</p>
      <Link className={styles.error_a} to="/">Go back home</Link>
    </div>
  );
}

export default Error;
