export default {
  routes: [
    {
      method: 'POST',
      path: '/apply-filters',
      handler: 'filters.applyFilters',
      config: {
        auth: false,
        description: "Apply filters",
        tag: {
          name: "Filters"
        },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/get-filters',
      handler: 'filters.getFilters',
      config: {
        auth: false,
        description: "Get filters",
        tag: {
          name: "Filters"
        },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
