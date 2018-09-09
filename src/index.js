'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'


if (process.env.NODE_ENV == 'dev') devtools()
app.on('ready', () => {

    // Crea ventana dentro del contenedor
    let win = new BrowserWindow({
        title: "Prueba de electronJs",
        center: true,
        show: false
    })
    
    win.once('ready-to-show', () => {
        debugger;
        win.show()
    })    
    win.on('closed', () => {
        win = null
        app.quit()
    })
   // win.loadURL("http://themicon.co/theme/angle/v4.0/vue/dashboardv2")
    win.loadURL(`file://${__dirname}/renderer/index.html`)
})