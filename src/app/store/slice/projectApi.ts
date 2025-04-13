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
		generateProject: builder.mutation({
			query: prompt => ({
				url: 'https://openrouter.ai/api/v1/chat/completions',
				method: 'POST',
				headers: {
					Authorization:
						'Bearer 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',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'deepseek/deepseek-r1:free',
					messages: [{ role: 'user', content: prompt }],
					temperature: 0.1,
					max_tokens: 2000,
				}),
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
	useGenerateProjectMutation,
} = projectApi
