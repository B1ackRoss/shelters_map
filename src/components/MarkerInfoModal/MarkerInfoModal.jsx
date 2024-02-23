import React from "react"
import Modal from 'react-modal'
import s from './MarkerInfoModal.module.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '25px',
    paddingTop: '0px',
    paddingBottom: '0px'
    
  },
  overlay: {
    backgroundColor: 'rgba(197, 214, 240, 0.8)', 
    zIndex: 1000,
  },
};
const MarkerModalInfo = ({ isOpen, closeModal,  markerInfo }) => {
  let subtitle;

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f10';
  };


    return (<div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      ><div className={s.img_close_container}>
        <button className={s.clear_btn} onClick={closeModal}>
        <img className={s.close_modal_img}  src="/close.svg" width={30} height={30} alt="" />
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Опис укриття</h2>
      </div>
        
        {markerInfo && (
          <div>
            <p>Ідентифікатор</p>
            <p>{markerInfo.properties['str:0L3QsNC30LLQsNC90LjQtQ=='].length > 6 ? 'Найпростіше укриття' : markerInfo.properties['str:0L3QsNC30LLQsNC90LjQtQ=='] }</p>
            <p>{markerInfo.properties['str:0L7Qv9C40YHQsNC90LjQtQ==']}</p>
          </div>
        )}
      </Modal>
    </div>)
        
    

   
}
export default MarkerModalInfo