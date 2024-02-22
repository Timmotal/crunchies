// define stack navigator for this layout

import { Stack } from "expo-router";

export default function MenuStack() {
    // return <Stack />;
    return (
        <Stack>
            {/* this method to adjust the configs requires the name */}
            <Stack.Screen name='index' options={{ title: 'Menu' }} />
        </Stack>
    )
}