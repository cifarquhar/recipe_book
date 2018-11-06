import React from "react";
import Recipe from "./Recipe";

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      recipes: []
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:8080/recipes")
      .then(response => response.json())
      .then(data => this.setState({ isLoaded: true, recipes: this.mapRecipeData(data._embedded.recipes) }));
  }

  deleteRecipe(recipe) {
    console.log(recipe)
    this.recipeIDToDelete = recipe.id
    fetch(`http://localhost:8080/recipes/${this.recipeIDToDelete}`, {
      method: "DELETE"
    })
      .catch(err => console.log(err));
  }

  mapRecipeData(recipes) {
    return recipes.map(((recipe, index) => {
      return <Recipe key={index} recipe={recipe} handleDelete={this.deleteRecipe.bind(this)}/>;
    }));
  }

  render() {
    const { isLoaded, recipes } = this.state;

    if (!isLoaded) {
      return <p>Waiting for recipe data...</p>
    }

    return (
      <div>
        {recipes}
      </div>
    )
  }

}

export default RecipeList;