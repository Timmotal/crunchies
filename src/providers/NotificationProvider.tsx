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
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken)
    console.log('newly saved token in new variable is ', newToken)

    console.log('before querying the supbabase')
    console.log('what is the state of the profile', profile)
    // by the time this gets returned, the profile data is still null
    await supabase.from('profiles').update({ expo_push_token: newToken}).eq('id', profile.id)
    console.log('after querying supabase and the profile id is', profile.id)
  } 

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then((token) => savePushToken(token ?? ''))

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