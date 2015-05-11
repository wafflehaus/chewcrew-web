exports.config =

	minify: true

	conventions:
		assets: /app\/assets\//

	modules:
		definition: false
		wrapper: false

	paths:
		public: 'public'
		watched: ['app', 'lib']

	files:
		javascripts:
			joinTo:
				'app.js': /app\/js\//
				'lib.js': /app\/lib\//
		stylesheets:
			joinTo:
				'app.css': /app\/css\//
				