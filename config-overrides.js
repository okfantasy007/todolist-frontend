const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path')

module.exports = function override(config, env) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.devtool = '#source-map';
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
        config
    );
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true, //修复 less3 导致的 webpack 构建错误
        modifyVars: {
        }
    })(config, env);
    return config;
};
