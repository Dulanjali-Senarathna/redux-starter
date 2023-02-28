import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";



export default function (){
//getting store enhancer , allows store to talk to redux devtools
return configureStore({
    reducer: reducer,
    middleware : [logger]
});
}