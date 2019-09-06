const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

    // Main entry point for bundle of scripts
    entry: './src/js/index.js',


    // Main entry point for bundle of scripts
    output: {
       
        path: path.resolve(process.cwd(), 'public'),        filename: 'assets/js/' + '[name].[hash].js'
    },

    // modules for various tasks
    module: {
        rules: [
            // js, jsx
            {
                // load babel & and transpile js, jsx
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options:{
                            name: '[name].[ext]',
                            outputPath: 'assets/images',
                            publicPath: '../',
                            useRelativePaths: true
                        }
                    }
                ]
            },
            {}
        ]
    },
    // plugins
    plugins: [
        new HtmlWebpackPlugin({
            title:'Webpack4 Boilerplate',
            template:'./src/index.html',
            inject:true,
            minify:{
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/' + 'bundle.[hash].css',
        }),
        new CopyPlugin([
            { from: './src/images', to: 'assets/images' },
            { from: './src/fonts', to: 'assets/fonts' }
          ]),
        new CleanWebpackPlugin()
    ],

    resolve:{
        alias: {
            '@scss': path.resolve(__dirname, '../src/sass/'),
            '@img':path.resolve(__dirname, '../src/images/'),
            '@':path.resolve(__dirname, '../src')
        },
        modules:[
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions:['.js']
    },

    // // Runs a server
    // devServer: {
    //     contentBase: './public/',
    //     hot: true,
    //     compress: true,
    //     port: 8000
    // },

}
