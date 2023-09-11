import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastMsg(props) {
  const show = props.show;
  const setShow = props.setShow;
  const msg = props.msg;

  return (
    <Row>
      <ToastContainer position='top-center'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Row>
  );
}

export default ToastMsg;
