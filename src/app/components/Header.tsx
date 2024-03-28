import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
	const [username, setUsername] = useState("");
  const router = useRouter();

	useEffect(() => {
	const username = localStorage.getItem('username');
		if (username) setUsername(username);
	}, [])

  const logout = () => {
    localStorage.removeItem('username')
    router.push('/')
  }

	return (
		<header className="text-zinc-900 flex flex-col md:flex-row items-center justify-between px-5 py-3 space-y-4">
			<h1 className="text-zinc-600 text-xl md:w-2/4 w-full text-center">Welcome back, <span className="font-bold">{username}</span></h1>
			{ username && <button
				className="text-white bg-zinc-700 hover:bg-zinc-900 px-5 py-2 rounded-md font-medium "
				onClick={logout}>
				Logout
			</button>
			}
		</header>
	)
}

export default Header