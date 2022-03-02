import { getAccountAuthData } from 'habra-auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const data = await getAccountAuthData(req.body)
		res.status(data?.error ? 403 : 200).json(data)
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).json({
			error: true,
			statusCode: 405,
			message: `Method ${req.method} Not Allowed`,
		})
	}
}
