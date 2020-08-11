module.exports = {
    // productionSourceMap: true,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //设置文件路径,默认'/'，部署应用包时的基本 URL
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://www.lzxtedu.com/', //API服务器的地址
                // target: 'http://182.92.102.161:8118/', //API服务器的地址
                ws: true, //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    }
};