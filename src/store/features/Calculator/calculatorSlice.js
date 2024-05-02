import { createSlice } from '@reduxjs/toolkit';
import { convertArrToString, evaluateExpression } from '../../../utils/Calculator/function';

const initialState = {
    error: '',
    arr: [],
    result: ''
};

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        add: (state, action) => {
            state.arr = [...state.arr, action.payload.value];
        },
        clear: (state) => {
            state.arr = []
        },
        calculateReducer: (state, action) => {
            state.result = action.payload
        },
        deleteIndexReducer: (state, action) => {
            state.arr = action.payload.newArr
        }
    },
});

export const { add, clear, calculateReducer, deleteIndexReducer } = calculatorSlice.actions;

// Modified calculate function
export const calculate = (arr) => async (dispatch) => {
    try {
        if (!arr || arr.length === 0) {
            throw new Error('Array is empty or undefined');
        }
        if (arr.includes('clear')) {
            arr = arr.filter(item => item !== 'clear'); // Update arr to exclude 'clear'
        }
        console.log(arr);
        const answer = evaluateExpression(convertArrToString(arr));
        dispatch(calculateReducer(answer));
        // Additional logic if needed
    } catch (error) {
        console.error(error.message);
    }
};


export const pushArr = (value) => async (dispatch) => {
    try {
        dispatch(add(value));
        // Additional logic if needed
    } catch (error) {
        console.error(error.message);
    }
};

export const clearArr = () => async (dispatch) => {
    try {
        dispatch(clear());
        // Additional logic if needed
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteIndex = (arr, deleteIndex) => async (dispatch) => {
    try {
        let newArr = [...arr];

        // Remove the item at the specified index
        newArr.splice(deleteIndex, 1);

        dispatch(deleteIndexReducer({ newArr })); // Dispatch the action with the modified array
        // Additional logic if needed
    } catch (error) {
        console.error(error.message);
    }
};


export default calculatorSlice.reducer;
