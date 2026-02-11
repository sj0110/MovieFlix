import { Client, ID, Models, Query, TablesDB } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

/**
 * Environment variables must be handled securely. In Expo, EXPO_PUBLIC_ 
 * ensures availability in the bundled code.
 */
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

/**
 * Interface representing the Search Analytics structure.
 * Extending Models.Row provides access to metadata fields like $id, $createdAt, etc.
 */
interface SearchRow extends Models.Row {
  searchTerm: string;
  count: number;
  posterURL: string;
  movieId: number;
  title: string;
}

// Client initialization with mandatory platform registration
const client = new Client()
 .setEndpoint(ENDPOINT)
 .setProject(PROJECT_ID)
 .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!);

const tables = new TablesDB(client);

/**
 * Updates or creates a search record atomically.
 * Optimized for React Native performance and data integrity.
 */
export const updateSearchCount = async (query: string, movie: any): Promise<void> => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm || !movie || !movie.id) return;

  try {
    // 1. Efficient lookup using indexed columns. 
    // Queries in 2025/2026 follow the object-parameter pattern for SDK clarity.
    const response = await tables.listRows<SearchRow>({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal('searchTerm', query)]
    });

    if (response.rows.length > 0) {
      // 2. ATOMIC UPDATE: No read-modify-write. 
      // The server increments the value directly at the storage engine level.
      const existingRow = response.rows[0];
      
      await tables.incrementRowColumn({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: existingRow.$id,
        column: "count",
        value: 1 // Delta value to add
      });
    } else {
      // 3. ATOMIC CREATION: Creating the row with initial state.
      // permissions are omitted here; they should be set at the Table level for public analytics.
      await tables.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          posterURL: movie.poster_path 
           ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : "",
          movieId: movie.id,
          title: movie.title,
        }
      });
    }
  } catch (error) {
    // Production error handling with AppwriteException details
    if (error instanceof Error) {
      console.error(`Appwrite Sync Error [${error.name}]: ${error.message}`);
    }
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const response = await tables.listRows<SearchRow>({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [
        Query.orderDesc('count'), // Then, order by year in descending order
        Query.limit(5)
    ]
    });
    return response.rows as unknown as TrendingMovie[];
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching Trending Movies [${error.name}]: ${error.message}`);
    }
    return undefined;
  }
}