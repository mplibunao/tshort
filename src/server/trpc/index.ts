import superjson from 'superjson'
import * as trpc from '@trpc/server'
import { shortlinkRouter } from './shortlink'

export const appRouter = trpc
	.router()
	.transformer(superjson)
	.merge('shortlink.', shortlinkRouter)

export type AppRouter = typeof appRouter
