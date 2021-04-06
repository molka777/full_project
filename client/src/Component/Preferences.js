import React, { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// import PetsIcon from "@material-ui/icons/Pets";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
// import AddIcon from "@material-ui/icons/Add";
// import Battery20Icon from "@material-ui/icons/Battery20";
// import Battery30Icon from "@material-ui/icons/Battery30";
// import Battery80Icon from "@material-ui/icons/Battery80";
// import BatteryChargingFullIcon from "@material-ui/icons/BatteryChargingFull";
// import FastfoodIcon from "@material-ui/icons/Fastfood";
import {
  getProfile,
  seePreferences,
  addPreferences,
  updateProfile,
} from "../JS/actions";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const Preferences = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);
  const themes = useSelector((state) => state.userReducer.themes);
  const difficulties = useSelector((state) => state.userReducer.difficulties);
  const phobies = useSelector((state) => state.userReducer.phobies);
  const preferences = useSelector((state) => state.userReducer.preferences);
  const [localPref, setlocalPref] = useState([]);
  let arr = [];
  useEffect(() => {
    dispatch(getProfile());
    dispatch(seePreferences());
  }, [dispatch]);

  useEffect(() => {
    if (user) setlocalPref(user.myPreferences);
  }, [user]);

  //Filter the preferences user table if it includes Duplicated items
  let chars = [];
  let uniqueChars = [];
  // console.log(uniqueChars);

  return loading ? (
    <h1>Loading ...</h1>
  ) : !localStorage.getItem("token") ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Container className="mt-7" fluid>
        {/* Table */}
        <h1 className="mb-3">Dites nous ce que vous préférez </h1>
        <p>
          Appuez sur les caractéristiques d'expériences que vous voulez voir
          plus que les autres
        </p>
        <hr />
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">les thémes</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {preferences.map((el) =>
                    el.themes.map((theme) => {
                      // console.log(
                      //   "🚀 ~ file: Preferences.js ~ line 68 ~ el.themes.map ~ theme",
                      //   theme
                      // );
                      // console.log(localPref);

                      return (
                        <Col lg="3" md="6">
                          {console.log(localPref)}
                          <CopyToClipboard text={"ni ni-active-40"}>
                            <button
                              className={`${
                                localPref.includes(theme._id)
                                  ? "Clicked"
                                  : "notClicked"
                              } btn-icon-clipboard `}
                              onClick={() =>
                                `${
                                  localPref.includes(theme._id)
                                    ? dispatch(
                                        updateProfile(user._id, {
                                          ...user,
                                          myPreferences: [
                                            ...new Set(localPref),
                                          ],
                                        })
                                      )
                                    : dispatch(
                                        addPreferences(user._id, theme._id)
                                      )
                                }`
                              }
                              type="button"
                            >
                              <div>
                                <img src={theme.icon} width="30" />
                                <span>{theme.name}</span>
                              </div>
                            </button>
                          </CopyToClipboard>
                        </Col>
                      );
                    })
                  )}
                </Row>
              </CardBody>
            </Card>
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">les difficultés</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {preferences.map((el) =>
                    el.difficulties.map((difficulties) => (
                      <Col lg="3" md="6">
                        <CopyToClipboard
                          text={"ni ni-active-40"}
                          // onCopy={() => setCopiedText("ni ni-active-40")}
                        >
                          <button
                            className="btn-icon-clipboard"
                            id="Sport"
                            type="button"
                          >
                            <div>
                              <img src={difficulties.icon} width="30" />
                              <span>{difficulties.name}</span>
                            </div>
                          </button>
                        </CopyToClipboard>
                      </Col>
                    ))
                  )}
                </Row>
              </CardBody>
            </Card>
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">les phobies</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {preferences.map((el) =>
                    el.phobies.map((phobies) => (
                      <Col lg="3" md="6">
                        <CopyToClipboard
                          text={"ni ni-active-40"}
                          // onCopy={() => setCopiedText("ni ni-active-40")}
                        >
                          <button className="btn-icon-clipboard" type="button">
                            <div>
                              <img src={phobies.icon} width="30" />
                              <span>{phobies.name}</span>
                            </div>
                          </button>
                        </CopyToClipboard>
                      </Col>
                    ))
                  )}
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
      )
    </div>
  );
};

export default Preferences;
