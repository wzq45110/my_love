const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// const { injectBabelPlugin } = require('react-app-rewired');
// const rewireCssModules = require('react-app-rewire-css-modules');
// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, '.', dir)
// }
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    })
);
// module.exports = function override(config, env) {
//     // do stuff with the webpack config...

//     // // 启用ES7的修改器语法（babel 7）
//     // config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config)   //{ "legacy": true }一定不能掉，否则报错

//     // // 按需加载UI组件
//     // config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
//     // // 配置别名，设置@指向src目录
//     // // config.resolve.alias = {
//     // //     '@': resolve('src')
//     // // }
//     // // css模块化
//     config = rewireCssModules(config, env);

//     return config;
// };