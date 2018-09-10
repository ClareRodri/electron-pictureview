import url from 'url';
import path from 'path';
import applyFilter from './filters'
import { open } from 'fs';

function addImagesEvent() {
    var thumbs = document.querySelectorAll("li.list-group-item");
    for (let index = 0; index < thumbs.length; index++) {
        thumbs[index].addEventListener('click', function () {
            changeImage(this);
        });
    }
}

function changeImage(node) {
    if (node) {
        var selected = document.querySelector('li.selected');
        if(selected) selected.classList.remove('selected')
        node.classList.add('selected')
        document.getElementById('image-displayed').src = node.querySelector('img').src
    }
    else document.getElementById('image-displayed').src = ""
}

function selectFirstImage() {
    var image = document.querySelector('li.list-group-item:not(.hidden)');
    if (image != null) changeImage(image);
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
            if (fileName.match(regex) || this.value.length == 0) {
                thumbs[index].parentNode.classList.remove('hidden')
            }
            else {
                thumbs[index].parentNode.classList.add('hidden')
            }
        }
        selectFirstImage();
    })
}

function selectEvent() {
    var select = document.getElementById('filters');
    select.addEventListener('change', function () {
        console.log(this.value);
        applyFilter(this.value, document.getElementById('image-displayed'))

    })
}

function clearImages() {
    var oldImages = document.querySelectorAll('li.list-group-item');
    for (let index = 0; index < oldImages.length; index++) {
        oldImages[index].parentNode.removeChild(oldImages[index])
    }
}

function loadImages(images) {
    var imageList = document.querySelector('ul.list-group')
    for (let index = 0; index < images.length; index++) {
        var node = ` <li class="list-group-item">
                        <img class="media-object pull-left" src="${images[index].src}" width="32" height="32">
                        <div class="media-body">
                            <strong>${images[index].filename}</strong>
                            <p>${images[index].size}</p>
                        </div>
                    </li>`
        imageList.insertAdjacentHTML('beforeend', node)
    }
}

module.exports = {
    addImagesEvent: addImagesEvent,
    changeImage: changeImage,
    selectFirstImage: selectFirstImage,
    searchImagesEvent: searchImagesEvent,
    selectEvent: selectEvent,
    clearImages: clearImages,
    loadImages: loadImages
}