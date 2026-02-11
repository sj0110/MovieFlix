import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies, updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    isLoading,
    error,
    refetch: loadMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // 1. Await the result directly from the hook
      // This ensures 'result' contains the movies for THIS specific search query
      const result = await loadMovies();

      // 2. Use 'result' instead of the global 'movies' state
      if (searchQuery.trim().length > 0 && result && result.length > 0) {
        await updateSearchCount(searchQuery, result[0]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
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
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 10, marginBottom: 10 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          !isLoading && !error && searchQuery.trim() ? (
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-gray-400 text-lg">No movies found for "{searchQuery}"</Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <View className="mt-10">
            <Image source={icons.logo} className="w-12 h-10 flex mx-auto mb-10" />

            <SearchBar
              value={searchQuery}
              placeholderValue="Search for a movie"
              onChangeText={(text: string) => setSearchQuery(text)}
            />

            {(isLoading || isTrendingLoading) && (
              <ActivityIndicator size="large" color="#AB8BFF" className="mt-10" />
            )}

            {/* --- 1. TRENDING SECTION (Hidden when searching) --- */}
            {!searchQuery.trim() && !isTrendingLoading && (trendingMovies?.length ?? 0) > 0 && (
              <View className="mt-8">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  keyExtractor={(item) => item.$id}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                />
              </View>
            )}

            {/* --- 2. SEARCH RESULTS HEADER --- */}
            {!isLoading && (
              <Text className="text-lg text-white font-bold mb-3">
                {searchQuery.trim() ? (
                  <>Search Results for <Text className="text-accent">{searchQuery}</Text></>
                ) : (
                  "Latest Movies"
                )}
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}