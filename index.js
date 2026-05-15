const {TextEncoder, TextDecoder} = require('text-encoding');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const {AppRegistry} = require('react-native');
const App = require('./App').default;
const {name: appName} = require('./app.json');

AppRegistry.registerComponent(appName, () => App);