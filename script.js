(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var aeg = "AM"
            
            if (h == 12) {
                aeg =="noon"
            }

            if (h > 12) {
                if (h == 24) {
                    h = h - 12;
                    aeg = "midnight"
                } else {
                    h = h - 12;
                    aeg = "PM"
                }
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + aeg;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        var enimi = document.getElementById("fname");
        var pnimi = document.getElementById("lname");
        var checkRadio = document.querySelector('input[name="makseviis"]:checked');
        var hasNumber = /\d/;
        

        if (enimi.value === "" || pnimi.value === "") {
            alert("Palun sisesta nii eesnimi kui ka perenimi.");
            
            fname.focus();
            
            return;
        }
       if((hasNumber.test(enimi.value)) || (hasNumber.test(pnimi.value))) {
            alert("Eesnimi ja perenimi ei tohi sisaldada numbreid.");
            
            fname.focus();
            
            return;
        }
        if (checkRadio == null){
            alert("Vali makseviis.");
        }
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            if (linn.value === "tln") {
                e.innerHTML = "0,00 &euro;";
            } else if (linn.value === "trt" || linn.value === "nrv") {
                e.innerHTML = "2,50 &euro;";
            } else if (linn.value === "prn") {
                e.innerHTML = "3,00 &euro;";
            } else {
                e.innerHTML = "x,xx &euro;";
            }
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();


// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {
    
    "use strict";

    var point1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var point2 = new Microsoft.Maps.Location(
        58.553555, 26.593752
    );

    var center = new Microsoft.Maps.Location(
        58.461208, 26.666983
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: center,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(center, {
        width: 100,
        height: 10,
        visible: false
    });
    infobox.setMap(map);
    
    var pushpin1 = new Microsoft.Maps.Pushpin(point1, {
    });
    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht'
    };
    
    var pushpin2 = new Microsoft.Maps.Pushpin(point2, {
    });
    pushpin2.metadata = {
        title: 'Tabivere',
        description: 'Lapsepõlve kodukoht',
    };


    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

