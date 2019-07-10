import React from 'react';
import {shallow} from 'enzyme';
import { JobList } from './JobList';
import {jobItems} from '../../__tests__/__fixtures__/jobsResponses'

const mockListJobs = jest.fn(); 

describe('JobList', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <JobList
          loading={false}
          jobs={jobItems}
          jobSelectedIndex={null}
          page={1}
          endReached={false}
          listJobs={mockListJobs}
        />)
      expect(component).toMatchSnapshot()
    });
    it('should match to snapshot -- with modal shown', () => {
      const component = shallow(
        <JobList
          loading={false}
          jobs={jobItems}
          jobSelectedIndex={1}
          page={1}
          endReached={false}
          listJobs={mockListJobs}
        />)
      expect(component).toMatchSnapshot()
    });
  });
});