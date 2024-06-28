const form = document.getElementById("searchForm");
const resultsDiv = document.querySelector("#results");

form.addEventListener("input", async function (e) {
  e.preventDefault(); //PREVENTING THE FORM FROM REQUESTING ACTION
  resultsDiv.innerHTML = ""; // TO CLEAR PREVIOUS SEARCHED RESULT
  document.getElementById("quoteBottom").style.display = "none";

  console.dir(form.elements[0].value);
  // console.dir(form) GIVES ALL ELEMENTS AND DETAILS OF FORM
  // console.dir(form.elements.query.value) WHAT USER SEARCHES FOR
  // const searchTerm = form.elements.query.value;
  const searchTerm = form.elements[0].value;

  // API CALL USING AXIOS
  const config = { params: { q: searchTerm } }; // to add multiple things as query string instead of adding it to the url
  // const config = {params: {q: searchTerm, isFunny: 'Kush'}} // to add multiple things as query string instead of adding it to the url
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config); // config is an axios object
  // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
  showData(res.data);
  // console.log(res.data);
  // console.log(res.data[0].show.genres);
});

const showData = (shows) => {
  for (let result of shows) {
    // console.log(result) //testing
    document.getElementById("quoteBottom").style.display = "block";
    const column = document.createElement("div");
    column.setAttribute("class", "col");
    resultsDiv.append(column);
    const card = document.createElement("div");
    card.setAttribute("class", "card h-100");
    // card.setAttribute(
    //   "class",
    //   "card text-center mt-1 shadow-lg border border-success"
    // );
    column.append(card);
    if (result.show.image) {
      const img = document.createElement("img");
      img.src = result.show.image.medium;
      img.setAttribute("class", "card-img-top");
      card.append(img);
    }
    if (!result.show.image) {
      const img = document.createElement("img");
      img.src =
        "https://camo.githubusercontent.com/2515d63ed9f010c45188fb16aa813f67c886fcb713f8395964abcbd22bd791ef/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f41394563427a64367438445a652f67697068792e676966";
      img.setAttribute("class", "card-img-top");
      card.append(img);
      // img.src = "https://tinyurl.com/tv-missing";
      // img.src ="https://i.pinimg.com/originals/13/7c/a9/137ca9e2a4de70b11d0ae475997e8004.gif";
      // img.src ="https://media2.giphy.com/media/J6DKSSrTUoSqiCuT8Z/200w.gif?cid=82a1493b3526hdoeuh4a4ak6d66gsry7fuvff387iu88yh2j&rid=200w.gif&ct=g";
    }
    const body = document.createElement("div");
    body.setAttribute("class", "card-body");
    card.append(body);
    if (result.show.name) {
      const name = document.createElement("h2");
      name.setAttribute("class", "card-title title");
      name.innerHTML = result.show.name;
      body.append(name);
    }
    if (result.show.genres) {
      const genres = document.createElement("p");
      genres.innerHTML = result.show.genres;
      body.append(genres);
    }

    if (result.show.officialSite) {
      const site = document.createElement("a");
      site.setAttribute("href", result.show.officialSite);
      site.setAttribute("class", "link");
      site.setAttribute("target", "_blank");
      site.innerHTML = result.show.network.name;
      body.append(site);
    }
    if (result.show.status) {
      const status = document.createElement("p");
      status.innerHTML = result.show.status;
      body.append(status);
    }
    if (result.show.rating.average) {
      const rating = document.createElement("span");
      rating.innerHTML = result.show.rating.average;
      const star = document.createElement("i");
      star.setAttribute("class", "bi bi-star-fill text-warning");
      body.append(rating);
      body.append(star);
    }
    if (result.show.summary) {
      const summary = document.createElement("p");
      summary.setAttribute("class", "card-text summary");
      summary.innerHTML = result.show.summary;
      body.append(summary);
    }
  }
};
