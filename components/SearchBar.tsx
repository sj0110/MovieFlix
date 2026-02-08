import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
interface Props {
  onPress?: () => void;
  placeholderValue: string;
}
const SearchBar = ({ onPress, placeholderValue }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4 gap-2">
      <Image source={icons.search} className="size-5" />
      <TextInput
        onPress={onPress}
        value=""
        placeholder={placeholderValue}
        placeholderTextColor="#A8B5DB"
        className="flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
