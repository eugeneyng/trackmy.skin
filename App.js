import * as React from 'react';
import * as Paper from 'react-native-paper';
import * as NativeNav from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import merge from 'deepmerge';

import * as Pages from './pages/index.js';
import * as Components from './components/index.js';

const Stack = createStackNavigator();

const STTheme = merge(Paper.DefaultTheme, NativeNav.DefaultTheme);
const STDarkTheme = merge(Paper.DarkTheme, NativeNav.DarkTheme);

function App() {
  const authContext = React.useContext(Components.AuthContext);
  const [ready, setReady] = React.useState(false);

  authContext.getValueFor('userToken').then( (userToken) => {
    authContext.setToken(userToken);
    setReady(true);
  });

  return (
    <Paper.Provider theme={STTheme}>
      {ready ? (
        <NativeNav.NavigationContainer theme={STTheme}>
          {authContext.token == null ? (
            <Stack.Navigator
              initialRouteName="Sign In"
              screenOptions={{
                header: Components.NavigationBar,
              }}>
              <Stack.Screen name="Sign In" component={Pages.SignInUp} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                header: Components.NavigationBar,
              }}>
              <Stack.Screen name="Home" component={Pages.Home} />
              <Stack.Screen name="Account" component={Pages.Account} />
              <Stack.Screen name="Settings" component={Pages.Settings} />
            </Stack.Navigator>
          )}
        </NativeNav.NavigationContainer>
      ) : (
        <Pages.Splash />
      )}
    </Paper.Provider>
  );
}

export default App;
