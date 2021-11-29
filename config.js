module.exports = {
	config: {
		tailwindJS: "./tailwind.config.js",
		port: 9001,
		safelist: [
			/^flickity/,
			'is-active',
			'is-draggable',
			'is-pointer-down',
			'previous',
			'next'
		],
    },
	paths: {
		root: "./",
		src: {
			base: "./src",
			main: "./src/scss/main.scss",
			css: "./src/scss",
			js: "./src/js",
			img: "./src/images",
            fonts: "./src/fonts"
		},
		dist: {
			base: "./dist",
			css: "./dist/css",
			js: "./dist/js",
			img: "./dist/images",
            fonts: "./dist/fonts"
		},
		build: {
			base: "./build",
			css: "./build/css",
			js: "./build/js",
			img: "./build/images",
            fonts: "./build/fonts"
		}
	},
}
