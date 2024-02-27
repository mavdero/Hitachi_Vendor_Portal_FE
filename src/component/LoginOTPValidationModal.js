import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginOTPValidationModal = ({ modalShow, setModalShow, submitOTP }) => {
  const [otp, setOTP] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(false);

  const handleOTPChange = (e) => {
    const { value } = e.target;
    setOTP(value);
    setIsOTPValid(value.length === 6 && /^\d+$/.test(value));
  };

  const handleModalHide = () => {
    setModalShow(false);
    resetForm();
  };

  const resetForm = () => {
    setOTP("");
    setIsOTPValid(false);
  };

  const handleSubmit = () => {
    submitOTP(otp);
    // handleModalHide();
  };

  return (
    <Modal
      show={modalShow}
      onHide={handleModalHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter 2FA OTP sent to your email to login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="otpField">
            <Form.Label>Enter 2FA OTP:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOTPChange}
              maxLength={6}
              pattern="[0-9]{6}"
              required
              isInvalid={otp.length > 0 && !isOTPValid}
            />
            {otp.length > 0 && !isOTPValid && (
              <Form.Control.Feedback type="invalid">
                Please enter a valid 6-digit OTP.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} disabled={!isOTPValid}>
          Submit OTP
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginOTPValidationModal;
