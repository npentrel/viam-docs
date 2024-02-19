const model = document.getElementsByClassName("mr-model")[0].id;
console.log(model)
const typesenseInstantsearchAdapter2 = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "Qhooem9HCRuFMVZPNQOhABAdEWJaSnlY", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "cgnvrk0xwyj9576lp-1.a1.typesense.net",
        port: "443",
        protocol: "https",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "model_id,description",
    sort_by: "total_organization_usage:desc,total_robot_usage:desc",
    infix: "always"
  },
});
const searchClientML = typesenseInstantsearchAdapter2.searchClient;

const searchML = instantsearch({
  indexName: "mlmodels",
  searchClient: searchClientML,
});

let filtersML;
let itemtemplateML;

filtersML = {
  hitsPerPage: 5,
};
itemtemplateML = `
<div class="name"><p><a href="{{url}}"><code>{{#helpers.highlight}}{ "attribute": "model_id" }{{/helpers.highlight}}</code></a></p></div>
<div class="description">{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</div>
`;


searchML.addWidgets([
  instantsearch.widgets.hits({
    container: "#hits-ml",
    templates: {
      item: itemtemplateML,
    },
  }),
  instantsearch.widgets.searchBox({
    container: '#searchbox-ml',
    placeholder: 'Search for a model...',
    poweredBy: false,
    wrapInput: true,
    showReset: false,
    showSubmit: false,
    showLoadingIndicator: false
  }),
  instantsearch.widgets.stats({
    container: '#searchstats-ml',
    templates: {
      text(data, { html }) {
        let results = '';

        if (data.hasManyResults) {
          results += `${data.nbHits} results:`;
        } else if (data.hasOneResult) {
          results += `1 result:`;
        } else {
          results += ``;
        }

        return `<span>${results}</span>`;
      },
    },
  }),
  instantsearch.widgets.configure(filtersML),
  instantsearch.widgets.pagination({
    container: "#pagination-ml",
    scrollTo: false
  }),
]);

searchML.start();
