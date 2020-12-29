let data;
/*
* Abstracting API/fetch  calls
* */
const api = {
    async get(url){
        return await fetch(url).then(j => j.json());
    },
    async post(url, body){
        return await fetch(url, {
            method: 'POST',
            body:JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(j => j.json())
    }
}
// Getting data
api.get('.//data.json')
    .then(r => {
        data = r
        const alpine = document.createElement('script');
        alpine.src = "https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js";
        document.getElementsByTagName('body')[0].appendChild(alpine)
    })

/*
* This is the alpineJS "app"
* */
function app(){
    // read query parameters
    const urlParams = new URLSearchParams(window.location.search);
    return {
        data,
        editing: urlParams.has('edit'),
        init(){
            // onLoad functionality can be placed here
        },
        readForm(formElement){
            // this method reads any structured form into an object
            let postBody = {}
            for(let i =0; i < formElement.elements.length; i++){
                if(['input','select','textarea'].includes(formElement.elements[i].nodeName.toLowerCase())){
                    postBody[formElement.elements[i].name] = formElement.elements[i].value;
                }
            }
            return postBody;
        },
        addLink(ev){
            // here we are sending a new link to the "backend"
            const body = this.readForm(ev.target);
            api.post('addLink.php', body).then(res => {
                window.location.reload();
            })

        }
    }
}