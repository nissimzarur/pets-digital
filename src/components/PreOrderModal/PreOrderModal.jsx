import React,{useRef} from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import "./PreOrderModal.css";

import { connect } from "react-redux";


function PreOrderModal({order, showModal, showModalHandler}) {
	const clientName = useRef(null);

	const orderButtonHandler = ()=>{
		console.log(clientName.current.value);
		showModalHandler();
	}

	return(
	<>
	<Modal show={showModal} onHide={showModalHandler}>
	<Modal.Header className="modal-title">
        <Modal.Title>רגע לפני שמתחדשים...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
	  <FormControl
            aria-label="client_name"
            placeholder="שם המזמין..."
			ref={clientName}
			className="text-input"
			type="text"
          />
	  </Modal.Body>
	  <Modal.Footer className="modal-buttons">
        <Button variant="secondary" onClick={showModalHandler}>
          סגור
        </Button>
        <Button variant="primary" onClick={orderButtonHandler}>
          הזמן
        </Button>
      </Modal.Footer>
	</Modal>
	</>);
}

const mapStateToProps = (state) => {
	const { orderReducer } = state.OrderReducer;
	const order = orderReducer;
  
	return { order };
  };

export default connect(mapStateToProps)(PreOrderModal);