import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if(loading) {
    return <ActivityIndicator />
  }

  if(!session) {// if there is no session, means user is not signed in
    return <Redirect href={'/signIn'} />
  }

  if(!isAdmin) {// if there is no session, means user is not signed in
    return <Redirect href={'/(user)'} />
  }

  // based on the session, we can redirect the user to the right place
  console.log(session);


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;