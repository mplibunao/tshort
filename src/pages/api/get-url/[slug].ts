import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/infra/db'

export async function getUrl0(req: NextApiRequest, res: NextApiResponse) {
	const slug = req.query.slug

	//res.setHeader('Content-Type', 'application/json')
	//res.setHeader('Access-Control-Allow-Origin', '*')
	//res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate') // 1 week

	/*
	 *https://vercel.com/docs/concepts/edge-network/caching#cacheable-responses
	 *Vercel doesn't cache 400
	 */
	if (typeof slug !== 'string' || !slug) {
		return res
			.status(404)
			.json({ error: 'Invalid slug. Please use with a single slug' })
	}

	const data = await db?.shortLink.findFirst({
		where: { slug },
	})

	if (!data?.url) {
		return res.status(404).json({ error: 'Slug not found' })
	}

	res.json(data)
}

export default async function getUrl(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const slug = req.query['slug']

	if (!slug || typeof slug !== 'string') {
		res.statusCode = 404

		res.send(JSON.stringify({ message: 'pls use with a slug' }))

		return
	}

	const data = await db.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	})

	if (!data) {
		res.statusCode = 404

		res.send(JSON.stringify({ message: 'slug not found' }))

		return
	}

	//res.setHeader('Content-Type', 'application/json')
	//res.setHeader('Access-Control-Allow-Origin', '*')
	//res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate')

	return res.json(data)
}
