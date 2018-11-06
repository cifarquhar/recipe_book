import React from "react";
import Recipe from "./Recipe";

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      allRecipes: [],
      showFavourites: false,
      filteredRecipes: []
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:8080/recipes")
      .then(response => response.json())
      .then(data => this.setState({ 
                          isLoaded: true, 
                          allRecipes: this.mapRecipeData(data._embedded.recipes), 
                          filteredRecipes: this.mapRecipeData(this.filterRecipes(data._embedded.recipes))
                        }));
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

  filterRecipes(recipes){
    return recipes.filter((recipe) => {
      return recipe.favourite;
    });
  }

  flipFilterState(){
    this.setState({ showFavourites: !this.state.showFavourites});
  }

  render() {
    const { isLoaded, allRecipes, showFavourites, filteredRecipes } = this.state;

    if (!isLoaded) {
      return <p>Waiting for recipe data...</p>
    }

    const buttonText = showFavourites ? "Show all" : "Show favourites"

    return (
      <div>
        <button onClick={this.flipFilterState.bind(this)}>{buttonText}</button>
        {showFavourites ? filteredRecipes : allRecipes}
      </div>
    )
  }

}

export default RecipeList;