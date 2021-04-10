import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExperiences } from "../../JS/actions/index";
import Loader from "../layout/Loader";
import ExperienceModel from "./ExperienceModel";
import { Container, Col, Row, Button } from "reactstrap";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";
const ExperiencesList = () => {
  const dispatch = useDispatch();
  const experiences = useSelector(
    (state) => state.experiencesReducers.experiences
  );

  const isLoading = useSelector((state) => state.experiencesReducers.isLoading);
  const error = useSelector((state) => state.experiences);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch(getExperiences());
  }, [dispatch, error]);

  return isLoading ? (
    <Loader />
  ) : experiences ? (
    <>
      <Menu />
      <Container fluid>
        <div className="main-content" style={{ margin: "1%" }}>
          <Col lg="12" md="10">
            <Row>
              <Col>
                <h2 style={{ color: "#32325d" }}>Vos expériences</h2>
              </Col>
              <Col>
                <Link
                  className="btn btn-info"
                  to="/first"
                  style={{ float: "right" }}
                >
                  {" "}
                  Créer une expérience
                </Link>
              </Col>
            </Row>
          </Col>
          <Col lg="5" md="10">
            <Row className="icon-examples">
              <Col>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="created"
                    type="checkbox"
                    name="créées"
                  />
                  <label className="custom-control-label" htmlFor="created">
                    <small>créées</small>{" "}
                  </label>
                </div>
              </Col>
              <Col>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="BeingValidated"
                    type="checkbox"
                    name="en cours"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="BeingValidated"
                  >
                    <small>en cours</small>{" "}
                  </label>
                </div>
              </Col>
              <Col>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="accepted"
                    type="checkbox"
                    name="acceptée"
                  />
                  <label className="custom-control-label" htmlFor="accepted">
                    <small>acceptée</small>{" "}
                  </label>
                </div>
              </Col>
              <Col>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="refused"
                    type="checkbox"
                    name="refusée"
                  />
                  <label className="custom-control-label" htmlFor="refused">
                    <small>refusée</small>{" "}
                  </label>
                </div>
              </Col>
            </Row>
          </Col>
          <div
            className="header-body border"
            style={{ padding: "2%", margin: "1%" }}
          >
            <div style={{ backgroundColor: "#f8f9fe" }}>
              {experiences &&
                experiences.map((experience) => (
                  <ExperienceModel
                    key={experience._id}
                    experience={experience}
                  />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  ) : (
    <h1>fail</h1>
  );
};

export default ExperiencesList;
