const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const i18nAutoPlugin = require('i18n-auto-webpack/plugin');
// forge版本压缩问题
// 开发环境
const development = '7.51.6';
const forgeVersion = process.env.NODE_ENV === 'production' ? `${development}min` : development;
const i18nAutoLoaderOptions = {
  watch: true,
  name: 'i18n.t',
  dependency: {
    name: 'i18n',
    value: '/lang/index.js',
  },
};
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  outputDir: 'dist/xtvue',
  productionSourceMap: false,
  indexPath: 'index_xt.html',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  parallel: false,
  devServer: {
    proxy: {
      '/HWProjBuPinPluginWebServer': {
        target: 'http://192.168.0.11:8171/HWProjBuPinPluginWebServer', // 6.1,
        // target: 'http://192.168.0.206:8171/HWProjBuPinPluginWebServer',
        // target: 'http://192.168.0.136:8171/HWProjBuPinPluginWebServer',
        pathRewrite: { '^/HWProjBuPinPluginWebServer': '' },
        changeOrigin: false, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
      },
    },
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = new Date().getTime();
      return args;
    });
    config.resolve.alias
      .set('_src', resolve('src'))
      .set('_app', resolve('src/app'))
      .set('_assets', resolve('src/assets'))
      .set('_components', resolve('src/components'))
      .set('_layout', resolve('src/app/layout'));
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 0 }));
    config.module
      .rule('wasm')
      .type('javascript/auto')
      .test(/.wasm$/)
      .use('wasm-loader')
      .loader('wasm-loader');
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
    config.module
    // 这个规则会针对项目里用到的js文件、vue文件里的tempalte部分和script部分
      .rule('js')
      .use('i18n-auto-loader')
      .loader('i18n-auto-webpack/loader')
      .options(i18nAutoLoaderOptions)
      .before('babel-loader')
      .end()
      .end();
  },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       modifyVars: {
  //         'primary-color': '#2D4FCC',
  //         'table-row-hover-bg': '#F6F6F6',
  //         'link-color': '#2D4FCC',
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
  // configureWebpack: config => {
  //   config.devtool = "source-map";
  // },
  configureWebpack: (config) => {
    config.devtool = 'source-map';
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [
        ...config.plugins,
        new CopyWebpackPlugin([
          {
            from: 'hwf',
            to: 'static/hwf',
          },
        ],
        {
          ignore: [''],
        }),
      ];
    } else {
      config.plugins = [
        ...config.plugins,
        new CopyWebpackPlugin([
          {
            from: 'hwf',
            to: 'static/hwf',
          },
        ],
        {
          ignore: [''],
        }),
        new i18nAutoPlugin({
          watch: true,
        }),
      ];
    }
  },
};
