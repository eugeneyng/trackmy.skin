import * as ReactNative from 'react-native';
import * as Paper from 'react-native-paper';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <Paper.List.Item
      title={item.title}
      description="Item description"
      left={(props) => <Paper.List.Icon {...props} icon="folder" />}
    />
  );

  return (
    <ReactNative.View>
      <ReactNative.FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ReactNative.View>
  );
}

export default Home;
