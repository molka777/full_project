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
  Label,
  Progress,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import SideBar from "../layout/SideBar";
import Loader from "../layout/Loader";
import {
  deleteExperience,
  getExperienceDetails,
  getExperiences,
  updateExperience,
} from "../../JS/actions/index";

const ThirdStep = ({
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

  const [target, setTarget] = useState([]);
  const [difficulty, setDifficulty] = useState(" ");
  const [language, setLanguage] = useState("Arabe");
  const [phobia, setPhobia] = useState([]);
  const [limitParticipants, setLimitParticipants] = useState(0);
  const [defaultTarget, setDefaultTarget] = useState(["enfant", "adulte"]);
  const [defaultPhobia, setDefaultPhobia] = useState([
    "claustrophobie",
    "Agoraphobie",
    "Acrophobie",
  ]);
  const [defaultDifficulty, setDefaultDifficulty] = useState([
    "Léger",
    "Modéré",
    "Intense",
    "Extreme",
  ]);
  const addPhobia = (e) => {
    if (e.target.checked) {
      setPhobia([...new Set([...phobia, e.target.name])]);
    } else {
      const arr = phobia.filter((p) => p !== e.target.name);
      setPhobia(arr);
    }
  };
  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (experience) {
      if (experience.target) {
        setTarget(experience.target);
        setDifficulty(experience.difficulty);
        setPhobia(experience.phobia);
        setLimitParticipants(experience.limitParticipants);
        setLanguage(experience.language);
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
          {/* progress */}
          <div className="text-center">3 de 4</div>
          <Progress multi style={{ height: "21px" }}>
            <Progress bar value="30">
              60%
            </Progress>
          </Progress>
          {/* end progress */}
          <Col lg="10" md="12">
            {/* form */}
            <Form>
              <div
                className="header-body border"
                style={{ padding: "2%", margin: "1%" }}
              >
                {/* exit button */}

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
                          target: target,
                          difficulty: difficulty,
                          limitParticipants: limitParticipants,
                          language: language,
                          phobia: phobia,
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
                {/* modal exit */}
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
                    </Button>{" "}
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
                {/* step title */}
                <Col lg="6" md="10">
                  <h2 style={{ color: "#32325d" }}>
                    <i
                      className="fas fa-street-view"
                      style={{ padding: "2%" }}
                    />{" "}
                    La cible de l'expérience
                  </h2>
                </Col>
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
                  <CardBody className="px-lg-5 py-lg-5">
                    {/* target part */}
                    <FormGroup
                      className="mb-3 border"
                      style={{ padding: "2%" }}
                    >
                      <div>
                        <small className="font-weight-bold">
                          Qui peut participer à votre expérience ?
                        </small>
                      </div>
                      <Row className="icon-examples">
                        {defaultTarget.map((tar) => (
                          <Col lg="6" md="6">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              {experience.target == null ? (
                                <input
                                  className="custom-control-input"
                                  id={tar}
                                  type="checkbox"
                                  name={tar}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setTarget([
                                        ...new Set([...target, e.target.name]),
                                      ]);
                                    } else {
                                      const arr = target.filter(
                                        (t) => t !== e.target.name
                                      );
                                      setTarget(arr);
                                    }
                                  }}
                                />
                              ) : (
                                <input
                                  className="custom-control-input"
                                  id={tar}
                                  type="checkbox"
                                  name={tar}
                                  defaultChecked={experience.target.includes(
                                    tar
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setTarget([
                                        ...new Set([...target, e.target.name]),
                                      ]);
                                    } else {
                                      const arr = target.filter(
                                        (t) => t !== e.target.name
                                      );
                                      setTarget(arr);
                                    }
                                  }}
                                />
                              )}
                              <label
                                className="custom-control-label"
                                htmlFor={tar}
                              >
                                <span className="text-muted">{tar}</span>
                              </label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#2dce89" }}
                      >
                        <i className="ni ni-bulb-61" />
                        Les enfants doivent etre accompagnés par leur tuteur
                        légal
                      </span>
                    </FormGroup>
                    {/* difficulty part */}
                    <FormGroup
                      className="mb-3 border"
                      style={{ padding: "2%" }}
                    >
                      <div>
                        <small className="font-weight-bold">
                          Quel niveau de difficulté les participants doivent-ils
                          attendre de l'activité ?
                        </small>
                      </div>
                      <Row className="icon-examples">
                        {defaultDifficulty.map((diff) => (
                          <Col lg="3" md="6">
                            <FormGroup check>
                              <Label check>
                                {experience.difficulty == null ? (
                                  <Input
                                    type="radio"
                                    name="radio2"
                                    onChange={(e) => {
                                      if (e.target.checked) setDifficulty(diff);
                                    }}
                                  />
                                ) : (
                                  <Input
                                    defaultChecked={
                                      experience.difficulty === diff
                                    }
                                    type="radio"
                                    name="radio2"
                                    onChange={(e) => {
                                      if (e.target.checked) setDifficulty(diff);
                                    }}
                                  />
                                )}

                                <span className="mr-2 text-sm">{diff}</span>
                              </Label>
                            </FormGroup>
                          </Col>
                        ))}
                      </Row>
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#2dce89" }}
                      >
                        <i className="ni ni-bulb-61" />
                        Les enfants doivent etre accompagnés par le tuteur légal
                      </span>
                    </FormGroup>
                    {/* phobia part */}
                    <FormGroup
                      className="mb-3 border"
                      style={{ padding: "2%" }}
                    >
                      <div>
                        <small className="font-weight-bold">
                          Est ce que votre expérience n'est pas recommandée aux
                          personnes qui présentent une de ses phobies ? Si oui
                          précisez-les.
                        </small>
                      </div>
                      <Row className="icon-examples">
                        {defaultPhobia.map((ph) => (
                          <Col lg="6" md="6">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              {experience.phobia == null ? (
                                <input
                                  className="custom-control-input"
                                  id={ph}
                                  type="checkbox"
                                  name={ph}
                                  onChange={(e) => {
                                    addPhobia(e);
                                  }}
                                />
                              ) : (
                                <input
                                  defaultChecked={experience.phobia.includes(
                                    ph
                                  )}
                                  className="custom-control-input"
                                  id={ph}
                                  type="checkbox"
                                  name={ph}
                                  onChange={(e) => {
                                    addPhobia(e);
                                  }}
                                />
                              )}

                              <label
                                className="custom-control-label"
                                htmlFor={ph}
                              >
                                <span className="text-muted">{ph}</span>
                              </label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <small className="mr-2 " style={{ color: "grey" }}>
                        <i
                          className="fas fa-info-circle"
                          style={{ paddingRight: "1%" }}
                        />
                        Cette partie est facultative{" "}
                      </small>
                    </FormGroup>
                    {/* end phobia part */}
                    {/* limit participants part */}
                    <FormGroup
                      className="mb-3 border"
                      style={{ padding: "2%" }}
                    >
                      <div>
                        <small className="font-weight-bold">
                          Donnez le nombre limite de participants de votre
                          expérience
                        </small>
                      </div>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-caps-small" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={(e) => setLimitParticipants(e.target.value)}
                          placeholder="Le nombre maximal de participants"
                          type="number"
                          min="1"
                          max="50"
                          autoComplete="new-password"
                          defaultValue={
                            experience
                              ? experience.limitParticipants
                              : limitParticipants
                          }
                          name="participants"
                          // invalid={errors["participants"]}
                          // innerRef={register({
                          //   required:
                          //     "Le nombre limite de participants est obligatoire.",
                          // })}
                        />
                      </InputGroup>
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#2dce89" }}
                      >
                        <i className="ni ni-bulb-61" />
                        Indiquez le nombre maximal de participants que vous
                        pouvez gérer pendant l'expérience
                      </span>
                      <br />
                      {/* {errors.participants && (
                        <span
                          className="mr-2 text-sm"
                          style={{ color: "#dd3a4a" }}
                        >
                          {errors.participants.message}
                        </span>
                      )} */}
                    </FormGroup>
                    {/* end limit participants part */}
                    {/* language part */}
                    <FormGroup
                      className="mb-3 border"
                      style={{ padding: "2%" }}
                    >
                      <small className="font-weight-bold">
                        En quelle langue proposerez-vous votre expérience ?
                      </small>
                      <Col lg="3" md="6">
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(e) => {
                            e.target.value
                              ? setLanguage(e.target.value)
                              : console.log(e.target.value);
                          }}
                        >
                          {[
                            "Arabe",
                            "Français",
                            "Anglais",
                            "Allemand",
                            "Chinois",
                            "Turc",
                          ].map((l) =>
                            experience.language === null ? (
                              <option> {l} </option>
                            ) : (
                              <option selected={experience.language === l}>
                                {l}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                      <span
                        className="mr-2 text-sm"
                        style={{ color: "#2dce89" }}
                      >
                        <i className="ni ni-bulb-61" />
                        Sélectionnez la langue dans laquelle vous vous sentez
                        suffisamment à l'aise pour parler aux participants.
                      </span>
                    </FormGroup>
                    {/* end language part */}
                  </CardBody>
                </Card>
                {/* end card */}
                <Link
                  to={`/second/${experience._id}`}
                  className="btn"
                  style={{ color: "#5e72e4", backgroundColor: "#fff" }}
                >
                  Précédent
                </Link>
                {experience &&
                target !== [] &&
                difficulty !== " " &&
                limitParticipants !== 0 ? (
                  <Link
                    to={`/fourth/${experience._id}`}
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(
                        updateExperience(id, {
                          ...experience,
                          target: target,
                          difficulty: difficulty,
                          limitParticipants: limitParticipants,
                          language: language,
                          phobia: phobia,
                        })
                      );
                    }}
                  >
                    Suivant
                  </Link>
                ) : (
                  <Button color="primary" className="btn-primary" disabled>
                    Suivant
                  </Button>
                )}
              </div>
            </Form>
            {/* end form */}
          </Col>
        </Container>
      </div>
    </>
  ) : (
    <p></p>
  );
};

export default ThirdStep;
