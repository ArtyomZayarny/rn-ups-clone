import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../navigator/RootNavigator';
import { useCustomerOrders } from '../hooks/useCustomerOrders';
import { DeliveryCard } from '../components/DeliveryCard';

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamsList, 'MyModal'>
>;

type ModalScreenRouteProp = RouteProp<RootStackParamsList, 'MyModal'>;

export const ModalScreen = () => {
  const tw = useTailwind();
  const nav = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity
        onPress={() => nav.goBack()}
        style={tw('absolute right-5 top-5 z-10')}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <View style={[tw('py-5 border-b'), { borderColor: '#59c1cc' }]}>
          <Text
            style={[tw('text-center text-xl font-bold'), { color: '#59c1cc' }]}
          >
            {name}
          </Text>
          <Text style={[tw('text-center italic text-sm')]}>delivers</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={(data) => <DeliveryCard order={data.item} />}
      />
    </View>
  );
};
