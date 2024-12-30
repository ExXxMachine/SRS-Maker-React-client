import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface AuthResponse {
	token: string
	userId: string
	message?: string
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
	}),
})

export const { useLoginMutation, useRegisterMutation } = authApi
