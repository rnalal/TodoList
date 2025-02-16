import React from 'react';
import styles from '../styles/Icon.module.css';

const Icon = () => {
  return (
    <div className={styles.header}>
      <a href="/">
          <img src="/images/large_logo.png" alt="아이콘" width={151} height={40}
          style={{ position: 'absolute',  top: '20px', left: '20px' }} />
      </a>
    </div>
  );
};

export default Icon;
