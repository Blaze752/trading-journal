import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from '@screens/HomeScreen';
import LessonScreen from '@screens/LessonScreen';
import LessonsScreen from '@screens/LessonsScreen';
import ProgressScreen from '@screens/ProgressScreen';
import SettingsScreen from '@screens/SettingsScreen';
import { AppProvider, useAppState } from '@utils/AppContext';
import { palette } from '@utils/theme';

type RootStackParamList = {
  Tabs: undefined;
  Lesson: { lessonId: number };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Tabs = ({ navigation }: { navigation: any }) => {
  const { darkMode } = useAppState();

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: palette.saffron,
          tabBarStyle: {
            backgroundColor: darkMode ? palette.darkCard : '#FFF7EA',
            borderTopWidth: 0,
            height: 68,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size }) => {
            const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
              Home: 'home-outline',
              Lessons: 'map-outline',
              Progress: 'stats-chart-outline',
              Settings: 'settings-outline',
            };
            return <Ionicons name={iconMap[route.name]} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen onStartLesson={() => navigation.navigate('Lesson', { lessonId: 1 })} />}
        />
        <Tab.Screen
          name="Lessons"
          children={() => <LessonsScreen openLesson={(id) => navigation.navigate('Lesson', { lessonId: id })} />}
        />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
};

const RootNav = () => {
  const { darkMode } = useAppState();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: darkMode ? palette.darkBg : palette.cream,
        },
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="Lesson"
          component={LessonScreen}
          options={{
            title: 'Lesson',
            headerStyle: { backgroundColor: darkMode ? palette.darkCard : '#FFF7EA' },
            headerTintColor: darkMode ? palette.darkText : palette.text,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RootNav />
    </AppProvider>
  );
}
