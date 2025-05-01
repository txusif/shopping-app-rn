import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Product } from "@/types";
import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem = ({ item }: CartItemProps) => {
  const { addProduct, reduceProduct } = useCartStore();

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item);
    }
  };

  return (
    <View style={styles.cartItemContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        contentFit="cover"
      />

      <View style={styles.itemContainer}>
        <Text style={styles.cartItemName}>{item.title}</Text>
        <Text>Price: ${item.price}</Text>
        {/* <Text style={styles.cartItemPrice}>
          ${(item.quantity * item.price).toFixed(2)}
        </Text> */}
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChange("decrement")}>
          <Ionicons name="remove" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.cartItemQuantity}>{item.quantity}</Text>

        <TouchableOpacity onPress={() => handleQuantityChange("increment")}>
          <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    padding: 10,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#666",
  },
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: COLORS.primary,
    color: "#fff",
    padding: 5,
    width: 30,
    textAlign: "center",
  },
});
