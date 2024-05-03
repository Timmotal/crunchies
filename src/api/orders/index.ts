import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { UpdateTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({ archived = false }) => { // name is because only the admin will query all orders the database
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

        return useQuery({
          // query depends on whether it is archived or not
        queryKey: ['orders', { archived} ],
        queryFn: async () => {
          const { data, error } = await supabase
          .from('orders')
          .select('*')
          .in('status', statuses)
          .order('created_at', { ascending: false });
          // .in('status', ['New', 'Cooking', 'Delivering', 'Delivered']); // filter based on array of values
          if(error) {
            throw new Error(error.message);
          }
          return data;
        }, 
      });
};


export const useMyOrderList = () => {
  // because we are defining all the data fetching mechnisms in custom hooks, that means that access to other
  // hooks in the application, here we use useAuth and get info about the user

  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    // to make sure the cache for this query is not mixed up with other query 
  queryKey: ['orders', { userId: id }],
  queryFn: async () => {
    // so because ID can be undefined, we handle thus below
    if(!id) return null;
    const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', id) // make sure column user ID is equal to ID of user making the request
    .order('created_at', { ascending: false });

    if(error) {
      throw new Error(error.message);
    }
    return data;
  }, 
});
};

export const useOrderDetails = (id: number) => {
  return useQuery({
      queryKey: ['orders', id],
      queryFn: async () => {
          const { data, error } = await supabase
          .from('orders')
          // this query is a unique one to me, solves relationships problems (05:43:00)
          // Getting Data for a product on multiple coolumns, query nested data with a single query
          .select('*, order_items(*, products(*))') // also select other columns related to current column 
          .eq('id', id)
          .single()

          if(error) {
              throw new Error(error.message)
          }
          return data;
      }
  })
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id

  return useMutation({
      async mutationFn(data: InsertTables<'orders'>) {
          const { error, data: newProduct, } = await supabase
                                          .from('orders')
                                          // .insert({ user_id: userId, ...data }) // below syntax, maker userId priority
                                          .insert({ ...data, user_id: userId })
                                          .select()// added because, we want to select it from the Database after creating
                                          .single();
      if(error) {
          throw new Error(error.message) 
      }
          return newProduct;
  },
  async onSuccess() {
      await queryClient.invalidateQueries(['orders'])
  },
  })
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // when you update the product, you need the required ID and updatedFields
      async mutationFn({ 
        id, 
        updatedFields 
      } : {
        id: number;
        updatedFields: UpdateTables<'orders'>;
      }) {
          const { error, data: updatedOrder, } = await supabase
                                          .from('orders') // target a table in the database
                                          .update(updatedFields)
                                          .eq('id', id) // find where the ID is equal to the 'ID"
                                          .select()
                                          .single(); // we do this to get single object, instead of an array
      if(error) {
          throw new Error(error.message) 
      }
          return updatedOrder;
  },
  // onSuccess invalidate queries and refetch the list of products
  // async onSuccess(_, { id }) { we can even destructure from here
  async onSuccess(_, data) { // function that get invoked when the function is previous succesfully executed 
      await queryClient.invalidateQueries(['orders']) // actually, it literally invalidates the query, which makes it run again
      await queryClient.invalidateQueries(['orders', data.id])
  },
  // onError(error) {} says he doesn't need this line
  })
}