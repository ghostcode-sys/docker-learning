const express = require("express")
const cors = require("cors")

const router = require("./config/router")

const db = require("./database")

db.CreateConnection();

const app = new express()
app.use(cors())

app.use("/v1",router)


function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))

let server = app.listen(5000, () => {
  console.log("Listning to port 5000")
})


function gracefulshutdown() { 
  console.log("Shutting down"); 
  server.close(() => { 
      db.CloseConnection()
      console.log("HTTP server closed."); 
      process.exit(0);  
  }); 
} 

process.on("SIGTERM", gracefulshutdown);
process.on("SIGINT", gracefulshutdown);

