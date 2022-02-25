import JourEnOrdre from "../js/Component/other.js";

const actuelledate = document.querySelector(".mydate");

const Hourse = document.querySelector(".hourse");

const Degre = document.querySelector(".degreTitle");

const ImgDegre = document.querySelector(".logo-meteo");

const lettreTemps = document.querySelector(".onImage");

const TimeZone = document.querySelector(".TimeZone");

const heure = document.querySelectorAll(".heure-nom-prevision");

const tempHeure = document.querySelectorAll(".heure-prevision-valeur");

const jour = document.querySelectorAll(".jour-prevision-nom");

const TempJour = document.querySelectorAll(".jour-prevision-temp");

const max = document.querySelector(".max");

const searchbar = document.querySelector(".searchbar");

const min = document.querySelector(".min");

let Resultat;

const apiKey = "f1982864631a3cb38368d91e32902aa6";

const layer = "clouds_new";

const api = {
  key: "63042ddfd49f87ae59f4e5e2eddbe8a4",
  base: "https://api.openweathermap.org/data/2.5/",
};

searchbar.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResultats(searchbar.value);

    console.log(searchbar.value);
  }
}

function getResultats(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((displayResult) => {
      console.log(displayResult);
      let long = displayResult.coord.lon;
      let lat = displayResult.coord.lat;
      console.log(long);

      AppelApi(long, lat);
    });
}

// function displayResult(weather) {
//   console.log(weather);

//   let long = weather.coord.lon;

//   console.log(long);
// }

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      getResultats(query);
    }
    // () => {
    //   alert("veillez activer la geolocalisation");
    // }
  );
}

function AppelApi(long, lat) {
  fetch(
    ` https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&units=metric&appid=${apiKey}&lang=fr&exclude=minutely  `
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      console.log(data);

      Resultat = data;

      lettreTemps.innerHTML = Resultat.current.weather[0].description;

      TimeZone.innerHTML = Resultat.timezone;

      let date1 = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      date1 = date1.charAt(0).toUpperCase() + date1.slice(1);

      actuelledate.innerHTML = date1;

      let HEureDate = new Date().toLocaleTimeString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
      });

      let heureActuelle = new Date().getHours();

      Hourse.innerHTML = HEureDate;

      Degre.innerHTML = Math.trunc(Resultat.current.temp) + "°";

      if (heureActuelle > 6 && heureActuelle < 21) {
        ImgDegre.src = `../asset/img/jour/${Resultat.current.weather[0].icon}.svg`;
      } else {
        ImgDegre.src = `../asset/img/nuit/${Resultat.current.weather[0].icon}.svg`;
      }

      // for (let i = 0; i < heures.length; i++) {
      //   let HeureInc = monHeure + i * 3;

      //   if (HeureInc > 24) {
      //     heures[i].innerHTML = `${HeureInc - 24}h`;
      //   } else if (HeureInc === 24) {
      //     heures[i].innerHTML = ` 00h `;
      //   } else {
      //     heures[i].innerHTML = `${HeureInc}h`;
      //   }
      // }

      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = "00 h";
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }

      for (let j = 0; j < tempHeure.length; j++) {
        tempHeure[j].innerHTML = `${Math.trunc(Resultat.hourly[j * 3].temp)}°`;
      }

      for (let k = 0; k < JourEnOrdre.length; k++) {
        jour[k].innerHTML = JourEnOrdre[k].slice(0, 3);
      }

      for (let m = 0; m < 7; m++) {
        TempJour[m].innerHTML = `${Math.trunc(
          Resultat.daily[m + 1].temp.day
        )}°`;

        max.innerHTML = `Max : ${Math.trunc(Resultat.daily[m + 1].temp.max)}°`;
        min.innerHTML = `Min : ${Math.trunc(Resultat.daily[m + 1].temp.min)}°`;
      }
    });
}

// let DateComplete = new Date().toLocaleDateString("fr-FR", {
//   weekday: "long",
//   month: "long",
//   year: "numeric",
// });
