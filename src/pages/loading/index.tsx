import React from 'react';
import styles from './loading.module.css'; // Import your CSS module

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <h1 className={styles.title}>MGA Market</h1>
        <div className={styles.loader}></div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;