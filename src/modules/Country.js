export const getCountry = async () => {    
    var url = 'http://api.ipstack.com/check?access_key=b0cec566d845f371a1d3f995bbaf415b';
    //https://api.iplocation.net/?ip=
    const res = await fetch(url)
        .catch((error) => {
            return null;
        });
    return await res.json();
};
