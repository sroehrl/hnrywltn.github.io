let data;
fetch('.//data.json')
    .then(j => j.json())
    .then(r => {
        data = r
        const alpine = document.createElement('script');
        alpine.src = "https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js";
        document.getElementsByTagName('body')[0].appendChild(alpine)
    })
function app(){
    return {
        data
    }
}