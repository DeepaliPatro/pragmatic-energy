const parentList = document.querySelector('.nearest-section ul');

axios.get('/api/stations')
    .then(res => {
        const stations = res.data.slice(0, 10);
        renderStationList(stations);
    })
    ;


function renderStationList(stations) {
    parentList.innerHTML = stations
        .map(station => renderStation(station))
        .join('')
        ;
}


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
                    <li>
                        <img src='${icons[station.owner] || icons.Generic}' alt="">
                        <div>
                            <div><p>${station.name}</p></div>
                            <p>${station.address}</p>
                        </div>
                    </li> 
    `
}
