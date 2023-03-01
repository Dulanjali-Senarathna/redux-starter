// import store from "./store";
// import { bugAdded, bugRemoved, bugResolved } from "./actions";

// const unsubscribe = store.subscribe(()=>{
//     console.log("Store changed!", store.getState());
// });

// store.dispatch(bugAdded("Bug 1"));

// unsubscribe();

// store.dispatch(bugResolved(1));

// store.dispatch(bugRemoved(1));

// console.log(store.getState());

import {projectAdded} from './store/projects';
import {bugAddedArrow,bugResolved, bugAssignedToUser ,getUnresolvedBugs, getBugsByUser} from './store/bugs';
import configureStore from './store/configureStore';
import { userAdded } from './store/users';
import * as actions from './store/api';

//without redux toolkit call middleware
import { applyMiddleware } from 'redux';
//const storenew = createStore(applyMiddleware(logger));

const store = configureStore();

store.dispatch(actions.apiCallBegan({
  url: "/bugs",
  onSuccess: "bugsReceived",
  onError: actions.apiCallFailed.type
}));

//  store.dispatch((dispatch, getState) =>{
//      dispatch({type: 'bugsReceived', bugs: [1,2,3]});
//      console.log(getState());
//  });

// store.dispatch({
//     type:"error",
//     payload: {message: "An error occured"}
// });



// store.state = 1;
// console.log(store);

store.subscribe(()=>{
    console.log("Store changed!");
});

  store.dispatch(userAdded({name: "User 1"}));
  store.dispatch(userAdded({name: "User 2"}));
  store.dispatch(projectAdded({name: "Project 1"}));
  store.dispatch(bugAddedArrow({description:"Bug 1"}));
  store.dispatch(bugAddedArrow({description:"Bug 2"}));
  store.dispatch(bugAddedArrow({description:"Bug 3"}));
  store.dispatch(bugAssignedToUser({bugId: 1, userId:1}));
  store.dispatch(bugResolved({id:1}));

console.log(store.getState());

//way 1
//filter unresolved bugs
//const unResolved = store.getState().entities.bugs.filter(bug=> !bug.resolved );
//way2
const unResolved = getUnresolvedBugs(store.getState());
console.log(unResolved);
//if const b = getUnresolvedBugs(store.getState());
//console.log(unResolved === b) return false.it means when re call this function returns diffrent outputs. to avoid this, we use memoization
//to implement this we use librabry called reselect
//after using memization, abouve output return true

//get bugs for given  user
const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);



