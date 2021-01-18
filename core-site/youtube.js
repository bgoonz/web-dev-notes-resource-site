$(document).ready(function () {
  function getId(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  }

  let myId = getId("http://www.youtube.com/watch?v=zbYf5_S7oJo");

  $("#myId").html(myId);

  $("#myCode").html(
    '<iframe width="560" height="315" src="//www.youtube.com/embed/' +
      myId +
      '" frameborder="0" allowfullscreen></iframe>'
  );
});
