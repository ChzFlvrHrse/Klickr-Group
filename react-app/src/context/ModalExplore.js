import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ModalExplore.css';

const ModalContext = React.createContext();

export function ModalExploreProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ModalExplore({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modalExplore">
      <div id="modal-backgroundExplore" onClick={onClose} />
      <div id="modal-contentExplore">
        {children}
      </div>
    </div>,
    modalNode
  );
}
