'use strict'

import { app, BrowserWindow, ipcMain, dialog} from 'electron'
import devtools from './devtools'
import isImage from 'is-image'
import fs from 'fs'
import path from 'path'
import filesize from 'filesize'
var win

if (process.env.NODE_ENV == 'dev') devtools()
app.on('ready', () => {

    // Crea ventana dentro del contenedor
    win = new BrowserWindow({
        title: "Prueba de electronJs",
        center: true,
        show: false
    })
    
    win.once('ready-to-show', () => {
        win.show()
    })    
    win.on('closed', () => {
        win = null
        app.quit()
    })
   // win.loadURL("http://themicon.co/theme/angle/v4.0/vue/dashboardv2")
    win.loadURL(`file://${__dirname}/renderer/index.html`)
})

ipcMain.on('open-directory', function(event){
    dialog.showOpenDialog(win,{
        title: "Seleccione la nueva ubicación",
        buttonLabel: "Abrir ubicación",
        properties: ['openDirectory']
    },function(dir){
        console.log("Directorio selccionado");
        console.log(dir);
        var images = []
        if (dir){
            fs.readdir(dir[0], function(err, files){
                if (err) throw err
                console.log(files);
                console.log(dir[0]);
                for (let index = 0; index < files.length; index++) {
                    var data = files[index];
                    if (isImage(data)){
                        var imageFile = path.join(dir[0], data)
                        var stats = fs.statSync(imageFile)
                        var size = filesize(stats.size, {round: 0})
                        images.push({
                            filename: data,
                            src: `file://${imageFile}`,
                            size: size
                        })
                    }
                }
                console.log(images);
                event.sender.send('load-images', images);
                
            })
        }
    })
})