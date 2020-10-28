import React from 'react'
import { Helmet } from 'react-helmet'

export default ({ title, content, link }) => (
	<Helmet>
		<title>{title}</title>
		<meta charSet="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="description" content={content} />
		<link rel="canonical" href={link} />
	</Helmet>
)
