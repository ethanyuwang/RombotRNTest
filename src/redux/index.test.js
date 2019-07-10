import {
	listJobs,
	setJobSelectedIndex,
	resetJobSelectedIndex,

	GET_JOBS,
	GET_JOBS_SUCCESS,
	GET_JOBS_FAIL,
	SET_JOB_SELECTED,
	RESET_JOB_SELECTED,
} from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create();
const middlewares = [thunk, axiosMiddleware(client)]
const mockStore = configureMockStore(middlewares)
//mockAxios = new MockAdapter(axios);

describe('actions', () => {
  it('should create actions to set jobSeelectedIndex and unset', () => {
    const jobSelectedIndex = 1
    const expectedAction = {
      type: SET_JOB_SELECTED,
      payload: {
      	jobSelectedIndex
      }
    }
    expect(setJobSelectedIndex(jobSelectedIndex)).toEqual(expectedAction)
  });
  it('should create an action to reset jobSeelectedIndex', () => {
    const expectedAction = {
      type: RESET_JOB_SELECTED,
    }
    expect(resetJobSelectedIndex()).toEqual(expectedAction)
  })
})


/*describe('async actions', () => {
  beforeAll(() => {
        mockAxios = new MockAdapter(client)
   })

  it('creates GET_JOBS_SUCCESS when fetching jobs has been done', () => {

  	mockAxios.onGet('https://jobs.github.com/positions.json?page=1').reply(200, []);
    
    const expectedActions = [
      { type: GET_JOBS, payload: {} },
      { type: GET_JOBS_SUCCESS, payload: {data: []}, meta: {} }
    ]
    const store = mockStore({ jobs: [] })

    return store.dispatch(listJobs(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})*/