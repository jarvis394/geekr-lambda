import { getCSRFToken } from 'habra-auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
