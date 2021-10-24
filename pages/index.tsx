import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>geekr-lambda</title>
				<meta name='description' content='geekr. lambda functions API' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<p>
					This is a serverless backend for a project called {"'geekr'"}. Github repo:{' '}
					<a href='https://github.com/jarvis394/geekr'>click</a>
				</p>
			</div>
		</>
	)
}

export default Home
