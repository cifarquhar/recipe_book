import React, {Component} from "react"
import RecipeForm from "./RecipeForm"
import IngredientForm from "./IngredientForm"

class FormContainer extends Component{

  constructor(){
    super()
    this.state = {
      recipeSelected: true
    }
  }

  flipFormType(){
    this.setState({recipeSelected: !this.state.recipeSelected});
  }

  render(){
    const currentSelection = this.state.recipeSelected;

    return(
      <div>
        <button onClick={this.flipFormType.bind(this)}>{currentSelection ? "Add Ingredient" : "Add Recipe"}</button>
        {currentSelection ? <RecipeForm /> : <IngredientForm />}
      </div>
    )
  }

}

export default FormContainer