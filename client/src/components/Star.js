import React from "react";

class Star extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: props.recipe.name,
      category: props.recipe.category,
      description: props.recipe.description,
      favourite: props.recipe.favourite,
      servings: props.recipe.servings,
      prepTime: props.recipe.prepTime,
      cookTime: props.recipe.cookTime,
      method: props.recipe.method
    }
  }

  handleClick(event) {
    event.stopPropagation();
    this.setState({ favourite: !this.state.favourite }, () => this.makePUTRequest());
    // this.makePUTRequest();
  }

  makePUTRequest() {

    const detailsToSubmit = this.state;
    console.log(detailsToSubmit)
    fetch(`http://localhost:8080/recipes/${this.props.recipe.id}`, {
      method: "PUT",
      body: JSON.stringify(detailsToSubmit),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => { return res })
      .catch(err => console.log(err));
    this.forceUpdate();
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        {this.props.recipe.favourite ? `\u2B50` : '\u2606'}
      </div>
    )
  }

}

export default Star
