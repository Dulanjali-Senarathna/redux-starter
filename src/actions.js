import * as actions from './actionTypes';

export function bugAdded(description){
    return {
        type: actions.BUG_ADDED ,
        payload: {
        description: description
        }
    };
};

//re-write above code using arrow function
export const bugAddedArrow = description => ({
    
        type: actions.BUG_ADDED ,
        payload: {
        description: description //can re write using short hand syntax - description
        }
    
});

export function bugRemoved(id){
    return {
        type: actions.BUG_REMOVED ,
        payload: {
        id:id
        }
    };
};

export function bugResolved(id){
    return {
        type: actions.BUG_RESOLVED,
        payload : {
            id:id
        }
    }
}

