import React from 'react'
import '../styles/popularHouses.css'

import PopularHouse from './PopularHouse'

class Houses extends React.Component{
    state={
        firstFour: [],
        secondFour:[],
        viewMore:false
    }

    async componentDidMount(){
        
        var ordered = await this.props.houses.sort((a,b) => b.views-a.views)
        
        var first = ordered.slice(0,4)
        var second = ordered.slice(4, 8)
        
        this.setState({
            ...this.state,
            firstFour:first,
            secondFour: second
        })
        console.log(this.state)
    }
    changeStatus = () =>{
        this.setState({
            ...this.state,
            viewMore: !this.state.viewMore
        })
    }
    render(){
        console.log(this.props)
        return(
            <div className= "containerHouses">
                <div className="firstFour">
                    {this.state.firstFour.map(house =>
                        <PopularHouse house={house}/>
                        )}
                </div>
                
                
                {this.state.viewMore && 
                <>
                <div className ="firstFour">
                    {this.state.secondFour.map(house =>
                        <PopularHouse house={house}/>
                    )}
                        
                </div>
                <button className="moreBtn">View All</button>
                </>}
                <button onClick={this.changeStatus} className="moreBtn">{this.state.viewMore ? "View Less" : "View More"}</button>
            </div>
        )
        
    }

}

export default Houses