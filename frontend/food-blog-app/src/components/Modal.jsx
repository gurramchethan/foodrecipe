import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

export default function Modal({ children, onClose }) {
  return (
    <BootstrapModal show={true} onHide={onClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Login</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
}
