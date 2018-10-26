import React from "react";
import Modal from "./Modal";

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


  render(){
    const recipe = this.props.recipe;

    return(
      <div>
        <div className="recipe-summary" onClick={this.showModal.bind(this)}>
          <div className="summary-header">
            <div className="summary-details">{recipe.name}</div>
            <div className="summary-details">{recipe.category}</div>
            {/* <div className="favourite-logo"><Star beer={beer} /></div> */}
          </div>
          <p>{recipe.description}</p>
          <Modal show={this.state.showModal} handleClose={(this.hideModal.bind(this))}>
            <p>{recipe.name}</p>
            <div style={{ display: "inline-flex" }}>
              <div className="ingredient-div">
                <p>Serves: {recipe.servings}</p>
                <p>Preparation Time: {recipe.prepTime} mins</p>
                <p>Cooking Time: {recipe.cookTime} mins</p>
              </div>
              <div className="ingredient-div">
                <p>Ingredients will go here</p>
              </div>
            </div>
            <div>
              <p><strong>Method:</strong></p>
              {this.mapMethod(recipe.method)}
            </div>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Recipe;