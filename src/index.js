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

import store from "./customeStore";
import * as actions from './actions';

// store.state = 1;
// console.log(store);

store.dispatch(actions.bugAdded("Bug 1"));
console.log(store.getState());


