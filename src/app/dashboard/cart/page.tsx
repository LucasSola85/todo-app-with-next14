import { WidgetItem } from "@/components";
import { products, type Product } from "@/products/data/products";
import { ItemsCard } from "@/shopping-cart/components/ItemsCart";
import { cookies } from "next/headers";



export const metadata = {
 title: 'Carrito de compras',
 description: 'Carritos de compras',
};

interface ProductsInCart {
    product: Product;
    quantity: number;
}

const getProductInCart = (cart: { [id:string]: number }): ProductsInCart[] => {

    const productsInCart: ProductsInCart[] = [];

    for (const id of Object.keys(cart)) {
        const product = products.find((product) => product.id === id);
        if (product) {
            productsInCart.push({ product, quantity: cart[id] });
        }
    }

    return productsInCart;
}


export default function CartPage() {

    const cookiesStore = cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
    const productsInCart = getProductInCart(cart);

    const subtotal = productsInCart.reduce((acc, { product, quantity })=> acc + (product.price * quantity), 0);


  return (
    <div>
      <h1 className="text text-2xl">Productos en el Carrito</h1>
      <hr className="mb-2"/>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="flex flex-col gap-2 w-full sm:w-8/12">
                {
                    productsInCart.map(({ product, quantity }) => (
                        <ItemsCard key={product.id} product={product} quantity={quantity} />
                    ))
                }
            </div>

            <div className="flex flex-col w-full sm:w-4/12 items-center justify-center">

                <WidgetItem title="Resumen de la compra">
                    <div className="flex flex-col gap-2 sm:flex flex-1">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{ subtotal }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Impuestos 15%:</span>
                            <span>${ (subtotal * 0.15).toFixed(2) }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span>${(subtotal * 1.15).toFixed(2)}</span>
                        </div>
                    </div>
                </WidgetItem>

            </div>
        </div>
    

    </div>
  );
}