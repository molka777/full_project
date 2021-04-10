import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { deleteExperience, getExperiences } from "../../JS/actions/index";
const CreatedExperienceAd = ({ experience }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Supprimer l'expérience?</ModalHeader>
        <ModalBody>Etes vous sur de supprimer l'expérience?</ModalBody>
        <ModalFooter>
          <Link
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteExperience(experience._id));
              toggle();
              dispatch(getExperiences());
            }}
            to={`/admin`}
          >
            Supprimer
          </Link>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
      {/* endModal */}
      {experience.isCreated === true ? (
        <tr>
          <th scope="row">{experience._id}</th>
          <td>{experience.createdAt.substr(0, 10)} </td>

          <td>{experience.title} </td>
          <td>{experience.type.title}</td>
          <td>{experience.activity}</td>
          <td>
            <Link style={{ margin: "10%" }} to={`experience/${experience._id}`}>
              <i className="far fa-eye"></i>
            </Link>

            <Link style={{ margin: "10%" }} to={`/first/${experience._id}`}>
              <i className="far fa-edit"></i>
            </Link>

            <Link onClick={toggle} style={{ margin: "10%" }} to={`admin`}>
              <i className="far fa-trash-alt"></i>{" "}
            </Link>
          </td>
        </tr>
      ) : (
        <> </>
      )}
    </>
  );
};

export default CreatedExperienceAd;
