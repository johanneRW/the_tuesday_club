import React, { createContext, useContext, useState, ReactNode } from "react";
import { Album } from "../hooks/useAlbums";

export interface CartItem {
  item: Album;
  count: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (album: Album) => void;
  removeFromCart: (albumId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (album: Album) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.item.album_id === album.album_id);
      if (existingItem) {
        // Hvis pladen allerede findes, øg antallet
        return prevCart.map((item) =>
          item.item.album_id === album.album_id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        // Tilføj en ny post, hvis den ikke findes
        return [...prevCart, { item: album, count: 1 }];
      }
    });
  };

  const removeFromCart = (albumId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.item.album_id === albumId
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0) // Fjern posten, hvis antallet bliver 0
    );
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
