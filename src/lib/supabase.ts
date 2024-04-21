import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types'


const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};
// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => { 
//     // console.log(key)
//     // return SecureStore.getItemAsync(key);
//     // SecureStore.getItemAsync(key); // I think the return keyword is the problem here
    
//   },
//   setItem: (key: string, value: string) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key: string) => {
//     SecureStore.deleteItemAsync(key);
//   }, 
  
// };

// THIS connects the App to Local Supabase
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || ''; 

// THIS CONNECTS the APP to Remote Supabase
// const supabaseUrl = "https://jtfzifwyxdwsjgcjjmgm.supabase.co";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZnppZnd5eGR3c2pnY2pqbWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzk0NjQsImV4cCI6MjAyNTc1NTQ2NH0.XKJkfV2YwDQwFnLbHX3BSpp7qKT1VGNDOjnbCb5v98E";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});