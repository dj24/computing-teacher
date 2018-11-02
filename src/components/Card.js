import React, { Component } from 'react';


class Card extends Component {
  constructor(props){
    super(props);
    this.size='12';
    this.mediumsize = '12';
  }

  render() {
    return (
      <div className={"card-container col-12 col-xl-" + (this.size) + " col-lg-" + (this.mediumsize)}>
        <div className={"card"}>
          <div class="card-header">{this.props.title}</div>
          <div class="card-body">
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
    this.mediumsize = 6;
  }
}

class MediumCard extends Card {
  constructor(props){
    super(props);
    this.size = 6;
    this.mediumsize = 12;
  }
}

class LargeCard extends Card {
  constructor(props){
    super(props);
  }
}


export default Card;
export {SmallCard,MediumCard,LargeCard};
