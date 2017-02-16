var fs = require('fs');
var models = require('./models');

models.sequelize.sync({force: true}).then(function() {

    fs.readFile('./songs.json', function(err, data) {
        var music_data = JSON.parse(data);
        var songs = music_data['songs'];

        songs.forEach(function(song) {
            //pconsole.log(song);
            models.Song.create({
                title: song.title,
                album: song.album,
                artist: song.artist,
                duration: song.duration,
            });
        });
    });

    fs.readFile('./playlists.json', function(err, data) {
        var music_data = JSON.parse(data);
        var playlists = music_data['playlists'];

        playlists.forEach(function(playlist) {
            //console.log(playlists);
            models.Playlist.create({
                name: playlist.name,

              }).then(function(newplaylists){
                playlist.songs.forEach(function(songID){
                  models.Song.findOne({
                    where:{
                      id:songID+1
                    }
                  }).then(function(song){
                    console.log(song)
                    newplaylists.addSong(song);
                  })
                })

              });
        });
    });

});
