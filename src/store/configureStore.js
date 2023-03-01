import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";



export default function (){
//getting store enhancer , allows store to talk to redux devtools
return configureStore({
    reducer: reducer,
    middleware : [
        ...getDefaultMiddleware(),
        logger({destination : "console"}),
        toast
        
    ]
});
}