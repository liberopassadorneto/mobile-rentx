import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Schedule } from '../screens/Schedule';
import { ScheduleComplete } from '../screens/ScheduleComplete';
import { ScheduleDetails } from '../screens/ScheduleDetails';

const { Navigator, Screen } = createStackNavigator<any>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Schedule' component={Schedule} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='ScheduleComplete' component={ScheduleComplete} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  );
}
