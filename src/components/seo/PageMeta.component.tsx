const SITE_NAME = 'ANSYLA Jewels'
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://ansyla.co.za'
const DEFAULT_DESCRIPTION =
	'Timeless, hand-finished gold and stainless steel jewelry, crafted in South Africa.'

function PageMeta({
	title,
	description = DEFAULT_DESCRIPTION,
	image,
	path,
	type = 'website',
	noIndex = false,
}: {
	title: string
	description?: string
	image?: string
	path: string
	type?: 'website' | 'product' | 'article'
	noIndex?: boolean
}) {
	const fullTitle = `${title} | ${SITE_NAME}`
	const url = `${SITE_URL}${path}`

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />
			{noIndex && <meta name="robots" content="noindex, nofollow" />}

			<meta property="og:site_name" content={SITE_NAME} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={url} />
			{image && <meta property="og:image" content={image} />}

			<meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			{image && <meta name="twitter:image" content={image} />}
		</>
	)
}

export default PageMeta
