import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { resetBleDeviceSelectedIndex } from '../redux';

import { HEADER_HEIGHT } from '../utils'
import Colors from '../res/Colors'

class BluetoothDetail extends Component {

  _onGoBack = () => {
    this.props.resetBleDeviceSelectedIndex()
    this.props.navigation.goBack()
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <Icon
          name="ios-arrow-back"
          type='ionicon'
          color={Colors.blue}
          size={28}
          containerStyle={{marginBottom: 4}}
          onPress={this._onGoBack}
          hitSlop={{top: 16, left: 16, bottom: 16, right: 16}}
        />
        <Text style={styles.title}>Details</Text>
      </View>
    )
  }

  _renderBulletPoint = (title, data, index) => (
    <View key={index} style={styles.bulletPointContainer}>
      <Text style={styles.content2}>{title}</Text>
      <Text style={styles.content}>{data ? data : "Unavailable"}</Text>
    </View>
  )

  //solicitedServiceUUIDs and serviceUUIDs
  _renderUUIDS = (title, UUIDs) => {
    if (Array.isArray(UUIDs)) {
      return (
        <View>
          {UUIDs.map((UUID, index) => {
            return this._renderBulletPoint(title, UUID, index)
          })}
        </View>
      )
    }
    else {
      return this._renderBulletPoint(title, null)
    }
  }

  render() {
    const { bleDevices, bleDeviceSelectedIndex } = this.props
    const bleDevice = bleDeviceSelectedIndex!==null ? bleDevices[bleDeviceSelectedIndex] : null

    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <Icon
          name="bluetooth-searching"
          color={Colors.blue}
          size={34}
          containerStyle={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 32}}
        />

        {bleDevice ? (
          <View style={{width: '100%', padding: 24}}>
            {this._renderBulletPoint("ID", bleDevice.id)}
            {this._renderBulletPoint("Name", bleDevice.name)}
            {this._renderBulletPoint("Local Name", bleDevice.localName)}
            {this._renderBulletPoint("Signal strength", bleDevice.rssi)}
            {this._renderUUIDS("Service UUID", bleDevice.serviceUUIDs)}
            {this._renderUUIDS("Solicited Service UUID", bleDevice.solicitedServiceUUIDs)}
          </View>
        ):(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        )}

      </View>
    )
  }
};



const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fafbfc'
  },
  header: {
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: '#000',
  },
  bulletPointContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  content: {
    fontSize: 13,
    color: '#333',
  },
  content2: {
    fontSize: 13,
    color: '#999da0',
  },
});

const mapStateToProps = state => {
  return {
    bleDevices: state.bleDevices,
    bleDeviceSelectedIndex: state.bleDeviceSelectedIndex
  }
}

const mapDispatchToProps = {
  resetBleDeviceSelectedIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothDetail)