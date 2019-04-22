import HomeContainer from './../containers/HomeContainer'
import React from 'react';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff",
    },
    header: null,
    title: "Home",
    gesturesEnabled: false,
  };
  render() {
    return (
      <HomeContainer navigation={this.props.navigation}/>
    )
  }
}