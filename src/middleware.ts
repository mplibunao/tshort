import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function middleware(
	req: NextRequest,
	_event: NextFetchEvent
): Promise<Response | undefined> {
	const slug = req.nextUrl.pathname.split('/').pop()
	console.log('slug', slug) // eslint-disable-line no-console

	const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
	if ([404, 400].includes(slugFetch.status)) {
		return NextResponse.redirect(req.nextUrl.origin)
	}
	const data = await slugFetch.json()

	console.log('data?.url', data?.url) // eslint-disable-line no-console
	if (data?.url) {
		return NextResponse.redirect(data.url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/:slug',
}
