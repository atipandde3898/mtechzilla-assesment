import React, { useEffect, useState } from 'react';

const Fet = () => {
    const [username, setUsername] = useState();
    const url = `https://api.github.com/users/${username}`;

    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]); 
    const [gists, setGists] = useState([]);
    const [createdAt, setCreatedAt] = useState(null);
    
    
    const getUser = async () => {
        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await resp.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getRepos = async () => {
        try {
            const resp = await fetch(`${url}/repos`);


            const data = await resp.json();
            setRepos(data);
        } catch (error) {
            console.error(error);
        }
    }
    const getGists = async () => {
        try {
            const resp = await fetch(gistsUrl);

            if (!resp.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await resp.json();
            setGists(data);
        } catch (error) {
            console.error(error);
        }
    }

    

    useEffect(() => {
        getUser();
        getRepos()
    }, []);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }


    return (
        <div className='bg-[url(./assets/gitt.jpg)] h-screen flex items-center justify-center flex-col bg-cover bg-no-repeat'>
             <div>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={handleUsernameChange} className='rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white mb-8 mr-3 text-center'
                />
                <button onClick={getUser} className='bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl text-center w-20 text-white font-bold'>Get Data</button>
            </div>
            <div className='flex items-center justify-center border-solid h-72 w-96 bg-gradient-to-bl from-purple-500 via-pink-500 to-purple-500 rounded-2xl flex-row'>
                <div className='bg-white rounded-full h-36 w-36 overflow-hidden mr-9 flex items-center justify-center bg-contain'>
                    {userData && <img src={userData.avatar_url} alt="" className='h-32 w-32 ' />}
                </div>
                <div>
                    <h1>{userData && userData.name}</h1>
                    <p>{userData && userData.bio}</p>
                    <ul>
                    <li className='text-white font-semibold'>Created at: {createdAt && new Date(createdAt).toLocaleDateString()}</li>
                        <li className='font-bold text-white '>Followers: {userData && userData.followers}</li>
                        <li className='font-bold text-white '>Following: {userData && userData.following}</li>
                        <li className='font-bold text-white '>Repos: {userData && userData.public_repos}</li>
                    </ul>
                    <div>
                        <h2 className='text-white'>Repositories:</h2>
                        <ul>
                            {repos.map((repo) => (
                                <li key={repo.id} className='text-white'>
                                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-bold text-white'>Gists:</h2>
                        <ul>
                            {gists.map((gist) => (
                                <li key={gist.id} className='text-white'>
                                    <a href={gist.html.url} target="_blank" rel="noopener noreferrer">
                                        {gist.description || 'No description'}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fet;
