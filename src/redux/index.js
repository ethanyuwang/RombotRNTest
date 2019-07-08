export const GET_JOBS = 'RombotRNTest/jobs/LOAD';
export const GET_JOBS_SUCCESS = 'RombotRNTest/jobs/LOAD_SUCCESS';
export const GET_JOBS_FAIL = 'RombotRNTest/jobs/LOAD_FAIL';
export const SET_JOB_SELECTED = 'RombotRNTest/jobs/SET_JOB_SELECTED' 
export const RESET_JOB_SELECTED = 'RombotRNTest/jobs/RESET_JOB_SELECTED'
export const GET_JOB_ID = 'RombotRNTest/jobId/LOAD';
export const GET_JOB_ID_SUCCESS = 'RombotRNTest/jobId/LOAD_SUCCESS';
export const GET_JOB_ID_FAIL = 'RombotRNTest/jobId/LOAD_FAIL';
export const GET_RELATED_SKILLS = 'RombotRNTest/relatedSkills/LOAD';
export const GET_RELATED_SKILLS_SUCCESS = 'RombotRNTest/relatedSkills/LOAD_SUCCESS';
export const GET_RELATED_SKILLS_FAIL = 'RombotRNTest/relatedSkills/LOAD_FAIL';

export default function reducer(
  state = {
    //axios
    loading: false,
    //jobs
    jobs: [],
    jobSelectedIndex: null,
    page: 1,
    endReached: false,
  }, action
) {
  switch (action.type) {
    case GET_JOBS:
      return { ...state, loading: true };
    case GET_JOBS_SUCCESS:
      return { ...state, loading: false, jobs: [...state.jobs, ...action.payload.data], endReached: !(action.payload.data.length > 0), page: state.page + 1 };
    case GET_JOBS_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case SET_JOB_SELECTED:
      return { ...state, jobSelectedIndex: action.payload.jobSelectedIndex };
    case RESET_JOB_SELECTED:
      return { ...state, jobSelectedIndex: null };
    case GET_JOB_ID:
      return { ...state, loading: true };
    case GET_JOB_ID_SUCCESS:
      const { data } = action.payload
      //validate result
      jobId = Array.isArray(data) ? (data[0] ? data[0].uuid : null) : null
      updatedJobs = updateObjectInArray(state.jobs, {index: action.meta.previousAction.meta.jobSelectedIndex, data: {jobId}})
      return { ...state, loading: false, jobs: updatedJobs};
    case GET_JOB_ID_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case GET_RELATED_SKILLS:
      return { ...state, loading: true };
    case GET_RELATED_SKILLS_SUCCESS:
      updatedJobs = updateObjectInArray(state.jobs, {index: action.meta.previousAction.meta.jobSelectedIndex, data: {relatedSkills: action.payload.data.skills}})
      return { ...state, loading: false, jobs: updatedJobs};
    case GET_RELATED_SKILLS_FAIL:
      console.log("GET_RELATED_SKILLS_FAIL", action)
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export function listJobs(page) {
  return {
    type: GET_JOBS,
    payload: {
      request: {
        url: `https://jobs.github.com/positions.json?page=${page}`
      }
    }
  };
}

export function setJobSelectedIndex(jobSelectedIndex) {
  return {
    type: SET_JOB_SELECTED,
    payload: {
      jobSelectedIndex
    }
  };
}

export function resetJobSelectedIndex() {
  return {
    type: RESET_JOB_SELECTED,
  };
}
 
export function getJobId(title, jobSelectedIndex) {
  return {
    type: GET_JOB_ID,
    meta: { jobSelectedIndex },
    payload: {
      request: {
        url: `http://api.dataatwork.org/v1/jobs/normalize?job_title=${title}`
      }
    }
  };
}

export function getRelatedSkills(jobId, jobSelectedIndex) {
  return {
    type: GET_RELATED_SKILLS,
    meta: { jobSelectedIndex },
    payload: {
      request: {
        url: `http://api.dataatwork.org/v1/jobs/${jobId}/related_skills`
      }
    }
  };
}

export function setJobSelectedIndexAndGetRelatedSkills(jobSelectedIndex) {
  return (dispatch, getState) => {
    //set jobSelectedIndex
    dispatch(setJobSelectedIndex(jobSelectedIndex))
    const jobSelected = getState().jobs[jobSelectedIndex]
    //if related skills is unavailable, fetch thru api
    if (!jobSelected.relatedSkills) {
      return dispatch(getJobId(jobSelected.title, jobSelectedIndex)).then(() => {
        const jobSelectedUpdated = getState().jobs[getState().jobSelectedIndex]
        return dispatch(getRelatedSkills(jobSelectedUpdated.jobId, jobSelectedIndex))
      })
    }
  }
}


//helper function
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      //keep it as-is and return item
      return {...item}
    }

    // Otherwise return an updated value
    return {...item, ...action.data}
  })
}





