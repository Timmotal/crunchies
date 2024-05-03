// will help us manage our stripe interactions
import { Alert } from "react-native";
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
    //  this function needs the amount because it will send it to the edge function to fetch the data
    const { data, error } = await supabase.functions.invoke('payment-sheet',{
         body: { amount },
     }); // folder name is function name

     if(data) {
        console.log(data);
        return data;
     }
     console.log(data)
     console.log(error)
     
     Alert.alert('Error fetching payment sheet params');
     return {}; // return empty object
    }

export const initializePaymentSheet = async (amount: number) => {
    // function will receive the amount for which we want to initialize the payment-sheet
    console.log('Initialize Payment Sheet for: ', amount);

    const { paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(amount);
    // const data = await fetchPaymentSheetParams(amount);
    // console.log(data);

    if(!paymentIntent || !publishableKey) return;
    
    const result = await initPaymentSheet({
        merchantDisplayName: "Ranga",
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: 'Dikov Lado',
        }
    })
};

export const openPaymentSheet = async() => {
    const {error} = await presentPaymentSheet();

    if(error) {
        Alert.alert(error.message);
        return false;
    }
    return true;
}