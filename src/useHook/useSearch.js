import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchSearchResults, resetSearch,addRecentSearch ,selectedArtist} from '../slices/searchSlice'; // adjust path as needed

const useSearch = () => {
  const dispatch = useDispatch();
  const { recentSearches,results,artistSelected, loading, error, hasMore, offset, query } = useSelector((state) => state.search);

  const search = useCallback((input) => {
    dispatch(resetSearch(input));
    dispatch(fetchSearchResults({ query: input, offset: 0 }));
    dispatch(addRecentSearch(input));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    dispatch(fetchSearchResults({ query, offset }));
  }, [dispatch, query, offset]);

  const restResult = useCallback(() => {
    dispatch(resetSearch());
  }, [dispatch]);

  const selectArtist = useCallback((artist) => {
    dispatch(selectedArtist(artist));
  }, [dispatch]); 

  return {
    recentSearches,
    results,
    loading,
    error,
    hasMore,
    offset,
    query,
    artistSelected,
    search,
    loadMore,
    restResult,
    selectArtist,
  };
};

export default useSearch;
