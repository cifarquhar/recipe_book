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
    return(
      <div>
        <button onClick={this.flipFormType.bind(this)}>{this.state.recipeSelected ? "Add Ingredient" : "Add Recipe"}</button>
        {this.state.recipeSelected ? <RecipeForm /> : <IngredientForm />}
      </div>
    )
  }

}

export default FormContainer