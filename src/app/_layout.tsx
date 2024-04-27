import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// import { useColorScheme } from '.././components/useColorSchemee';
import { useColorScheme } from '../components/useColorScheme';
import CartProvider from '@/providers/cartProvider';
import AuthProvider from '@/providers/AuthProvider';
import QueryProvider from '@/providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import NotificationProvider from '@/providers/NotificationProvider';
// import { initializePaymentSheet } from '@/lib/stripe'; // was never suposta be here


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}>
      <AuthProvider>
        {/* we put it below the AuthProvider, because it needs to know some info about the Auth,
         but above the CART depends on query provider -> now all screen will be able to query the Database */}
         <NotificationProvider>
          <QueryProvider>
      {/* wrap the context provider around root stack navigator */}
      <CartProvider>
      <Stack>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
      </Stack>
      </CartProvider>
      </QueryProvider>
      </NotificationProvider>
      </AuthProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}
