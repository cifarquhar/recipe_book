import React from "react";
import Modal from "./Modal";
import Star from "./Star";

class Recipe extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal(event) {
    event.stopPropagation()
    this.setState({ showModal: false });
  }

  mapMethod(method) {
    return Object.keys(method).map((step, index) => {
      return <p key={index}>{step}: {method[step]}</p>
    })
  }

  mapIngredients(){
    const mappedIngredients = this.props.recipe.pairings.map((pairing, index) => {
      return (<p key={index}>{pairing.quantity}{this.getMeasurementUnit(pairing.ingredient[0].servingType)} {pairing.ingredient[0].name}</p>)
    });

    return mappedIngredients;
  }

  getMeasurementUnit(servingType){
    switch (servingType){
      case "VOLUME":
        return "ml"
      case "WEIGHT":
        return "g"
      default:
        return ""
    }
  }

  deleteRecipe(event){
    const p = this.props
    p.handleDelete(p.recipe)
    this.hideModal(event)
  }


  render(){
    const recipe = this.props.recipe;

    return(
      <>
        <div className="recipe-summary" onClick={this.showModal.bind(this)}>
          <div className="summary-header">
            <div className="summary-details">{recipe.name}</div>
            <div className="summary-details">{recipe.category.charAt(0) + recipe.category.slice(1).toLowerCase()}</div>
            <div className="favourite-logo"><Star recipe={recipe} /></div>
          </div>
          <p>{recipe.description}</p>
          <Modal show={this.state.showModal} handleClose={(this.hideModal.bind(this))} handleDelete={this.deleteRecipe.bind(this)}>
            <p>{recipe.name}</p>
            <div style={{ display: "inline-flex" }}>
              <div className="ingredient-div">
                <p>Serves: {recipe.servings}</p>
                <p>Preparation Time: {recipe.prepTime} mins</p>
                <p>Cooking Time: {recipe.cookTime} mins</p>
              </div>
              <div className="ingredient-div">
                <p><strong>Ingredients:</strong></p>
                {this.mapIngredients()}
              </div>
            </div>
            <div>
              <p><strong>Method:</strong></p>
              {this.mapMethod(recipe.method)}
            </div>
          </Modal>
        </div>
      </>
    )
  }

}

export default Recipe;