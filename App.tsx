/* *
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/views/Home';
import Member from './src/views/Member';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddMember from './src/views/AddMember';
import {MemberContextProvider} from './src/context/MemberContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import MemberDetail from './src/views/MemberDetail';

type MemberParams = {
  id: number;
};

export type AuthStackParamList = {
  Home: undefined;
  Member: MemberParams;
  MemberEdit: {
    userId: string;
  };
};

const Stack = createStackNavigator<AuthStackParamList>();

const Tab = createBottomTabNavigator();

const AppStackSection = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{title: 'Usuarios'}} />
    <Stack.Screen
      name="Member"
      component={Member}
      options={{title: 'Detalle de miembro'}}
    />
    <Stack.Screen
      name="MemberEdit"
      component={MemberDetail}
      options={{title: 'Editar miembro'}}
    />
  </Stack.Navigator>
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemberContextProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="HomeTab"
              component={AppStackSection}
              options={{title: 'Inicio'}}
            />
            <Tab.Screen
              name="AddMember"
              component={AddMember}
              options={{title: 'Añadir usuario'}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </MemberContextProvider>
    </QueryClientProvider>
  );
};

export default App;
