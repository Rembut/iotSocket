import React from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Spinner from 'react-native-loading-spinner-overlay';

import { Sae } from 'react-native-textinput-effects';

import { createStackNavigator } from 'react-navigation'; 

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Item
} from 'react-native';

import ChartView from 'react-native-highcharts';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Text style={styles.logOutButton} onPress={() => this.props.logOut()}>
         <Text style={styles.logOut}><FontAwesomeIcon name="angle-left" size={20} color="#000"/></Text> Log out
        </Text>

        <View>
          
          <Spinner visible={this.props.data.isLoading} color={'#fff'} animation={"fade"} normal/>
          {"\n"}

          { this.props.data.socket.id !== null && !this.props.data.isLoading


            ? <AreaChartExample/>

            : null

          }

          { this.props.data.socket.id !== null && !this.props.data.isLoading

            ? <Text style={styles.statisticInfo}>watts: {this.props.data.socket.data.watts}{"\n"}amperes: {this.props.data.socket.data.amperes}{"\n"}volts: {this.props.data.socket.data.volts}</Text>

            : <Text style={styles.homeInfoText}>You do not have any{"\n"} devices connected 🤔</Text>

          }

          { this.props.data.socket.id !== null && !this.props.data.isLoading

           ? <TouchableHighlight style={styles.statisticButtonContainer} onPress={() => this.props.changeState()}>
               <Text style={styles.statisticButton}>
                 {this.props.data.socket.state 
                  ? "on"
                  : "off"
                 }
               </Text>
             </TouchableHighlight>

           : <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('wifiTransfer')}>
               <Text style={styles.buttonStyle}>Add new device</Text>
             </TouchableHighlight>

          }

        </View>

        </ScrollView>

      
      </View>
    );
  }
}


class AreaChartExample extends React.Component {
    render() {
    var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = 13.18;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: ' '
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#E53935'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };

    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };

    return (
      <ChartView style={{height:300}} config={conf} options={options}></ChartView>
    );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedText: {
    fontSize: 18,
    marginTop: 10,
    color: '#000',
    lineHeight: 35,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  inputs: {
    marginLeft: 40,
    marginRight: 30,
    marginTop: 20,
  },
  buttonStyle: {
    color: '#fff',
    paddingLeft: 40,
    alignItems: 'center',
    paddingRight: 40,
    paddingTop: 12,
    fontSize: 16,
    paddingBottom: 10,
    alignSelf:'center',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  buttonContainer: {
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 50,
    alignSelf:'center',
    backgroundColor: "#2358FB",
    alignItems: 'center',
  },
  signInContentContainer: {
    paddingTop: 90,
  }, 
  info: {
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 20,
  },
  infoButton: {
    color: '#2358FB'
  },
  homeInfoText: {
    fontSize: 18,
    marginTop: 40,
    color: '#000',
    lineHeight: 35,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  logOutButton: {
    fontSize: 18,
    color: '#000',
    letterSpacing: 1.5,
    marginLeft: 15,
    marginTop: 5,
    lineHeight: 20,
    fontWeight: '600',
  },
  statisticInfo: {
    fontSize: 15,
    marginTop: 20,
    color: '#000',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  statisticButton: {
    color: '#fff',
    paddingLeft: 40,
    alignItems: 'center',
    paddingRight: 40,
    paddingTop: 12,
    fontSize: 16,
    paddingBottom: 10,
    alignSelf:'center',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  statisticButtonContainer: {
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 30,
    alignSelf:'center',
    backgroundColor: "#2358FB",
    alignItems: 'center',
  },
});
