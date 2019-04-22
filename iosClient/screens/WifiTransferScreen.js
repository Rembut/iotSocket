import WifiTransferContainer from './../containers/WifiTransferContainer'
import React from 'react';

export default class WifiTransferScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    }
  };
  render() {
    return (
      <WifiTransferContainer navigation={this.props.navigation}/>
    )
  }
}