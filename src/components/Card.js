import React, { Component } from 'react';

class Card extends Component {

  size='12';
  mediumsize = '12';

  render() {

    let header;

    if(this.props.title){
      header = <div class="card-header">{this.props.title}</div>
    }

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
          {header}
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
  
}

class ImageCard extends Component {
  render() {
    return (
      <div class="col-4 card-container">
        <div class="card image-card">
          <div class="card-img-top" style={{backgroundImage: 'url(' + this.props.src +')'}}></div>
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
