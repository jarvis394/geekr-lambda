import { NextApiRequest, NextApiResponse } from 'next'
import generateSocialPreview from 'src/generateSocialPreview'
import { registerFont } from 'canvas'
import path from 'path'
import cors from 'src/cors'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await cors(req, res)

	const { title, hub } = req.query
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
