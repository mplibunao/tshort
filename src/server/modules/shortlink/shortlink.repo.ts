import { db } from '@/server/infra/db'
import { CreateSlugValidator } from './shortlink.validation'
export * as ShortlinkRepo from './shortlink.repo'

export const countBySlug = async (slug: string) => {
	return db?.shortLink.count({ where: { slug } })
}

export const create = async (args: CreateSlugValidator) => {
	return db?.shortLink.create({ data: args })
}
