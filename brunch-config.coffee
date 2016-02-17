exports.config =
	minify: true

	conventions:
		assets: /app\/assets\//

	modules:
		definition: false
		wrapper: false

	paths:
		public: 'public'
		watched: ['app', 'vendor']

	files:
		javascripts:
			joinTo:
				'app.js': /app\/js\//
				'lib.js': /^(bower_components|vendor)/

		stylesheets:
			joinTo:
				'app.css': /app\/css\//
	plugins:
    		on: ["riot"]
    		riot:
      			extension: 'tag'   # pattern overrides extension
      			pattern: /\.tag$/  # default
