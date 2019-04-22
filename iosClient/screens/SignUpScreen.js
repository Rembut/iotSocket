import SignUpContainer from './../containers/SignUpContainer'
import React from 'react';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
  };
  render() {
    return (
      <SignUpContainer navigation={this.props.navigation}/>
    )
  }
}