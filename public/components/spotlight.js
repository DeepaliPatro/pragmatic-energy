// import {initMap} from "../client.js"

const parentTag = document.querySelector('.spotlight-section main');
const spotlightHeader = document.querySelector('.spotlight-section header');
// const refresh = document.querySelector('.refresh')
// const spotlightStation = document.querySelector('.spotlight-station')
axios.get('/api/stations/random')
    .then(res => {
        const spotlight = res.data
        parentTag.innerHTML = renderStation(spotlight)
    });

function renderStation(station) {

    const icons = {
        Ampol: "/images/ampol.jpeg",
        BP: "/images/bp.png",
        Caltex: "/images/caltex.png",
        Shell: "/images/shell.png",
        '7-Eleven Pty Ltd': "/images/seven-eleven.png",
        Generic: "/images/generic.jpg",
    }

    return `
            <div>
                <p><a href="" class="spotlight-station" data-title="${station.name}">${station.name}</a></p>
                <p>${station.address}</p>
            </div>
            <img src='${icons[station.owner] || icons.Generic}' alt="">
        `
}

spotlightHeader.addEventListener('click', handleRefresh)

function handleRefresh(event) {
    event.preventDefault()
    if(!event.target.classList.contains('refresh')) return
    // console.log(event.target.classList);
    axios.get('/api/stations/random')
        .then(res => {
            const spotlight = res.data
            parentTag.innerHTML = renderStation(spotlight)
        });

}

parentTag.addEventListener('click', handleSpotlight)

const icons = {
    Ampol: "/images/ampol.jpeg",
    BP: "/images/bp.png",
    Caltex: "/images/caltex.png",
    Shell: "/images/shell.png",
    '7-Eleven Pty Ltd': "/images/seven-eleven.png",
    Generic: "/images/generic.jpg",
}

function handleSpotlight(e){
    e.preventDefault();
    if(!e.target.classList.contains('spotlight-station')) return
    let markerToFind = e.target.dataset.title
    let spotlightMarker
    axios.get(`/api/stations/${markerToFind}`)
        .then(res => {
            let spotlight = res.data

            const spotlightLatLng = { lat: spotlight.latitude, lng: spotlight.longitude };

            const image = {
                url: icons[spotlight.owner] || icons.Generic,
                scaledSize: new google.maps.Size(25, 25),
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };

            const marker = new google.maps.Marker({
                position: spotlightLatLng,
                map,
                title: spotlight.name,
                icon: image
            });

            const infoWindow = new google.maps.InfoWindow();
            const contentString = `<div><h3>${spotlight.name}</h3> <p>${spotlight.address}</p></div>`
            infoWindow.setContent(contentString)
            infoWindow.open({
                anchor: marker,
                map,
            });
            map.setCenter(spotlightLatLng);
            map.setZoom = 10;
    })
}
