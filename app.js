var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('music.db')
var mu = require('mu2');
var models = require('./models');
var Sequelize = require('sequelize');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
mu.root = __dirname



//get different url
app.get('/playlist.css', function(request, response) {
  response.sendFile(__dirname + '/playlist.css');
});

app.get('/playlists.html', function(request, response) {
  response.sendFile(__dirname + '/playlist.html');
});

app.get('/library', function(request, response) {
  response.sendFile(__dirname + '/playlist.html');
});

app.get('/playlists', function(request, response) {
  response.sendFile(__dirname + '/playlist.html');
});

app.get('/search', function(request, response) {
  response.sendFile(__dirname + '/playlist.html');
});

app.get('/music-app.js', function(request, response) {
  response.sendFile(__dirname + '/music-app.js');
});

app.get('/grey.jpg', function(request, response) {
  response.sendFile(__dirname + '/grey.jpg');
});


app.get('/', function(request, response) {
  response.status(301);
  response.setHeader('Location', 'http://localhost:3000/playlists');
  response.send('redirecting to playlists\n\n');
});

//api
app.get('/api/songs', function(request, response) {
    models.Song.findAll({attributes:['id','album','title','artist','duration']})
        .then(function(songs) {
          var newsongs =songs.map(function(song){
              return song.get({plain: true})
          })
          for(var i=0;i<newsongs.length;i++)
          {
            newsongs[i].id=newsongs[i].id-1;
          }
            response.end(JSON.stringify(newsongs));
        })
});


// other way to get the api/playlists
// app.get('/api/playlists', function(request, response){
//   Song= models.Song
//   models.Playlist.findAll({include:[{model:Song,
//     where:{ id: Sequelize.col('playlist.id')},
//     //through:{attributes:['SongId']},
//     attributes:['id']}],attributes:['id','name']}).then(function(playlists) {
//       var oldplaylist=playlists.map(function(playlist)
//       {
//         return playlist.get({plain: true})
//       })
//       var newPlaylist=[];
//       for(var i=0;i<oldplaylist.length;i++)
//       {
//         var tem={};
//         tem.id=oldplaylist[i].id-1;
//         tem.name=oldplaylist[i].name;
//         tem.songs=[];
//         for(var j=0;j<oldplaylist[i].Songs.length;j++)
//         {
//           tem.songs.push(oldplaylist[i].Songs[j].id-1);
//         }
//           newPlaylist.push(tem);
//         }
//           response.end(JSON.stringify(newPlaylist));
//         })
// });


app.get('/api/playlists', function(request, response){
  models.Playlist.findAll().then(function(playlists) {
    var newlist=[];
    var index=0;
    playlists.forEach(function(playlist){
    playlist.getSongs().then(function(data){
    var oldplaylist=playlists.map(function(playlist)
    {
      return playlist.get({plain: true})
    })
    for(var i=0;i<oldplaylist.length;i++)
    {
      var tem={};
      tem.id=oldplaylist[i].id-1;
      tem.name=oldplaylist[i].name;
      tem.songs=[];
      if(oldplaylist[i].id === data[i].SongsPlaylists.PlaylistId)
      {
        for(var j=0;j<data.length;j++)
        {
          tem.songs.push(data[j].id-1);
        }
        newlist.push(tem);
        index++;
      }
    }
    if(index ===oldplaylist.length)
    {
      response.end(JSON.stringify(newlist));
    }
})//getSongs().then
})//forEach(function(playlist)
})//models.Playlist.findAll().then(function(playlists)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000! Open and accepting connections until someone kills this process');
});
