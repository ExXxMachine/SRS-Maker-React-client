import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
	reducerPath: 'projectApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/projects' }), 
	endpoints: builder => ({
		createProject: builder.mutation({
			query: newProject => ({
				url: 'create',
				method: 'POST',
				body: newProject,
			}),
		}),
		getProjectsByUserId: builder.query({
			query: userId => `user/${userId}`, 
		}),
		getProjectById: builder.query({
			query: projectId => `/${projectId}`, 
		}),
		updateProject: builder.mutation({
			query: project => ({
				url: `/${project._id}`,
				method: 'PUT',
				body: project, 
			}),
		}),
		deleteProject: builder.mutation({
			query: projectId => ({
				url: `/${projectId}`, 
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useCreateProjectMutation,
	useGetProjectsByUserIdQuery,
	useGetProjectByIdQuery,
	useUpdateProjectMutation,
	useDeleteProjectMutation, 
} = projectApi
