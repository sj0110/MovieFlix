import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TrendingCard = ({ movie, index }: { movie: any, index: number }) => {
    // Guard against NaN: If index is undefined, default to 0
    const safeIndex = index ?? 0;
    return (
        <Link href={`/movies/${movie.movieId}`} asChild>
            <TouchableOpacity className='w-32 relative'>
                <Image
                    source={{ uri: movie.posterURL }}
                    className='w-32 h-48 rounded-lg' />
                <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                    <MaskedView
                        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
                        maskElement={
                            <Text className='font-bold text-white text-6xl'>{safeIndex + 1}</Text>
                        }
                    >
                        <Image source={images.rankingGradient} className='size-14' resizeMode='cover' />
                    </MaskedView>
                </View>
                <Text className='text-sm font-bold text-light-200 mt-2' numberOfLines={2} ellipsizeMode="tail">
                    {movie.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard

const styles = StyleSheet.create({})