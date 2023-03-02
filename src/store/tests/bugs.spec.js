import {addBug, bugAddedArrow} from '../bugs';
import { apiCallBegan } from '../api';

describe("bugsSlice", () =>{
    describe("actionCreators", () =>{
        it("addBug",() =>{
            const bug = {description: 'a'};
           const result = addBug(bug);
           const expected = {
            type: apiCallBegan.type,
            payload :{
                url : '/bugs',
                method: 'post',
                data : bug,
                onSuccess: bugAddedArrow.type
            }
           }

           expect(result).toEqual(expected);
        })
    })
})