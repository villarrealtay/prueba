const initalState = {
    name:"",
    mail:"",
    surname:"",
    user:"",
    token:"",
    photo:"",
    role:"",
    country:""
}

const userReducer = (state = initalState, action) =>{
    switch(action.type){
        case "LOG_USER_INTO_APP":
            localStorage.setItem('token', action.payload.token)
            return{
                ...state, 
                name: action.payload.name,
                token: action.payload.token,
                photo: action.payload.photo,
                role: action.payload.role
            }
        case "UNLOG_USER_FROM_APP":
            localStorage.clear()
            return{
                ...state,
                name:"",
                token:"",
                photo:"",
                role:""
            }
            case "USER_EXIST":
                localStorage.clear()
                return {
                    ...state,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    user: action.payload.user,
                    token: action.payload.token,
                    photo: action.payload.photo,
                    mail: action.payload.mail,
                    country: action.payload.country,
                    role: action.payload.role
                }
         case "MODIFY_USER":
             return{
                 ...state,
                 users:[...state.users, action.payload]
             }
        default:
            return state
    }
}

export default userReducer