import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Progress,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  deleteExperience,
  getExperienceDetails,
  getExperiences,
  updateExperience,
} from "../../JS/actions/index";
import Loader from "../layout/Loader";
import SideBar from "../layout/SideBar";

const SecondStep = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const isLoading = useSelector((state) => state.experiencesReducers.isLoading);
  const experience = useSelector(
    (state) => state.experiencesReducers.experience
  );

  const addTheme = (e) => {
    if (e.target.checked) {
      setTheme([...new Set([...theme, e.target.name])]);
    } else {
      const arr = theme.filter((t) => t !== e.target.name);
      setTheme(arr);
    }
  };
  const [defaultThemes, setDefaultThemes] = useState([
    "Nature",
    "Bien-etre",
    "Art et culture",
    "Sport",
    "Cuisine",
    "Etude",
    "Animaux",
    "Autres",
  ]);
  const [title, setTitle] = useState(" ");
  const [theme, setTheme] = useState([]);
  const [activity, setActivity] = useState(" ");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (experience) {
      if (experience.themes) {
        setTheme(experience.themes);
        setActivity(experience.activity);
        setPrice(experience.price);
      }
      if (experience.title) {
        setTitle(experience.title);
      }
    }
  }, [experience]);

  return isLoading ? (
    <Loader />
  ) : experience ? (
    <>
      <SideBar />
      <div className="main-content">
        <Container fluid>
          {/* Progress bar */}
          <div className="text-center">2 de 4</div>
          <Progress multi style={{ height: "21px" }}>
            <Progress bar value="20">
              40%
            </Progress>
          </Progress>
          {/* main  */}
          <Col lg="10" md="12">
            <div
              className="header-body border"
              style={{ padding: "2%", margin: "1%" }}
            >
              {/* end button exit */}

              {experience.type &&
              experience.title &&
              experience.startHour &&
              experience.program ? (
                <Link
                  to="/experiences"
                  style={{ float: "right" }}
                  className=" btn btn-sm"
                  onClick={() => {
                    dispatch(
                      updateExperience(id, {
                        ...experience,
                        title: title,
                        themes: [...theme],
                        activity: activity,
                        price: price,
                      })
                    );
                  }}
                >
                  Enregistrer et quitter
                </Link>
              ) : (
                <Button
                  onClick={toggle}
                  style={{
                    padding: "0.5% 0.5% 0%",
                    float: "right",
                  }}
                >
                  <i className="ni ni-fat-remove" />
                </Button>
              )}

              {/* end button exit */}
              {/* Modal */}
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  Abandonner la création ?
                </ModalHeader>
                <ModalBody>
                  Si vous abandonner la création, vous perderz toutes les
                  informations saisies.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                    Continuer
                  </Button>
                  <Link
                    className="btn"
                    to={"/experiences"}
                    color="secondary"
                    onClick={() => {
                      dispatch(deleteExperience(experience._id));
                      toggle();
                      dispatch(getExperiences());
                    }}
                  >
                    Abandonner
                  </Link>
                </ModalFooter>
              </Modal>
              {/* endModal */}
              {/* step title  */}
              <Col lg="6" md="10">
                <h2 style={{ color: "#32325d" }}>
                  <i className="ni ni-collection" style={{ padding: "2%" }} />{" "}
                  Les informations de base
                </h2>
              </Col>
              {/* end step title */}
              {/* card */}
              <Card className=" shadow border-0">
                {/* experience type */}
                <CardHeader className="bg-transparent">
                  {experience.type.title === "en ligne" ? (
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="ni ni-laptop" />
                    </div>
                  ) : (
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-users" />
                    </div>
                  )}

                  <span> Expérience {experience.type.title} </span>
                </CardHeader>
                {/* end experience type */}
                {/* form */}
                <CardBody className="px-lg-5 py-lg-5">
                  {/* title */}
                  <FormGroup className="mb-3 border" style={{ padding: "2%" }}>
                    <div>
                      <small className="font-weight-bold">
                        Donnez un titre à votre expérience
                      </small>
                    </div>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-caps-small" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => setTitle(e.target.value)}
                        defaultValue={experience ? experience.title : title}
                        placeholder="Titre"
                        type="string"
                        autoComplete="new-password"
                        name="titre"
                        // invalid={errors["titre"]}
                        // innerRef={register({
                        //   required: "Le titre est obligatoire.",
                        // })
                        // }
                      />
                    </InputGroup>
                    <span className="mr-2 text-sm" style={{ color: "#2dce89" }}>
                      <i className="ni ni-bulb-61" />
                      Le titre de l'expérience doit etre court et attirant
                    </span>
                    <br />
                    {/* {errors.titre && (
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#dd3a4a" }}
                      >
                        {errors.titre.message}
                      </span>
                    )} */}
                  </FormGroup>
                  {/* end title */}
                  {/* themes */}
                  <FormGroup className="mb-3 border" style={{ padding: "2%" }}>
                    <div>
                      <small className="font-weight-bold">
                        Choisissez le thème qui décrit le mieux l'activité
                        principale de votre expérience
                      </small>
                    </div>
                    <Row className="icon-examples">
                      {defaultThemes.map((theme) => (
                        <Col lg="6" md="6">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            {experience.themes == null ? (
                              <input
                                className="custom-control-input"
                                id={`custom+${theme}`}
                                type="checkbox"
                                name={theme}
                                onChange={(e) => {
                                  addTheme(e);
                                }}
                              />
                            ) : (
                              <input
                                defaultChecked={experience.themes.includes(
                                  theme
                                )}
                                className="custom-control-input"
                                id={`custom+${theme}`}
                                type="checkbox"
                                name={theme}
                                onChange={(e) => {
                                  addTheme(e);
                                }}
                              />
                            )}

                            <label
                              className="custom-control-label"
                              htmlFor={`custom+${theme}`}
                            >
                              <span className="text-muted">{theme} </span>
                            </label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <span className="mr-2 text-sm" style={{ color: "#2dce89" }}>
                      <i className="ni ni-bulb-61" />
                      Les expériences les plus uniques ont plusieurs thèmes
                    </span>
                  </FormGroup>
                  {/* end themes */}
                  {/* activite */}
                  <FormGroup className="mb-3 border" style={{ padding: "2%" }}>
                    <div>
                      <small className="font-weight-bold">
                        Donnez l'activité principale de votre expérience
                      </small>
                    </div>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-air-baloon" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => setActivity(e.target.value)}
                        placeholder="L'activité de l'expérience"
                        type="string"
                        autoComplete="new-password"
                        name="activity"
                        defaultValue={
                          experience ? experience.activity : activity
                        }
                        // invalid={errors["activity"]}
                        // innerRef={register({
                        //   required: "L'activité est obligatoire.",
                        // })}
                      />
                    </InputGroup>
                    <span className="mr-2 text-sm" style={{ color: "#2dce89" }}>
                      <i className="ni ni-bulb-61" />
                      Une activité réussie a un role de transmission de savoir,
                      divertissement ou initiation à une discipline
                    </span>
                    <br />
                    {/* {errors.activity && (
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#dd3a4a" }}
                      >
                        {errors.activity.message}
                      </span>
                    )} */}
                  </FormGroup>
                  {/* end activite */}
                  {/* price */}
                  <FormGroup className="mb-3 border" style={{ padding: "2%" }}>
                    <div>
                      <small className="font-weight-bold">
                        Fixez un prix à votre expérience
                      </small>
                    </div>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-wallet" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Le prix de l'expérience"
                        type="number"
                        autoComplete="new-password"
                        name="price"
                        min="5"
                        max="1000"
                        defaultValue={experience ? experience.price : " "}

                        // invalid={errors["price"]}
                        // innerRef={register({
                        //   required: "Le prix est obligatoire.",
                        // })}
                      />
                    </InputGroup>
                    <span className="mr-2 text-sm" style={{ color: "#2dce89" }}>
                      <i className="ni ni-bulb-61" />
                      Un conseil sur le prix
                    </span>
                    <br />
                    {/* {errors.price && (
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#dd3a4a" }}
                      >
                        {errors.price.message}
                      </span>
                    )} */}
                  </FormGroup>
                  {/* end price */}
                </CardBody>
              </Card>
              {/* endCard */}
              <Link
                to={`/first/${experience._id}`}
                className="btn"
                style={{ color: "#5e72e4", backgroundColor: "#fff" }}
              >
                Précédent
              </Link>
              {experience &&
              title !== " " &&
              theme !== [] &&
              activity !== " " &&
              price !== " " ? (
                <Link
                  to={`/third/${experience._id}`}
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(
                      updateExperience(id, {
                        ...experience,
                        title: title,
                        themes: [...theme],
                        activity: activity,
                        price: price,
                      })
                    );
                  }}
                >
                  Suivant
                </Link>
              ) : (
                <Button className="btn-primary" color="primary" disabled>
                  Suivant
                </Button>
              )}
            </div>
          </Col>
        </Container>
      </div>
    </>
  ) : (
    <p></p>
  );
};

export default SecondStep;
