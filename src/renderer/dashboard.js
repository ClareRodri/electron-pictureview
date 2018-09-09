import os from 'os';
import url from 'url';
import path from 'path';

window.addEventListener('load', function () {
    console.log(os.cpus());
    addImagesEvent();
    searchImagesEvent();
});

function addImagesEvent() {
    var thumbs = document.querySelectorAll("li.list-group-item");
    for (let index = 0; index < thumbs.length; index++) {
        thumbs[index].addEventListener('click', function () {
            changeImage(this);
        });
    }
}

function changeImage(node) {
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
}

function selectFirstImage() {
    var image = document.querySelector('li.list-group-item:not(.hidden)');
    if (image!=null) changeImage(image);
    else document.getElementById('image-displayed').src = ""
}

function searchImagesEvent() {
    var searchBox = document.getElementById('search-box')
    searchBox.addEventListener('keyup', function () {
        var regex = new RegExp(this.value.toLowerCase(), 'gi')
        var thumbs = document.querySelectorAll("li.list-group-item img");
        var countThums = thumbs.length;
        for (var index = 0; index < countThums; index++) {
            var fileUrl = url.parse(thumbs[index].src)
            var fileName = path.basename(fileUrl.pathname)
            if (fileName.match(regex) || this.value.length==0) {
                thumbs[index].parentNode.classList.remove('hidden')
            }
            else {
                thumbs[index].parentNode.classList.add('hidden')
            }
        }
        selectFirstImage();
    })
}