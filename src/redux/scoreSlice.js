import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    listStudent: [
        {
            id: nanoid(),
            hoTen: 'Nguyen Van Ba',
            toan: 8,
            ly: 9,
            hoa: 10         

        }
    ],
    listStudentEdit: [

    ]
}

const scoreSlice = createSlice({
    name: 'scoreSlice',
    initialState,
    reducers: {
        addStudent: (state, action) =>{
            state.listStudent.push(action.payload)
        },
        deleteStudent: (state, action) => {
            state.listStudent = state.listStudent.filter(item => item.id != action.payload)
        },
        editStudent: (state, action) =>{
            state.listStudent = action.payload
        }
    }
});

export const { addStudent, deleteStudent, editStudent} = scoreSlice.actions

export default scoreSlice.reducer