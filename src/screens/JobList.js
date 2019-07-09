import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { listJobs, setJobSelectedIndexAndGetRelatedSkills } from '../redux';
import JobCard from '../components/JobCard';
import { HEADER_HEIGHT } from '../utils'
import Colors from '../res/Colors'

class JobList extends Component {

  componentDidMount() {
    this._fetchJobs()
  }

  _fetchJobs = () => {
    if (this.props.loading || this.props.endReached) { return }
    this.props.listJobs(this.props.page)
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Jobs</Text>
        <Icon
          name="bluetooth-searching"
          color={Colors.blue}
          size={24}
          onPress={() => this.props.navigation.navigate('BluetoothList')}
        />
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
          data={jobs}
          extraData={this.props}
          keyExtractor={this._jobKeyExtractor}
          renderItem={this._renderJobItem}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._fetchJobs}
          onEndReachedThreshold={0.2}
        />
        {this.props.jobSelectedIndex !== null && (
          <JobCard detailView={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobList)