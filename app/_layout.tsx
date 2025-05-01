import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";

import CartButton from "@/components/CartButton";
import { storage } from "@/store/mmkv";
import Ionicons from "@expo/vector-icons/Ionicons";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

export default function RootLayout() {
  const router = useRouter();
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({
    storage,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Galactics Products",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: "Search products",
              hideWhenScrolling: false,
              hideNavigationBar: false,
            },
            headerRight: () => <CartButton />,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "",
            headerBackTitle: "Products",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Cart",
            headerTitleAlign: "center",
            presentation: "modal",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.dismiss()}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
