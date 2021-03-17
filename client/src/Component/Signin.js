import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../JS/actions'
//Boostrap
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";

const Signin = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loading = useSelector(state => state.userReducer.loading)
  const loginUser = e => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password,
      }))
  }

  return localStorage.getItem('token') ? (<Redirect to='/profile' />
  ) : loading ? (
    <h1>Please wait ....</h1>
  ) : (
    (<Form className="login-form">
      <h1>
        <span className="font-weight-bold">mywebsite</span>.com
        </h1>
      <h2 className="text-center">Marhaba ! </h2>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Mot de passe</Label>
        <Input
          type="Password"
          placeholder="Mot de passe"
          onChange={e => setPassword(e.target.value)}
        />
      </FormGroup>

      <Button className="btn-lg btn-dark btn-block" onClick={loginUser}>Valider</Button>
      <div className="text-center pt-3">Continuer avec votre social media</div>
      <FacebookLoginButton className="mt-3 mb-3" />
      <div className="text-center">
        <a href="sign-up">Se Connecter</a>
        <span className="p-2">|</span>
        <a href="sign-up">Mot de passe oublié </a>
      </div>





    </Form>
    ))
}

export default Signin
