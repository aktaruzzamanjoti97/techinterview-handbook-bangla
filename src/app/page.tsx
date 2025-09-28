'use client';

import Header from '@/components/Header';
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
							<div className='flex flex-wrap gap-3 justify-center'>
								{technologies.map((tech, index) => (
									<Link key={tech.name} href={tech.href}>
										<button
											className={`${tech.bgColor} ${tech.textColor} px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
											style={{
												animationDelay: `${index * 50}ms`,
											}}>
											{tech.name}
										</button>
									</Link>
								))}
							</div>
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
