import React from 'react'
import '../styles/sellHome.css'


class FormSell extends React.Component {

    state = {
        houseSell: {
            address: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            squareMeters: '',
            price: '',
            garden: '',
            urlPhoto1: '',
            urlPhoto2: ''
        },
        errors: {
            address: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            squareMeters: '',
            price: '',
            garden: '',
            urlPhoto1: '',
            urlPhoto2: ''
        }
    }

    readInput = e => {
        const dataInput = e.target.name
        const value = e.target.value

        this.setState({
            houseSell:{
                ...this.state.houseSell,
                [dataInput]: value
            }
        })
    }

    sendData = e => {
        e.preventDefault()
        console.log(this.state.houseSell)

        const errors = this.state.errors 

        errors.address = 
        this.state.houseSell.address === '' 
        ? 'Please, enter a valid address'
        : ''

        errors.neighborhood =
        this.state.houseSell.neighborhood === ''
        ? 'Please, enter a valid neighborhood'
        : ''
        
        errors.bedrooms =
        (this.state.houseSell.bedrooms < 1 || this.state.houseSell.bedrooms > 10 ||typeof(this.state.houseSell.bedrooms) ==='number' )
        ? 
        'Please, enter a NUMBER between 1 and 10'
        : 
        ''

        errors.bathrooms =
        (this.state.houseSell.bathrooms < 1 || this.state.houseSell.bathrooms > 10 ||typeof(this.state.houseSell.bathrooms) ==='number' )
        ? 
        'Please, enter a NUMBER between 1 and 10'
        : 
        ''

        errors.squareMeters =
        (this.state.houseSell.squareMeters <= 10 || this.state.houseSell.squareMeters >= 300 ||typeof(this.state.houseSell.squareMeters) ==='number' )
        ? 
        'Please, enter a NUMBER between 10 and 300'
        : ''

        errors.price =
        
        (this.state.houseSell.price <= 10000 || this.state.houseSell.price >= 5000000 ||typeof(this.state.houseSell.price) ==='number' )
        ? 
        'Please, enter a NUMBER between 10.000 and 5.000.000'
        : ''

        errors.urlPhoto1 =
        this.state.houseSell.urlPhoto1 === ''
        ?  'Please, enter a valid Link'
        : ''

        errors.urlPhoto2 =
        this.state.houseSell.urlPhoto2 === ''
        ?  'Please, enter a valid Link'
        : ''



        this.setState({
            errors
        })
        console.log(this.state)
    }

    render() {

        return (
            <>
                <div className="container__super">
                    <div className="container__sell__home">
                        <p>Publish Now!</p>
                        <div className="container__inputs">
                            <label htmlFor="">Address</label>
                            <input type="text" onChange={this.readInput} name="address" />
                            <span className="error">{this.state.errors.address}</span>
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">Neighborhood</label>
                            <input type="text" onChange={this.readInput} name="neighborhood" />
                            <span className="error">{this.state.errors.neighborhood}</span>
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">Count Bedrooms</label>
                            <input className="number__input" min="1" max="6" type="number" onChange={this.readInput} name="bedrooms" id="" />
                            <span className="error">{this.state.errors.bedrooms}</span>
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">Count Bathrooms</label>
                            <input className="number__input" type="number" min="1" max="6" onChange={this.readInput} name="bathrooms" id="" />
                            <span className="error">{this.state.errors.bathrooms}</span>
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">SquareMeters  m²</label>
                            <input className="number__input" min="20" max="300" type="number" onChange={this.readInput} name="squareMeters" id="" />
                            <span className="error">{this.state.errors.squareMeters}</span>
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">Price USD</label>
                            <input type="number" min="10000" max="5000000" step="5000" onChange={this.readInput} name="price" id="" />
                            <span className="error">{this.state.errors.price}</span>
                        </div>
                        <div className="container__radio">
                            <label htmlFor="">Has a garden?</label>
                            <label htmlFor="">Yes</label>
                            <input type="radio" name="garden" value={true} onChange={this.readInput} />
                            <label htmlFor="">No</label>
                            <input type="radio" name="garden" value={false} onChange={this.readInput} />
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">urlPhoto 1</label>
                            <input type="text" onChange={this.readInput} name="urlPhoto1" />
                            <span className="error">{this.state.errors.urlPhoto1}</span>
                        </div>
                        <div className="container__inputs">
                            <label htmlFor="">urlPhoto 2</label>
                            <input type="text" onChange={this.readInput} name="urlPhoto2" />
                            <span className="error">{this.state.errors.urlPhoto2}</span>
                        </div>
                        <button className="button__send__form" onClick={this.sendData}>Publish</button>
                    </div>
                    <div className="background__sell">
                    </div>
                </div>

            </>
        )
    }

}

export default FormSell