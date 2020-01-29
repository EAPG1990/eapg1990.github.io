//Definición de Variables, estados y llamado de funciones
var background_theme = sessionStorage.getItem("background_theme");
var video2 = document.querySelector("video");
var image = document.querySelector(".imagegif");
const apiKey = "xPirKTummUELzyQwasYodMKm7CDwc9p5";
var recorder; // globally accessible
var array = [];

//Si fue presionado la opcion misGuifos en el index, te redirigue a la pagina de upload y muestra los gifs con la información del localStorage
var showMisGuifosFromIndex = sessionStorage.getItem("misguifos");
if (showMisGuifosFromIndex == 2) {
  createMisGuifos();
}

//Boton de crear Guifos
document.querySelector(".create_guifos").addEventListener("click", () => {
  document.querySelector(".container").style.display = "block";
  document.querySelector(".bar_mis_guifos").style.display = "none";
  document.querySelectorAll(".container_mis_guifos")[0].style.display = "none";
  document.querySelectorAll(".container_mis_guifos")[1].style.display = "none";
  document.querySelectorAll(".container_mis_guifos")[2].style.display = "none";
});

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
    } else {
      this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
      this.classList.add("selected");
      this.closest(".custom-select").querySelector(".custom-select__trigger span").textContent = this.textContent;
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
  changeCssFile('./styles/video1.css');
});

document.querySelector(".sailorNight").addEventListener("click", () => {
  changeCssFile('./styles/video2.css');
});

//Funcion para cambiar el tema de la pagina
function changeCssFile(archivo) {
  document.getElementById("cssFile").href = archivo;
  sessionStorage.setItem("background_theme", archivo);
}

//Verificar tema guardado en el session storage para poder mantener el tema al cambiar de html
if (background_theme == "./styles/theme1.css") {
  document.getElementById("cssFile").href = "./styles/video1.css";
} else if (background_theme == "./styles/theme2.css") {
  document.getElementById("cssFile").href = "./styles/video2.css";
} else if (background_theme == "./styles/video2.css") {
  document.getElementById("cssFile").href = "./styles/video2.css";
} else {
  document.getElementById("cssFile").href = "./styles/video1.css";
}

//Iniciar camara de grabación y asigno las clases a los divupload (timer de subiendo guifos)
document.getElementById("btn-start").onclick = function() {
  document.querySelector(".stateRecording").innerHTML = "Un Chequeo Antes de Empezar";
  document.querySelector(".container").style.display = "none";
  document.querySelector(".container_gif").style.display = "block";
  document.querySelector(".capture_before").style.display = "block";
  document.querySelector(".capture").style.display = "block";
  document.querySelector(".repeat_capture").style.display = "none";
  document.querySelector(".upload_guifo").style.display = "none";
  document.querySelector(".bar_mis_guifos").style.display = "none";
  document.querySelector(".container_mis_guifos").style.display = "none";
  document.querySelector(".videogif").style.display = "block";
  document.querySelector(".imagegif").style.display = "none";
  document.querySelector(".mis_guifos").style.display = "none";
  document.querySelector(".create_guifos").style.display = "none";
  document.querySelector(".timer").style.display = "none";
  document.querySelector(".accountant2").style.display = "none";
  for (var i = 5; i < 27; i++) {
    let divUpload = document.getElementById(i);
    if (divUpload.className == "pink") {
      divUpload.className = "gray";
    } else {
      divUpload.className = "gray";
    }
  }
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 }
      }
    })
    .then(function(stream) {
      video2.srcObject = stream;
      video2.play();
    });
};

//Comienza la grabación del Gif y cambios en el DOM
document.getElementById("btn-start-recording").onclick = function() {
  document.querySelector(".capture_before").style.display = "none";
  document.querySelector(".capture").style.display = "none";
  document.querySelector(".repeat_capture").style.display = "none";
  document.querySelector(".upload_guifo").style.display = "none";
  document.querySelector(".bar_mis_guifos").style.display = "none";
  document.querySelectorAll(".container_mis_guifos")[0].style.display = "none";
  document.querySelectorAll(".container_mis_guifos")[1].style.display = "none";
  document.querySelectorAll(".container_mis_guifos")[2].style.display = "none";
  //Tiempo que tarda en empezar a grabar la camara el gif
  setTimeout(function() {
    document.querySelector(".recording_before").style.display = "block";
    document.querySelector(".recording").style.display = "block";
    document.querySelector(".videogif").style.display = "none";
    document.querySelector(".imagegif").style.display = "block";
    document.querySelector(".stateRecording").innerHTML = "Capturando tu Guifo";
    document.querySelector(".timer").style.display = "block";
  }, 1300);
  recordGif();
};

//Repetir grabación del Gif y cambios en el DOM
document.getElementById("btn-start-recording2").onclick = function() {
  setTimeout(function() {
    document.querySelector(".recording_before").style.display = "block";
    document.querySelector(".recording").style.display = "block";
    document.querySelector(".stateRecording").innerHTML = "Capturando tu Guifo";
  }, 1300);
  document.querySelector(".capture_before").style.display = "none";
  document.querySelector(".capture").style.display = "none";
  document.querySelector(".accountant2").style.display = "none";
  document.querySelector(".videogif").style.display = "none";
  document.querySelector(".imagegif").style.display = "block";
  document.querySelector(".repeat_capture").style.display = "none";
  document.querySelector(".upload_guifo").style.display = "none";
  recordGif();
};

//Grabando el Gif
function captureCamera(callback) {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 }
      }
    })
    .then(function(camera) {
      callback(camera);
    })
    .catch(function(error) {
      console.error(error);
    });
}

function recordGif(){
  captureCamera(function(camera) {
    recorder = RecordRTC(camera, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      timeSlice: 1000, // pass this parameter,
      onGifRecordingStarted: function() {
        console.log("started");
      },
      onGifPreview: function(gifURL) {
        image.src = gifURL;
      }
    });
    recorder.startRecording();
    dateStarted = new Date().getTime();

    (function looper() {
        if(!recorder) {
          return;
        }
        document.querySelector('.timer').innerHTML = '00:00:' + calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();
    recorder.camera = camera;
  });
}


//Detener la grabacion de Gif
document.getElementById("btn-stop-recording").onclick = function() {
  recorder.stopRecording(stopRecordingCallback);
  document.querySelector(".stateRecording").innerHTML = "Vista Previa";
  document.querySelector(".recording_before").style.display = "none";
  document.querySelector(".recording").style.display = "none";
  document.querySelector(".accountant2").style.display = "flex";
  function longForLoop2(limit) {
    var i = 26;
    var ref = setInterval(() => {
      let divUpload = document.getElementById(++i);
      if (divUpload.className == "gray") {
        divUpload.className = "pink";
      } else {
        divUpload.className = "gray";
      }
      if (i == limit){
        clearInterval(ref);
        removeClass(45);
        setTimeout(function(){
          longForLoop2(45);
      },2000)
      } 
    }, 100); 
  }
  function removeClass(limit2) {
    var i2 = 26;
    var ref = setInterval(() => {
      let divUpload2 = document.getElementById(++i2);
      if (divUpload2.className == "pink") {
        divUpload2.className = "gray";
      } else {
        divUpload2.className = "gray";
      }  
      if (i2 == limit2) clearInterval(ref);   
    }, 100);
  }
  longForLoop2(45);
  
   
  document.querySelector(".repeat_capture").style.display = "inline-block";
  document.querySelector(".upload_guifo").style.display = "inline-block";
};

//Detiene la grabacion del Gif y la camara y hace el upload a Giphy
function stopRecordingCallback() {
  image.src = URL.createObjectURL(recorder.getBlob());
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));
  document.getElementById("btn-upload_guifo").onclick = function() {
    document.querySelector(".container_gif").style.display = "none";
    document.querySelector(".container_upload_gif").style.display = "block";
    function longForLoop(limit) {
      var i = 4;
      var j = 22;
      var ref = setInterval(() => {
        let divUpload = document.getElementById(++i);
        if (divUpload.className == "gray") {
          divUpload.className = "pink";
        } else {
          divUpload.className = "gray";
        }
        document.querySelector(".line2").innerHTML = "00:" + --j;
        if (i == limit) clearInterval(ref);
        if (j == 0) {
          document.querySelector(".container_upload_gif").style.display = "none";
          document.querySelector(".container_upload_gif_success").style.display = "block";
        }
      }, 1000);
    }
    longForLoop(26);
    fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
      method: "POST",
      body: form
    })
      .then(response => {
        console.log(response.status);
        return response.json();
      })
      .then(data => {
        var dataid = data.data.id;
        fetch("https://api.giphy.com/v1/gifs/" + dataid + "?&api_key=" + apiKey)
          .then(response => {
            console.log(response.status);
            return response.json();
          })
          .then(data => {
            let imagen = document.querySelector(".results_img0");
            imagen.setAttribute("src", data.data.images.downsized.url);
            imagen.setAttribute("alt", data.data.title);
            let verMas = document.querySelector(".download_link");
            verMas.setAttribute("action", data.data.bitly_url);
            document.querySelector(".copy_link").addEventListener("click", () => {
              navigator.clipboard.writeText(data.data.bitly_url);
              document.querySelector(".text").style.display = "block";
              var ref = setInterval(() => {
                document.querySelector(".text").style.display = "none";
              }, 5000);
            });
            localStorage.setItem(dataid, JSON.stringify(data));
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  };
  video2.src = video2.srcObject = null;
  video2.muted = false;
  video2.volume = 1;
  recorder.camera.stop();
  recorder.destroy();
  recorder = null;
}

//Creacion de las galerias de mis guifos con la informacion del localStorage
document.querySelector(".mis_guifos").addEventListener("click", () => {
  createMisGuifos();
});

document.querySelector(".ready").addEventListener("click", () => {
  document.querySelector(".mis_guifos").style.display = "block";
  document.querySelector(".container_upload_gif_success").style.display = "none";
  createMisGuifos();
});

function createMisGuifos(){
  for (var i = 0; i < localStorage.length; i++) {
    var valor = localStorage.getItem(localStorage.key(i));
    const data = JSON.parse(valor);
    array.push(data);
  }
  //Ordeno por fecha (del mas reciente al mas viejo en el localStorage)
  array.sort(function(a, b) {
    if (a.data.import_datetime < b.data.import_datetime) {
      return 1;
    }
    if (a.data.import_datetime > b.data.import_datetime) {
      return -1;
    }
    return 0;
  });
  //El while es para solo tener un array con los 10 gifs mas recientes
  var contador = 0;
  while (array.length > 10) {
    array.pop();
    contador++;
  }

  for (var i = 0; i < array.length; i++) {
    let imagen = document.querySelector(".mis_guifos_img" + i);
    imagen.setAttribute("src", array[i].data.images.downsized.url);
    imagen.setAttribute("alt", array[i].data.title);
    let title_trending = document.querySelector(".title_mis_guifos_img" + i);
    let hashtag = array[0].data.slug;
    var hashtag_split = hashtag.split("-", 1);
    title_trending.innerHTML = "#" + hashtag_split;
    document.querySelector(".guifos_img" + i).style.display = "block";
  }
  document.querySelector(".container").style.display = "none";
  document.querySelector(".create_guifos").style.display = "block";
  document.querySelector(".bar_mis_guifos").style.display = "block";
  document.querySelectorAll(".container_mis_guifos")[0].style.display = "flex";
  if (array.length > 4) {
    document.querySelectorAll(".container_mis_guifos")[1].style.display = "flex";
  }
  if (array.length > 7) {
    document.querySelectorAll(".container_mis_guifos")[2].style.display = "flex";
  }
  array = [];
}



var dateStarted;
function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600)) / 60);
  var sec = Math.floor(secs - (hr * 3600) - (min * 60));

  if (min < 10) {
      min = "0" + min;
  }

  if (sec < 10) {
      sec = "0" + sec;
  }

  if(hr <= 0) {
      return min + ':' + sec;
  }

  return hr + ':' + min + ':' + sec;
}
