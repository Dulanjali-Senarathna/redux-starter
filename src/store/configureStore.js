import { createStore } from "redux";
import {devToolsEnhancer} from "redux-devtools-extension"
import reducer from "./bugs";



export default function configureStore(){
//getting store enhancer , allows store to talk to redux devtools
const store = createStore(reducer, devToolsEnhancer({trace:true}));
return store;
}