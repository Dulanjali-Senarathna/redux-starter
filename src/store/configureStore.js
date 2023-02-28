import { configureStore } from "@reduxjs/toolkit";
import reducer from "./projects";



export default function (){
//getting store enhancer , allows store to talk to redux devtools
return configureStore({
    reducer: reducer
});
}