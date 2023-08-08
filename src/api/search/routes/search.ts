export default {
  routes: [
    {
     method: 'GET',
     path: '/search',
     handler: 'search.search',
     config: {
       auth: false,
       description: "General search",
       tag: {
         name: "Search"
       },
       policies: [],
       middlewares: [],
     },
    },
  ],
};
