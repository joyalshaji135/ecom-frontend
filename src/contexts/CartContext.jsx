import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
        loading: false
      }
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id && 
                item.size === action.payload.size && 
                item.color === action.payload.color
      )

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        localStorage.setItem('cart', JSON.stringify(updatedItems))
        return { ...state, items: updatedItems }
      } else {
        const newItems = [...state.items, action.payload]
        localStorage.setItem('cart', JSON.stringify(newItems))
        return { ...state, items: newItems }
      }

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.cartId === action.payload.cartId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      return { ...state, items: updatedItems }

    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.cartId !== action.payload)
      localStorage.setItem('cart', JSON.stringify(filteredItems))
      return { ...state, items: filteredItems }

    case 'CLEAR_CART':
      localStorage.removeItem('cart')
      return { ...state, items: [] }

    default:
      return state
  }
}

const initialState = {
  items: [],
  loading: true
}

// Export the hook
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Export the provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    dispatch({ type: 'LOAD_CART', payload: savedCart ? JSON.parse(savedCart) : [] })
  }, [])

  const addToCart = (product, size, color, quantity = 1) => {
    const cartItem = {
      cartId: `${product.id}-${size}-${color}`,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
      quantity,
      maxQuantity: 10
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem })
  }

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } })
  }

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    items: state.items,
    loading: state.loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Default export
export default CartContext