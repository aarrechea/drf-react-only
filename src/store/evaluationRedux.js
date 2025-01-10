// Imports
import { createSlice } from "@reduxjs/toolkit";



// Initial state
const evaluationInitialState = {
    id:'',
    processessEvaluated:'',
    finalized:false,
    score:0,
    company:'',
    relation:''
}



// User slice
const evaluationSlice = createSlice({
    name: 'evaluation',
    initialState: evaluationInitialState,
    reducers: {
        load(state, action) {
            state.id = action.payload.id;
            state.processessEvaluated = action.payload.processessEvaluated;
            state.finalized = action.payload.finalized;
            state.score = action.payload.score;
            state.company = action.payload.company;
            state.relation = action.payload.relation;
        }
    }
})



// Exports
export const navBarActions = evaluationSlice.actions;
export default evaluationSlice.reducer;

