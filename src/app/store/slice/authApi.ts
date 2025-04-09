import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface AuthResponse {
	token: string
	userId: string
	message?: string
}

interface UserResponse {
	success: boolean
	user: {
		id: string
		username: string
		roles: string[]
	}
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }),
	endpoints: builder => ({
		login: builder.mutation<
			AuthResponse,
			{ username: string; password: string }
		>({
			query: credentials => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
		}),
		register: builder.mutation<
			AuthResponse,
			{ username: string; password: string }
		>({
			query: credentials => ({
				url: 'registration',
				method: 'POST',
				body: credentials,
			}),
		}),
		checkAuth: builder.query<UserResponse, void>({
			query: () => ({
				url: 'me',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${
						document.cookie
							.split('; ')
							.find(row => row.startsWith('token='))
							?.split('=')[1]
					}`, 
				},
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useCheckAuthQuery,
} = authApi
