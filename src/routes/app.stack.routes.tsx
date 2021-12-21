import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CarDetails } from '../screens/CarDetails';
import { Confirmation } from '../screens/Confirmation';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Schedule } from '../screens/Schedule';
import { ScheduleDetails } from '../screens/ScheduleDetails';

const { Navigator, Screen } = createStackNavigator<any>();

export function AppStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Home'
    >
      {/* <Screen
        name='Home'
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      /> */}
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Schedule' component={Schedule} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='Confirmation' component={Confirmation} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  );
}
