import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Paper from 'react-native-paper';
import * as Components from '../components/index.js';

function SignInUp() {
  const authContext = React.useContext(Components.AuthContext);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  return (
    <ReactNative.View key={authContext.userExists}>
      <Paper.TextInput
        label="User Name"
        onChangeText={(username) => authContext.setUsername(username)}
      />
      {authContext.userExists ? (
        <Paper.TextInput
          label="Password"
          onChangeText={(password) => authContext.setPassword(password)}
          secureTextEntry
        />
      ) : null}
      <Paper.Button
        onPress={() => {
          authContext.userExists
            ? authContext.Login()
            : authContext.CheckUserExistence().then(() => forceUpdate());
        }}>
        Go
      </Paper.Button>
    </ReactNative.View>
  );
}

export default SignInUp;
