import { CreateSlugValidator } from '@/server/modules/shortlink/shortlink.validation'
import { trpc } from '@/utils/trpc'
import React from 'react'
import debounce from 'lodash-es/debounce'
import { nanoid } from 'nanoid'
import clsx from 'clsx'

const input =
	'my-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-black placeholder-slate-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm'

export default function CreateLinkForm(): JSX.Element {
	const [showToast, setShowToast] = React.useState<boolean>(false)
	const [form, setForm] = React.useState<CreateSlugValidator>({
		slug: '',
		url: '',
	})
	const url = window.location.origin

	const slugCheck = trpc.useQuery(
		['shortlink.checkSlug', { slug: form.slug }],
		{
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	)
	const createSlug = trpc.useMutation('shortlink.createSlug')

	const copyToClipboard = (urlToCopy: string) => {
		navigator.clipboard.writeText(urlToCopy)
		setShowToast(true)
		setTimeout(() => setShowToast(false), 1500)
	}

	const handleRandomize = () => {
		const slug = nanoid()
		setForm((prev) => ({ ...prev, slug }))
		slugCheck.refetch()
	}

	if (createSlug.status === 'success') {
		return (
			<>
				<div className='flex items-center justify-center'>
					<h1>{`${url}/${form.slug}`}</h1>
					<button
						type='button'
						className='ml-2 cursor-pointer rounded bg-pink-500 py-1.5 px-1 font-bold'
						onClick={() => copyToClipboard(`${url}/${form.slug}`)}
					>
						Copy Link
					</button>
				</div>
				<button
					type='button'
					className='cursor-pointer rounded bg-pink-500 py-1.5 px-1 font-bold'
					onClick={() => {
						createSlug.reset()
						setForm({ slug: '', url: '' })
					}}
				>
					Reset
				</button>
			</>
		)
	}

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					createSlug.mutate(form)
				}}
				className='flex h-screen flex-col justify-center sm:w-2/3 md:w-1/2 lg:w-1/3'
			>
				{slugCheck.data?.used && (
					<span className='mr-2 text-center font-medium text-red-500'>
						Slug is already taken
					</span>
				)}

				<div className='flex items-center'>
					<span className='mr-2 font-medium'>{url}/</span>

					<input
						type='text'
						onChange={(e) => {
							setForm((prev) => ({ ...prev, slug: e.target.value }))
							debounce(slugCheck.refetch, 100)
						}}
						minLength={1}
						placeholder='abc420'
						pattern={`^[-a-zA-Z0-9_]+$`}
						value={form.slug}
						required
						className={clsx(input, {
							'border-red-500': slugCheck.isFetched && slugCheck.data!.used,
							'text-red-500': slugCheck.isFetched && slugCheck.data!.used,
						})}
					/>

					<button
						type='button'
						className='ml-2 cursor-pointer rounded bg-pink-500 py-1.5 px-1 font-bold'
						onClick={handleRandomize}
					>
						Random
					</button>
				</div>

				<div className='flex items-center'>
					<span className='mr-2 font-medium'>Link</span>
					<input
						type='url'
						onChange={(e) =>
							setForm((prev) => ({ ...prev, url: e.target.value }))
						}
						placeholder='https://google.com'
						className={input}
						required
					/>
				</div>

				<button
					type='submit'
					className='mt-1 cursor-pointer rounded bg-pink-500 p-1 font-bold'
					disabled={slugCheck.isFetched && slugCheck.data!.used}
				>
					Create
				</button>
			</form>

			{showToast && (
				<div className='absolute bottom-5 right-10 flex w-1/5 items-center justify-center rounded-md bg-slate-50/10 p-3'>
					<span className='text-xs font-semibold'>
						Link Copied to Clipboard!
					</span>
				</div>
			)}
		</>
	)
}
