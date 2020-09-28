const express = require ('express');
const router = express.Router();

router.get('/update', (req, res, next) => {
  console.log("HI")
  var query =  `query($page: Int) {
    Page (page: $page) {
      media (type: ANIME, startDate_greater:20060000, popularity_greater:10000, format_in:[TV], status_in:[FINISHED]) {
        id
        title {
          romaji
          english
          native
        }
        popularity
        averageScore
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
      pageInfo {
        perPage
        currentPage
        lastPage
        total
        hasNextPage
      }
    }
  }`;
  
  var variables = {
    page: 1
  };

  var url = 'https://graphql.anilist.co'
  
  var options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query: query,
          variables: variables
      })
  };

  fetch(url, options).then(handleResponse)
                  .then(handleData)
                  .catch(handleError);
}); 



router.get('/start', (req, res, next) => {
}); 





module.exports = router;