import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../slices/viewSlice'; // adjust path as needed
const useView = () => {

  const dispatch = useDispatch();
  const { viewMode } = useSelector((state) => state.view);

  const setViewMode = useCallback((mode) => {
    dispatch(setView(mode));
  }, [dispatch]); 

  return { viewMode, setViewMode };
};
export default useView;