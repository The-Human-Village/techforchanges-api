export default {
  routes: [
    {
      method: 'POST',
      path: '/get-objects',
      handler: 'objects.getObjects',
      config: {
        auth: false,
        description: "Get objects",
        tag: {
          name: "Objects"
        },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
