 
const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
            "stream": false,
            "stream-browserify": false,
            "crypto-browserify": false,
            "os-browserify":false,
            "https-browserify": false,
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      
      "url": require.resolve("url") 
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }
