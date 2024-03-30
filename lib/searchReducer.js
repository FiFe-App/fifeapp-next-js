import { createSlice } from '@reduxjs/toolkit'

export const searchReducer = createSlice({
    name: 'search',
    initialState: {
        history: [],
    },
    reducers: {
        push: (state, action) => {
            const text = action.payload.toString()

            if (state.history.includes(text))
                state.history.splice(state.history.indexOf(text), 1)
            state.history.push(text)

            state.history = state.history.slice(0, 20)
        },
    },
})

export const { push } = searchReducer.actions

export default searchReducer.reducer
