import React, {useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)

    const debounced = useDebounce(search) // кастомный хук для оптимизации запросов

    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3, // условия, когда не надо делать запрос
        refetchOnFocus: true, // автоматический запрос, после возвращения на страницу
    })

    const [fetchrepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    const clickHandler = (userLogin: string) => {
        fetchrepos(userLogin)
        setDropdown(false)
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen ">
            { isError && <p className="text-center text-red-600">Something went wrong...</p> }

            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                        e.target.value.length > 2 ? setDropdown(true) : setDropdown(false)
                    }}
                />
                {dropdown && <div className="z-[100] absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-auto
                                shadow-md bg-white py-2">
                    { isLoading && <p className="text-center">Loading...</p> }
                    { data?.map((user) => (
                        <div
                            key={user.id}
                            className="hover:bg-gray-500 hover:text-white transition-colors cursor-pointer px-4 py-2
                                        flex items-center gap-2"
                            onClick={() => clickHandler(user.login)}
                        >
                            <img src={user.avatar_url} className="w-[30px] h-[30px] rounded-[50%]" alt="avatar"/>
                            {user.login }
                        </div>
                    )) }
                </div>}
                <div className="container relative z-0">
                    { areReposLoading &&  <p className="text-center">Repos are loading...</p> }
                    { repos?.map(repo => <RepoCard repo={repo} key={repo.id} /> )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;