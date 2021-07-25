import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useLayoutEffect} from 'react';
import {ActivityIndicator, Text, View, Button} from 'react-native';
import {AuthStackParamList} from '../../App';
import useMember from '../hooks/useMember';

type MemberScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'Member'
>;

export type SignupParams = {
  id: number;
};

interface IMember {
  route: {params: SignupParams};
  navigation: MemberScreenNavigationProps;
}

const Member: React.FC<IMember> = ({navigation, route}) => {
  const {id} = route.params;
  const {isSuccess, isLoading, data} = useMember({memberId: id});

  useLayoutEffect(() => {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('MemberEdit', {userId: data.id})}
            title="Editar usuario"
          />
        ),
        title: data.name,
      });
    }
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando texto...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Usuario {data.name}</Text>
    </View>
  );
};

export default Member;
