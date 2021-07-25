import axios from 'axios';
import React, {useState} from 'react';
import {Button, Text, View, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import useMembersContext from '../hooks/useMembersContext';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
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

const AddMember: React.FC<any> = ({}) => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<{uri: string} | null>(null);
  const {invalidateMembersCache} = useMembersContext();
  const {mutate, isLoading} = useMutation(postData, {
    onSuccess: () => invalidateMembersCache(),
  });

  const handleSubmit = async () => {
    await mutate({name});
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

  return (
    <SafeAreaView>
      <View>
        <TextInput onChangeText={value => setName(value)} />
        {image && <Image source={image} style={style.image} />}
        <Button onPress={selectImagePicker} title="Selecciona una imagen" />
        <Button onPress={handleSubmit} title="Añadir miembro" />
        {isLoading && <Text>Agregando miembro...</Text>}
      </View>
    </SafeAreaView>
  );
};

export default AddMember;
