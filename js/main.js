var api={
  url:"http://examen-laboratoria-sprint-5.herokuapp.com/topics/"
}
var $tabla = $("#temas");

var cargarPagina = function(){
  cargarTema();
  $("#search-form").submit(filtrarTema);
  $("#formularioCrearTema").submit(agregarTema);
  //la siguiete linea filtra cada que presiona una tecla
  //la voy a comentar por temas practicos, ya que se hace un poco lento
  // $("#search").keyup(filtrarTema);
}

var filtrarTema = function(e){
  e.preventDefault();
  var criterioBusqueda =$("#search").val().toLowerCase();
  // console.log(criterioBusqueda);
  // console.log(api.url);
  $.getJSON(api.url,function (temas) {
    // console.log(temas);
    var temasFiltrados = temas.filter(function(tema){
      return tema.content.toLowerCase().indexOf(criterioBusqueda)>=0;
    })
    // console.log(temasFiltrados)
    $("#temas").html("");
    temasFiltrados.forEach(crearTema)
    // cargarTema(temasFiltrados);
  });
};

var cargarTema = function(){

  $.getJSON(api.url,function(temas){
    // console.log(temas);
    temas.forEach(crearTema);
  });
}


var crearTema = function(tema){
    // console.log(tema);
    var contenido = tema.content;
    var autor =tema.author_name;
    var respuestas = tema.responses_count;
    var id = tema.id;
    // console.log(contenido);
    // console.log(autor);
    // console.log(respuestas);
    var $fila = $("<tr />",{"data-id":id});
    var $temaTd = $("<td/>");
    var $autorTd = $("<td />");
    var $respuestasTd = $("<td/>");

    $temaTd.text(contenido);
    $autorTd.text("-por: "+autor);
    $respuestasTd.text("Respuestas: "+respuestas);
    $fila.append($temaTd);
    $fila.append($autorTd);
    $fila.append($respuestasTd);
    $tabla.append($fila);
}

var agregarTema = function(e){
  e.preventDefault();
  var $contador=0
  var $autorNuevoTema = $("#autorTema");
  var $textoAutor =$autorNuevoTema.val();
  var $contenidoTema = $("#contenido");
  var $textoContenido =$contenidoTema.val();
  // console.log($textoAutor);
  // console.log($textoContenido);
  $.post(api.url,{author_name:$textoAutor,content:$textoContenido}, function(response){
      $("#modalCrearTema").modal("hide");
      // console.log(response);
      crearTema(response)
      // $autor.val("");
  });
}


$(document).ready(cargarPagina);
