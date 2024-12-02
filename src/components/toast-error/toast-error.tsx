import React from 'react';
import { IonToast } from '@ionic/react';

const ToastError: React.FC<ToastErrorProps> = ({ isOpen, message, onClose }) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={onClose}
      message={message}
      duration={3000}
      color="danger"
      position="middle"
    />
  );
};

export default ToastError;