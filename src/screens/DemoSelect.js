import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements'


export default class DemoSelect extends React.Component {
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Please select a demo to continue</Text>
        <Button
          title='Jobs'
          titleStyle={styles.buttonTextStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('Jobs')}
        />
        <Button
          title='Bluetooth'
          titleStyle={styles.buttonTextStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('Bluetooth')}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 16,
    fontSize: 26,
    textAlign: 'center'
  },
  buttonTextStyle: {
    color: '#FFF'
  },
  buttonStyle: {
    width: "80%",
    margin: 24,

  }
})