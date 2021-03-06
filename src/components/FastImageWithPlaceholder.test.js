import React from 'react';
import {shallow} from 'enzyme';
import FastImage from 'react-native-fast-image'
import FastImageWithPlaceholder from './FastImageWithPlaceholder';

describe('FastImageWithPlaceholder', () => {
    describe('Rendering', () => {
        it('should match to snapshot - with valid url', () => {
            const component = shallow(
              <FastImageWithPlaceholder
                source={{uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'}}
                style={{width: 50, height:50}}
                resizeMode={FastImage.resizeMode.contain}
              />)
            expect(component).toMatchSnapshot()
        });
        it('should match to snapshot - with invalid url', () => {
            const component = shallow(
              <FastImageWithPlaceholder
                style={{width: 50, height:50}}
              />)
            expect(component).toMatchSnapshot()
        });
    });
});