(() => {
  const insightCollections = new Set(['insights_pl', 'insights_en']);
  const altMessages = {
    insights_pl: 'Dodaj opis alternatywny zdjęcia artykułu przed zapisaniem materiału.',
    insights_en: 'Add alternative text for the article image before saving the entry.',
  };
  const mediaMessages = {
    insights_pl: 'Wybierz obraz zapisany w bibliotece mediów Insights.',
    insights_en: 'Choose an image stored in the Insights media library.',
  };
  const insightMediaPath = /^\/images\/insights\/[^/]+$/;
  const mediaFields = ['headerImage', 'socialImage'];

  const throwSavingError = (message) => {
    const error = new Error('saving_failed');

    error.cause = new Error(message);
    throw error;
  };

  CMS.registerEventListener({
    name: 'preSave',
    handler: ({ entry }) => {
      const collection = entry.get('collection');

      if (!insightCollections.has(collection)) {
        return undefined;
      }

      mediaFields.forEach((fieldName) => {
        const value = entry.getIn(['data', fieldName]);

        if (
          typeof value === 'string' &&
          value.trim() !== '' &&
          !insightMediaPath.test(value.trim())
        ) {
          throwSavingError(mediaMessages[collection]);
        }
      });

      const headerImage = entry.getIn(['data', 'headerImage']);
      const headerImageAlt = entry.getIn(['data', 'headerImageAlt']);
      const hasHeaderImage = typeof headerImage === 'string' && headerImage.trim() !== '';
      const hasHeaderImageAlt =
        typeof headerImageAlt === 'string' && headerImageAlt.trim() !== '';

      if (hasHeaderImage && !hasHeaderImageAlt) {
        throwSavingError(altMessages[collection]);
      }

      if (!hasHeaderImage && hasHeaderImageAlt) {
        return entry.deleteIn(['data', 'headerImageAlt']);
      }

      return undefined;
    },
  });
})();
