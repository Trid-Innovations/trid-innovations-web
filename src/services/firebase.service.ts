import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Article } from "../types";

/**
 * Firebase Service: Centralized CRUD operations for Firestore
 */
export const FirebaseService = {
  /**
   * Article operations
   */
  articles: {
    /**
     * Get all articles with optional filtering
     */
    getAll: async (options?: {
      onlyActive?: boolean;
      limitCount?: number;
      language?: string;
    }): Promise<Article[]> => {
      try {
        // Build query with conditionals
        let queryConstraints: any[] = [];

        // Filter archived articles if requested
        if (options?.onlyActive) {
          queryConstraints.push(where("archived", "!=", true));
          queryConstraints.push(orderBy("archived"));
        }

        // Order by date
        queryConstraints.push(orderBy("date", "desc"));

        // Add language filter if provided
        if (options?.language) {
          queryConstraints.push(where("language", "==", options.language));
        }

        // Add limit if provided
        if (options?.limitCount) {
          queryConstraints.push(limit(options.limitCount));
        }

        const q = query(collection(db, "articles"), ...queryConstraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            // Convert Firestore Timestamps to ISO strings if they exist
            date:
              data.date instanceof Timestamp
                ? data.date.toDate().toISOString()
                : data.date,
            archivedAt:
              data.archivedAt instanceof Timestamp
                ? data.archivedAt.toDate().toISOString()
                : data.archivedAt,
          } as Article;
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
    },

    /**
     * Get single article by ID
     */
    getById: async (id: string): Promise<Article | null> => {
      try {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          return null;
        }

        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          // Convert Firestore Timestamps to ISO strings if they exist
          date:
            data.date instanceof Timestamp
              ? data.date.toDate().toISOString()
              : data.date,
          archivedAt:
            data.archivedAt instanceof Timestamp
              ? data.archivedAt.toDate().toISOString()
              : data.archivedAt,
        } as Article;
      } catch (error) {
        console.error(`Error fetching article with ID ${id}:`, error);
        throw error;
      }
    },

    /**
     * Create a new article
     */
    create: async (article: Omit<Article, "id">): Promise<Article> => {
      try {
        // Add server timestamp
        const articleWithTimestamp = {
          ...article,
          date: serverTimestamp(),
          createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(
          collection(db, "articles"),
          articleWithTimestamp
        );

        // Return the created article with ID
        return {
          ...article,
          id: docRef.id,
          date: new Date().toISOString(), // Client-side date for immediate UI update
          createdAt: new Date().toISOString(),
        } as Article;
      } catch (error) {
        console.error("Error creating article:", error);
        throw error;
      }
    },

    /**
     * Update an existing article
     */
    update: async (id: string, article: Partial<Article>): Promise<void> => {
      try {
        const docRef = doc(db, "articles", id);

        // Add updated timestamp
        const articleWithTimestamp = {
          ...article,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, articleWithTimestamp);
      } catch (error) {
        console.error(`Error updating article with ID ${id}:`, error);
        throw error;
      }
    },

    /**
     * Archive an article (soft delete)
     */
    archive: async (id: string): Promise<void> => {
      try {
        const docRef = doc(db, "articles", id);
        await updateDoc(docRef, {
          archived: true,
          archivedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error(`Error archiving article with ID ${id}:`, error);
        throw error;
      }
    },

    /**
     * Restore an archived article
     */
    restore: async (id: string): Promise<void> => {
      try {
        const docRef = doc(db, "articles", id);
        await updateDoc(docRef, {
          archived: false,
          archivedAt: null,
          restoredAt: serverTimestamp(),
        });
      } catch (error) {
        console.error(`Error restoring article with ID ${id}:`, error);
        throw error;
      }
    },

    /**
     * Search articles by text query
     */
    search: async (
      searchTerm: string,
      options?: {
        onlyActive?: boolean;
        language?: string;
      }
    ): Promise<Article[]> => {
      try {
        // Get all articles first (we'll need to filter in memory since Firestore doesn't support full text search)
        const articles = await FirebaseService.articles.getAll(options);

        // Filter by search term
        if (!searchTerm) return articles;

        const lowercaseSearch = searchTerm.toLowerCase();
        return articles.filter(
          (article) =>
            article.title?.toLowerCase().includes(lowercaseSearch) ||
            article.summary?.toLowerCase().includes(lowercaseSearch) ||
            article.content?.toLowerCase().includes(lowercaseSearch) ||
            article.author?.toLowerCase().includes(lowercaseSearch)
        );
      } catch (error) {
        console.error("Error searching articles:", error);
        throw error;
      }
    },
  },

  // You can add other collections like users, comments, etc. here

  /**
   * Error handling helper
   */
  handleError: (error: any, context: string): never => {
    console.error(`Firebase error in ${context}:`, error);
    throw new Error(`${context}: ${error.message || "Unknown error"}`);
  },
};
