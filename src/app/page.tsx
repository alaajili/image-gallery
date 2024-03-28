"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
	const [data, setData] = useState({ username: '', password: '' });
	const [message, setMessage] = useState('');
	const router = useRouter()

	const handleChanges = (e: any) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
	
		const res = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const json = await res.json();

		if (json.status === 'success') {
			localStorage.setItem('username', data.username);
			router.push('/images');
		}
		else {
			setMessage(json.message);
		}
	};

	return (
		<div className="lg:flex lg:items-center lg:justify-center w-full lg:h-screen lg:-z-50 lg:bg-gradient-to-b lg:from-gray-400 lg:via-gray-300 lg:to-gray-200">
			<section className="relative flex mx-auto w-ful lg:w-10/12 lg:h-11/12 lg:shadow-xl rounded-lg">
				<aside className="rounded-l-lg p-5 flex flex-col space-y-6 items-center justify-center min-h-[70vh] w-full lg:w-1/2 lg:bg-white">
					<div className="space-y-1 mx-auto text-center">
						<h1 className="font-bold text-3xl tracking-wide text-gray-900">Welcome back</h1>
						<p className="text-gray-500 font-medium">Welcome back! Please enter your details</p>
					</div>
					{message && <p className="text-rose-600 text-lg font-medium">{message}</p>}
					<form
						className="flex flex-col w-4/5 max-w-80 mx-auto space-y-4"
						onSubmit={handleSubmit}>
						<div className="flex flex-col w-full space-y-2">
							<label
								className="text-md font-bold text-black tracking-wide"
								htmlFor="username"
							>
								Username
							</label>
							<input
								className="border border-gray-300 rounded-md p-2 placeholder:gray-500 placeholder:font-meduim"
								placeholder="Enter your username"
								onChange={handleChanges}
								type="text" id="username" name="username" value={data.username}
								required
							/>
						</div>
						<div className="flex flex-col w-full space-y-2">
							<label
								className="text-md font-bold text-slate-900 tracking-wide"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="border border-gray-300 rounded-md p-2 placeholder:gray-500 placeholder:font-meduim"
								placeholder="Enter your password"
								onChange={handleChanges}
								type="password" id="password" name="password" value={data.password} required
							/>
							<div className="flex justify-between">
								<div className="flex items-center justify-center space-x-1">
								<input
									className="text-slate-900"
									type="checkbox" id="remember" name="remember" />
								<label
									className="text-xs text-slate-900"
									htmlFor="remember">Remember for 30 days
								</label>
								</div>
								<a href="" className="text-xs font-bold text-slate-900">Forgot password?</a>
							</div>
						</div>
						<button
							className="bg-slate-900 text-white font-bold py-2 px-4 rounded w-full"
							onSubmit={handleSubmit}
							type="submit"
						>
							Sign in
						</button>
						<button className="bg-white text-slate-900 border border-slate-900 font-bold py-2 px-4 rounded w-full" disabled>
							Sign in with Google
						</button>
					</form>
					<div className="text-slate-900 font-light text-sm self-center">
						<p>Don't have an account? <a href="" className="font-bold">Sign up for free</a></p>
					</div>
				</aside>
				<aside className="rounded-r-lg bg-no-repeat bg-cover lg:-z-0 -z-20 absolute w-full h-screen min-h-[70vh] lg:h-[80vh] inset-0 lg:w-1/2 lg:relative lg:flex lg:flex-col space-y-2 items-center justify-end pb-20 bg-loginImg">
					<div className="w-full h-full bg-gradient-to-b from-slate-300 via-slate-400 lg:hidden" />
					<div className="w-5/6 px-4 py-6 hidden lg:flex flex-col space-y-3 items-center justify-center bg-gray bg-opacity-20 backdrop-blur-sm rounded border border-gray">
						<q 
						className="text-lg font-medium text-white tracking-wide">
						Welcome to image gallery. Creativity is nothing but a mind set free
						</q>
						<p className="text-sm font-medium text-white tracking-wide self-end">- Torrie T. Asai</p>
					</div>
					</aside>
			</section>
		</div>
	)
}
