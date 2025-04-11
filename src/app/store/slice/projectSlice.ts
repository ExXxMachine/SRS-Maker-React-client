import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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
		setProjectData(state, action: PayloadAction<ProjectChapter[]>) {
			// Добавляем уникальные ID для глав и полей, если их нет
			const updatedData = action.payload.map(chapter => ({
				...chapter,
				chapterId: chapter.chapterId || uuidv4(),
				fields: chapter.fields.map(field => ({
					...field,
					fieldId: field.fieldId || uuidv4(),
				})),
			}))
			state.data = updatedData
		},
		updateChapterName(
			state,
			action: PayloadAction<{ chapterIndex: number; chapterName: string }>
		) {
			const { chapterIndex, chapterName } = action.payload
			if (state.data[chapterIndex]) {
				state.data[chapterIndex].chapterName = chapterName
			}
		},
		updateFieldName(
			state,
			action: PayloadAction<{
				chapterIndex: number
				fieldIndex: number
				fieldName: string
			}>
		) {
			const { chapterIndex, fieldIndex, fieldName } = action.payload
			if (state.data[chapterIndex]?.fields[fieldIndex]) {
				state.data[chapterIndex].fields[fieldIndex].fieldName = fieldName
			}
		},
		updateFieldValue(
			state,
			action: PayloadAction<{
				chapterIndex: number
				fieldIndex: number
				fieldValue: string
			}>
		) {
			const { chapterIndex, fieldIndex, fieldValue } = action.payload
			if (state.data[chapterIndex]?.fields[fieldIndex]) {
				state.data[chapterIndex].fields[fieldIndex].fieldValue = fieldValue
			}
		},
		updateProjectData(state, action: PayloadAction<ProjectChapter[]>) {
			state.data = action.payload
		},

	},
})

export const {
	setProjectName,
	setProjectData,
	updateChapterName,
	updateFieldName,
	updateFieldValue,
	updateProjectData,
} = projectSlice.actions

export default projectSlice.reducer
