const gallery = document.querySelector('.gallery');

fetch(GALLERY_URL)
    .then(res => res.json())
    .then(json => {

        pushCards((json), gallery);
        // console.log()
    })
    .catch(err => {
        console.log("Error: ", err);
    });