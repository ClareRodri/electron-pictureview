import os from 'os';
import {setIpc, openDirectory } from './ipcRendererEvents'
import {addImagesEvent, searchImagesEvent, selectEvent} from './images-ui'

window.addEventListener('load', function () {
    console.log(os.cpus());
    addImagesEvent();
    searchImagesEvent
    selectEvent();
    setIpc();
    buttonEvent('open-directory', openDirectory);
});

function buttonEvent(id, func) {
    var openDir = document.getElementById(id)
    openDir.addEventListener('click', func)
}

