import { Redirect } from 'expo-router';

export default function TabIndex () {
    // on getting to the the index page, we redirect to the Menu
  return <Redirect href={'/(admin)/menu/'} />;
};