export default (address, callback) =>
{
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            callback({ status: true, latitude: lat, longitude: lng });
        }else{
            callback({ status: false, Latitude: lat, Longitude: lng });
        }
    });
}