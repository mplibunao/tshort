import { z } from 'zod'

export const createSlugValidator = z.object({
	slug: z.string(),
	url: z.string(),
})

export type CreateSlugValidator = z.infer<typeof createSlugValidator>
