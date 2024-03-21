import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product, Tables } from '@/types';
import { randomUUID } from "expo-crypto";

type Product = Tables<'products'>;

type CartType = {
    items: CartItem[];
    addItem: (product: Tables<'products'>, size: CartItem['size']) => void; // with type generated from the supabase DB Tables
    // addItem: (product: Product, size: CartItem['size']) => void; // select CartItem and then specifically select 'size'
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    // updateQuantity: (itemId: string, amount: number);
    total: number;
  };


// we don't need to export it any  more, since we will import useCart custom hook
// i understand that we are passing this into the custom hook as a param
// export const CartContext = createContext({});
const CartContext = createContext<CartType>({
    items: [], // we specified what the initial value will be
    addItem: () => {}, // empty function, both will never be used because they will be over written by actual function
    updateQuantity: () => {},
    total: 0,
});

// creates context
// gets or consumes the context

const CartProvider = ({ children }: PropsWithChildren) => {
    // specify the type to be of CartItem with empty Array
    const [ items, setItems ] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        // if already in cart, increment quantity
        const existingItem = items.find(item => item.product === product && item.size === size);

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return; // NOTE this, so the code does not continue on
        }

        const newCartItem: CartItem = {
            // id: '1',
            id: randomUUID(), // generate random unique ID, imagine, if I had to do this without tutorial
            // because we have unique IDs, we will be able to change the no of items in our cart
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        // append to rest of the item of our state
        setItems([newCartItem, ...items]); // add rest of items already in the state
        // console.log('Feb 22nd, just got accepted into Grachiever internship unpaid program, grateful to be accepted even though I do nt want to be')
        // console.log(product);
    };

    // update quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        //A BIT CHALLENGING HE SAYS...
        // whenever we map through the items, what we want to do is -> like the explanation (02:08:00)
        // we want to change only the items where the ID matches
        // otherwise, return an object with some fields changed, while not overwriting rest of field
        // we then specified the particular quantities we want changed
        // const updatedItems = items.map(item => 
        //     item.id !== itemId ? item : {...item, quantity: item.quantity + amount});

        setItems( // logic explantion (02:10:00)
            items.map(item => 
                item.id !== itemId ? 
                item : // if not the item we are looking, simply give it back, else update it's quantity
                {...item, quantity: item.quantity + amount})
                .filter((item) => item.quantity > 0) // another banger logic

            )
            // setItems(updatedItems);

        // perhaps, this is the first time i suspected the bug without video
        //  but still, I did not try to postulate where the problem could be coming from
        // console.log(itemId, amount);
    }

    // console.log(items);
    // reduce method is useful for calculating averages, sum e.t.c
    // const total = 493;
    const total = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity),
                        // sum += 12 * 2 + 34 + 
        0 // initial value of sum
    )

    return (
        <CartContext.Provider
            value={{ // here is what we make available to the cart context consumer
                // items: [,3,,5,5,6,6,6,7,7,5,6,7,7,],
                // items: items, // ES6 syntax, use a single value to denote same key and value
                items,
                // onAddItem: () => {}, // can be empty function or some values
                addItem,
                updateQuantity,
                total,
            }}
        > 
        {/* anything rendered inside the provider will be able to consume the values */}
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

// A FUNCTION THAT ACTS AS A sort of SHORTHAND
//  we are exporting custom hook
// will be equal to a function that will call useContext and will specify CartContext
export const useCart = () => useContext(CartContext);