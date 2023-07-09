var map;
require([
"esri/map",
"esri/dijit/BasemapToggle",
"esri/dijit/HomeButton",
"esri/dijit/Search",
"esri/dijit/LocateButton",
"dojo/domReady!"
], function (
Map, BasemapToggle,HomeButton, Search, LocateButton
)
 {
map = new Map("map1", {
center: [79.768021, 11.744699],
zoom: 6,
basemap: "hybrid"
});
/* document.getElementById("basemap_btn").onclick= function (map){
var basemap_type = document.getElementById("basemap_type").value;
alert(basemap_type);
map.basemap = basemap_type;
} */
var basemapToggle = new BasemapToggle({
    map: map,
    basemap: "streets"
    }, "BasemapToggle");
    basemapToggle.startup();

    var home = new HomeButton({
        map: map
        }, "HomeButton");
        home.startup();

var search = new Search({
    map: map,
    enableButtonMode: true,
    enableHighlight: true,
    enableLabel: true
    }, "search");
    search.startup();

    var myLocation = new LocateButton({
        map: map,
        scale: 1000000,
        centerAt: true
        }, "LocateButton");
        myLocation.startup();

       
});

/*  
var basemap = document.getElementById("basemap_type").value;
Map.basemap = basemap;
}   */   
//base map change