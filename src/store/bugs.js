import { createSlice} from "@reduxjs/toolkit";
//reducer
//[] simple array to represent store
// with if else
let lastId=0;

const slice = createSlice({
    name : 'bugs',
    initialState: [],
    reducers : {
        bugAddedArrow: (bugs,action) => {
            bugs.push({
                id : ++lastId,
                description : action.payload.description,
                resolved : false
            })
        },

        bugResolved: (bugs, action) =>{
            const index = bugs.findIndex(bug=> bug.id === action.payload.id);
            bugs[index].resolved = true;
        }
    }
});

export const {bugAddedArrow, bugResolved} = slice.actions
export default slice.reducer;

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