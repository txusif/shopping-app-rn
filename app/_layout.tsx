import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
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
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
