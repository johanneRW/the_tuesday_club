import { createContext, useContext, useState, ReactNode } from "react";
import { Album } from "../hooks/useAlbums";

interface CartItem {
  item: Album;
  count: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (album: Album) => void;
  removeFromCart: (albumId: string) => void;
  clearCart: () => void;
  increaseCount: (albumId: string) => void;
  decreaseCount: (albumId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (album: Album) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.item.album_id === album.album_id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.item.album_id === album.album_id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prevCart, { item: album, count: 1 }];
      }
    });
  };

  const removeFromCart = (albumId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.item.album_id === albumId ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseCount = (albumId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.item.album_id === albumId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = (albumId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.item.album_id === albumId ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, increaseCount, decreaseCount }}
    >
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
