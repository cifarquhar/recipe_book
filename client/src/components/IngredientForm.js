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
    console.log(evt.target.value)
    this.setState({ingredientServingType: evt.target.value.toUpperCase()});
  }

  handleSubmit(evt){
    evt.preventDefault();
    console.log(this.state);
    this.setState({
      ingredientName: "",
      ingredientServingType: ""
    });
    evt.target.reset();
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
            <input type="text" placeholder="Name" value={s.ingredientName} onChange={this.handleNameChange} id="name" name="name" />
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