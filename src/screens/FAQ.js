import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import Heading from '../components/Heading';
import {LargeCard,SmallCard,MediumCard} from '../components/Card';
import Row from '../components/Row';

class FAQ extends Component {
  render() {
    return (
      <FadingScreen>
      <Heading animated="true">FAQS</Heading>
        <Row>
          <SmallCard title="How do I access tests?">
            <p>
              Tests can be accessed by clicking <b>Tests</b>, then selecting a <b>Section</b>.
              Once a Section has been selected, all tests for that section will be visible.
              Simply Click <b>Begin Test</b> to start the selected test.
            </p>
          </SmallCard>
          <SmallCard title="How do I access learning materials?">
            <p>
              When selecting a section, topics with learning resources available will have a button reading <b>Learning Material</b>.
              Selecting this option will preview materials within the app.
              Simply click <b>Close PDF</b> in order to return to the sections menu when you are finished.
            </p>
          </SmallCard>
          <SmallCard title="How do I check my badges?">
            <p>
              Click on <b>Dashboard</b> from the main menu, and the module <b>Your Badges</b> will show the badges you have acquired, and those you have yet to obtain.
            </p>
          </SmallCard>
          <SmallCard title="How do I view users statistics?">
            <p>
              Please contact the system administrator for more information if you require administrative access
            </p>
          </SmallCard>
        </Row>
      </FadingScreen>
    );
  }
}

export default FAQ;
