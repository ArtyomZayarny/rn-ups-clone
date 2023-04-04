import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../navigator/RootNavigator';
import { DeliveryCard } from '../components/DeliveryCard';

type OrdersScreenRouteProp = RouteProp<RootStackParamsList, 'Order'>;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamsList>
>;

export const OrderScreen = () => {
  const tw = useTailwind();
  const nav = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrdersScreenRouteProp>();

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: 'black' },
      headerTintColor: '#EB6a7c',
      headerBackTitle: 'Orders',
    });
  }, [order]);

  return (
    <View style={tw('-mt-2')}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};
