import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";


// Notifications.setNotificationHandler({ // notification already works, we dont need you broo
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });


const NotificationProvider = ({ children }: PropsWithChildren) => {

  const { profile } = useAuth();
  console.log('profile in the N.Prov',profile)
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const supabaseHolder = supabase;

  // const updateDatabase = async(newToken) => {
  //   console.log('custom function getting called')
  //   await supabase
  //   .from('profiles')
  //   .update({ expo_push_token: newToken })
  //   .eq('id', profile.id);

  // }

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken)
    console.log('newly saved token in new variable is ', newToken)

    console.log('this is the line before calling the database')
    console.log('what is the freaking profile', profile)

   
    console.log('about to run the try block')
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ expo_push_token: newToken })
        .eq('id', profile.id)
        .select();
  
      if (data) {
        console.log('Database update successful! Data:', data);
      } else {
        console.log('Database update successful, but no data returned.');
      }
    } catch (error) {
      console.log('Database update failed:', error, 'is the error message');
    }
   
    // updateDatabase(newToken)
    // .then((data)=> console.log('this is the data after update', data))
    // .catch((error)=> console.log('error in case this is update', error))
    // const { data, error } = await supabase.from('profiles').update({ expo_push_token: newToken }).eq('id', profile.id).select()

    // const {data, error} = await supabaseHolder.from('profiles').update({ expo_push_token: newToken}).eq('id', profile.id).select()
    // console.log('profile id is ', profile.id)
    // console.log('updated data is', data)
    // console.log('error while updating is ',error)
    console.log('after calling the supbase')
  } 

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token))

      // .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

      // these below are important when you want to do something with the notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      // the Docs got refactored, so vadim's code is not needed
      // if (notificationListener){ // only remove the notification if it does really exist
        
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
      // }
      };
  }, []);
console.log('expoPush token for Notif Prov P.T is', expoPushToken)
console.log('here is the Notif',notification);
  return <>{children}</>;
}

export default NotificationProvider;