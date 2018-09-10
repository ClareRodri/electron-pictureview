import { ipcRenderer } from 'electron'

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
function addImagesEvent(){
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


function setIpc() {
    ipcRenderer.on('load-images', function (event, images) {
        console.log("Imagenes recibidas");
        console.log(images);

        if (images.length > 0) {
            clearImages();
            loadImages(images);
            addImagesEvent();
        }
    })
}

function openDirectory() {
    ipcRenderer.send('open-directory')
}

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory
}