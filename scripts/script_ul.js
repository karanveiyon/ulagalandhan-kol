var place = document.getElementById("place-name").value;
var download = document.getElementById("txt-download-btn");
document.getElementById("calculate").onclick = function ()
{

var site_name = document.getElementById("site-name").value;
var site_type = document.getElementById("site-type").value;
var lat_deg = parseInt(document.getElementById("lat-deg").value);
var lat_min = parseFloat(document.getElementById("lat-min").value);
var lat_sec = parseFloat(document.getElementById("lat-sec").value);
var long_deg = parseInt(document.getElementById("long-deg").value);
var long_min = parseFloat(document.getElementById("long-min").value);
var long_sec = parseFloat(document.getElementById("long-sec").value);
var lat_min_dec = lat_min/60;
var lat_sec_dec = lat_sec/3600;
var long_min_dec = long_min/60;
var long_sec_dec = long_sec/3600;

var lat_dec = (lat_deg)+(lat_min_dec)+(lat_sec_dec);
var long_dec =(long_deg)+(long_min_dec)+(long_sec_dec);
var decimal_resut= lat_dec+","+long_dec;
var final_print = site_name+","+decimal_resut+","+site_type;
// document.getElementById("site-list").innerHTML="<ul>"+final_print+"</ul>";
// document.getElementById("next-site").innerHTML= "<span id=\"site-list\"></span>";
var list = document.createElement('ul');
var printResult = document.createTextNode(final_print);
list.append(printResult);

if(final_print === "")
{
    alert("Please enter the value")
}
else
{
    document.getElementById("site-list").append(list);
}
return printResult;
}

function savetxt(filename, text){

var element = document.createElement('a');
element.style.display = "none";
element.setAttribute('href','data:text/plain;charset-utf-8,'+encodeURIComponent(text));
console.log(text);
element.setAttribute('download',filename);
document.body.appendChild(element);
element.click();
document.body.removeChild(element);
}

function contentText(textfromHTML)
{
    
    var newline = "\r\n";
    var extractText = textfromHTML.replaceAll("</ul>",newline);
    var final = extractText.replaceAll("<ul>","");

    return final;
}

document.getElementById("txt-download-btn").addEventListener("click", function(){
    var firstline = "name, lat, long, type";
    var textfromHTML = document.getElementById("site-list").innerHTML;
    var finalText = contentText(textfromHTML);
    var text = firstline+finalText;
    var filename = document.getElementById("place-name").value;

    savetxt(filename,text);
}, false);

var get_location = document.getElementById("get_location");
      var get_location_name = document.getElementById("get_location_name");
      var current_location_name = document.getElementById("current_location_name");
      var get_geo_cordinate = document.getElementById("get_geo_cordinate");
      var get_distance_btn = document.getElementById("get_distance_btn");

      get_location.onclick = fetch_current_location;
      const Http = new XMLHttpRequest();
      function fetch_current_location() {
        var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            var current_latitude = document.getElementById("current_latitude");
            var current_longitude = document.getElementById("current_longitude");
            var current_location_value = document.getElementById("current_location_value");
            current_latitude.innerText = "Latitude: " + latitude;
            current_longitude.innerText = "Longitude: " + longitude;
            current_location_value.value = latitude+","+longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            bdcApi =
              bdcApi +
              "?latitude=" +
              position.coords.latitude +
              "&longitude=" +
              position.coords.longitude +
              "&localityLanguage=en";
            getApi(bdcApi);
          },
          (err) => {
            getApi(bdcApi);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      }
      function getApi(bdcApi) {
        Http.open("GET", bdcApi);
        Http.send();
        Http.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var json_result = JSON.parse(this.responseText);
            var current_district =
              json_result.localityInfo.administrative[2].name;
            var current_state = json_result.localityInfo.administrative[1].name;
            var location = current_district + ", " + current_state;
            current_location_name.innerText = location;
          }
        };
      }

      get_location_name.onclick = function get_location_name() {
        var get_geo_code_1 = document.getElementById("current_lat_long").value;
        var get_geo_code = get_geo_code_1.replace(" ", "");
        var lat_long = get_geo_code.split(",");
        var get_latitude = lat_long[0];
        var get_longitude = lat_long[1];
        const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${get_latitude}&lon=${get_longitude}`;
        fetch(geocodeUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.address) {
              const placeName = data.display_name;
              console.log("Place Name:", placeName);
              document.getElementById("location_name").innerText = placeName;
            } else {
              console.error("Reverse geocoding failed. No results found.");
            }
          })
          .catch((error) => {
            console.error("Reverse geocoding error:", error);
          });
      };

      get_geo_cordinate.onclick = function getCoordinates(placeName) {
        var placeName = document.getElementById("place_name").value;
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          placeName
        )}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const { lat, lon } = data[0];
              console.log("Latitude:", lat);
              console.log("Longitude:", lon);
              document.getElementById("location_geo_code").innerText =
                "Latitude :" + lat + " Longitude: " + lon;
            } else {
              console.log("No results found for the place name.");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      };

      get_distance_btn.onclick = function haversine() {
        var place_1_value = document.getElementById("place_1").value;
        var place_2_value = document.getElementById("place_2").value;
        var place_1 = place_1_value.split(",");
        var place_2 = place_2_value.split(",");
        var lat1 =place_1[0]; 
        var lon1 =place_1[1]; 
        var lat2 =place_2[0]; 
        var lon2 =place_2[1]; 
        const geocodeUrl_1 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat1}&lon=${lon1}`;
        fetch(geocodeUrl_1)
          .then((response) => response.json())
          .then((data) => {
            /* console.log(data); */
            if (data.address) {
              const placeName_1 = data.address.city;
              console.log("Place Name:", placeName_1);
              document.getElementById("distace_place_1").innerText = placeName_1;
            } else {
              console.error("Reverse geocoding failed. No results found.");
            }
          })
          .catch((error) => {
            console.error("Reverse geocoding error:", error);
          });
          const geocodeUrl_2 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat2}&lon=${lon2}`;
          fetch(geocodeUrl_2)
            .then((response) => response.json())
            .then((data) => {
             /*    console.log(data); */
              if (data.address) {
                const placeName_2 = data.address.city;
                console.log("Place Name:", placeName_2);
                document.getElementById("distace_place_2").innerText = placeName_2;
              } else {
                console.error("Reverse geocoding failed. No results found.");
              }
            })
            .catch((error) => {
              console.error("Reverse geocoding error:", error);
            });
        const earthRadius = 6371; // Radius of the Earth in kilometers

        // Convert latitude and longitude from degrees to radians
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = earthRadius * c;
  document.getElementById("distance").innerText = distance.toFixed(2)+" km"
  document.getElementById("distance_result_1").classList.remove("d-none");
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
var get_distance_btn_2 = document.getElementById("get_distance_btn_2");
get_distance_btn_2.onclick = function get_distance_by_name() {
  var placeName_1 = document.getElementById("place_name_1").value;
  var placeName_2 = document.getElementById("place_name_2").value;
  const apiUrl_1 = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    placeName_1
  )}`;
  const apiUrl_2 = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    placeName_2
  )}`;

  fetch(apiUrl_1)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const { lat: lat1, lon: lon1 } = data[0];

        fetch(apiUrl_2)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const { lat: lat2, lon: lon2 } = data[0];

              const earthRadius = 6371; // Radius of the Earth in kilometers

              // Convert latitude and longitude from degrees to radians
              const toRadians = (angle) => (angle * Math.PI) / 180;
              const dLat = toRadians(lat2 - lat1);
              const dLon = toRadians(lon2 - lon1);

              const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) *
                  Math.cos(toRadians(lat2)) *
                  Math.sin(dLon / 2) *
                  Math.sin(dLon / 2);

              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

              // Calculate the distance
              const distance = earthRadius * c;
              document.getElementById("distace_name_place_1").innerText = placeName_1;
              document.getElementById("distace_name_place_2").innerText = placeName_2;
              document.getElementById("distance_by_name").innerText =
                distance.toFixed(2) + " km";
              document.getElementById("distance_result_2").classList.remove(
                "d-none"
              );

              return distance;
            } else {
              console.log("No results found for the place name.");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        console.log("No results found for the place name.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
