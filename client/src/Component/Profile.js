import React , {useEffect} from 'react'
import { useDispatch ,  useSelector } from 'react-redux'
import { Navbar , Button} from "react-bootstrap"
import { Redirect } from 'react-router-dom'
import { getProfile , logout } from '../JS/actions'


const Profile = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.userReducer.isAuth)
    const user = useSelector(state => state.userReducer.user)
    const loading = useSelector(state => state.userReducer.loading)

    useEffect(() => {
        dispatch(getProfile());

    }, [dispatch]);
    

    return loading? (
    <h1>Loading ...</h1>
   ) : !isAuth? ( 
    <Redirect to='/login' /> 
    ) : (
        <Navbar>
        <Navbar.Brand href="#home">Mywebsite.com</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end"> 
          <Navbar.Text >
            Signed in as: <a href="#login">{user.name}</a>
          </Navbar.Text>
          <Button onClick={()=> dispatch(logout())} variant="danger" className="m-2">Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Profile
