import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

const LogOut = (props) =>{
    useEffect(()=> {
        props.unlogUser()
        props.history.push('/')
    }, [])
    return(
        null
    )
}

const mapDispatchToProps={
    unlogUser : userActions.unlogUser
}

export default connect(null, mapDispatchToProps)(LogOut)