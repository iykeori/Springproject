import React, { useState } from 'react';
import styles from './styles.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modalCloseBtn} onClick={onClose}>Close</button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
