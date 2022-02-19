function onClick(e) {
  // debugger
  e.preventDefault();
  // get form values
  let word = document.getElementById('word').value;

  // setup URL
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  // call API
  fetch(url)
    .then(function(response) {

      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the dictionary API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      let results = "";
      console.log(json)

      results += '<h2>Results for ' + json[0].word + "</h2>";
      for(let j = 0; j < json.length; j++){
        results += '<h3>Meanings:</h3>';
        for (let i = 0; i < json[j].meanings.length; i++) {
          results += '<p>part of speech: ' + json[j].meanings[i].partOfSpeech + "</p>";
          results += '<p>definition: ' + json[j].meanings[i].definitions[0].definition + "</p>";
        }
        results += '<h3>Phonetics:</h3>';
        results += '<a href=' + json[j].phonetics[0].audio + ">audio</a>";
      }

      updateResult(results);
    });
}

function updateResult(info) {
  document.getElementById('result').innerHTML = info;
}

document.getElementById('woo').addEventListener('click', onClick);
