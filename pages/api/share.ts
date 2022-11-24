import { NextApiRequest, NextApiResponse } from 'next'
import generateSocialPreview from 'src/generateSocialPreview'
import { registerFont } from 'canvas'
import path from 'path'
import cors from 'src/cors'
import fetch from 'node-fetch'

interface Article {
	id: string | number
	hubs: { title: string }[]
	titleHtml: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await cors(req, res)

	let { title, hub, id } = req.query

	if (id) {
		try {
			const response = await fetch(`https://habr.com/kek/v2/articles/${id}?fl=ru&hl=ru`, {
				method: 'get',
			})
			const article = (await response.json()) as Article
			title = article.titleHtml
			hub = article.hubs.length > 0 ? article.hubs[0].title : 'Без хаба'
		} catch (e) {
			return res.status(404).json({
				error: true,
				message: `Article with ID ${id} not found`,
				statusCode: 404,
			})
		}
	}

	if (!title || !hub)
		return res.status(400).json({
			error: true,
			message: 'No title or hub present in request query',
			statusCode: 400,
		})

	try {
		registerFont(path.join(process.cwd(), 'resources/GoogleSans-Bold.ttf'), {
			family: 'Google Sans',
			weight: 'bold',
		})
		const coverStream = await generateSocialPreview({
			title,
			hub,
		})

		res.statusCode = 200
		res.setHeader('Content-Type', 'image/png')
		res.setHeader('Content-Control', 'public, max-age=31536000')

		coverStream.pipe(res)
	} catch (error) {
		res.statusCode = 500
		res.end((error as Error).message)
	}
}
