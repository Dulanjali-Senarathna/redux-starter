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
import {bugAddedArrow,bugResolved,getUnresolvedBugs} from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();

// store.state = 1;
// console.log(store);

store.subscribe(()=>{
    console.log("Store changed!");
});

store.dispatch(projectAdded({name: "Project 1"}));

  store.dispatch(bugAddedArrow({description:"Bug 1"}));
  store.dispatch(bugAddedArrow({description:"Bug 2"}));
  store.dispatch(bugAddedArrow({description:"Bug 3"}));
  store.dispatch(bugResolved({id:1}));
console.log(store.getState());

//way 1
//filter unresolved bugs
//const unResolved = store.getState().entities.bugs.filter(bug=> !bug.resolved );
//way2
const unResolved = getUnresolvedBugs(store.getState());
console.log(unResolved);


