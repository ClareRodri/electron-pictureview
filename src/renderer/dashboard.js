import os from 'os';
import url from 'url';

window.addEventListener('load', function(){
    console.log(os.cpus());
    addImagesEvent();  
    searchImagesEvent();  
});

function addImagesEvent(){
    var thumbs = document.querySelectorAll("li.list-group-item");
    for (let index = 0; index < thumbs.length; index++) {
        thumbs[index].addEventListener('click', function(){
            changeImage(this);
        });
    }
}

function changeImage(node){
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')
    document.getElementById('image-displayed').src =  node.querySelector('img').src
}

function searchImagesEvent(){
    var searchBox = document.getElementById('search-box')
    searchBox.addEventListener('keyup', function(){
        if (this.value.length>0){
            var thumbs = document.querySelectorAll("li.list-group-item img");
            for (var index = 0; index < thumbs.length; index++) {
                console.log(url.parse(thumbs[index].src));                              
            }
        }
    })
}