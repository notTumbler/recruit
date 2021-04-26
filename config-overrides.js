// const { override,fixBabelImports,addLessLoader } = require('customize-cra')
// module.exports =  override(
//      fixBabelImports('import',{libraryName:'antd-mobile',style:'css'}),
//      addLessLoader({
//       javascriptEnabled: true,
//       modifyVars: { "@primary-color": "#cccccc" }
//     })
// )

const {
    override,
    fixBabelImports,
    addLessLoader,
    overrideDevServer
} = require('customize-cra');

const serverConfig = ()=> (configFunction) =>{
    configFunction.disableHostCheck=true
    return configFunction
}

module.exports = {
    webpack: override(
        //针对antd 实现按需打包 根据impot引用来打包(根据babel-plugin-import模块)
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            // libraryDirectory: 'es',
            style: 'css',
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { "@primary-color": "#87ceeb" }
        })
    ),
    devServer: overrideDevServer(
        serverConfig()
    )
} 