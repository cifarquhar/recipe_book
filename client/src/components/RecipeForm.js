import React, { Component } from "react"
import RECIPECATEGORIES from "../constants/recipeCategories";

class RecipeForm extends Component {

  constructor(){
    super();
    this.state = {
      recipeName: "",
      recipeCategory: RECIPECATEGORIES[0].toUpperCase(),
      recipeDescription: "",
      recipeServings: 0,
      recipePrepTime: 0,
      recipeCookTime: 0,
      recipeMethod: {}
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handlePrepTimeChange = this.handlePrepTimeChange.bind(this);
    this.handleCookTimeChange = this.handleCookTimeChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
  }

  handleNameChange(evt) {
    this.setState({ recipeName: evt.target.value });
  }

  handleCategoryChange(evt) {
    this.setState({ recipeCategory: evt.target.value.toUpperCase() });
  }

  handleDescriptionChange(evt) {
    this.setState({ recipeDescription: evt.target.value });
  }

  handleServingsChange(evt) {
    this.setState({ recipeServings: evt.target.value });
  }

  handlePrepTimeChange(evt) {
    this.setState({ recipePrepTime: evt.target.value });
  }
  
  handleCookTimeChange(evt) {
    this.setState({ recipeCookTime: evt.target.value });
  }

  handleMethodChange(evt) {
    this.setState({ recipeMethod: evt.target.value });
  }

  handleSubmit(evt){
    evt.preventDefault();

    const s = this.state;
    const detailsToSubmit = {
      name: s.recipeName,
      category: s.recipeCategory,
      description: s.recipeDescription,
      servings: s.recipeServings,
      prepTime: s.recipePrepTime,
      cookTime: s.recipeCookTime,
      method: s.recipeMethod
    };

    console.log(detailsToSubmit);

    evt.target.reset();
  }

  render() {
    const s = this.state;

    const categories = RECIPECATEGORIES.map((category, index) => {
      return (
        <option key={index} value={category}>{category}</option>
      )
    });

    return (
      <div className="new-recipe-div">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-content">
            <label htmlFor="name">Name: </label>
            <input 
              type="text" 
              placeholder="name" 
              value={s.recipeName} 
              onChange={this.handleNameChange} 
              id="name" 
              name="name" 
            />
          </div>
          <div className="form-content">
            <label htmlFor="category">Category: </label>
            <select id="category" name="category" onChange={this.handleCategoryChange}>
              {categories}
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="description">Description: </label>
            <textarea 
              type="text" 
              placeholder="description" 
              value={s.recipeDescription} 
              onChange={this.handleDescriptionChange} 
              id="description" 
              name="description" 
            />
          </div>
          <div className="form-content">
            <label htmlFor="servings">Servings: </label>
            <input 
              type="number" 
              min="0" 
              placeholder="0" 
              onChange={this.handleServingsChange} 
              id="servings" 
              name="servings" 
            />
          </div>
          <div className="form-content">
            <label htmlFor="prepTime">Preparation Time (mins): </label>
            <input 
              type="number" 
              min="0" 
              placeholder="0" 
              onChange={this.handlePrepTimeChange} 
              id="prepTime" 
              name="prepTime" 
            />
          </div>
          <div className="form-content">
            <label htmlFor="cookTime">Cooking Time (mins): </label>
            <input 
              type="number" 
              min="0" 
              placeholder="0" 
              onChange={this.handleCookTimeChange} 
              id="cookTime" 
              name="cookTime" 
            />
          </div>

          <div className="form-content">
            <input type="submit" value="Add Recipe" />
          </div>
        </form>
      </div>
    )
  }

}

export default RecipeForm