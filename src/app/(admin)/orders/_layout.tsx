import { Stack } from "expo-router";

export default function MenuStack() {
    return (
        <Stack
        >
            {/* this method to adjust the configs requires the name */}
            {/* <Stack.Screen name='index' options={{ title: 'Orders' }} /> */}
            <Stack.Screen name='list' options={{ headerShown: false }} />
        </Stack>
    )
}