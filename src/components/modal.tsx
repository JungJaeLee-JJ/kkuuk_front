import React,{useState,useContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { SellerContext } from '../context/seller';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  export default function CustomModal(){
      const {sellerModal,setSellerModal} = useContext<ISellerContext>(SellerContext);
      function closeModal() {
        setSellerModal({
          onoff : false,
          msg : ""
        });
      }
      return (
        <div>
          <Modal
            isOpen={sellerModal?.onoff}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>{`${sellerModal?.msg}`}</div>
            <button onClick={closeModal}>close</button>
          </Modal>
        </div>
      );
  }