import React from 'react';
import {shallow} from 'enzyme';
import {JobCard} from './JobCard';

import { jobItem, jobItemsWithSkills } from '../../__tests__/__fixtures__/jobsResponses'



    
describe('JobCard', () => {
  describe('Rendering', () => {
    it('should match to snapshot - as a list card', () => {
      const component = shallow(
        <JobCard
          job={jobItem}
        />)
      expect(component).toMatchSnapshot()
    });
    it('should match to snapshot - as a full screen card, with skills', () => {
      const component = shallow(
        <JobCard
          jobs={jobItemsWithSkills}
          jobSelectedIndex={0}
          detailView={true}
        />)
      expect(component).toMatchSnapshot()
    });
    it('should match to snapshot - as a full screen card, without skills', () => {
      const component = shallow(
        <JobCard
          jobs={jobItemsWithSkills}
          jobSelectedIndex={1}
          detailView={true}
        />)
      expect(component).toMatchSnapshot()
    });
  });
  describe('Interaction', () => {
    describe('onPress', () => {
      it('should call onPress', () => {
        const mockOnPress = jest.fn(); 
        const component = shallow(
          <JobCard 
            job={jobItem}
            onPress={mockOnPress} 
          />);
        const instance = component.instance();

        instance.props.onPress();

        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });
    });
  });
});