import React from 'react';
import {shallow} from 'enzyme';
import { BluetoothDetail } from './BluetoothDetail';
import {bleDevices} from '../../__tests__/__fixtures__/bleDevices'
    
describe('BluetoothDetail', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <BluetoothDetail
          bleDevices={bleDevices}
          bleDeviceSelectedIndex={0}
        />)
      expect(component).toMatchSnapshot()
    });
  });
});