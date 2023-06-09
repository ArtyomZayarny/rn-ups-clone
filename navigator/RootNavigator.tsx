import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { ModalScreen } from '../screens/ModalScreen';
import { OrderScreen } from '../screens/OrderScreen';

export type RootStackParamsList = {
  Main: undefined;
  MyModal: { userId: string; name: string };
  Order: { order: Order };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen
          name="MyModal"
          options={{ headerShown: false }}
          component={ModalScreen}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
