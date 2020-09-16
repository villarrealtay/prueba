import axios from 'axios'

const userActions = {
    createAccount : newUser =>{
        return async (dispatch, getState) => {       
            const res = await axios.post('http://localhost:4000/api/users', newUser)
            console.log(res)
            const error ={
                mail:"",
                user:""
            }
            if(!res.data.success && res.data.response !== undefined){
                if(res.data.response.errors.mail !== undefined){
                  error.mail = "That email is already used"
                }
                if(res.data.response.errors.user !== undefined){
                   error.user = "That username is already used"
                }
                return error
               
            }else{
                dispatch({
                    type: "LOG_USER_INTO_APP",
                    payload:res.data.response
                })
                return {
                    success: true,
                    user: res.data.response.name
                }
            }
        }

    },
    getUser: user =>{
        return async (dispatch, getState) =>{
            
            const res = await axios.post("http://localhost:4000/api/getUser", user)
            
            dispatch({
                type: "GET_USER_EXISTS"
            })
            return res.data.success
        }
    },
    logUser : user =>{
        return async ( dispatch, getState) => {
            const res = await axios.post("http://localhost:4000/api/login", user)
            console.log(res)
            if (!res.data.success){
                return (res.data.response)    
            }else{
                
                dispatch({
                    type: "LOG_USER_INTO_APP",
                    payload:res.data.response
                })
                return {
                    success: true,
                    user: res.data.response.name
                }
            }
        }
    },
    userExist : (token) => {
        return async ( dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/userById', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            if (!res.data.success){
                alert('user not found')  
            dispatch({
                type: "USER_EXIST",
                payload: res.data.users
            })
         }
        }
    },

    modifyUser : () => {
        return async (dispatch, getState) => {
            const res = await axios.put('http://localhost:4000/api/users')
            dispatch({
                type:"MODIFY_USER",
                payload: res.data.users
            })
        }
    },
    unlogUser : () => {
        return (dispatch, getState) =>{
            dispatch({
                type: "UNLOG_USER_FROM_APP"
            })
        }
    },
    forcedLogin: token =>{
        return async(dispatch, getState) =>{
            const res = await axios.get("http://localhost:4000/api/validateToken", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data.success){
            dispatch({
                type: "LOG_USER_INTO_APP",
                payload:{
                    token,
                    name: res.data.response.name,
                    photo: res.data.response.photo,
                    role: res.data.response.role
                    
                    
                }
            })}
        }
    }
}

export default userActions