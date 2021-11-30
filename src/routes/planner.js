import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WeekPlanner from 'src/views/planner/WeekPlanner';
import MonthPlanner from 'src/views/planner/MonthPlanner';
import NewPlanner from 'src/views/planner/NewPlanner';

const plannerStack = createStackNavigator();

const PlannerStack = () => {

    return (
        <plannerStack.Navigator headerMode='none' initialRouteName='WeekPlanner'>
            <plannerStack.Screen name="WeekPlanner" component={WeekPlanner} />
            <plannerStack.Screen name="MonthPlanner" component={MonthPlanner} />
            <plannerStack.Screen name="NewPlanner" component={NewPlanner} />
        </plannerStack.Navigator>
    )
}

export default PlannerStack


