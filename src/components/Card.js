import React, { Component } from 'react';

class Card extends Component {
  constructor(props){
    super(props);
    this.size='12';
    this.mediumsize = '12';
  }

  render() {
    return (
      <div
        style={
          {
            animationDelay : this.props.delay + 'ms'
          }
        }
        className={" "
          + (this.props.error ? 'animated shake ' : ' ')
          + (this.props.animation ? this.props.animation : '')
          + " card-container col-12 col-xl-"
          + (this.size) + " col-lg-" + (this.mediumsize)}
      >
        <div className={"card"}>
          <div class="card-header">{this.props.title}</div>
          <div class="card-body">
              {this.props.children}
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

class ImageCard extends Component {
  render() {
    return (
      <div class="col-4">
        <div class="card">
          <img class="card-img-top" src={this.props.src} alt="Card image cap"/>
          <div class="card-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }


}


export default Card;
export {SmallCard,MediumCard,LargeCard,ImageCard};
