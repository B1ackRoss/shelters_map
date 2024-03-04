import React from "react"
import Modal from 'react-modal'
import s from './NearestShelterModal.module.css'
import { ModalContext } from "../../App";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '25px',
      paddingTop: '0px',
      paddingBottom: '0px',
      width: '80%', /* Ширина вікна */
      maxWidth: '400px', /* Максимальна ширина вікна */
      marginLeft: 'auto', /* Відступ зліва */
      marginRight: 'auto', /* Відступ справа */
      
    },
    overlay: {
      backgroundColor: 'rgba(197, 214, 240, 0.8)', 
      zIndex: 1000,
    },
  };

const NearestShelterModal = ({isOpen, nearestShelter }) => {
    const { closeNearModal } = React.useContext(ModalContext);
    let subtitle;

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f10';
  };

    return (<div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeNearModal}
        style={customStyles}
        contentLabel="Example Modal"
      ><div className={s.img_close_container}>
        <button className={s.clear_btn} onClick={closeNearModal}>
        <img className={s.close_modal_img}  src="/close.svg" width={30} height={30} alt="" />
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Опис укриття</h2>
        <span>Найближче укриття знаходиться за адресою:</span>
        <p>{nearestShelter && <b>{nearestShelter.properties["str:0L7Qv9C40YHQsNC90LjQtQ=="]}</b>}</p>
      </div>
        
 
      </Modal>
    </div>)
}

export default NearestShelterModal;