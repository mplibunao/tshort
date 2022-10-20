import { ShortlinkRepo } from './shortlink.repo'
import { CreateSlugValidator } from './shortlink.validation'
export * as Shortlink from './shortlink.service'

export const slugIsTaken = async (slug: string) => {
	const count = await ShortlinkRepo.countBySlug(slug)
	return count > 0
}

export const create = async (args: CreateSlugValidator) => {
	try {
		return await ShortlinkRepo.create(args)
	} catch (error) {
		console.log('error', error) // eslint-disable-line no-console
		throw new Error('Error creating short link')
	}
}
