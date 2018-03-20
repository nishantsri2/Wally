/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    StackNavigator,
} from 'react-navigation';
import TabScreen from "./tabs/TabScreen";
import CategoryItemScreen from "./tabs/CategoryItemScreen";
import Categories from "./tabs/Categories";
import Recent from "./tabs/Recents";
import Collections from "./tabs/Collections";
import DetailWallpaperScreen from "./tabs/DetailWallpaperScreen";

const App = StackNavigator({
    Home: { screen: TabScreen },
    CategoryItem: { screen: CategoryItemScreen },
    Category: { screen: Categories },
    Recent: { screen: Recent },
    Collection: { screen: Collections },
    DetailWallpaperScreen: { screen: DetailWallpaperScreen }
});

export default App