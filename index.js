'use strict';

const apiKey = 'rpWbF40Eg3Y2w171xF92ODX1u5w71Z4eancdoQzJ';
const baseUrl = 'https://api.nps.gov/api/v1/parks';

function queryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}= ${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
  console.log(queryItems);
}

function displayResults(responseJson){

  $('.results-list').empty();
  $('.js-error').empty();

  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append( 
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3><p>${responseJson.data[i].description}</p></li>`
      );
    } 
  $('#results').removeClass('hidden');
}

function getParks(baseUrl,stateArr, maxResults, apiKey){
  const params = {
    stateCode: stateArr,
    limit: maxResults
  };
  

  const queryString = queryParams(params)
  const url = baseUrl + '?' + queryString +'&api_key=' + apiKey;

  console.log(url);
 
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
 $('#js-form').submit( event => {
   event.preventDefault();
   const stateArr = $('.js-search-term').val().split(",");
   const maxResults = $('.js-max-results').val();
   getParks(baseUrl, stateArr, maxResults, apiKey);
 })
}



$(watchForm);