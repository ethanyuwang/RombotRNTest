/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { BleManager } from 'react-native-ble-plx'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { listJobs, setJobSelectedIndexAndGetRelatedSkills } from '../redux';

import { HEADER_HEIGHT } from '../utils'
import Colors from '../res/Colors'

class BluetoothList extends Component {

  componentDidMount() {
    index = 0
    BleManager.startDeviceScan(
      null,
      (error, scannedDevice) => {
        console.log(index++, error, scannedDevice)
      }
    )
  }

  componentWillUnmount(){
    bleManager.stopDeviceScan()
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
        />
        <Text style={styles.title}>Bluetooth</Text>
      </View>
    )
  }

  _renderJobItem = ({item, index}) => {
    return (
      <JobCard
        job={item}
        onPress={() => this.props.setJobSelectedIndexAndGetRelatedSkills(index)}
      />
    )
  }

  _jobKeyExtractor = (item, index) => item.id;

  _renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {this.props.endReached ? (
          <Text style={styles.footer}>No more jobs</Text>
        ):(
          <ActivityIndicator size="large"/>
        )}
      </View>
    )
  }

  render() {
    const { jobs } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1, paddingBottom: 40}}
          data={[]}
          extraData={this.props}
          keyExtractor={this._jobKeyExtractor}
          renderItem={this._renderJobItem}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._fetchJobs}
          onEndReachedThreshold={0.2}
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
});

const mapStateToProps = state => {
  return {
    loading: state.loading,
    jobs: state.jobs,
    jobSelectedIndex: state.jobSelectedIndex,
    page: state.page,
    endReached: state.endReached,
  }
}

const mapDispatchToProps = {
  listJobs,
  setJobSelectedIndexAndGetRelatedSkills,
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothList)