import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // FIX 1: Pass a stable function reference.
  // We wrap it in a function that provides the empty query default.
  const {
    data: movies,
    isLoading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  interface ItemProps {
    title: string;
  }

  useEffect(() => {
    const func = async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else reset;
    };
    func();
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        className="flex-1 px-5"
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 10,
          marginBottom: 10,
        }}
        ListHeaderComponent={
          <View className="mt-10">
            <Image
              source={icons.logo}
              className="w-12 h-10 flex mx-auto mb-5"
            />
            <SearchBar
              value={searchQuery}
              placeholderValue="Search for a movie"
              onChangeText={(text: string) => setSearchQuery(text)}
            />
            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10"
              />
            )}
            {error && (
              <Text className="text-red-500 my-3">Error: {error?.message}</Text>
            )}
            {!isLoading && !error && (
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                {searchQuery.trim()
                  ? `Search Results for "${searchQuery}"`
                  : "Search Movies"}
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({});
