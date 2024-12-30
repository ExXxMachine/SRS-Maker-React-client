import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './slice/authApi'
import { projectApi } from './slice/projectApi'
import projectReducer from './slice/projectSlice'

const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[projectApi.reducerPath]: projectApi.reducer,
		project: projectReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(projectApi.middleware),
})

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
