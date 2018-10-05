import React, { Component } from 'react';


class Card extends Component {
  constructor(props){
    super(props);
    this.size='12';
  }

  render() {

    return (
      <div className={"card-container col-12 col-lg-" + (this.size == 4 ? this.size + " col-md-6" : this.size)}>
        <div className={"card"}>
          <div class="card-header">Header</div>
          <div class="card-body">
            <h5 class="card-title">Light card title</h5>
            <p class="card-text">
              {this.props.children}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class SmallCard extends Card {
  constructor(props){
    super(props);
    this.size = 4;
  }
}

class MediumCard extends Card {
  constructor(props){
    super(props);
    this.size = 6;
  }
}

class LargeCard extends Card {
  constructor(props){
    super(props);
  }
}


export default Card;
export {SmallCard,MediumCard,LargeCard};
