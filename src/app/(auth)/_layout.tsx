import { useAuth } from '@/providers/AuthProvider';
import {  Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();
  
  if (session) {
    return <Redirect href={'/'} />;
    // all the screens inside /auth are now protected
  }
  return <Stack />;
};