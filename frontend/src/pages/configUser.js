import Header from '../components/Header'
import React, { useState } from 'react';
import '../styles/generalStyles.css'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import axios from 'axios'

class configUser extends React.Component {
    
    async componentDidMount() {
        console.log(this.props.tokenUser)
        await this.props.getUser(this.props.tokenUser) 

    }
    leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        this.setState({
            [campo]: valor
        })
    }
enviarInfo = async e => {
    e.preventDefault()
    //Validacion
    if (this.state.name === '' || this.state.lastName === ''|| this.state.usuario === ''|| this.state.password === ''|| this.state.photo === '') {
        alert("Campos obligatorios")
    } else {
        const users = {name:this.state.name, surname: this.state.surname, user: this.state.user, password: this.state.password, photo: this.state.photo, email: this.state.email }
        const res = await this.props.modifyUserData(users)
      alert('Modified data')
    }
}
    render() {
        console.log(this.props)
        return (
            <>
            <h1>Modify user data</h1>
            {!this.props.tokenUser
              ?( 
                  <h1>First you have to login</h1>
              )
              :(
                  <>
                      <div className="formulario">
                <input type="text" name="email" onChange={this.leerInput} placeholder={this.props.email}/>
                <input type="text" name="nombre" onChange={this.leerInput} placeholder={this.props.nameUser}/>
               <input type="text" name="apellido" onChange={this.leerInput} placeholder={this.props.surnameUser}/>
               <input type="text" name="usuario" onChange={this.leerInput} placeholder={this.props.user} />
               <input type="text" name="photo" onChange={this.leerInput} placeholder={this.props.photo}/>
               <input type="password" name="password" onChange={this.leerInput} placeholder="Ingresa tu contraseña (min 5 caracteres)" />
               <input type="text" name="country" onChange={this.leerInput} placeholder={this.props.country}/>
               <label htmlFor="seller">Seller</label>
               <input type="radio" id="seller" name="rol" value="seller" onChange={this.leerInput}/>
               <label htmlFor="seller">Guest</label>
               <input type="radio" id="buyer" name="rol" value="buyer" onChange={this.leerInput}/>
               <button onClick={() => this.props.modifyUserData()}>Modify</button>
               </div>
               </>
              )}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        tokenUser: state.userRed.token

    /*    user: state.userRed.user,
        nameUser: state.userRed.name,
        tokenUser: state.userRed.token,
        surnameUser: state.userRed.surname,
        photo: state.userRed.photo,
        email: state.userRed.mail,
        country: state.userRed.country,
        role: state.userRed.role */
    }
}
const mapDispatchToProps = {
    getUser: userActions.userExist,
    modifyUserData: userActions.modifyUser 
}


export default connect(mapStateToProps, mapDispatchToProps)(configUser)