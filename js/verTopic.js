var api = {
  url : "https://examen-laboratoria-sprint-5.herokuapp.com/topics/"
}
var cargarPagina = function(){
  var topicId = getParameterByName('topic_id');
  console.log(topicId);
  mostrarInfo(topicId);
  mostarRespuestas(topicId);
}

var mostrarInfo = function (topicId){
  $.getJSON(api.url+topicId, function(tema){
    console.log(tema);
    $("#titulo").text(tema.content);
    $("#autor").text(tema.author_name);
  })
}

var mostarRespuestas = function(topicId){
  var url = api.url+topicId+"/responses";
  console.log(url);
  $.getJSON(url,function(respuestas){
    console.log(respuestas);
      respuestas.forEach(function(respuesta){
        console.log(respuesta);
        var contenedorRespuestas = $("#respuestas");
        var $contRespuesta = $("<div/>");
        var $autorRespuesta = $("<p/>");
        var $contenidoRespuesta =$("<p/>");
        $autorRespuesta.text(respuesta.author_name);
        $contenidoRespuesta.text(respuesta.content);
        $contRespuesta.append($autorRespuesta);
        $contRespuesta.append($contenidoRespuesta);
        contenedorRespuestas.append($contRespuesta);
      })
  })
}


//Solo por propositos de debug
// if(topicId){
//   alert("El topic ID es:"+topicId);
// }

$(document).ready(cargarPagina);
