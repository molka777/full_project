import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Button } from "react-bootstrap"
import { Redirect } from 'react-router-dom'
import { getProfile, logout } from '../JS/actions'
import { InputGroup, FormControl } from 'react-bootstrap';

const Profile = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.userReducer.isAuth)
  const user = useSelector(state => state.userReducer.user)
  const loading = useSelector(state => state.userReducer.loading)
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getProfile());

  }, [dispatch]);




  return loading ? (
    <h1>Loading ...</h1>
  ) : !isAuth ? (
    <Redirect to='/login' />
  ) : (
    // <Navbar>
    //   <Navbar.Brand href="#home">My website.com</Navbar.Brand>
    //   <Navbar.Toggle />
    //   <Navbar.Collapse classNameName="justify-content-end">
    //     <Navbar.Text >
    //       Signed in as: <a href="#login">{user.name}</a>
    //     </Navbar.Text>
    //     <Button onClick={() => dispatch(logout())} variant="danger" classNameName="m-2">Logout</Button>
    //   </Navbar.Collapse>
    //  </Navbar >
    <div className="container emp-profile">
      <form >
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src="https://images.unsplash.com/photo-1553867745-6e038d085e86?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXRzfGVufDB8MnwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="" />
              <div className="file btn btn-lg btn-primary">
                Change Photo
              <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>
                {user.name}
              </h5>
              <h6>
                {user.email}
              </h6>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" onClick={() => { setEdit(true) }} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <p>WORK LINK</p>
              <a href="">Website Link</a><br />
              <a href="">Bootsnipp Profile</a><br />
              <a href="">Bootply Profile</a>
              <p>SKILLS</p>
              <a href="">Web Designer</a><br />
              <a href="">Web Developer</a><br />
              <a href="">WordPress</a><br />
              <a href="">WooCommerce</a><br />
              <a href="">PHP, .Net</a><br />
            </div>
          </div>

          {
            edit ?

              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={user.name} />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={user.email} />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={user.phoneNumber} />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                  <Button variant="info" style={{ marginLeft: "85%" }} onClick={() => { setEdit(false) }}>Enregistrer</Button>

                </div>

              </div>

              :


              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={user.name} disabled />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={user.email} disabled />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <InputGroup size="sm" className="mb-3">
                          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={user.phoneNumber} disabled />
                        </InputGroup>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
          }


        </div>
      </form>
    </div >



  )
}

export default Profile
