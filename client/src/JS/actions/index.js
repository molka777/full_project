import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, REGISTER_USER } from "../constants/action-types"

const register = newUser => async dispatch => {
    dispatch({
        type:REGISTER_USER
    });
    try {
        const addRes = await axios.post('/user/register', newUser)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:addRes.data
        });
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data,
        })
    }
}

export default register