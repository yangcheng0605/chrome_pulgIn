// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
// })



const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const copyFiles = [
  {
    from: path.resolve(`src/manifest.json`),
    to: `${path.resolve("dist")}/manifest.json`,
  },
  {
    from: path.resolve("src/assets"),
    to: path.resolve("dist/assets"),
  },
];

const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles,
  }),
];

// 配置页面
const pages = {};
/**
 * popup 和 devtool 都需要html文件
 * 因此 chromeName 还可以添加devtool
 */
const chromeName = ["popup",'test'];

chromeName.forEach((name) => {
  pages[name] = {
    entry: `src/${name}/index.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  };
});

module.exports = {
  pages,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  transpileDependencies: true,
  
  configureWebpack: {
    // 多入口打包
    entry: {
      content: "./src/content/index.js",
      background: "./src/background/index.js",
    },
    output: {
      filename: "js/[name].js",
    },
    plugins,
    optimization: {
      splitChunks: false,
    },
  },
  css: {
    extract: {
      filename: "css/[name].css",
    },
  },
  devServer: {
    open: true, // 自动打开浏览器
    port: 8088,
    compress: true,
    // disableHostCheck: true, // webpack4.0 开启热更新
    // 此处开启 https
    https: true,
    proxy: {
        '/admin/saas_plat': {
            target: 'https://testnxlink.nxcloud.com', // 10.75.25.5:8003 http://10.75.25.7:8003
            changeOrigin: true,
            // pathRewrite: {
            //     '^/saas_plat': '/'
            // }
        },
        '/home/api': {
            // 10.75.25.4:8993
            target: 'https://testnxlink.nxcloud.com', // 10.75.25.5:8002 https://devmkt.nxcloud.com
            changeOrigin: true,
            // pathRewrite: {
            //     '^/home/api': '/'
            // }
        },
        '/admin/cdp': {
            target: 'https://testnxlink.nxcloud.com', // 10.75.25.5:8002 https://devmkt.nxcloud.com
            changeOrigin: true,
        },
        '/pubilc': {
            target: 'https://testmkt.nxcloud.com', // 10.75.25.5:8002 https://devmkt.nxcloud.com
            changeOrigin: true,
            pathRewrite: {
                '^/pubilc': '/'
            }
        },
        '/mediaProxy': {
            target: 'https://goss.oss-cn-hongkong.aliyuncs.com',
            changeOrigin: true,
            pathRewrite: {
                '^/mediaProxy': '/'
            }
        },
        '/fs': {
            target: 'https://testnxlink.nxcloud.com',
            changeOrigin: true
        },
        '/api': {
            target: 'https://testnxlink.nxcloud.com',
            changeOrigin: true
        },
        '/callcentre': {
            target: 'https://testnxlink.nxcloud.com',
            changeOrigin: true
        },
        '/saas_plat': {
            target: 'https://testnxlink.nxcloud.com',
            changeOrigin: true
        },
    }
  },
};
