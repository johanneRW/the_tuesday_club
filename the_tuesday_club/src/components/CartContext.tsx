
import { createContext, ReactNode, useContext, useState } from "react";
import { Album } from "../hooks/useAlbums";

interface CartContextType {
  cart: Album[];
  addToCart: (album: Album) => void;
  removeFromCart: (albumId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Album[]>([]);

  const addToCart = (album: Album) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.album_id === album.album_id)) return prevCart;
      return [...prevCart, album];
    });
  };

  const removeFromCart = (albumId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.album_id !== albumId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
