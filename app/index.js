/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Navigator
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Buffer } from 'buffer';

import rncrypto from 'react-native-rncrypto';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plain: '世界你好!',
      randomBytes: '',
      privateKey: '3082020b020100308201b906072a8648ce3d0201308201ac020101304d06072a8648ce3d0101024201ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff308188044201fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc04420051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f000481850400c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650024201fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e9138640902010104493047020101044200b63e7cc0e8e944a4071c95366fc17614a67cd0284957ef0d018157cdc0b26813dcf301f59ecfc63fe62a58c6421c08dd0d62874bb124468565574eecfb66e1e56e',
      publicKey: '30820246308201b906072a8648ce3d0201308201ac020101304d06072a8648ce3d0101024201ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff308188044201fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc04420051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f000481850400c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650024201fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409020101038186000401080793312e41cbc9d856bc2abebd50ebcc6f9e897c6ad5da486e40b630f8ffd572b56f0d35407655a79ef7ef754ef1f249e53cda92cb20335b44545b63d1ab825801a6fde5f2212135169eeb9c669e45896a513480f7836598910b68c836b9507734659fb0e2b70708a5f530f26db31661e34097369f55e0c877f0eab26ae08e503eb8',
      cipher: '0401fcbb6cdaf171ad26c1bbdff1bef1f3e5c6d4ad4ef35e90001823ad55982b4ec975647818522eb9f8e8f8c53d0f97fc7f84b6ae138dc674245139ade546052162510019fd66468fcc0df0821d4d7eae7d93a792b5cf86b34e3d8bc6f587ad4c36b47b761eac9085f2af6764fbb6e03e37ee4833c1479cb150641c0845656430e3be5b6f48602c9cb14875350105851c0bde30bc300ea132dc2e8331b47134f12977c97b5f',
      decrypted: ''
    };
  }
  onPlainChange(evt) {
    this.setState({
      plain: evt.nativeEvent.text
    });
  }
  random() {
    rncrypto.randomBytes().then((bytes) => {
      this.setState({
        randomBytes: bytes.toString('hex')
      });
    });
  }
  keypair() {
    rncrypto.ecc.generateKeys().then((keys) => {
      this.setState({
        privateKey: keys.privateKey.toString('hex'),
        publicKey: keys.publicKey.toString('hex'),
        cipher: ''
      });
    });
  }
  encrypt() {
    if(this.state.privateKey) {
      rncrypto.ecc.encrypt(new Buffer(this.state.plain, 'utf-8'), new Buffer(this.state.publicKey, 'hex')).then((cipher) => {
        this.setState({
          cipher: cipher.toString('hex')
        });
      });
    }
  }
  decrypt() {
    if(this.state.cipher) {
      rncrypto.ecc.decrypt(new Buffer(this.state.cipher, 'hex'), new Buffer(this.state.privateKey, 'hex')).then((plain) => {
        this.setState({
          decrypted: plain.toString('utf-8')
        });
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Random Bytes
        </Text>
        <TextInput style={styles.value} multiline={true} editable={true} value={this.state.randomBytes} />
        <Text style={styles.label}>
          Plain Text
        </Text>
        <TextInput style={styles.value} multiline={true} editable={true} onChange={this.onPlainChange.bind(this)} value={this.state.plain} />
        <Text style={styles.label}>
          Private Key
        </Text>
        <TextInput style={styles.value} multiline={true} editable={true} value={this.state.privateKey} />
        <Text style={styles.label}>
          Public Key
        </Text>
        <TextInput style={styles.value} multiline={true} editable={true} value={this.state.publicKey} />
        <Text style={styles.label}>
          Cipher Hex
        </Text>
        <TextInput style={styles.value} multiline={true} editable={true} value={this.state.cipher} />
        <Text style={styles.label}>
          Decrypted Text
        </Text>
        <TextInput style={styles.value} multiline={true} editable={true} value={this.state.decrypted} />
        {/*<KeyboardSpacer />*/}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={this.random.bind(this)}>
            <Text style={styles.buttonText}>Rnd</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.keypair.bind(this)}>
            <Text style={styles.buttonText}>Keys</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.encrypt.bind(this)}>
            <Text style={styles.buttonText}>En</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.decrypt.bind(this)}>
            <Text style={styles.buttonText}>De</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 0,
    paddingTop: Navigator.NavigationBar.Styles.General.StatusBarHeight + 5
  },
  label: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  value: {
    color: '#999',
    marginVertical: 5,
    backgroundColor: 'white',
    flex: 1,
    textAlignVertical: 'top',
    padding: 3,
    fontSize: 14
  },
  buttons: {
    flexDirection: 'row',
    padding: 2.5,
  },
  button: {
    backgroundColor: '#3465a4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    flex: 1,
    margin: 2.5
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  }
});

export default App;
