import React, { Component } from "react";
import axios from "axios";
import {useForm} from '../hooks/useForm'


export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  constructor(){
    super();
    this.state = {
      plants: [], 
      search: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3333/plants')
    .then(res => {
      this.setState({
        plants: res.data.plantsData
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handlechange = e => {
    this.setState({
      search: e.target.value
    })

    axios.get('http://localhost:3333/plants')
    .then(res => {
      const plants = res.data.plantsData.filter(plant => plant.name.includes(this.state.search) )
      this.setState({
        plants: plants
      })
    })
    .catch(err => {
      console.log(err);
    })
  } 

  render() {
    return (
      <div>
        <label id='search' htmlFor="searchInput">
            Search for a Plant:
            <input type="text" id="searchInput" name='search' value={this.state.search} onChange={this.handlechange}/>
        </label> 
        <main className="plant-list">
          {this.state?.plants?.map((plant) => {
              return(
                  <div className="plant-card" key={plant.id}>
                  <img className="plant-image" src={plant.img} alt={plant.name} />
                  <div className="plant-details">
                    <h2 className="plant-name">{plant.name}</h2>
                    <p className="plant-scientific-name">{plant.scientificName}</p>
                    <p>{plant.description}</p>
                    <div className="plant-bottom-row">
                      <p>${plant.price}</p>
                      <p>☀️ {plant.light}</p>
                      <p>💦 {plant.watering}x/month</p>
                    </div>
                    <button
                      className="plant-button"
                      onClick={() => this.props.addToCart(plant)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                )
              }
          )}
        </main>
      </div>
    );
  }
}
