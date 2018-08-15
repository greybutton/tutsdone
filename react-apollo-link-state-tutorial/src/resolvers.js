import { GET_SELECTED_REPOSITORIES } from './App';

export const defaults = {
  selectedRepositoryIds: ['MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=='],
};

const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  let { selectedRepositoryIds } = cache.readQuery({
    query: GET_SELECTED_REPOSITORIES,
  });

  selectedRepositoryIds = isSelected
    ? selectedRepositoryIds.filter(itemId => itemId !== id)
    : selectedRepositoryIds.concat(id);
  
  cache.writeQuery({
    query: GET_SELECTED_REPOSITORIES,
    data: { selectedRepositoryIds },
  });

  return null;
};


export const resolvers = {
  Mutation: {
    toggleSelectRepository,
  },
};
