import React from 'react';
import {shallow} from 'enzyme';
import { BluetoothList } from './BluetoothList';
import { BleManager } from 'react-native-ble-plx'
import {bleDevices} from '../../__tests__/__fixtures__/bleDevices'

let mockConstructor = jest.fn();
let mockStartDeviceScan = jest.fn();
let mockStopDeviceScan = jest.fn();


jest.mock('react-native-ble-plx');

/*jest.mock('BleManager', () => ({
    constructor: mockConstructor,
    startDeviceScan: mockStartDeviceScan,
    stopDeviceScan: mockStopDeviceScan
}));*/
    
describe('BluetoothList', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <BluetoothList
          bleDevices={bleDevices}
          bleDeviceSelectedIndex={0}
        />)
      expect(component).toMatchSnapshot()
    });
  });
});