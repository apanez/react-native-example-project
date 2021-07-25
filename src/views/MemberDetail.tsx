import axios from 'axios';
import React, {useState} from 'react';
import {Button, Text, View, Image, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation} from 'react-query';
import useMembersContext from '../hooks/useMembersContext';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';
import useMember from '../hooks/useMember';

const style = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
  },
  location: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
  },
});

const postData = async (data: any) => {
  const result = await axios({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => console.log('Hecho'))
    .catch(() => console.log('Ha ocurrido un error'));

  const json = await result;
  return json;
};

const MemberDetail: React.FC<any> = ({route}) => {
  const {userId} = route.params;
  const {isLoading, data} = useMember({memberId: userId});
  const [name, setName] = useState<string>(data?.name);
  const [image, setImage] = useState<{uri: string} | null>(data?.image);
  const {invalidateMembersCache} = useMembersContext();
  const getMutation = useMutation(postData, {
    onSuccess: () => invalidateMembersCache(),
  });

  const location = `${data.address.street} ${data.address.suite}, ${data.address.zipcode} ${data.address.city}`;

  const handleSubmit = async () => {
    await getMutation.mutate({name});
  };

  const selectImagePicker = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        mediaType: 'photo',
      },
      (res: ImagePickerResponse) => {
        if (res.didCancel) {
          console.log('El usuario ha cancelado la acción');
        } else if (res.errorMessage) {
          console.log('Ha ocurrido el siguiente error: ' + res.errorMessage);
        } else if (res.assets) {
          const source = {
            uri: `data:image/jpg;base64,${res.assets[0].base64}`,
          };
          setImage(source);
        }
        return res.assets;
      },
    );
  };

  const changeLocation = () => {
    console.log('Hola mundo');
  };

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
      <TextInput value={name} onChangeText={value => setName(value)} />
      {image && <Image source={image} style={style.image} />}
      <Button onPress={selectImagePicker} title="Selecciona una imagen" />
      <Button onPress={handleSubmit} title="Editar miembro" />
      {getMutation.isLoading && <Text>Editando miembro...</Text>}
      <View style={style.location} />
      <Text>{location}</Text>
      <Button onPress={changeLocation} title="Editar ubicación" />
    </View>
  );
};

export default MemberDetail;
