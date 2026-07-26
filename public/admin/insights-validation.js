(() => {
  const insightCollections = new Set(['insights_pl', 'insights_en']);
  const altMessages = {
    insights_pl: 'Dodaj opis alternatywny zdjęcia artykułu przed zapisaniem materiału.',
    insights_en: 'Add alternative text for the article image before saving the entry.',
  };

  CMS.registerEventListener({
    name: 'preSave',
    handler: ({ entry }) => {
      const collection = entry.get('collection');

      if (!insightCollections.has(collection)) {
        return undefined;
      }

      const headerImage = entry.getIn(['data', 'headerImage']);
      const headerImageAlt = entry.getIn(['data', 'headerImageAlt']);
      const hasHeaderImage = typeof headerImage === 'string' && headerImage.trim() !== '';
      const hasHeaderImageAlt =
        typeof headerImageAlt === 'string' && headerImageAlt.trim() !== '';

      if (hasHeaderImage && !hasHeaderImageAlt) {
        const error = new Error('saving_failed');

        error.cause = new Error(altMessages[collection]);
        throw error;
      }

      if (!hasHeaderImage && hasHeaderImageAlt) {
        return entry.deleteIn(['data', 'headerImageAlt']);
      }

      return undefined;
    },
  });
})();
