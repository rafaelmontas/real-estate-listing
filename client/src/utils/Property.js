const Property = {
  search(beds, baths) {
    return fetch(`/properties?beds=${beds}&baths=${baths}`)
    .then(response => {
      return response.json()
    }).then(jsonResponse => {
      return jsonResponse;
    })
  }
}

export default Property;