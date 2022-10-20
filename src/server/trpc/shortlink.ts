import * as trpc from '@trpc/server'
import { z } from 'zod'
import { Shortlink } from '../modules/shortlink/shortlink.service'
import { createSlugValidator } from '../modules/shortlink/shortlink.validation'

export const shortlinkRouter = trpc
	.router()
	.query('checkSlug', {
		input: z.object({
			slug: z.string(),
		}),
		async resolve({ input }) {
			return { used: await Shortlink.slugIsTaken(input.slug) }
		},
	})
	.mutation('createSlug', {
		input: createSlugValidator,
		async resolve({ input }) {
			return await Shortlink.create(input)
		},
	})
