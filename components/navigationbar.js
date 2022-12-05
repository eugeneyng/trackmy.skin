import * as React from 'react';
import * as Paper from 'react-native-paper';

function NavigationBar({ navigation, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return(
    <Paper.Appbar.Header>
      {back ? <Paper.Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Paper.Appbar.Content title="SkinTag" />
      {!back ? (
          <Paper.Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Paper.Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }>
            <Paper.Menu.Item onPress={() => navigation.navigate('Account')} title="Account" />
            <Paper.Menu.Item onPress={() => navigation.navigate('Settings')} title="Settings" />
          </Paper.Menu>
        ) : null}
    </Paper.Appbar.Header>
  );
}

export default NavigationBar;