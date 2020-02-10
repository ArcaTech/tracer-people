const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'react': path.resolve(__dirname, 'src/apps/react/app.tsx'),
        'react-redux': path.resolve(__dirname, 'src/apps/react-redux/app.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
}
