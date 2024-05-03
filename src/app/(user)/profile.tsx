import { supabase } from '@/lib/supabase'
import { Button } from 'react-native'
import { View, Text } from 'react-native'

const profile = () => {
  return (
    <View>  
      <Text>profile</Text>

      <Button 
        title='Sign Out' 
        onPress={async () => await supabase.auth.signOut()}
        // onPress={() => console.warn('sign out')} 
      />
    </View>
  )
}

export default profile