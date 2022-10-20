/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/components/**/*.{tsx,ts}', './src/pages/**/*.{tsx,ts}'],
	theme: {
		extend: {
			colors: {
				gray: {
					950: '#18181b',
				},
			},
		},
	},
	plugins: [],
}
