import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from 'react-native';
import PropTypes from 'prop-types';
import { BleManager } from 'react-native-ble-plx'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { addBleDevice, setBleDeviceSelectedIndex } from '../redux';

import { HEADER_HEIGHT } from '../utils'
import Colors from '../res/Colors'

export class BluetoothList extends Component {

  constructor(props) {
    super(props)
    this.bleManager = new BleManager()
  }

  componentDidMount() {
    //check for permission for android
    if (Platform.OS === 'android') {
      this._checkAndRequestForPermission().then((granted) => {
        if (granted) {
          this._startBluetoothDeviceScan()
        }
        console.warn("Failed to get permission")
      })
    }
    else {
      this._startBluetoothDeviceScan()
    }
  }

  componentWillUnmount(){
    this.bleManager.stopDeviceScan()
  }

  _startBluetoothDeviceScan = () => {
    this.bleManager.startDeviceScan(
      null,
      null,
      (error, scannedDevice) => {
        if(error){
          console.log('Error occurred while scanning', error);
          return;
        }
        this.props.addBleDevice(scannedDevice)
      }
    )
    //stop scanning after 9000 ms
    setTimeout(() => this.bleManager.stopDeviceScan(), 9000);
  }

  async _checkAndRequestForPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'ACCESS_COARSE_LOCATION Permission',
          message: 'To scan for bluetooth devices ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      return (granted === PermissionsAndroid.RESULTS.GRANTED)
    } catch (error) {
      console.warn(error)
    }
  }

  _onBleDeviceItemPress = (index) => {
    this.props.setBleDeviceSelectedIndex(index)
    this.props.navigation.navigate('BluetoothDetail')
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
          onPress={() => this.props.navigation.goBack()}
          hitSlop={{top: 16, left: 16, bottom: 16, right: 16}}
        />
        <Text style={styles.title}>Bluetooth</Text>
      </View>
    )
  }

  _renderSeparator = () => (
    <View style={styles.separator}/>
  )

  _renderBulletPoint = (title, data) => (
    <View style={styles.bulletPointContainer}>
      <Text style={styles.content2}>{title}</Text>
      <Text style={styles.content}>{data ? data : "Unavailable"}</Text>
    </View>
  )

  _renderBleDeviceItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this._onBleDeviceItemPress(index)}>
      <View style={styles.bleDeviceItemContainer}>
        <Icon
          name="bluetooth-searching"
          color={Colors.blue}
          size={28}
          containerStyle={{width: '20%', alignItems: 'center', justifyContent: 'center'}}
        />
        <View style={{width: '80%', paddingVertical: 8}}>
          {this._renderBulletPoint("Name", item.name)}
          {this._renderBulletPoint("Local Name", item.localName)}
          {this._renderBulletPoint("Signal strength", item.rssi)}
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  _bleDeviceKeyExtractor = (item, index) => item.id;

  _renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
      </View>
    )
  }

  render() {
    const { bleDevices } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1, paddingBottom: 40}}
          data={bleDevices}
          extraData={this.props}
          keyExtractor={this._bleDeviceKeyExtractor}
          renderItem={this._renderBleDeviceItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
        />
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
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  footer: {
    fontSize: 14,
    color: '#888'
  },
  bleDeviceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPointContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    paddingRight: 36 
  },
  content: {
    fontSize: 13,
    color: '#333',
  },
  content2: {
    fontSize: 13,
    color: '#999da0',
    marginRight: 24,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    width: '80%',
    marginLeft: '20%',
    backgroundColor: "#ebebeb",
  }
});

const mapStateToProps = state => {
  return {
    bleDevices: state.bleDevices,
  }
}

const mapDispatchToProps = {
  addBleDevice,
  setBleDeviceSelectedIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothList)

BluetoothList.propTypes = {
  bleDevices: PropTypes.array,
  addBleDevice: PropTypes.func,
  resetBleDeviceSelectedIndex: PropTypes.func
}