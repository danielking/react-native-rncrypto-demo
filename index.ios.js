/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Buffer } from 'buffer';

import rncrypto from 'react-native-rncrypto';

rncrypto.randomBytes().then(function(bytes) {
  console.log('random bytes:', bytes.toString('base64'));;
});

var startedAt = new Date();
var loop = function(count) {
  rncrypto.ecc.generateKeys().then(function(keys) {
    // console.log('private key:', keys.privateKey.toString('base64'));
    // console.log('public key:', keys.publicKey.toString('base64'));
    rncrypto.ecc.encrypt(new Buffer('世界你好!', 'utf-8'), keys.publicKey).then(function(cipher) {
      // console.log('cipher:', cipher.toString('base64'));
      rncrypto.ecc.decrypt(cipher, keys.privateKey).then(function(plain) {
        // console.log('plain(base64):', plain.toString('base64'));
        // console.log('plain(utf-8):', plain.toString('utf-8'));
        if(count != 0) setTimeout(loop.bind(null, --count), 0);
        else {
          console.log('finished!');
          console.log(new Date() - startedAt);
        }
      });
    });
  });
};

loop(100);

class RNCryptoDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNCryptoDemo', () => RNCryptoDemo);
