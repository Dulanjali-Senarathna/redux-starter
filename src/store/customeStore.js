import reducer  from "./reducer";

function createStore(reducer){
    let state;
    let listenrs = [];

    function subscribe(listener){
        listenrs.push(listener);
    }

    function dispatch(action){
       state = reducer(state, action);

       for(let i =0; i<listenrs.length;i++)
       listenrs[i]();
    }
    
    function getState(){
        return state
    }
    return {
        subscribe,
        dispatch,
       getState
    };
}

export default createStore(reducer);