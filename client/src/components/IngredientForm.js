import React, { Component } from "react";
import SERVINGTYPES from "../constants/servingTypes"

class IngredientForm extends Component {

  constructor(){
    super();
    this.state = {
      ingredientName: "",
      ingredientServingType: SERVINGTYPES[0].toUpperCase()
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleServingTypeChange = this.handleServingTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(evt){
    this.setState({ingredientName: evt.target.value});
  }

  handleServingTypeChange(evt){
    this.setState({ingredientServingType: evt.target.value.toUpperCase()});
  }

  handleSubmit(evt){
    evt.preventDefault();
    
    const dataToSend = {
      name: this.state.ingredientName.toLowerCase(),
      servingType: this.state.ingredientServingType
    };

    this.setState({
      ingredientName: "",
      ingredientServingType: ""
    });
    evt.target.reset();

    fetch("http://localhost:8080/ingredients", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => { return res })
      .catch(err => console.log(err))
  }

  render() {
    const s = this.state;

    const servingTypes = SERVINGTYPES.map((type, index) => {
      return(
        <option key={index} value={type}>{type}</option>
      )
    });

    return (
      <div className="new-recipe-div">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-content">
            <label htmlFor="name">Name: </label>
            <input 
              type="text" 
              placeholder="Name" 
              value={s.ingredientName} 
              onChange={this.handleNameChange} 
              id="name" 
              name="name" 
            />
          </div>
          <div className="form-content">
            <label htmlFor="servingType">Serving Type: </label>
            <select id="servingType" name="servingType" onChange={this.handleServingTypeChange}>
              {servingTypes}
            </select>
          </div>
          <div className="form-content">
            <input type="submit" value="Add Ingredient" />
          </div>
        </form>
      </div>
    )
  }

}

export default IngredientForm