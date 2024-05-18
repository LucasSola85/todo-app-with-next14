import { getCookie, hasCookie, setCookie } from "cookies-next"



export const getCookiesCart = (): { [id:string]: number} => {

    if( hasCookie('cart') ){
        const cookiesCart = JSON.parse(getCookie('cart') as string ?? '{}');
        return cookiesCart;
    }
    
    return {}

}


export const addProductCart = (id: string) => {

    const cookiesCart = getCookiesCart();

    if ( cookiesCart[id] ){
        
        cookiesCart[id] += 1;
    } else {
        cookiesCart[id] = 1;
    }

    setCookie('cart', JSON.stringify(cookiesCart));

}


export const removeProductCart = (id: string) => {
    
        const cookiesCart = getCookiesCart();
    
        if ( cookiesCart[id] ){
            
            cookiesCart[id] -= 1;
            if ( cookiesCart[id] === 0 ){
                delete cookiesCart[id];
            }
        }
    
        setCookie('cart', JSON.stringify(cookiesCart));
}