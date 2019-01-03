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
      recipeMethod: {},
      recipeIngredients: [],
      methodStepCounter: 0,
      ingredientCounter: 0,
      availableIngredients: []
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handlePrepTimeChange = this.handlePrepTimeChange.bind(this);
    this.handleCookTimeChange = this.handleCookTimeChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.handleStepClick = this.handleStepClick.bind(this);
    this.removeStepClick = this.removeStepClick.bind(this);
    this.handleIngredientClick = this.handleIngredientClick.bind(this);
    this.mapMethodComponents = this.mapMethodComponents.bind(this);
    this.handleStepInput = this.handleStepInput.bind(this);
    this.handleIngredientInput = this.handleIngredientInput.bind(this);
    this.handleIngredientQuantityChange = this.handleIngredientQuantityChange.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:8080/ingredients", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => this.setState({availableIngredients: res._embedded.ingredients}))
      .catch(err => console.log(err))
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
      favourite: false,
      servings: s.recipeServings,
      prepTime: s.recipePrepTime,
      cookTime: s.recipeCookTime,
      method: s.recipeMethod
    };

    fetch("http://localhost:8080/recipes", {
      method: "POST",
      body: JSON.stringify(detailsToSubmit),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {this.state.recipeIngredients.forEach((recipIngredient) => {
        let pairingDetails = {
          quantity: recipIngredient.quantity,
          recipe: data._links.self.href,
          ingredient: recipIngredient.url
        }
        fetch("http://localhost:8080/pairings", {
          method: "POST",
          body: JSON.stringify(pairingDetails),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })
        .catch(err => console.log(err));
      })})
      .catch(err => console.log(err))

    evt.target.reset();
  }

  handleStepClick(evt){
    evt.preventDefault();
    this.setState({methodStepCounter: this.state.methodStepCounter + 1});
  }

  removeStepClick(evt){
    evt.preventDefault();
    this.setState({methodStepCounter: this.state.methodStepCounter - 1});
  }

  handleIngredientClick(evt){
    evt.preventDefault();
    const newCounter = this.state.ingredientCounter + 1;
    let currentIngredients = this.state.recipeIngredients;
    this.setState({ingredientCounter: newCounter});
    currentIngredients.push({number: newCounter, quantity: null, url: null})
  }

  handleStepInput(evt){
    let currentMethod = this.state.recipeMethod;
    currentMethod[evt.target.id.split("").pop()] = evt.target.value;
    this.setState({recipeMethod: currentMethod});
  }

  handleIngredientInput(evt) {
    let currentIngredients = this.state.recipeIngredients;
    currentIngredients[evt.target.id.split("").pop() - 1].url = evt.target.value;
    this.setState({ recipeIngredients: currentIngredients });
  }

  handleIngredientQuantityChange(evt){
    let currentIngredients = this.state.recipeIngredients;
    currentIngredients[evt.target.id.split("").pop() - 1].quantity = parseInt(evt.target.value);
    this.setState({recipeIngredients: currentIngredients});
  }

  mapMethodComponents(){
    let methodElements = [];

    for (let i = 0; i < this.state.methodStepCounter; i++){
      const methodElement = <textarea 
                              type="text" 
                              placeholder="Add details..." 
                              id={`step-${i + 1}`}
                              name={`step-${i + 1}`}
                              onChange={this.handleStepInput}
                              />
      methodElements.push(methodElement);
    }

    return methodElements.map((element, index) => {
      return(
        <div key={index}>
          <label htmlFor={`step-${index + 1}`}>{index + 1}: </label>
          {element}
        </div>
      )
    })
  }

  mapIngredientComponents(){
    let ingredientElements = [];

    let options = this.state.availableIngredients.map((ingredient, index) => {
      return <option key={index} value={ingredient._links.self.href}>{ingredient.name}</option>
    })

    options.unshift(<option key={1000}>Select an ingredient</option>)

    for (let i = 0; i < this.state.ingredientCounter; i++) {
      const ingredientElement = <select 
                                  id={`ingredient-${i + 1}`} 
                                  name={`ingredient-${i + 1}`} 
                                  onChange={this.handleIngredientInput}>
        {options}
      </select>
      ingredientElements.push(ingredientElement);
    }

    return ingredientElements.map((element, index) => {
      return(
        <div key={index}>
          <label htmlFor={`ingredient-${index + 1}`}>{index + 1}: </label>
          <input 
            type="number" 
            min="0" 
            placeholder="0" 
            id={`ingredient-quantity-${index + 1}`}
            onChange={this.handleIngredientQuantityChange}></input>
          {element}
        </div>
      )
    })

  }

  render() {
    const s = this.state;

    const categories = RECIPECATEGORIES.map((category, index) => {
      return (
        <option key={index} value={category}>{category}</option>
      )
    });

    const steps = this.mapMethodComponents();
    const ingredients = this.mapIngredientComponents();
    const removeStepButton = (<button onClick={this.removeStepClick}>Remove Step</button>)

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
          <div className="form-content-bordered">
            <p>Ingredients</p>
            {ingredients}
            <button onClick={this.handleIngredientClick}>Add Ingredient</button>
          </div>
          <div className="form-content-bordered">
            <p>Method</p>
            {steps}
            <button onClick={this.handleStepClick}>Add Step</button>
            {this.state.methodStepCounter > 0 ? removeStepButton: null}
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