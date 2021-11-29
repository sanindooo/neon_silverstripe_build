module.exports = {
	content: ['../app/templates/**/*.ss'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
		},
	},
	variants: {
		extend: {
			borderWidth: ['last'],
			padding: ['last'],
		},
	},
	plugins: [],
	corePlugins: {

	}
}
