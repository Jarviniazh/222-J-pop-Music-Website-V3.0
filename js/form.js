console.log("Loading form.js. Create new artist form");

// If the user selects "Other" in the genre dropdown, a new input field will be created for the user to enter a custom genre
document.querySelector("#genre").addEventListener("input", function () {
  let otherGenre = document.querySelector("#otherGenre");

  while (otherGenre.firstChild) {
    otherGenre.removeChild(otherGenre.firstChild);
  }

  if (this.value === "Other") {
    let newInputDiv = document.createElement("div");
    newInputDiv.className = "form-row";

    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "Enter your genre";
    newInput.required = true;

    newInputDiv.appendChild(newInput);
    otherGenre.appendChild(newInputDiv);
  }
});

// If the user clicks the Add button, a new input field will be created for the user to enter a song URL
document.querySelector("#addSongButton").addEventListener("click", function () {
  let newInputDiv = document.createElement("div");
  newInputDiv.className = "form-row";

  let newInput = document.createElement("input");
  newInput.type = "url";
  newInput.className = "url";
  newInput.name = "surl";
  newInput.autocomplete = "url";
  newInput.placeholder = "Enter a song URL";

  newInputDiv.appendChild(newInput);
  document.querySelector("#addLinks").appendChild(newInputDiv);
});

//Validate url for media and song
function validateMultipleUrls(inputElement) {
  if (inputElement.id === "artist-url") {
    let urls = inputElement.value.split("\n");
    for (let url of urls) {
      if (!isValidUrl(url)) {
        return false;
      }
    }
  } else {
    if (!isValidUrl(inputElement.value)) {
      return false;
    }
  }
  return true;
}

// Validate a single URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

window.onload = function () {
  let form = document.querySelector("#add-artist-form");

  form.addEventListener("submit", function (event) {
    let allUrlsValid = true;
    form.classList.remove("was-validated");

    document.querySelectorAll(".url").forEach(function (inputElement) {
      if (!validateMultipleUrls(inputElement)) {
        inputElement.setCustomValidity(
          "Please enter a valid URL. For example: https://www.example.com"
        );
        allUrlsValid = false;
      } else {
        inputElement.setCustomValidity("");
      }
    });

    if (!allUrlsValid) {
      form.classList.add("was-validated");
      event.preventDefault();
    }
  });

  document.querySelectorAll(".url").forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      if (validateMultipleUrls(inputElement)) {
        inputElement.setCustomValidity("");
      } else {
        inputElement.setCustomValidity(
          "Please enter a valid URL. For example: https://www.example.com"
        );
      }

      form.classList.remove("was-validated");
      if (form.checkValidity()) {
        form.classList.add("was-validated");
      }
    });
  });
};
