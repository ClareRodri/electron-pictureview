import { ipcRenderer } from 'electron'
import {addImagesEvent, clearImages, loadImages, selectFirstImage} from './images-ui'

function setIpc() {
    ipcRenderer.on('load-images', function (event, images) {
        console.log("Imagenes recibidas");
        console.log(images);
        if (images.length > 0) {
            clearImages();
            loadImages(images);
            addImagesEvent();
            selectFirstImage();
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