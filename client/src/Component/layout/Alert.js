import React, { useState } from "react";
import { Alert } from "reactstrap";

const Alert = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      Votre expérience a été envoyé.
    </Alert>
  );
};

export default Alert;
