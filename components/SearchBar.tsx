import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
interface Props {
  onPress?: () => void;
  value: string;
  placeholderValue: string;
  onChangeText: (text: string) => void;
}
const SearchBar = ({
  onPress,
  value,
  placeholderValue,
  onChangeText,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 h-12 gap-2">
      <Image source={icons.search} className="size-5" />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholderValue}
        placeholderTextColor="#A8B5DB"
        className="flex-1 text-white text-sm p-0"
        style={{ textAlignVertical: "center" }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
