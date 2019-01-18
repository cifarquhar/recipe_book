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
      filteredRecipes: [],
      categoryFilter: "Everything"
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

  async deleteRecipe(recipe) {
    const pairingLinks = recipe.pairings.map((pairing) => {
      return pairing._links.self.href.slice(0, -13)
    })
    pairingLinks.forEach((link) => {
      fetch(link, {
        method: "DELETE"
      })
      .catch(err => console.log(err));
    })
    await fetch(`http://localhost:8080/recipes/${recipe.id}`, {
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

  filterRecipesByCategory(recipes, filter){
    if (filter === "Everything"){
      return recipes;
    }
    else {
     return recipes.filter((recipe) => {
        return recipe.category === filter.toUpperCase();
      });
    }
  }

  flipFilterState(){
    this.setState({ showFavourites: !this.state.showFavourites});
  }

  setCategoryFilter(evt){
    this.setState({ categoryFilter: evt.target.value })
  }

  render() {
    const { isLoaded, allRecipes, showFavourites, filteredRecipes, categoryFilter } = this.state;

    const recipesFilteredByCategory = this.filterRecipesByCategory(allRecipes, categoryFilter);
    const favouriteRecipesFilteredByCategory = this.filterRecipesByCategory(filteredRecipes, categoryFilter);

    const mappedRecipeData = this.mapRecipeData(recipesFilteredByCategory);
    const mappedFilteredRecipeData = this.mapRecipeData(favouriteRecipesFilteredByCategory);

    const categoryOptions = RECIPECATEGORIES.map((category, index) => {
      return <option key={index} value={category}>{category.charAt(0) + category.slice(1).toLowerCase()}</option>
    })

    const nothingFound = <p>Nothing matches that filter!</p>

    categoryOptions.unshift(<option key={1000} value={null}>Everything</option>)

    if (!isLoaded) {
      return <p>Waiting for recipe data...</p>
    }

    const buttonText = showFavourites ? "Show all" : "Show favourites"

    console.log(mappedFilteredRecipeData.length)

    return (
      <>
        <button onClick={this.flipFilterState.bind(this)}>{buttonText}</button>
        <br/>
        <p>Show only: <select onChange={this.setCategoryFilter.bind(this)}>{categoryOptions}</select></p>
        {showFavourites ? 
          (!mappedFilteredRecipeData.length ? nothingFound : mappedFilteredRecipeData) 
          : 
          (!mappedRecipeData.length ? nothingFound : mappedRecipeData)}
      </>
    )
  }

}

export default RecipeList;
