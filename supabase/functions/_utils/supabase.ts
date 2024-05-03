import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { stripe } from './stripe.ts';

// says we are impersonating a user
export const createOrRetrieveProfile = async (req: Request) => {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { // create client based on the authorization received  from the client
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // console.log(user);
		if (!user) throw new Error('No user found');

        // based on userId we can query profile infor and based on that figure out, if already a Stripe Customer
        const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

        if(error || !profile) {
            throw new Error('Profile not found');
        }

        console.log(profile)
        if(profile.stripe_customer_id) { // do not create a new customer, if already existing
            return profile.stripe_customer_id
        }

        // Create a Stripe Customer
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {uid: user.id},
        })

        // console.log(customer);
        // SAVE TO DB
        await supabaseClient
            .from('profiles')
            .update({ stripe_customer_id: customer.id })
            .eq('id', profile.id);

            return customer.id;
};