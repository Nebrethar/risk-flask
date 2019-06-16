//window.onload =
window.onload = function(){
  var URL = String(window.location);
  var URLements = URL.split("/");
  console.log(URLements);
  var owner = URLements[URLements.length - 2];
  var repo = URLements[URLements.length - 1];
  console.log(owner + "/" + repo);
  window.onload = document.querySelector("#name").innerHTML = owner + "/" + repo
  document.getElementById("ciiBtn").addEventListener("click", function(){
      document.getElementById("overcii").style.display = "block";
      document.getElementById("overcii").class = "row";
      document.getElementById("ciiBtn").style.visibility = "hidden";
          var request = new XMLHttpRequest();
          function loader() {
              const basestr = owner + "/" + repo;
              const augURL = 'https://github.com/' + basestr;
              request.open('GET', 'https://bestpractices.coreinfrastructure.org/projects.json?pq=' + augURL, true);
              request.onload = function () {
                  var data = JSON.parse(this.response)[0];
                  console.log(data);
                  if (data != undefined) {
                      //console.log('CII NAME: ' + data.name);
                      var badgeURL = 'https://bestpractices.coreinfrastructure.org/projects/' + data.id + '/badge';
                      console.log("BADGEURL");
                      console.log(badgeURL);
                      document.getElementById("CIIbadge").src = badgeURL;
                      if (data.badge_percentage_0 < 100) {
                          document.getElementById("CII").innerHTML = data.name + ' is currently not passing CII Best Practices.';
                        }
                        else if (data.badge_percentage_1 < 100) {
                          document.getElementById("CII").innerHTML = data.name + ' is currently passing CII Best Practices.';
                        }
                        else if (data.badge_percentage_2 < 100) {
                          document.getElementById("CII").innerHTML = data.name + ' is currently passing CII Best Practices. This project has a siver status.';
                        }
                        else if (data.badge_percentage_2 == 100) {
                          document.getElementById("CII").innerHTML = data.name + ' is currently passing CII Best Practices. <br>' + data.name + ' maintains a gold status.';
                        }
                      } else {
                        document.getElementById("CII").innerHTML = 'No best practice data for this repository.';
                      }
                    };
                  }
                  loader();
                  request.send();
                });
                document.getElementById("lcBtn").addEventListener("click", function(){
                  $.getJSON( "./scans/"+owner+"-"+repo+".json", function( data ) {
                    populate = document.getElementById("populate");
                    populate.parentNode.removeChild(populate);
                    //Retrieve raw data
                    //document.getElementById("licenseInfo").innerHTML = JSON.stringify(data);
                    var column = [];
                    column.push("Tag");
                    column.push("Info");
                    tableID = document.getElementById("licenseTable");
                    //Add border
                    //tableID.setAttribute("border", "2");
                    var tr = tableID.insertRow(0);
                    for (var i = 0; i < 2; i++)
                    {
                      var th = document.createElement("th");
                      th.innerHTML = column[i];
                      tr.appendChild(th);
                    }
                    console.log(data);
                    var g = 0;
                    var m = 0;
                    for (var k in data[0]) {
                      //console.log(data[0][k]);
                      if (k)
                      {
                        tr = tableID.insertRow(g+1);
                        for (var j = 0; j < 2; j++) {
                          var tab = tr.insertCell(j-1);
                          var info = data[0][k];
                          if (m % 2 == 0)
                          {
                              tab.style.backgroundColor =  "#EAEAEA";
                            }
                            if (j % 2 != 0) {
                              tab.innerHTML = k;
                            }
                            else {
                              if (info == "NOASSERTION" || !info)
                              {
                                  info = "None provided";
                                }
                                tab.innerHTML = info;
                              }
                            }
                            m++;
                            g++;
                          }
                        }
                        tableLI = document.getElementById("licenseTableLI");
                        //Add border
                        //tableLI.setAttribute("border", "2");
                        var tr = tableLI.insertRow(0);
                        var th = document.createElement("th");
                        th.innerHTML = "Licenses identified";
                        tr.appendChild(th);
                        g = 0;
                        m = 0;
                        for (var n in data[1])
                        {
                          //console.log(data[1][n]);
                          tr = tableLI.insertRow(g+1);
                          var tabTwo = tr.insertCell(-1);
                          tabTwo.innerHTML = data[1][n];
                          if (m % 2 == 0)
                          {
                            tabTwo.style.backgroundColor =  "#EAEAEA";
                          }
                          m++;
                          g++;
                        }
                        console.log("Scanned. setting SCAN STATE...");
                        localStorage.setItem("lRun", "Stopped");
                        document.getElementById("lcBtn").style.visibility = "hidden";
                      })
                      .then( () => {
                      }, error => {
                        document.getElementById("lcBtn").disabled = false;
                        //console.log("Error encountered. Stopping now...");
                        localStorage.setItem("lRun", "Stopped");
                        document.getElementById("lcBtn").innerHTML = "Error occurred when processing license information. Please try again.";
                      });
  	                 });
                   }
