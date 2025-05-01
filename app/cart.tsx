import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import CartItem from "@/components/CartItem";

const Page = () => {
  const { products, total, clearCart } = useCartStore();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert(
        "Add items to your cart",
        "You need to add items to your cart before checking out.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
      );
      return;
    }
    clearCart();
    Alert.alert("Checkout successful");

    router.dismiss();
  };

  return (
    <View style={styles.container}>
      {products.length === 0 && (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      )}
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={products}
        renderItem={({ item }) => <CartItem item={item} />}
        ListHeaderComponent={() => (
          <>
            {products.length && (
              <Text style={styles.totalText}>Total: ${total}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        style={[
          styles.addToCartButton,
          { paddingBottom: Platform.OS === "ios" ? bottom : 20 },
        ]}
        onPress={handleCheckout}
      >
        <Ionicons name="checkmark" size={20} color="white" />
        <Text style={styles.addToCartText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
