import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: movie, isLoading, error } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary justify-center items-center p-5">
        <Text className="text-light-100 text-center font-bold">Something went wrong.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-accent px-6 py-2 rounded-full"
        >
          <Text className="text-primary font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Backdrop */}
        <View className="relative w-full h-[600px]">
          <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
            className="w-full h-full"
            resizeMode="cover"
          >
            {/* Dark Gradient Overlay for contrast */}
            <LinearGradient
              colors={["transparent", "rgba(3, 0, 20, 0.8)", "#030014"]}
              className="absolute inset-0"
            />

            <SafeAreaView className="flex-row justify-between px-5 mt-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-dark-200/80 p-2 rounded-xl border border-white/10"
              >
                <Ionicons name="chevron-back" size={24} color="#D6C6FF" />
              </TouchableOpacity>

              <TouchableOpacity className="bg-dark-200/80 p-2 rounded-xl border border-white/10">
                <Ionicons name="heart-outline" size={24} color="#AB8BFF" />
              </TouchableOpacity>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* Content Container */}
        <View className="px-6 -mt-24">
          {/* Release Year & Rating Badge */}
          <View className="flex-row items-center space-x-3 mb-2 gap-2">
            <View className="bg-accent/20 px-3 py-1 rounded-md border border-accent/30">
              <Text className="text-accent font-bold text-xs uppercase tracking-tighter">
                {movie.status}
              </Text>
            </View>
            <Text className="text-light-200 font-medium">
              {movie.release_date.split("-")[0]}
            </Text>
          </View>

          <Text className="text-white text-4xl font-extrabold tracking-tight">
            {movie.title}
          </Text>

          {movie.tagline && (
            <Text className="text-accent italic mt-1 text-lg opacity-80">
              {movie.tagline}
            </Text>
          )}

          {/* Stats Row */}
          <View className="flex-row items-center mt-6 py-4 border-y border-white/5 justify-between">
            <View className="items-center flex-1 border-r border-white/5">
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text className="text-white font-bold mt-1">{movie.vote_average.toFixed(1)}</Text>
              <Text className="text-light-300 text-[10px] uppercase">Rating</Text>
            </View>
            <View className="items-center flex-1 border-r border-white/5">
              <Ionicons name="time-outline" size={18} color="#D6C6FF" />
              <Text className="text-white font-bold mt-1">{movie.runtime}m</Text>
              <Text className="text-light-300 text-[10px] uppercase">Duration</Text>
            </View>
            <View className="items-center flex-1">
              <Ionicons name="language-outline" size={18} color="#D6C6FF" />
              <Text className="text-white font-bold mt-1 uppercase">{movie.original_language}</Text>
              <Text className="text-light-300 text-[10px] uppercase">Language</Text>
            </View>
          </View>

          {/* Genres Chips */}
          <View className="flex-row flex-wrap mt-6 gap-2">
            {movie.genres.map((genre) => (
              <View
                key={genre.id}
                className="bg-dark-100 px-4 py-2 rounded-2xl border border-white/5"
              >
                <Text className="text-light-100 text-xs font-semibold">{genre.name}</Text>
              </View>
            ))}
          </View>

          {/* Storyline Section */}
          <View className="mt-8">
            <Text className="text-white text-xl font-bold mb-3">Storyline</Text>
            <Text className="text-light-200 leading-7 text-[15px]">
              {movie.overview}
            </Text>
          </View>

          {/* Financials / Metadata */}
          <View className="mt-8 p-5 bg-secondary rounded-3xl flex-row justify-between">
            <View>
              <Text className="text-light-300 text-xs font-bold uppercase mb-1">Budget</Text>
              <Text className="text-white font-semibold">${(movie.budget / 1000000).toFixed(1)}M</Text>
            </View>
            <View className="items-end">
              <Text className="text-light-300 text-xs font-bold uppercase mb-1">Revenue</Text>
              <Text className="text-white font-semibold">${(movie.revenue / 1000000).toFixed(1)}M</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button - Industry Standard CTA */}
      <View className="absolute bottom-10 left-0 right-0 px-6">
        <TouchableOpacity onPress={() => router.back()} className="bg-accent w-full py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-accent/50">
          <Ionicons name="arrow-back-outline" size={24} color="#030014" />
          <Text className="text-primary font-extrabold text-lg ml-2">Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieDetails;