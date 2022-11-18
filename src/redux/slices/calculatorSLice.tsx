import { createSlice,PayloadAction } from "@reduxjs/toolkit"
const initialState : any ={history : []};
const calculatorSlice = createSlice({
    name : 'calculator',
    initialState,
    reducers : {
        addHistory : (state,action : PayloadAction<any>) => {
            state = state.history.push(action.payload)
        }
    }
});
export default calculatorSlice;