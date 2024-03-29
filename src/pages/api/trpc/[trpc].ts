import { appRouter } from '@/server/trpc'
import * as trpcNext from '@trpc/server/adapters/next'

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null,
})
