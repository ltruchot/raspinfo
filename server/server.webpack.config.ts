module.exports = {
	entry: ['./server/server.ts'],
	output: {
		filename: './dist/server.js'
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	externals: require('webpack-node-externals')(),
	resolve: {
		// Add '.ts' as a resolvable extension.
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [{
			test: /\.ts$/, loader: 'ts-loader'
		}]
	}
};
