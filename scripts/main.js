//Definición de Variables, estados y llamado de funciones
var background_theme = sessionStorage.getItem("background_theme");
var state_theme = sessionStorage.getItem("theme");
const search = document.getElementById("search");
const apiKey = "xPirKTummUELzyQwasYodMKm7CDwc9p5";
sessionStorage.setItem("theme", "1");
sessionStorage.setItem("misguifos", "1");
getTrending();
getsuggest();

//Boton de dropdown
document.querySelector(".custom-select-wrapper").addEventListener("click", function() {
  this.querySelector(".custom-select").classList.toggle("open");
});

for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function() {
    if (!this.classList.contains("selected")) {
      this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
      this.classList.add("selected");
      this.closest(".custom-select").querySelector(".custom-select__trigger span").textContent = this.textContent;
      var valor = document.querySelector(".selected").getAttribute("data-value");
      sessionStorage.setItem("theme", valor);
    } else {
      this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
      this.classList.add("selected");
      this.closest(".custom-select").querySelector(".custom-select__trigger span").textContent = this.textContent;
      var valor = document.querySelector(".selected").getAttribute("data-value");
      sessionStorage.setItem("theme", valor);
    }
  });
}

window.addEventListener("click", function(e) {
  const select = document.querySelector(".custom-select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

//Eventos para realizar el cambio de tema
document.querySelector(".sailorDay").addEventListener("click", () => {
  changeCssFile("./styles/theme1.css");
});

document.querySelector(".sailorNight").addEventListener("click", () => {
  changeCssFile("./styles/theme2.css");
});

//Funcion para cambiar el tema de la pagina y mantener el estado del boton buscar mientras usamos la barra de busqueda funcional
function changeCssFile(archivo) {
  document.getElementById("cssFile").href = archivo;
  sessionStorage.setItem("background_theme", archivo);
  if (archivo == "./styles/theme1.css" && state_theme == 1) {
    if (search.value == null || search.value.length == 0 || /^\s+$/.test(search.value)) {
      stateButton1();
    } else {
      stateButton2();
    }
  } else {
    if (search.value == null || search.value.length == 0 || /^\s+$/.test(search.value)) {
      stateButton3();
    } else {
      stateButton4();
    }
  }
}

function stateButton1() {
  document.getElementById("btnSearch").style.color = "#B4B4B4";
  document.getElementById("btnSearch").style.background = "#E6E6E6";
  document.getElementById("btnSearch").style.border = "1px solid #808080";
  document.getElementById("btnSearch").style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF";
  document.querySelector(".lupa1").style.display = "inline-block";
  document.querySelector(".lupa2").style.display = "none";
  document.querySelector(".lupa3").style.display = "none";
  document.querySelector(".lupa4").style.display = "none";
}

function stateButton2() {
  document.getElementById("btnSearch").style.color = "#110038";
  document.getElementById("btnSearch").style.background = "#F7C9F3";
  document.getElementById("btnSearch").style.border = "1px solid #110038";
  document.getElementById("btnSearch").style.boxShadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
  document.querySelector(".lupa1").style.display = "none";
  document.querySelector(".lupa2").style.display = "inline-block";
  document.querySelector(".lupa3").style.display = "none";
  document.querySelector(".lupa4").style.display = "none";
}

function stateButton3() {
  document.getElementById("btnSearch").style.color = "#8F8F8F";
  document.getElementById("btnSearch").style.background = "#B4B4B4";
  document.getElementById("btnSearch").style.border = "1px solid #808080";
  document.getElementById("btnSearch").style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF";
  document.querySelector(".lupa1").style.display = "none";
  document.querySelector(".lupa2").style.display = "none";
  document.querySelector(".lupa3").style.display = "inline-block";
  document.querySelector(".lupa4").style.display = "none";
}

function stateButton4() {
  document.getElementById("btnSearch").style.color = "#FFFFFF";
  document.getElementById("btnSearch").style.background = "#EE3EFE";
  document.getElementById("btnSearch").style.border = "1px solid #110038";
  document.getElementById("btnSearch").style.boxShadow = "inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF";
  document.querySelector(".lupa1").style.display = "none";
  document.querySelector(".lupa2").style.display = "none";
  document.querySelector(".lupa3").style.display = "none";
  document.querySelector(".lupa4").style.display = "inline-block";
}

//Verificar tema guardado en el session storage para poder mantener el tema al cambiar de html
if (background_theme == "./styles/video1.css") {
  document.getElementById("cssFile").href = "./styles/theme1.css";
} else if (background_theme == "./styles/video2.css") {
  document.getElementById("cssFile").href = "./styles/theme2.css";
} else if (background_theme == "./styles/theme2.css") {
  document.getElementById("cssFile").href = "./styles/theme2.css";
} else {
  document.getElementById("cssFile").href = "./styles/theme1.css";
}

//Guardo una condicion para poder mostrar misguifos al hacer el cambio de pagina
document.querySelector(".misguifos").addEventListener("click", () => {
  sessionStorage.setItem("misguifos", "2");
});

//Funcion para la barra de busqueda funcional
search.addEventListener("input", () => searchStates(search.value));
const searchStates = async searchText => {
  if (sessionStorage.getItem("background_theme") == "./styles/theme1.css") {
    if (search.value == null || search.value.length == 0 || /^\s+$/.test(search.value)) {
      document.querySelector(".container_input").style.display = "none";
      stateButton1();
    } else {
      document.querySelector(".container_input").style.display = "block";
      stateButton2();
    }
  } else {
    if (search.value == null || search.value.length == 0 || /^\s+$/.test(search.value)) {
      document.querySelector(".container_input").style.display = "none";
      stateButton3();
    } else {
      document.querySelector(".container_input").style.display = "block";
      stateButton4();
    }
  }
  const res = await fetch("https://api.giphy.com/v1/gifs/search?q=" + search.value + "&api_key=" + apiKey);
  const data = await res.json();
  for (var i = 1; i < 4; i++) {
    let title_input = document.querySelector(".btn" + i);
    let hashtag = data.data[i].title;
    title_input.innerHTML = hashtag;
    title_input.setAttribute("value", hashtag);
  }
};

//Eventos para seleccionar las opciones de la barra de busqueda y realizar las busquedas de los gifs y gifs sugeridos
document.querySelector(".btn1").addEventListener("click", () => {
  search.value = document.querySelector(".btn1").value;
  document.querySelector(".container_input").style.display = "none";
});

document.querySelector(".btn2").addEventListener("click", () => {
  search.value = document.querySelector(".btn2").value;
  document.querySelector(".container_input").style.display = "none";
});

document.querySelector(".btn3").addEventListener("click", () => {
  search.value = document.querySelector(".btn3").value;
  document.querySelector(".container_input").style.display = "none";
});

document.getElementById("btnSearch").addEventListener("click", ev => {
  ev.preventDefault();
  getSearchResults(search.value);
});

document.querySelector(".form_suggest_img0").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn4").value);
  window.scrollTo(0, 100);
});

document.querySelector(".form_suggest_img1").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn5").value);
  window.scrollTo(0, 100);
});

document.querySelector(".form_suggest_img2").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn6").value);
  window.scrollTo(0, 100);
});

document.querySelector(".form_suggest_img3").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn7").value);
  window.scrollTo(0, 100);
});

document.querySelector(".form_suggest_img10").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn10").value);
});

document.querySelector(".form_suggest_img11").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn11").value);
});

document.querySelector(".form_suggest_img12").addEventListener("click", () => {
  getSearchResults(document.getElementById("btn12").value);
});

//Funcion para buscar gif
function getSearchResults(search) {
  const found = fetch("https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=25")
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      document.querySelector(".result_title").innerText = search + " (resultados)";
      document.querySelector(".container_input").style.display = "none";
      document.querySelector(".results").style.display = "block";
      document.querySelectorAll(".container_results")[0].style.display = "flex";
      document.querySelectorAll(".container_results")[1].style.display = "flex";
      document.querySelectorAll(".container_results")[2].style.display = "flex";
      for (var i = 0; i < 10; i++) {
        let imagen = document.querySelector(".results_img" + i);
        imagen.setAttribute("src", data.data[i].images.downsized.url);
        imagen.setAttribute("alt", data.data[i].title);
        let title_trending = document.querySelector(".title_results_img" + i);
        let hashtag = data.data[i].title;
        var hashtag_split = hashtag.split(" ");
        hashtag_join=hashtag_split.join(" #");
        title_trending.innerHTML = "#" + hashtag_join;

      }
      for (var i = 10; i < 13; i++) {
        let verMas2 = document.querySelector(".form_suggest_img" + i);
        let hashtag2 = data.data[i].title;
        var hashtag_split2 = hashtag2.split(" ", 1);
        verMas2.setAttribute("value", hashtag_split2);
        verMas2.innerText = hashtag_split2;
      }
      document.querySelector(".container_search").style.display = "flex";
      return data;
    })
    .catch(error => {
      return error;
    });
  return found; //prevent default y se coloca un return al llamar a la funcion
}

//Funcion para obtener gifs sugeridos mediante el endpoint de random
function getsuggest() {
  const urls = [
    "https://api.giphy.com/v1/gifs/random?" + "&api_key=" + apiKey,
    "https://api.giphy.com/v1/gifs/random?" + "&api_key=" + apiKey,
    "https://api.giphy.com/v1/gifs/random?" + "&api_key=" + apiKey,
    "https://api.giphy.com/v1/gifs/random?" + "&api_key=" + apiKey
  ];
  Promise.all(
    urls.map(url =>
      fetch(url).then(response => {
        return response.json();
      })
    )
  )
    .then(data => {
      console.log(data);
      for (var i = 0; i < 4; i++) {
        let imagen = document.querySelector(".suggest_img" + i);
        imagen.setAttribute("src", data[i].data.images.downsized.url);
        imagen.setAttribute("alt", data[i].data.title);
        let title_suggest = document.querySelector(".title_suggest_img" + i);
        let hashtag = data[i].data.title;
        var hashtag_split = hashtag.split(" ",1);
        hashtag_join=hashtag_split.join(" #");
        title_suggest.innerHTML = "#" + hashtag_join;
        let verMas = document.querySelector(".form_suggest_img" + i);
        verMas.setAttribute("value", hashtag_split);
      }
      return data;
    })
    .catch(error => {
      return error;
    });
}

//Funcion para obtener gifs de tendencia mediante el endpoint de trending
function getTrending() {
  const found = fetch("https://api.giphy.com/v1/gifs/trending?" + "&api_key=" + apiKey + "&limit=25")
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (var i = 0; i < 10; i++) {
        let imagen = document.querySelector(".trending_img" + i);
        imagen.setAttribute("src", data.data[i].images.downsized.url);
        imagen.setAttribute("alt", data.data[i].title);
        let title_trending = document.querySelector(".title_trending_img" + i);
        let hashtag = data.data[i].title;
        var hashtag_split = hashtag.split(" ");
        hashtag_join=hashtag_split.join(" #");
        title_trending.innerHTML = "#" + hashtag_join;
      }
      return data;
    })
    .catch(error => {
      return error;
    });
  return found;
}
