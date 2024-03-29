import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(
	req: NextRequest,
	_event: NextFetchEvent
): Promise<Response | undefined> {
	if (req.nextUrl.pathname === '/') {
		return NextResponse.next()
	}

	const slug = req.nextUrl.pathname.split('/').pop()
	console.log('slug', slug) // eslint-disable-line no-console

	const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
	if (slugFetch.status === 404) {
		return NextResponse.redirect(req.nextUrl.origin)
	}
	const data = await slugFetch.json()

	if (data?.url) {
		return NextResponse.redirect(data.url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/:slug*'],
}
