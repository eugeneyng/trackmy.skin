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
  return (
    <Paper.Provider theme={STTheme}>
      <NativeNav.NavigationContainer theme={STTheme}>
        <Stack.Navigator
          initialRouteName="Account"
          screenOptions={{
            header: Components.NavigationBar,
          }}>
          <Stack.Screen name="Home" component={Pages.Home} />
          <Stack.Screen name="Account" component={Pages.Account} />
          <Stack.Screen name="Sign In" component={Pages.SignInUp} />
          <Stack.Screen name="Settings" component={Pages.Settings} />
        </Stack.Navigator>
      </NativeNav.NavigationContainer>
    </Paper.Provider>
  );
}

export default App;
