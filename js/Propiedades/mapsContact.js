// export default async function apiCallMapContact() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
    const map = new mapboxgl.Map({
        
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.54872192876886, -33.4084902734348],  
        projection: 'globe',
        zoom: 15,
        
    });

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(`
                Dirección: Apoquindo 7935`)
                
                // create DOM element for the marker
                const ubicacion = document.createElement('div');
                ubicacion.id = 'marker';
                // el.style.backgroundImage = `${data.img != null && data.img != '' && data.img != undefined ? data.img : "images/Sin.png"}`;
                // el.style.width = `${50}px`;
                // el.style.height = `${50}px`;
                // el.style.backgroundSize = "100%";
            
                new mapboxgl.Marker({
                    color: '#04B0C3',
                    scale: .8
                })
                    .setLngLat([-70.54872192876886, -33.4084902734348])
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
            
                // create the marker
                // new mapboxgl.Marker(el)
                
                   
     


// }
