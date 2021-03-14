import * as React from 'react'
import { createDrawerNavigator } from "react-navigation-drawer"

import EditProfileScreen from '../screens/EditProfileScreen'
import FindMechanicScreen from '../screens/FindMechanicScreen'
import CustomSideBarMenu from './CustomSideBarMenu'

export const AppDrawerNavigator = createDrawerNavigator({
    Edit_Profile: {screen:EditProfileScreen},
    FindMechanic: {screen:FindMechanicScreen},
},
{
    initialRouteName: 'Edit_Profile'
},
{
    contentComponent: CustomSideBarMenu
}
)