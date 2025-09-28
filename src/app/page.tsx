
'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { technologies } from '@/data/technologies';

// interface DataItem {
// 	id: string;
// 	title: string;
// 	description: string;
// 	colorPref: string;
// 	slug: string;
// }

export default function ReactHome() {
	const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);

	const handleFilter = useCallback((filteredTechs: typeof technologies) => {
		setFilteredTechnologies(filteredTechs);
	}, []);

	return (
		<div className='bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
			<div className='container mx-auto font-sans min-h-screen'>
				<Header />
				<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-80px)] p-8 pb-20 gap-16 sm:p-20'>
					<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
						<div className='w-full max-w-6xl mx-auto mb-12'>
							<h2 className='text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
								Choose Your Technology
							</h2>
							<SearchBar technologies={technologies} onFilter={handleFilter} />
							{filteredTechnologies.length === 0 ? (
								<div className="text-center py-12">
									<p className="text-gray-500 dark:text-gray-400 text-lg">
										No technologies found matching your search.
									</p>
								</div>
							) : (
								<div className='flex flex-wrap gap-4 justify-center'>
									{filteredTechnologies.map((tech, index) => (
									<Link key={tech.name} href={tech.href}>
										<button
											className={`${tech.bgColor} ${tech.textColor} px-6 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 transform focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 border-2 border-white/20 backdrop-blur-sm group relative overflow-hidden min-w-[140px]`}
											style={{
												animationDelay: `${index * 50}ms`,
											}}>
											<div className="flex items-center justify-center gap-2">
												<span className="text-xl group-hover:scale-125 transition-transform duration-300">
													{tech.icon}
												</span>
												<span className="text-sm font-semibold">
													{tech.name}
												</span>
											</div>
											<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
										</button>
									</Link>
								))}
								</div>
							)}
						</div>
					</main>
					<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
						<a
							className='flex items-center gap-2 hover:underline hover:underline-offset-4'
							href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
							target='_blank'
							rel='noopener noreferrer'>
							<Image
								aria-hidden
								src='/file.svg'
								alt='File icon'
								width={16}
								height={16}
							/>
							Learn
						</a>
						<a
							className='flex items-center gap-2 hover:underline hover:underline-offset-4'
							href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
							target='_blank'
							rel='noopener noreferrer'>
							<Image
								aria-hidden
								src='/window.svg'
								alt='Window icon'
								width={16}
								height={16}
							/>
							Examples
						</a>
						<a
							className='flex items-center gap-2 hover:underline hover:underline-offset-4'
							href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
							target='_blank'
							rel='noopener noreferrer'>
							<Image
								aria-hidden
								src='/globe.svg'
								alt='Globe icon'
								width={16}
								height={16}
							/>
							Go to nextjs.org →
						</a>
					</footer>
				</div>
			</div>
		</div>
	);
}
