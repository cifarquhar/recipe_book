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
      .then(data => this.setState({ isLoaded: true, recipes: this.mapRecipeData(data.content) }));
  }

  mapRecipeData(recipes) {
    return recipes.map(((recipe, index) => {
      return <recipe key={index} recipe={recipe} handleDelete={this.deleterecipe.bind(this)} />;
    }));
  }

  render() {
    const { isLoaded, recipes } = this.state;

    if (!isLoaded) {
      console.log("got recipes");
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