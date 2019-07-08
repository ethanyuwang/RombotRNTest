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
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { getRelatedSkillsFromTitle } from '../redux';
import JobCard from '../components/JobCard';

class JobDetail extends Component {

  componentDidMount() {
    const { jobPressed } = this.props
    this.props.getRelatedSkillsFromTitle(jobPressed.title)
  }

  render() {
    return (
      <JobCard
        detailView={true}
      />
    )
  }
};

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

const mapStateToProps = state => {
  return {
    jobPressed: state.jobPressed,
    jobId: null,
  }
}

const mapDispatchToProps = {
  getRelatedSkillsFromTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail)