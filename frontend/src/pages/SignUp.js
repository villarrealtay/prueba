
import Header from '../components/Header'
import React from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'
import GoogleLogin from 'react-google-login';
import Footer from '../components/Footer'
import'../styles/logs.css'


class SignUp extends React.Component{
    
    state={
        newUser:{
            user:"",
            password:"",
            name:"",
            surname:"",
            mail:"",
            photo:"",
            passwordValidation: "",
            country:"",
            role:""
        },
        errors:{
            user:"",
            password:"",
            name:"",
            surname:"",
            mail:"",
            photo:"",
            passwordValidation: "",
            country:"",
            role:""
        } 
    }
    
    getForm = e =>{
        const property = e.target.name
        const value = e.target.value
        this.setState({
            newUser:{
                ...this.state.newUser,
                [property]: value
            }
        })
    }
    submit = async e =>{
        
        const errors = this.state.errors
        
        const validEmailRegex = RegExp( 	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const validPassword = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/)

        errors.user =
            this.state.newUser.user.length < 2
            ? "The user must be at least 2 characters long! "
            : ""
        errors.passwordValidation =
            this.state.newUser.password !== this.state.newUser.passwordValidation
            ? "The entered passwords do not match"
            : ""
        errors.password = 
            validPassword.test(this.state.newUser.password)
            ?""
            :"Password must be at least 6 characters, and must include one upper case letter, one lower case letter, and one numeric digit"
        errors.name =
            this.state.newUser.name.length < 2
            ? "The name must be 2 at least characters long! "
            : ""
        errors.surname =
            this.state.newUser.surname.length < 2
            ? "The surname must be at least 2 characters long! "
            : ""
        errors.mail = 
            validEmailRegex.test(this.state.newUser.mail)
            ? ""
            : "Enter a valid email"
        errors.photo= 
            this.state.newUser.photo.length < 2
            ? "Enter a valid link"
            : ""
        errors.country = 
            this.state.newUser.country.length < 2
            ? "Enter a valid country"
            : ""
        errors.role = 
            this.state.newUser.country == ""
            ? "Select an option"
            : ""
        this.setState({
            errors
        })
        if (this.state.errors.user === "" && this.state.errors.passwordValidation === "" && this.state.errors.password === "" && this.state.errors.name=== "" && this.state.errors.surname=== "" && this.state.errors.mail=== "" && this.state.errors.photo=== "" && this.state.errors.country=== "" ){
             const response = await this.props.createAccount(this.state.newUser)
            
             if (response.success === true){
                Swal.fire({  title: 'Welcome!',  text: `It´s nice to have you here, ${response.user}.`,  icon: 'success',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
                
                
            }else{
                if (response.user !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            user:response.user
                        } 
                    })
                }
                if (response.mail !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            mail:response.mail
                        } 
                    })
                }
            }
             
        }
        
        
        //
    }
    
    responseGoogle = async (response) =>{
        console.log(response)
        this.setState({
            ...this.state,
            newUser:{
                user:response.profileObj.email,
                password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, ""),
                name:response.profileObj.givenName,
                surname:response.profileObj.familyName,
                mail: response.profileObj.email,
                photo:response.profileObj.imageUrl,
                passwordValidation:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, ""),
                country:"undefined",
                role:"buy"
            }
        })
        const res = await this.props.createAccount(this.state.newUser)
       
        if (res.success === true){
            Swal.fire({  title: 'Welcome!',  text: `It´s nice to have you here, ${response.profileObj.givenName}.`,  icon: 'success',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
            
        }else{
            if (res.user !== ""){
                Swal.fire({  title: 'Please sign into your account!',  text: `You are already register with this Google account`,  icon: 'warning',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            }
            
        }
    }

    
    render(){
        return (
            <>
            <Header />
            <div className="signContainer">
                <div className=" titleContainer">

                    <h1 className="title">Sign Up</h1>

                </div>
                    
                <div className="inputs">
                    <span className={this.state.errors.mail === "" ? "" : "logError"}>{this.state.errors.mail}</span>
                    <input className="mail" type="mail" placeholder="Enter your email" name="mail" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.user === "" ? "" : "logError"}>{this.state.errors.user}</span>
                    <input className="account" type="text" placeholder="Enter your user" name="user" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.password === "" ? "" : "logError"}>{this.state.errors.password}</span>
                    <input className="password" type="password" placeholder="Enter your password" name="password" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.passwordValidation === "" ? "" : "logError"}>{this.state.errors.passwordValidation}</span>
                    <input className="passwordCheck" type="password" placeholder="Enter your password again" name="passwordValidation" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.name === "" ? "" : "logError"}>{this.state.errors.name}</span>
                    <input className="name" type="text" placeholder="Enter your name" name="name" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.surname === "" ? "" : "logError"}>{this.state.errors.surname}</span>
                    <input className="surname" type="text" placeholder="Enter your surname" name="surname" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.photo === "" ? "" : "logError"}>{this.state.errors.photo}</span>
                    <input className="pic" type="text" placeholder="Link to your profile pic" name="photo" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.country === "" ? "" : "logError"}>{this.state.errors.country}</span>
                    <input className="country" type="text" placeholder="Your Country" name="country" onChange={this.getForm}></input>

                    <button className="send" onClick={this.submit}>Sign Up</button>
                    
                    <GoogleLogin
                        className="googleBtn"
                        clientId="204753879301-j9otsgm2bstkhae2rs9pf2b4kmgqamlu.apps.googleusercontent.com"
                        buttonText="Create account with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
            <Footer/>

            </>
        )
    }
}

const mapDispatchToProps = {
    createAccount: userActions.createAccount
}

const mapStateToProps = (state) =>{
    return{
        userLog: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)