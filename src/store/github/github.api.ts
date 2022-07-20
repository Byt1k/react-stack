import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Repo, ServerResponse, User} from '../../models/models'

export const githubApi = createApi({
    reducerPath: 'github/api', // адрес в сторе, где будут храниться данные
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchUsers: build.query<User[], string>({
            query: (search) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (res: ServerResponse<User>) => res.items
        }),
        getUserRepos: build.query<Repo[], string>({
            query: (userLogin) => ({
                url: `users/${userLogin}/repos`
            })
        })
    })
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi
