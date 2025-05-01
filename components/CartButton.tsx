import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <TouchableOpacity>
      {count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
      <Ionicons
        name="cart"
        size={28}
        // color={COLORS.primary}
        // style={{ marginRight: 20 }}
      />
    </TouchableOpacity>
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
