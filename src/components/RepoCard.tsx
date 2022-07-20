import React, {useState} from 'react';
import {Repo} from "../models/models";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";

const RepoCard = ({repo}: {repo: Repo}) => {
    const {favourites} = useAppSelector(state => state.github)

    const {addFavourite, removeFavourite} = useActions()

    const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addFavourite(repo.html_url)
    }

    const removeFromFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeFavourite(repo.html_url)
    }

    return (
        <a href={repo.html_url} target="_blank" className="block border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer">
            <h2 className="text-lg font-bold">{repo.full_name}</h2>
            <p className="text-sm">
                Forks: <span className="font-bold mr-2">{repo.forks}</span>
                Watchers: <span className="font-bold">{repo.watchers}</span>
            </p>
            <p className="text-sm font-thin">{repo?.description}</p>

            {favourites.some(r => r === repo.html_url)
                ? <button
                    className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
                    onClick={removeFromFavourite}
                >Remove</button>
                : <button
                    className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
                    onClick={addToFavourite}
                >Add</button>
            }
        </a>
    )
}

export default RepoCard;