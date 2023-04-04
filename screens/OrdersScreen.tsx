import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamsList } from '../navigator/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import { useOrders } from '../hooks/useOrders';
import ThemedImage from '@rneui/themed/dist/Image';
import { Button } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

//type OrderScreenRouteProp = RouteProp<RootStackParamsList, 'Order'>;

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamsList>
>;

export const OrdersScreen = () => {
  const tw = useTailwind();
  const nav = useNavigation<OrderScreenNavigationProp>();

  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState(false);

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#EB6a7c' : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#EB6a7c' }}>
      <ThemedImage
        containerStyle={tw('w-full h-64')}
        source={{ uri: 'https://links.papareact.com/m51' }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={tw('py-2 px-5')}
          color="pink"
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? 'Showing: Oldest First' : 'Showing: Most Recent First'}
        </Button>
        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order: Order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};
