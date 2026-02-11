import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Calculate width: (Total Screen Width - total horizontal padding - total gaps) / 3
const { width } = Dimensions.get("window");
const containerPadding = 40; // px-5 on both sides = 40
const gap = 10;
const cardWidth = (width - containerPadding - gap * 2) / 3;

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Link href={`/movies/${id}`} asChild>
      {/* Replace w-1/3 with a specific calculated width */}
      <TouchableOpacity style={{ width: cardWidth }}>
        <Image
          className="w-full h-52 rounded-lg"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
          }}
        />
        <View className="mt-2">
          <Pressable onPress={() => setIsExpanded(!isExpanded)}>
            <Text
              className="text-white text-sm font-semibold"
              numberOfLines={isExpanded ? 0 : 1} // 0 means no limit (show all)
              ellipsizeMode="tail" // ensures that when the text is truncated, the "..." appears at the end of the line.
            >
              {title}
            </Text>
          </Pressable>
        </View>
        <View className="flex flex-row justify-between mt-1">
          <View className="flex-row justify-start items-center gap-x-1">
            <Image source={icons.star} className="size-3" />
            <Text className="text-white font-bold text-xs">
              {Math.round((vote_average / 2.0) * 10) / 10 || 0}
            </Text>
          </View>
          <Text className="text-xs text-light-300 font-medium">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
