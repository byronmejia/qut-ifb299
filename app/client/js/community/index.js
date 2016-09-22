/* eslint-disable */
const Vue = require('vue');

const apiRoutes = {
  communities: '/api/communities',
};

/**
 * This function is a helper to get the API responses
 * @param api_route The API route to be requested
 */
function APIReq(api_route) {
  return new Promise(function(resolve,reject){
    var req = new XMLHttpRequest();

    if (typeof api_route !== 'string') {
      throw new TypeError("The API Route should be supplied as a String.");
    }

    req.open('GET', api_route);

    req.onload = function() {
      if(req.status >= 200  && req.status < 300){   //  Status codes from 200 to 300 are successful
        resolve(req.responseText);
      }else{
        reject(new Error("There was an error while requesting the content." + req.statusText));
      }
    };

    req.send();
  })
}

var CommunityItem = Vue.component('community', {
  template: '#CommunityTemplate',
  props: ['name', 'profile_picture', 'description'],
});

var CommunitiesSection = new Vue({
  el: '#CommunitiesSection',
  data: {
    items: [
      {
        name: '',
        profile_pic: '',
        description: 'Loading server....',
      },
    ],
  },
});

document.addEventListener("DOMContentLoaded", function(event) {
  APIReq(apiRoutes.communities)
    .then(function(data){
      CommunitiesSection.$set('items',JSON.parse(data));
    })
    .catch(function (error){
      throw error;
    });
});
