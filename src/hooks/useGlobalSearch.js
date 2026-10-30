import { useMemo } from 'react';
import { createSearchIndex, searchIndex } from '../utils/search.js';
export function useGlobalSearch(datasets, query, activeId) {
  const index = useMemo(() => createSearchIndex(datasets), [datasets]);
  return useMemo(() => searchIndex(index, query, activeId), [index, query, activeId]);
}
