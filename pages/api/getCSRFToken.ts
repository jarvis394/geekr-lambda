import { getCSRFToken } from 'habra-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import cors from 'src/cors'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await cors(req, res)
	
	if (req.method === 'POST') {
		const csrfToken = await getCSRFToken(req.body)
		res.status(200).json(csrfToken)
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).json({
			error: true,
			statusCode: 405,
			message: `Method ${req.method} Not Allowed`,
		})
	}
}
