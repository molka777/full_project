
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import register from '../JS/actions/index';
//Bootstrap
// import "./App.css"
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FacebookLoginButton , GoogleLoginButton } from "react-social-login-buttons";



const Signup = () => {
    const loading = useSelector(state => state.userReducer.loading)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const addUser = e => {
        e.preventDefault();
        dispatch(
            register({
                name,
                email,
                password,
                phoneNumber
            }))
    }
    return (
        <div >
            {
                loading ? (
                    <h1>Attendez  ...</h1>
                ) : user ? (
                    <Redirect to='/login' />
                ) : (



                    <Form className="login-form">
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
                      <Label>Nom & prénom</Label>
                      <Input 
                       type="name"
                       placeholder="Nom et prénom"
                       onChange={e => setName(e.target.value)}
                       />
                    </FormGroup>
              
                    <FormGroup>
                      <Label>Tel°</Label>
                      <Input 
                       type="text"
                       placeholder="Numéro téléphone"
                       onChange={e => setPhoneNumber(e.target.value)}
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
                    
                    <Button className="btn-lg btn-dark btn-block" onClick={addUser}>Valider</Button>
                    <div className="text-center pt-3"> Facebook Ou Google</div>
                    <FacebookLoginButton className="mt-3 mb-3" />
                    <GoogleLoginButton className="mt-3 mb-3" />
                    <div className="text-center">
                      <a href="sign-up">Se Connecter</a>
                      <span className="p-2">|</span>
                      <a href="sign-up">Mot de passe oublié </a>
                    </div>
                  </Form>
                )}
        </div>
        
        
    )
}


export default Signup;
