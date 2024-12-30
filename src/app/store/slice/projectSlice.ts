import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProjectField {
	_id: string
	fieldName: string
	fieldValue: string
}

interface ProjectState {
	name: string
	data: ProjectField[]
}

const initialState: ProjectState = {
	name: '',
	data: [],
}

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setProjectName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		setProjectData(state, action: PayloadAction<ProjectField[]>) {
			state.data = action.payload
		},
		updateProjectField(
			state,
			action: PayloadAction<{ index: number; value: string }>
		) {
			const { index, value } = action.payload
			if (state.data[index]) {
				state.data[index].fieldValue = value
			}
		},
	},
})

export const { setProjectName, setProjectData, updateProjectField } =
	projectSlice.actions
export default projectSlice.reducer
