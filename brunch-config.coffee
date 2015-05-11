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

	plugins:
		uglify:
      		mangle: false
		react:
	 		transformOptions:
	 			harmony: yes # include some es6 transforms
				sourceMap: no # generate inline source maps
				stripTypes: no # strip type annotations
