function clickcall(event){
    console.log(event);
    if(event.target.id == "home"){
      document.location.href = "http://localhost:5000/"
    }
    else if(event.target.id == "info"){
      document.location.href = "http://localhost:5000/info"
    }
    else {
      var loc = "http://localhost:5000/risk/" + event.target.id
      //var loc = "http://72.213.55.30:5000/risk/" + event.target.id
      console.log(loc)
      document.location.href = loc
    }
}
$(document).on('click', '.tablinks', clickcall);
