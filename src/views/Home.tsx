import React from 'react';
import {FlatList, Text, View} from 'react-native';
import ListMembers from '../components/ListMembers';
import useMembersContext from '../hooks/useMembersContext';

const Home: React.FC<any> = ({navigation}) => {
  const {isSuccess, isLoading, members} = useMembersContext();

  const handleOnPress = (id: number) => {
    navigation.navigate('Member', {id});
  };

  return (
    <View>
      <FlatList
        data={isSuccess ? members : []}
        renderItem={({item}) =>
          isLoading ? (
            <Text>Cargando...</Text>
          ) : (
            <ListMembers member={item} onPress={() => handleOnPress(item.id)} />
          )
        }
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <Text>Mi lista de miembros</Text>
          </View>
        }
      />
    </View>
  );
};

export default Home;
