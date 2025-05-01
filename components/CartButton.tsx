import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <Link href={"/cart"} asChild>
      <TouchableOpacity>
        {count > 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
        <Ionicons name="cart" size={28} />
      </TouchableOpacity>
    </Link>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    right: -8,
    bottom: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    zIndex: 1,
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});
