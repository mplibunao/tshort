import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// This is so component is rendered in client and window doesn't resolve to undefined
const CreateLinkForm = dynamic(() => import('@/components/CreateLink'), {
	ssr: false,
})

const Home: NextPage = () => {
	return (
		<div className='flex h-screen flex-col items-center justify-center bg-gray-950 text-white'>
			<Suspense>
				<CreateLinkForm />
			</Suspense>
		</div>
	)
}

export default Home
