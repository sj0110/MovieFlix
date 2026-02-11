import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  // FIX 1: Pass a stable function reference.
  // We wrap it in a function that provides the empty query default.
  const {
    data: movies,
    isLoading: isMoviesLoading,
    error: movieLoadingError,
  } = useFetch(() => fetchMovies({ query: "" }));

  interface ItemProps {
    title: string;
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        className="flex-1 px-5"
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
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
              onPress={() => router.push("/search")}
              value=""
              placeholderValue="Search for a movie"
              onChangeText={() => {}}
            />

            {isMoviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000FF"
                className="mt-10"
              />
            ) : movieLoadingError ? (
              <Text className="text-red-500 mt-5">
                Error: {movieLoadingError?.message}
              </Text>
            ) : (
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
            )}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
