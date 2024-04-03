import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';

// import { useColorScheme } from '@src/components/useColorScheme';
import { useColorScheme } from '../../components/useColorScheme';
// import { useClientOnlyValue } from '@../../components/useClientOnlyValue';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        // headerShown: false,
      }}>

        {/* Screen was showing three icons, so we want to target the index. thereby hiding it from the tab*/}
        <Tabs.Screen name='index' options={{ href: null}} />
      <Tabs.Screen
        // name="index" // where you specify the menu name
        name='menu'
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ), 
        }}
      />
      {/* this is where i come into the picture */}
      <Tabs.Screen
        name="orders" // change the name to match a customized screen now
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

<Tabs.Screen
        name="profile" // change the name to match a customized screen now
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
