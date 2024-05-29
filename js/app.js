

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

//Create an event handler to run when the page is loaded.  Make sure you don’t do anything to the DOM until it’s fully loaded.
window.addEventListener("DOMContentLoaded", function () {
  console.log("The page is fully loaded! Begin to modify the DOM");

  let menu = document.querySelector("#menu");
  let selectedArtistTitle = document.querySelector("#selected-artist");
  let cards = document.querySelector("#songlist");

  //When the button is clicked, show that Artist’s Name, Links, and Songs.
  //Write a function that will show a list of songs in the <tbody>…</tbody> based on the chosen Artist
  function displaySongs(artistId) {
    //Update the text of the Selected Artist above your table with the Artist’s Name and create anchor elements for all of the Artists Links (i.e., you should be able to open these links to see more info about the artist)

    let artist = artists.find((a) => a.artistId === artistId);
    selectedArtistTitle.innerHTML = `${artist.name} <i class="fa-solid fa-link"></i>`;

    let artistUrl = artist.urls
      .map((url) => {
        let iconHtml = "";
        if (url.name.toLowerCase().includes("spotify")) {
          iconHtml = '<i class="fa-brands fa-spotify"></i>';
        } else if (url.name.toLowerCase().includes("instagram")) {
          iconHtml = '<i class="fa-brands fa-instagram"></i>';
        } else if (url.name.toLowerCase().includes("tik tok")) {
          iconHtml = '<i class="fa-brands fa-tiktok"></i>';
        } else if (url.name.toLowerCase().includes("youtube")) {
          iconHtml = '<i class="fa-brands fa-youtube"></i>';
        } else {
          iconHtml = url.name; // Fallback if no icon is found, just show the name
        }
        return `<a href="${url.url}" class="artist-link">${iconHtml}</a>`;
      })

      .join(" "); // Join with a space for separation

    selectedArtistTitle.innerHTML += `${artistUrl} `;

    cards.innerHTML = "";

    /* Filter your Songs Array (i.e., use Array.prototype.filter()) to get:
            i.	All Songs for the chosen Artist. 
            ii.	All Songs that are NOT flagged
        */
    let artistSongs = songs.filter((song) => song.artistId === artistId && !song.explicit);

    // Sort the songs by title in ascending order
    artistSongs.sort((a, b) => a.title.localeCompare(b.title));

    /* <a href="${song.url}" class="song-card-link">
      <div class="song-card">
        <div class="song-card-image">
          <img src="${song.cover}" alt="${song.title}">
          <span class="material-symbols-outlined">play_circle</span>
          <p>${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}</p> 
        </div>
        <div class="song-card-info">
          <h4><b>${song.title}</b></h4>
          <p>${song.year}</p>  
        </div>
      </div>
    </a> */

    function createSongCard(song) {
      // Create a <div> to hold the card
      const card = document.createElement("div");
      //Add the .song-card class to div
      card.classList.add("song-card");

      //Create an <a> element to make the card clickable
      const cardLink = document.createElement("a");
      cardLink.href = song.url;
      cardLink.classList.add("song-card-link"); //Assign the 'song-card-link' class to the <a> element

      // Create a <div> to hold the song image
      const cardImage = document.createElement("div");
      cardImage.classList.add("song-card-image");

      //Create a song image, use the .song-card-image class
      const songImage = document.createElement("img");
      songImage.src = song.imageUrl;
      songImage.alt = song.title;
      songImage.classList.add("song-card-image");
      cardImage.appendChild(songImage);

      //Create a play icon, use the .material-symbols-outlined class
      const playIcon = document.createElement("span");
      playIcon.classList.add("material-symbols-outlined");
      playIcon.innerText = "play_circle";
      cardImage.appendChild(playIcon);

      //Create a <p> element to display the song duration
      const songDuration = document.createElement("p");
      songDuration.textContent = `${Math.floor(song.duration / 60)}:${(song.duration % 60)
        .toString()
        .padStart(2, "0")}`;
      cardImage.appendChild(songDuration);

      //Add the song image to the card
      cardLink.appendChild(cardImage);

      //Create a <div> to hold the song information
      const cardInfo = document.createElement("div");
      cardInfo.classList.add("song-card-info");

      //Create a <h4> element to display the song title
      const songTitle = document.createElement("h4");
      songTitle.innerHTML = `<b>${song.title}</b>`;
      cardInfo.appendChild(songTitle);

      //Create a <p> element to display the song year
      const songYear = document.createElement("p");
      songYear.textContent = song.year;
      cardInfo.appendChild(songYear);

      //Add the song info to the card
      cardLink.appendChild(cardInfo);

      //Add card link to the card
      card.appendChild(cardLink);

      return card;
    }

    // Use the createSongCard function to create and append the cards
    artistSongs.forEach((song) => {
      const card = createSongCard(song);
      cards.appendChild(card);
    });
  }

  //Create all of the buttons for your app’s Artists
  //Loop through all of your Artist objects and create a <button> element for each, adding it to the <nav id=”menu”>…</nav>
  artists.forEach((artist) => {
    let button = document.createElement("button");
    //Use each Artist’s name for the button’s text
    button.textContent = artist.name;
    button.addEventListener("click", function () {
      displaySongs(artist.artistId);
      console.log(`Clicked the artist: ${artist.name}`);
    });
    menu.appendChild(button);
  });

  //Create a button that will take the user to a form to add a new Artist
  let newArtist = document.createElement("a");
  newArtist.href = "./new-Artist-Form.html";
  let newArtistButton = document.createElement("button");
  let newArtistAbbr = document.createElement("abbr");
  newArtistAbbr.title = "Add New Artist Request Form";
  newArtistAbbr.textContent = "ADD MORE?";
  newArtistButton.appendChild(newArtistAbbr);
  newArtistButton.id = "newArtistButton";
  newArtist.appendChild(newArtistButton);
  menu.appendChild(newArtist);

  //By default, if no artist is selected display the first artist infoBy default, you should use your first Artist on load
  if (artists.length > 0) {
    displaySongs(artists[0].artistId);
    console.log("Default display: " + artists[0].name);
  }
});
