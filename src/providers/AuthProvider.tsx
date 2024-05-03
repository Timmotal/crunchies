import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
    session: Session | null ; // why are we doing the type twice, one from supabase and one is custom
    profile: any;
    loading: boolean;
    isAdmin: boolean,
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile:null,
    isAdmin: false,
}) // need to provide initial value of empty object

// function will receive some children, which is a react node
export default function AuthProvider({ children}: PropsWithChildren) {
    const [ session, setSession ] = useState< Session | null >(null);
    const [ profile, setProfile ] = useState(null);
    // when we mount we want to say loading is true, we are not sure if user is authenticated or not
    // only when we fetch user, info, we then say it is false
    const [ loading, setLoading ] = useState(true);

    // we wanna query the session of a user, we do that when AuthProvider is initialized or is Mounted
    useEffect(() => {
        // we cannot directly call async function in a useEffect
        // we need a function and the call it directly after the function
        const fetchSession = async() => {
            // we can now call async function
            // const result = await supabase.auth.getSession();
            // console.log(result);

            // just feel how we destructured it here
            const { data: {session}, } = await supabase.auth.getSession();
            // const { data } = await supabase.auth.getSession();
            // setSession(data.session);
            

            if (session) { // if we receive a session from supabase, we also want to query the profile
                // fetch profile
                const { data } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id) // look for id that matches the session
                  .single();
                setProfile(data || null);
                console.log('this is data', data);
              }

              setLoading(false) // when we finish fetching user info, set loading to false
           
        };
        fetchSession();

        // we subscribe, when application is launched -> when AUthProvider mounts
        supabase.auth.onAuthStateChange((_event, session) => { // sign for Auth state change, update on change
            setSession(session); //
          });
        // console.log('Auth provider is mounted...March 12th 0842 hours...2024') // will be executed when AuthProvider is mounted
    }, []);

    console.log('this is profile',profile);

    return <AuthContext.Provider 
                        // only when the group of profile is an admin, will he be an actual admin
            value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }} // export the values from the state
           >
                {children}
           </AuthContext.Provider>
}

// custom hook that will help get us access to the context
export const useAuth = () => useContext(AuthContext);