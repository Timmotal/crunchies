import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();

  const { profile } = useAuth();

  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    console.log('this nonsense function is about to be called')
    setExpoPushToken(newToken);
    console.log('after setting the token to the state')
    if (!newToken) {
      console.log("i think there is no new token")
      return 
    }
    console.log('about to push into database')
    // update the token in the database
    await supabase
      .from('profiles')
      .update({ expo_push_token: newToken })
      .eq('id', profile.id)
      // .select();
      
  };
  console.log('database push completed plus profile id', profile.id)

  useEffect(() => {
    console.log('before useEffect') 
    registerForPushNotificationsAsync().then((token) => savePushToken(token));
    console.log('after useEffect')


    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  console.log('Push token: ', expoPushToken);
  console.log('Notif: ', notification);

  return <>{children}</>;
};

export default NotificationProvider;