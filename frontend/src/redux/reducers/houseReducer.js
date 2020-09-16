const initialState = {
    allHouses:[]
}

const houseReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_HOUSES':
            
            return {
                ...state, 
                allHouses: action.payload
            }    
        case 'FILTERED_HOUSES':
            const filteredHouses = state.allHouses.filter(house => 
                house.address.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(action.payload.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) === 0)
            return {
                ...state,
                filteredHouses
            }
                    
        default: 
            return state    
    }
    
}


export default houseReducer