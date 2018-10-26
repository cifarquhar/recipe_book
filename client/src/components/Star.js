import React from "react";

class Star extends React.Component {

  handleClick(event) {
    event.stopPropagation();
    this.props.beer.favourite = !this.props.beer.favourite;
    this.makePUTRequest();
  }

  makePUTRequest() {
    let data = this.props.beer;
    fetch(`http://localhost:8080/beers/${this.props.beer.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
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
        {this.props.beer.favourite ? `\u2B50` : '\u2606'}
      </div>
    )
  }

}

export default Star
