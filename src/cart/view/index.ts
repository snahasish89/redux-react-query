import {lazy} from 'react'

export const Product = lazy(() => import('../view/product.view'))
export const Cart = lazy(() => import('../view/cart.view'))