import { useCallback, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { useHeaderHeight } from "@react-navigation/elements";

import { getCategories, getProducts } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { ProductShimmerGrid } from "@/components/ProductListShimmer";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const headerHeight = useHeaderHeight();

  const {
    data: products,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["all", ...categories];

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      if (selectedCategory !== "all") {
        return product.category === selectedCategory;
      }
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [products, searchQuery, selectedCategory]);

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: Platform.select({
            ios: headerHeight,
            android: 0,
          }),
        },
      ]}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => {
              setSearchQuery(e.nativeEvent.text);
            },
          },
        }}
      />

      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}
        >
          {allCategories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <ProductShimmerGrid />
      ) : (
        <FlashList
          data={filteredProducts}
          renderItem={renderProduct}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    height: 60,
    zIndex: 1,
  },
  categoryScrollView: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  selectedCategoryText: {
    color: "#fff",
  },
});
