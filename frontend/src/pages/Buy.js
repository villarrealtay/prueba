import React from 'react'
import Header from '../components/Header'
import '../styles/buy.css'
import { Button, Input } from 'reactstrap'
import { connect } from 'react-redux'
import houseActions from '../redux/actions/houseActions'
import Footer from '../components/Footer'

class Buy extends React.Component {

    state = {
        value: ""
    }

    async componentDidMount() {
         await this.props.getHouses()
     }

    inputFilterHome = e => {
        const value = e.target.value
        this.setState({
            value: value
        })
    }

    searchFilterHome = e => {
        e.preventDefault()
        this.props.housesFiltered(this.state.value)
    }

    render() {

        console.log(this.props)

        const mainBackground = require('../images/fondoPageBuy.jpg')
       /*  const iconSearch = require('../images/iconBusqueda.png')
        const divBanner1 = require('../images/divBanner-001.jpg')
        const divBanner2 = require('../images/divBanner-002.jpg')
        const divBanner3 = require('../images/divBanner-003.jpg')
  */
        return(
            <div className='mainContainer'>
                <Header />
                <div className="mainBackground" style={{backgroundImage: `url(${mainBackground})`}} >
                    <div className='divFilter'>
                        <h1>Encontrá tu hogar ideal</h1>
                        <div className='buttonFilter'>
                            <Button >Buy a house</Button>
                            <Button >Rent a house</Button>
                        </div>
                        <div className='filter-Selects'>
                            <Input className="inputPrice" type="select" name="select" placeholder="Filter by Price" >
                                <option disabled selected>Filter by Price</option>
                                <option value="600.000" className="option">Up to $60.000</option>
                                <option value="150000" className="option">Up to $150.000</option>
                                <option value="150001" className="option">+ $150.000</option>
                            </Input>
                            
                            <Input className="inputPrice" type="select" name="select" >
                                <option disabled selected>Order by Date</option>
                                <option value="newDate" className="option">Newest</option>
                                <option value="oldDate" className="option">Oldest</option>
                            </Input>

                            <Input className="inputPrice" type="select" name="select" >
                                <option disabled selected>Order by Popularity</option>
                                <option value="mostPop" className="option">Newest</option>
                                <option value="leastPop" className="option">Oldest</option>
                            </Input>

                            <Button onClick={this.searchFilterHome} style={{height: '100%'}}><div className='icono-Busqueda' /* style={{backgroundImage: `url(${iconSearch})`}} */></div>Buscar</Button>
                        </div>
                    </div>
                </div>
                <div className="conatinerBanners">
                    {/* <div className="divBanner" style={{backgroundImage: `url(${divBanner1})`}}></div>
                    <div className="divBanner" style={{backgroundImage: `url(${divBanner2})`}}></div>
                    <div className="divBanner" style={{backgroundImage: `url(${divBanner3})`}}></div> */}
                </div>
                    <div style={{height: '20%'}}>
                       { this.props.filterHouses.map(house => {
                            return (
                                <div key={house.address} className="card-House">
                                    <img src={house.photo}></img>
                                    <img src={house.photo2}></img>
                                    <div></div>
                                </div>
                            )
                        })}
                        <h1 style={{textAlign: 'center'}}>listado de casas</h1>
                </div>
                <Footer/>

            </div>
        )
    }
}

const mapDispatchToProps = {
    getHouses: houseActions.getHouses,
    housesFiltered: houseActions.housesFiltered
}

const mapStateToProps = state => {
    return {
        houses: state.houseRed.allHouses,
        filterHouses: state.houseRed.allHouses
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)
