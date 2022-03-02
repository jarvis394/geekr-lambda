import { makeRequest } from 'habra-auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		try {
			const { connectSID, csrfToken, version, requestParams, method } = req.body
			const response = await makeRequest({
				connectSID,
				csrfToken,
				method,
				requestParams,
				version,
			})
			console.log(connectSID, csrfToken, method, version)

			res.status(200).json(response.data)
		} catch (e) {
			res.status(400).json({
				error: true,
				statusCode: 400,
				message: 'Bad JSON format for `requestParams`',
			})
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).json({
			error: true,
			statusCode: 405,
			message: `Method ${req.method} Not Allowed`,
		})
	}
}
