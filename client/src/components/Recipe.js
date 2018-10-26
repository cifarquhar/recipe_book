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
                {/* {this.mapIngredients(recipe.ingredients)} */}
              </div>
              <div className="ingredient-div">
                {/* {this.mapHops(recipe.hopSchedule)} */}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Recipe;


// class Beer extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false
//     };
//   }

//   showModal() {
//     this.setState({ showModal: true });
//   }

//   hideModal(event) {
//     event.stopPropagation()
//     this.setState({ showModal: false });
//   }

//   deleteBeer(event) {
//     const p = this.props
//     p.handleDelete(p.beer)
//     this.hideModal(event)
//   }

//   mapIngredients(ingredients) {
//     return Object.keys(ingredients).map((ingredient, index) => {
//       return <p key={index}>{ingredient}: {ingredients[ingredient]}g</p>
//     })
//   }

//   mapHops(hops) {
//     let sortedHops = Object.keys(hops).sort((a, b) => hops[b] - hops[a])
//     return sortedHops.map((hop, index) => {
//       return <p key={index}>{hop}: {hops[hop] >= 0 ? `${hops[hop]} mins` : `after ${hops[hop] * -1} days`}</p>
//     })
//   }

//   render() {
//     const beer = this.props.beer;

//     return (
//       <div>
//         <div className="beer-summary" onClick={this.showModal.bind(this)}>
//           <div className="summary-header">
//             <div className="summary-details">{beer.name}</div>
//             <div className="summary-details">{beer.style}</div>
//             <div className="favourite-logo"><Star beer={beer} /></div>
//           </div>
//           <p>{beer.description}</p>
//           <Modal show={this.state.showModal} handleClose={(this.hideModal.bind(this))} handleDelete={this.deleteBeer.bind(this)} beerID={beer.id}>
//             <p>{beer.name}</p>
//             <div style={{ display: "inline-flex" }}>
//               <div className="ingredient-div">
//                 {this.mapIngredients(beer.ingredients)}
//               </div>
//               <div className="ingredient-div">
//                 {this.mapHops(beer.hopSchedule)}
//               </div>
//             </div>
//           </Modal>
//         </div>
//       </div>
//     )
//   }

// }

// export default Beer;