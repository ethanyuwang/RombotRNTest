import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image'

export default class FastImageWithPlaceholder extends PureComponent {
	constructor(props) {
    super(props)
    this.state = {
      loadFinished: this.props.source ? false : true,
    }
  }

	render() {
		let {width, height} = this.props.style
		let containerSize = {
			width,
			height
		}
		return (
			<View style={this.props.style}>
        {this.props.source ? (
        	<FastImage
	        	{...this.props}
	          onLoadEnd={() => this.setState({loadFinished: true})}
	        />
	      ):(
        	<View style={[styles.container, containerSize]}/>
        )} 
        {!this.state.loadFinished && (
        	<View style={[styles.container, containerSize]}>
	        	<ActivityIndicator/>
	        </View>
        )}

      </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
  	position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  }
})

FastImageWithPlaceholder.propTypes = {
  source: PropTypes.object,
  style: PropTypes.object,
}