import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Paper from 'react-native-paper';

function SignInUp() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function Register() {
    const response = await fetch('https://parse.trackmy.skin/parse/users', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'tms',
        'X-Parse-Revocable-Session': '1',
      },
    });

    if (!response.ok) {
      alert(`An error has occured: ${response.status}`);
      return false;
    } else {
      const signedUp = response.json();
      alert(signedUp);
      return true;
    }
  }

  return (
    <ReactNative.View>
      <Paper.TextInput
        label="User Name"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />
      <Paper.TextInput
        disabled="true"
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
      />
      <Paper.Button onPress={() => Register()}>Go</Paper.Button>
    </ReactNative.View>
  );
}

export default SignInUp;
