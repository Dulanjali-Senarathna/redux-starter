import * as actions from './actionTypes';

export function bugAdded(description){
    return {
        type: actions.BUG_ADDED ,
        payload: {
        description: "Bug1"
        }
    };
};

//re-write above code using arrow function
export const bugAddedArrow = description => ({
    
        type: actions.BUG_ADDED ,
        payload: {
        description: "Bug1"
        }
    
});

export function bugRemoved(id){
    return {
        type: actions.BUG_REMOVED ,
        payload: {
        id:1
        }
    };
};

