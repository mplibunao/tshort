import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import superjson from 'superjson'
import { getBaseUrl } from '@/utils/trpc'
import { AppRouter } from '@/server/trpc'

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		return {
			headers() {
				return { cookie: ctx?.req?.headers.cookie }
			},
			url: `${getBaseUrl()}/api/trpc`,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp)
