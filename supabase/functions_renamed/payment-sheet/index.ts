// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { stripe } from "../_utils/stripe.js"

console.log("Hello from Functions!")

Deno.serve(async (req) => {

  try {
    const { amount } = await req.json(); // destructure amount from the Req

    const paymentIntent = await stripe.paymentIntents.create({
      // amount: 1099, // 10usd 99cents, should always be integers   
      amount: amount,
      currency: 'usd',
    });
  
    const res = {
      paymentIntent: paymentIntent.client_secret,
      // a security measure, better to use it from the server (backend), to prevent possible altering on clientside
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
    }

    // )
  
    return new Response(
      JSON.stringify(res),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      headers: {'Content-Type':'application/json'},
      status: 400,
    })
  }

  // OLD CODE
  // const { amount } = await req.json();

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: 1099, // 10usd 99cents, should always be integers   
  //   currency: 'usd',
  // });

  // const res = {
  //   paymentIntent: paymentIntent.client_secret,
  //   // a security measure, better to use it from the server (backend), to prevent possible altering on clientside
  //   publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
  // }
  // const data = {
  //   message: `Hello this is April 21st, 1934 hours ${name}!`,
  // }

// Deno.serve(async (req) => {
  // const { name } = await req.json()
  // const data = {
    // message: `Hello ${name}!`,
  // }

  // return new Response(
  //   JSON.stringify(data),
  //   { headers: { "Content-Type": "application/json" } },
  // )

  // return new Response(
  //   JSON.stringify(res),
  //   { headers: { "Content-Type": "application/json" } },
  // );

});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'
    --data '{"amount": 7260}'


*/
