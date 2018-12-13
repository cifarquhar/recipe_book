import React from "react";
import Recipe from "./Recipe";
import RECIPECATEGORIES from "../constants/recipeCategories";

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
                          allRecipes: data._embedded.recipes, 
                          filteredRecipes: this.filterFavouriteRecipes(data._embedded.recipes)
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

  filterFavouriteRecipes(recipes){
    return recipes.filter((recipe) => {
      return recipe.favourite;
    });
  }

  filterRecipesByCategory(evt){
    let allRecipes = this.state.allRecipes;
    if (evt.target.value === "Everything"){
      return allRecipes;
    }
    else {
     return allRecipes.filter((recipe) => {
        return recipe.category === evt.target.value.toUpperCase();
      });
    }
  }

  flipFilterState(){
    this.setState({ showFavourites: !this.state.showFavourites});
  }

  render() {
    const { isLoaded, allRecipes, showFavourites, filteredRecipes } = this.state;

    const mappedRecipeData = this.mapRecipeData(allRecipes);
    const mappedFilteredRecipeData = this.mapRecipeData(filteredRecipes);

    const categoryOptions = RECIPECATEGORIES.map((category, index) => {
      return <option key={index} value={category}>{category.charAt(0) + category.slice(1).toLowerCase()}</option>
    })

    categoryOptions.unshift(<option key={1000} value={null}>Everything</option>)

    if (!isLoaded) {
      return <p>Waiting for recipe data...</p>
    }

    const buttonText = showFavourites ? "Show all" : "Show favourites"

    return (
      <>
        <button onClick={this.flipFilterState.bind(this)}>{buttonText}</button>
        <br/>
        <p>Show only: <select onChange={this.filterRecipesByCategory.bind(this)}>{categoryOptions}</select></p>
        {showFavourites ? mappedFilteredRecipeData : mappedRecipeData}
      </>
    )
  }

}

export default RecipeList;

// TODO: refactor filtering logic to set filteredRecipes to the result. Filter that again during render if 
// favourite selected