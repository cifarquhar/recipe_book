import React from "react";
import Recipe from "./Recipe";

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      recipes: [],
      filtered: false,
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
                          recipes: this.mapRecipeData(data._embedded.recipes), 
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
    this.setState({filtered: !this.state.filtered});
  }

  render() {
    const { isLoaded, recipes, filtered, filteredRecipes } = this.state;

    if (!isLoaded) {
      return <p>Waiting for recipe data...</p>
    }

    const buttonText = filtered ? "Show all" : "Show favourites"

    return (
      <div>
        <button onClick={this.flipFilterState.bind(this)}>{buttonText}</button>
        {filtered ? filteredRecipes : recipes}
      </div>
    )
  }

}

export default RecipeList;