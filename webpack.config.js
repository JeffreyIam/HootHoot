var webpack = require('webpack');

module.exports = {
  entry: [
    './client/app/components/chat-form/chat-form.directive.js',
    './client/app/components/chat-list/chat-list.directive.js',
    './client/app/components/chat-single/chat-single.directive.js',
    './client/app/components/contact-list/contact-list.directive.js',
    './client/app/components/contact-single/contact-single.directive.js',
    './client/app/components/group-list/group-list.directive.js',
    './client/app/components/group-single/group-single.directive.js',
    './client/app/services/services.module.js',
    './client/app/services/services.dataService.js',
    './client/app/services/services.globals.js',
    './client/app/services/services.socketService.js',
    './client/app/services/services.contactService.js',
    './client/app/services/services.messageService.js',
    './client/app/app.js',
    './client/login/loginController.js',
    './client/signup/signupController.js',
  ],
  output: {
    path: __dirname + '/client/compiled/src',
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    ]
};

