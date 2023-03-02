import { createSlice} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from './api';
import moment from 'moment'
import axios from "axios";
//reducer
//[] simple array to represent store
// with if else

const slice = createSlice({
    name : 'bugs',
    //1st implementation initial state is empty array. now change it to list of objects
    //initialState: [],
    initialState:{
        list: [],
        loading: false,
        lastFetch: null
    },

    reducers : {

        bugsRequested: (bugs, action) =>{
            bugs.loading = true;
        },

        bugsReceived: (bugs, action) =>{
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },

        bugsRequestFailed: (bugs, action) =>{
            bugs.loading = false;
            
        },
        //assign a bug to user

        bugAssignedToUser: (bugs, action) =>{
            const {id:bugId , userId} = action.payload;
            const index = bugs.list.findIndex(bug=> bug.id === bugId);
            bugs.list[index].userId = userId;
        },

        //command - addBug
        // event - bugAdded
        bugAddedArrow: (bugs,action) => {
            bugs.list.push(action.payload)
        },

        //command - bugResolve
        // event - bugResolved
        bugResolved: (bugs, action) =>{
            const index = bugs.list.findIndex(bug=> bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        }
    }
});



//selector for filter unresolved bugs - without memoization
//export const getUnresolvedBugs = state => state.entities.bugs.filter(bug=> !bug.resolved);

//create memoization selector
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    //we can pass multiple selector functions in here
    state => state.entities.projects,
    (bugs, projects) => bugs.list.filter(bug=> !bug.resolved) //  if bugs not change, result is not execute again
);

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs, //output of this, is input of the rrsult function.(below one)
    bugs => bugs.list.filter(bug=> bug.userId === userId)
)
export const {bugAddedArrow, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed} = slice.actions
export default slice.reducer;

//Action creators
const url =  "/bugs";
export const loadBugs = ()=> (dispatch,getState) =>{
   const {lastFetch} = getState().entities.bugs;
    
  const diffInMinutes =  moment().diff(moment(lastFetch),'minutes');
  if(diffInMinutes < 10) return;

   dispatch (apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailed.type
  }));
};

//make an api call
//promise resolved => dispatch(success)
export const addBug = bug => {

    try{
        const response = axios.post(url,bug);
        dispatch(bugAddedArrow(bug));
    }
    catch(error){
        dispatch({type:'error'});
    }
   
}

// export const addBug = bug => apiCallBegan({

//    url,
//    method: "post",
//    data: bug,
//    onSuccess: bugAddedArrow.type
// });

export const resolveBug = id => apiCallBegan({
    //bugs
    // PATCH /bugs/1
    url : url + '/' + id,
    method: 'patch',
    data : {resolved : true},
    onSuccess: bugResolved.type
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    //bugs
    // PATCH /bugs/1
    url : url + '/' + bugId,
    method: 'patch',
    data : {userId},
    onSuccess : bugAssignedToUser.type
});

// const bugUpdated = createAction("bugUpdated");
// console.log(bugUpdated({id:1}));

//action types - old code
// const BUG_ADDED = "bugAdded";
//  const BUG_REMOVED = "bugRemoved";
//  const BUG_RESOLVED = "bugResolved";

//action creators - old without arrow function
// export function bugAdded(description){
//     return {
//         type: BUG_ADDED ,
//         payload: {
//         description: description
//         }
//     };
// };

//re-write above code using arrow function
// export const bugAddedArrow = description => ({
    
//         type: BUG_ADDED ,
//         payload: {
//         description: description //can re write using short hand syntax - description
//         }
    
// });

//re - write above code with redux toolkit
//export const bugAddedArrow = createAction("bugAdded");


// export function bugRemoved(id){
//     return {
//         type: BUG_REMOVED ,
//         payload: {
//         id:id
//         }
//     };
// };

//re - write above code with redux toolkit
//export const bugRemoved = createAction("bugRemoved");

// export function bugResolved(id){
//     return {
//         type: BUG_RESOLVED,
//         payload : {
//             id:id
//         }
//     }
// }

//re - write above code with redux toolkit

//export const bugResolved = createAction("bugResolved");



// export default createReducer([],{
//     [bugAddedArrow.type] : (bugs,action) => {
//        bugs.push({
//         id : ++lastId,
//         description : action.payload.description,
//         resolved : false
//     })
//     },

//     [bugResolved.type] : (bugs, action) =>{
//        const index = bugs.findIndex(bug=> bug.id === action.payload.id);
//        bugs[index].resolved = true;
//     }
// });

//without toolkit
// export default function reducer(state = [], action){
//     if(action.type === bugAddedArrow.type)
//     return[
//         ...state,
//         {
//             id : ++lastId,
//             description : action.payload.description,
//             resolved : false
//         }
//     ];
//     else if(action.type === bugRemoved.type)
//     return state.filter(bug=> bug.id !== action.payload.id);

//     else if(action.type === bugResolved.type)
//     return state.map(bug=> bug.id !== action.payload.id ? bug : {...bug , resolved: true});

//     return state;
// }

//with switch

// let lastId=0;

// function reducer(state = [], action){
//     switch (action.type){
//         case "bugAdded":
//         return[
//         ...state,
//         {
//             id : ++lastId,
//             description : action.payload.description,
//             resolved : false
//         }
//     ];
//     case "bugRemoved":
//         return state.filter(bug=> bug.id !== action.payload.id);
//     default : return state;
//     }
   
// }
