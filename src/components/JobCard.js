import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import FastImageWithPlaceholder from './FastImageWithPlaceholder';
import Colors from '../res/Colors'
import { HEADER_INNER_HEIGHT, STATUS_BAR_HEIGHT } from '../utils'
import { resetJobSelectedIndex } from '../redux';

class JobCard extends Component {

  _renderSkills = () => {
    let { loading, jobs, jobSelectedIndex, detailView } = this.props
    if (detailView) {
      if (loading) {
        return (
          <View style={{margin: 16}}>
            <ActivityIndicator/>
          </View>
        )
      }
      else {
        if (jobs[jobSelectedIndex].relatedSkills && Array.isArray(jobs[jobSelectedIndex].relatedSkills)) {
          return (
            <View style={styles.skillSectionContainer}>
              <Text style={[styles.content2, {margin: 8}]}>Skills needed</Text>
              <View style={styles.skillContainer}>
                {jobs[jobSelectedIndex].relatedSkills.slice(0, 12).map((skill, index) => (
                  <Text key={skill.skill_uuid} style={styles.skill}>{skill.skill_name}</Text>
                ))}
              </View>
            </View>
          )
        }
        else {
          console.log("jobs[jobSelectedIndex].relatedSkills unavailable: ", jobs[jobSelectedIndex].relatedSkills)
        }        
      }
    }
  } 

  _renderCard = () => {
    //jobs[jobSelectedIndex] is provided by store, job is provided by JobList
    let { job, jobs, jobSelectedIndex, detailView } = this.props
    job = detailView ? jobs[jobSelectedIndex] : job

    return (
      <View style={detailView ? styles.cardWrapperFullScreen : styles.cardWrapper}>

        <View style={styles.headerWrapper}>
          <View style={styles.blueDot}/>
          <Text style={styles.mobileApplyText}>MOBILE APPLY</Text>
        </View>

        <View style={styles.verticalContainer}>
          <FastImageWithPlaceholder
            source={job.company_logo === null ? undefined : {uri: job.company_logo}}
            style={styles.logoImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={styles.title}
            numberOfLines={1}>
            {job.title}
          </Text>
          <View style={{flexDirection: "row", width: '90%', justifyContent: 'center'}}>
            <Text style={styles.content}>{job.company}</Text>
            <Text style={styles.content}> in </Text>
            <Text style={styles.content}>{job.location}</Text>
          </View>
        </View>

        <View style={styles.separator}/>

        <View style={styles.footerContainer}>
          <View style={styles.bulletPointContainer}>
            <Text style={styles.content2}>Type</Text>
            <Text style={styles.content}>{job.type}</Text>
          </View>
          <View style={styles.bulletPointContainer}>
            <Text style={styles.content2}>Date</Text>
            <Text style={styles.content}>{job.created_at}</Text>
          </View>
        </View>

        {detailView && (<View style={styles.separator}/>)}

        {detailView && (
          <ScrollView>
            {this._renderSkills()}
            {detailView && (<View style={styles.separator}/>)}
            <HTMLView
              value={"<div>" + job.description + "<div>"}
              stylesheet={styles}
            />
          </ScrollView>
        )}

      </View>
    )
  }

  _renderTouchableCardIOS = (
    <TouchableOpacity {...this.props}>
      {this._renderCard()}
    </TouchableOpacity>
  )

  _renderTouchableCardAndroid = (
    <TouchableNativeFeedback {...this.props}>
      {this._renderCard()}
    </TouchableNativeFeedback>
  )

  

  _renderScrollableModal = () => {
    return (
      <Modal
        style={styles.modal}
        isVisible={this.props.jobSelectedIndex!==null}
        onStartShouldSetPanResponder={(evt, gestureState) => (evt.nativeEvent.pageY < Dimensions.get('window').height*0.3)}
        swipeDirection="down"
        onSwipeComplete={() => this.props.resetJobSelectedIndex()}
        propagateSwipe={true}>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Icon
              name="chevron-down"
              type='evilicon'
              color="#ebebeb"
              size={60}
            />
          </View>
          {this._renderCard()}
        </View>
      </Modal>
    )
  }

  render() {
    return this.props.detailView ? this._renderScrollableModal() : (Platform.OS === 'ios' ? this._renderTouchableCardIOS : this._renderTouchableCardAndroid)
  }
}

const LOGO_IMAGE_HEIGHT = 60

const BACKGROUND_COLOR_2 = "#ebebeb"

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    margin: 0,
    marginTop: STATUS_BAR_HEIGHT + 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardWrapper: {
    borderRadius: 16,
    margin: 8,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  cardWrapperFullScreen: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    height: HEADER_INNER_HEIGHT,
    backgroundColor: "#fafbfc",
    //padding: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginTop: 8,
    marginBottom: 0
  },
  blueDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.blue 
  },
  mobileApplyText: {
    fontSize: 13,
    color: Colors.green,
    marginLeft: 8,
  },
  logoImage: {
    width: LOGO_IMAGE_HEIGHT,
    height: LOGO_IMAGE_HEIGHT,
  },
  verticalContainer: {
    alignItems: 'center',
    margin: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
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
    width: "100%",
    backgroundColor: "#ebebeb",
  },
  footerContainer: {
    padding: 8,
    backgroundColor: "#fafbfc",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    margin: 8
  },
  skillSectionContainer: {
    margin: 8,
    marginLeft: 16,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 13,
    color: '#333',
    margin: 8,
    marginVertical: 4,
  },
  div: {
    padding: 16,
    backgroundColor: "#fafbfc",
  }
})

const mapStateToProps = state => {
  return {
    loading: state.loading,
    jobs: state.jobs,
    jobSelectedIndex: state.jobSelectedIndex,
  }
}

const mapDispatchToProps = {
  resetJobSelectedIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCard)
