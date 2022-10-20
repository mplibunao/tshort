import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/infra/db'

export default async function some(req: NextApiRequest, res: NextApiResponse) {
	const slug = req.query.slug

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate') // 1 week

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
