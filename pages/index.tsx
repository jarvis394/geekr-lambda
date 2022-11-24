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
				<h2>API (/api)</h2>
				<ul>
					<li>
						<i>
							/share?title={'{TITLE}'}&hub={'{HUB}'}
						</i>
						<p>Generates social preview image</p>
					</li>
					<li>
						<i>/share?id={'{ID}'}</i>
						<p>Generates social preview image by article ID</p>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Home
