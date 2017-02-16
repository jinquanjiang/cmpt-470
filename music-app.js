
//create the emputy array..
var MUSIC_DATA={playlists:[],songs:[]}

//load the data from JSON for playlists
function getPlaylistsData()
{
  return $.getJSON( "api/playlists", function( result )
  {
   result.forEach(function(item)
   {
     MUSIC_DATA.playlists.push(item);
   })

  });
}
//load the data from JSON for songs
function getSongsData()
{
 return $.getJSON( "api/songs", function( result )
 {
   result.forEach(function(item)
   {
     MUSIC_DATA.songs.push(item);
   })

 });
}

//after all the data done then run the call back funtion
$.when(getPlaylistsData(),getSongsData()).done(function()
{
  document.getElementById("tagSongs").onclick = function(){changeTheSection('library','playlists','search'),listAllSongs()}
  document.getElementById("tagPlaylists").onclick = function(){changeTheSection('playlists','library','search');listPlaylists();}
  document.getElementById("tagSearch").onclick = function(){changeTheSection('search','playlists','library');searchSongs();}
  document.getElementById("sortByArtists").onclick = function(){artistSort();}
  document.getElementById("sortByTitle").onclick = function(){titleSort();}
  document.getElementById("searchinput").onkeyup = function(){search();}
  document.getElementById("buttonPlaylist").onclick = function(){showModalForPlaylist();}
  document.getElementById('playlists').style.display='block';
  listPlaylists();
  var url =window.location.pathname;
  if(url == "/search")
  {
    changeTheSection('search','playlists','library');
    searchSongs();
  }
  else if(url == "/library")
  {
    changeTheSection('library','playlists','search');
    listAllSongs();
  }
  else if(url == "/playlists")
  {
    changeTheSection('playlists','library','search');listPlaylists();
  }

//swithc between the section
  function changeTheSection(id1,id2,id3)
  {
    document.getElementById(id1).style.display='block';
	  document.getElementById(id2).style.display = 'none';
	  document.getElementById(id3).style.display = 'none';
    history.pushState(true, "execrise 3", id1);
  }

//list all the playlist
   function listPlaylists()
   {
     //clear the section
	    var v = document.getElementById("playlists_inside");
	    while (v.hasChildNodes())
      {
		      v.removeChild(v.firstChild);
      }

      var x = document.getElementById("playlists_inside");
      var a;
      var b;
      b=window.MUSIC_DATA.playlists.length-1;
      var button;
      var img;
      var text;
      var span;
      var span1;
      for(a=0; a <= b;++a)
      {
        text=document.createTextNode(window.MUSIC_DATA.playlists[a].name);
        button=document.createElement("button");
        button.setAttribute("onclick","showSongs("+a+");");
        img=document.createElement("img");
        img.setAttribute('src','grey.jpg');
        img.setAttribute('alt','img');
        span=document.createElement("span");
        span.setAttribute('class','play');
        span1=document.createElement("span");
        span1.setAttribute('class','glyphicon glyphicon-chevron-right');
        playlists_inside.appendChild(button);
        button.appendChild(img);
        button.appendChild(span);
        span.appendChild(text);
        button.appendChild(span1);
      }
    }

//list all the songs in songs_inside section
    function listAllSongs()
    {

      var v = document.getElementById("songs_inside");
      while (v.hasChildNodes()) {
        v.removeChild(v.firstChild);
    }
    var d;
    var title;
    var button;
    var span;
    var img;
    var span1;
    var span2;
    var br;
    var artist;
    var span3;
    var span4;
    d=window.MUSIC_DATA.songs.length-1;
    for(var c=0;c<=d;++c)
    {
      title=document.createTextNode(window.MUSIC_DATA.songs[c].title);
      artist=document.createTextNode(window.MUSIC_DATA.songs[c].artist);
      button=document.createElement("button");
      img=document.createElement("img");
      br=document.createElement("br");
      img.setAttribute('src','grey.jpg');
      img.setAttribute('alt','img');
      span1=document.createElement("span");
      span1.setAttribute('class','play');
      span2=document.createElement("span");
      span2.setAttribute('class','play1');
      span3=document.createElement("span");
      span3.setAttribute('class','glyphicon glyphicon-play');
      span4=document.createElement("span");
      span4.setAttribute('class','glyphicon glyphicon-plus-sign');
      span4.setAttribute("onclick","showModal("+c+");");
      songs_inside.appendChild(button);
      button.appendChild(img);
      button.appendChild(span1);
      span1.appendChild(title);
      span1.appendChild(br);
      span1.appendChild(span2);
      span2.appendChild(artist);
      button.appendChild(span3);
      button.appendChild(span4);
    }
  }

// empty function for search_inside section
  function searchSongs()
  {

  }

// title sort function called from title sort button
  function titleSort()
  {
    var y = document.getElementById("songs_inside");
    var v = document.getElementById("songs_inside");
    while (v.hasChildNodes())
    {
      v.removeChild(v.firstChild);
    }//clear the data before
    var c;
    var d;
    d=window.MUSIC_DATA.songs.length-1;

    var sortArray = window.MUSIC_DATA.songs.slice();
    sortArray.sort(function(a,b)
    {
      if ( a.title < b.title )
        return -1;
      if ( a.title > b.title )
        return 1;
      return 0;
    } );
    var title;
    var button;
    var span;
    var img;
    var span1;
    var span2;
    var br;
    var artist;
    var span3;
    var span4;
    for(c=0;c<=d;++c)//set 20 is easy to test
    {
      title=document.createTextNode(sortArray[c].title);
      artist=document.createTextNode(sortArray[c].artist);
      button=document.createElement("button");
      img=document.createElement("img");
      br=document.createElement("br");
      img.setAttribute('src','grey.jpg');
      img.setAttribute('alt','img');
      span1=document.createElement("span");
      span1.setAttribute('class','play');
      span2=document.createElement("span");
      span2.setAttribute('class','play1');
      span3=document.createElement("span");
      span3.setAttribute('class','glyphicon glyphicon-play');
      span4=document.createElement("span");
      span4.setAttribute('class','glyphicon glyphicon-plus-sign');
      span4.setAttribute("onclick","showModal("+c+");");
      songs_inside.appendChild(button);
      button.appendChild(img);
      button.appendChild(span1);
      span1.appendChild(title);
      span1.appendChild(br);
      span1.appendChild(span2);
      span2.appendChild(artist);
      button.appendChild(span3);
      button.appendChild(span4);
    }

  }

// artist sort function called from artist button
  function artistSort()
  {
    var y = document.getElementById("songs_inside");
    var v = document.getElementById("songs_inside");
    while (v.hasChildNodes())
    {
      v.removeChild(v.firstChild);
    }//clear the data before
    var c;
    var d;
    d=window.MUSIC_DATA.songs.length-1;
    var sortArray = window.MUSIC_DATA.songs.slice();
    sortArray.sort(function(a,b)
    {
      if ( a.artist < b.artist )
          return -1;
      if ( a.artist > b.artist )
          return 1;
        return 0;
    });
    var title;
    var button;
    var span;
    var img;
    var span1;
    var span2;
    var br;
    var artist;
    var span3;
    var span4;
    for(c=0;c<=d;++c)
    {
      title=document.createTextNode(sortArray[c].title);
      artist=document.createTextNode(sortArray[c].artist);
      button=document.createElement("button");
      img=document.createElement("img");
      br=document.createElement("br");
      img.setAttribute('src','grey.jpg');
      img.setAttribute('alt','img');
      span1=document.createElement("span");
      span1.setAttribute('class','play');
      span2=document.createElement("span");
      span2.setAttribute('class','play1');
      span3=document.createElement("span");
      span3.setAttribute('class','glyphicon glyphicon-play');
      span4=document.createElement("span");
      span4.setAttribute('class','glyphicon glyphicon-plus-sign');
      span4.setAttribute("onclick","showModal("+c+");");
      songs_inside.appendChild(button);
      button.appendChild(img);
      button.appendChild(span1);
      span1.appendChild(title);
      span1.appendChild(br);
      span1.appendChild(span2);
      span2.appendChild(artist);
      button.appendChild(span3);
      button.appendChild(span4);
    }
  }

// search function, list all the matched songs and playlists in search_inside section
  function search()
  {
    var v = document.getElementById("search_inside");
    while (v.hasChildNodes())
    {
      v.removeChild(v.firstChild);
    }
    var x = document.getElementById("search_inside");
    var searchInput= document.getElementById("searchinput").value;
    var temp=document.createTextNode("success");
    lengthOfPlaylists=window.MUSIC_DATA.playlists.length;
    lengthOfSongs=window.MUSIC_DATA.songs.length;
    for(var i=0; i< lengthOfPlaylists; i++)
    {
      var button;
      var img;
      var text;
      var span;
      var span1;
		  if(MUSIC_DATA.playlists[i].name.includes(searchInput))
		  {
        text=document.createTextNode(window.MUSIC_DATA.playlists[i].name);
        button=document.createElement("button");
        button.setAttribute("onclick","showSongs2("+i+");");
        img=document.createElement("img");
        img.setAttribute('src','grey.jpg');
        img.setAttribute('alt','img');
        span=document.createElement("span");
        span.setAttribute('class','play');
        span1=document.createElement("span");
        span1.setAttribute('class','glyphicon glyphicon-chevron-right');
        search_inside.appendChild(button);
        button.appendChild(img);
        button.appendChild(span);
        span.appendChild(text);
        button.appendChild(span1);
			  showSongs3(i);
		  }
	   }
	  var title;
	  var button;
    var span;
	  var img;
	  var span1;
	  var span2;
	  var br;
    var artist;
    var span3;
    var span4;
    for(var a=0; a< lengthOfSongs; a++)
    {
      if(MUSIC_DATA.songs[a].title.includes(searchInput) || MUSIC_DATA.songs[a].artist.includes(searchInput))
		  {
        title=document.createTextNode(window.MUSIC_DATA.songs[a].title);
			  artist=document.createTextNode(window.MUSIC_DATA.songs[a].artist);
			  button=document.createElement("button");
		    img=document.createElement("img");
		    br=document.createElement("br");
			  img.setAttribute('src','grey.jpg');
			  img.setAttribute('alt','img');
			  span1=document.createElement("span");
			  span1.setAttribute('class','play');
        span2=document.createElement("span");
			  span2.setAttribute('class','play1');
		    span3=document.createElement("span");
	      span3.setAttribute('class','glyphicon glyphicon-play');
			  span4=document.createElement("span");
			  span4.setAttribute('class','glyphicon glyphicon-plus-sign');
			  span4.setAttribute("onclick","showModal("+a+");");
			  search_inside.appendChild(button);
			  button.appendChild(img);
			  button.appendChild(span1);
			  span1.appendChild(title);
			  span1.appendChild(br);
		    span1.appendChild(span2);
		    span2.appendChild(artist);
			  button.appendChild(span3);
			  button.appendChild(span4);
      }
	  }
  }
})//end the call back function





// when click any playlist in playlists_inside section, then show the songs belongs to this playlist
function showSongs(a)
{
  var v = document.getElementById("playlists_inside");
	while (v.hasChildNodes())
  {
	  v.removeChild(v.firstChild);
  }
  var listPlaylists= window.MUSIC_DATA.playlists[a];
  var listSongs=window.MUSIC_DATA.songs;
  var x = document.getElementById("playlists_inside");
  var d;
  var index=window.MUSIC_DATA.playlists[a].songs.length;
  x.innerHTML="<h4>"+listPlaylists.name+"</h4>";
  var index2;
  var title;
  var button;
  var span;
  var img;
  var span1;
  var span2;
  var br;
  var artist;
  var span3;
  var span4;
  for(var c=0;c<index;++c)
  {
    index2=listPlaylists.songs[c];
    title=document.createTextNode(listSongs[index2].title);
    artist=document.createTextNode(listPlaylists.name);
    button=document.createElement("button");
    img=document.createElement("img");
    br=document.createElement("br");
    img.setAttribute('src','grey.jpg');
    img.setAttribute('alt','img');
    span1=document.createElement("span");
    span1.setAttribute('class','play');
    span2=document.createElement("span");
    span2.setAttribute('class','play1');
    span3=document.createElement("span");
    span3.setAttribute('class','glyphicon glyphicon-play');
    span4=document.createElement("span");
    span4.setAttribute('class','glyphicon glyphicon-plus-sign');
    span4.setAttribute("onclick","showModal("+c+");");
    playlists_inside.appendChild(button);
    button.appendChild(img);
    button.appendChild(span1);
    span1.appendChild(title);
    span1.appendChild(br);
    span1.appendChild(span2);
    span2.appendChild(artist);
    button.appendChild(span3);
    button.appendChild(span4);
  }
}

// when click any playlist in search_inside section, then show the songs belongs to this playlist
function showSongs2(a)
{
  var v = document.getElementById("search_inside");
	while (v.hasChildNodes())
  {
		v.removeChild(v.firstChild);
  }
  var listPlaylists= window.MUSIC_DATA.playlists[a];
  var listSongs=window.MUSIC_DATA.songs;
  var x = document.getElementById("search_inside");
  var d;
  var index=window.MUSIC_DATA.playlists[a].songs.length;
  x.innerHTML="<h4>"+listPlaylists.name+"</h4>";
  var index2;
  var title;
  var button;
  var span;
  var img;
  var span1;
  var span2;
  var br;
  var artist;
  var span3;
  var span4;
  for(var c=0;c<index;++c)
  {
    index2=listPlaylists.songs[c];
    title=document.createTextNode(listSongs[index2].title);
    artist=document.createTextNode(listPlaylists.name);
    button=document.createElement("button");
    img=document.createElement("img");
    br=document.createElement("br");
    img.setAttribute('src','grey.jpg');
    img.setAttribute('alt','img');
    span1=document.createElement("span");
    span1.setAttribute('class','play');
    span2=document.createElement("span");
    span2.setAttribute('class','play1');
    span3=document.createElement("span");
    span3.setAttribute('class','glyphicon glyphicon-play');
    span4=document.createElement("span");
    span4.setAttribute('class','glyphicon glyphicon-plus-sign');
    span4.setAttribute("onclick","showModal("+c+");");
    search_inside.appendChild(button);
    button.appendChild(img);
    button.appendChild(span1);
    span1.appendChild(title);
    span1.appendChild(br);
    span1.appendChild(span2);
    span2.appendChild(artist);
    button.appendChild(span3);
    button.appendChild(span4);
  }
}

// when click any playlist in search_inside section, then show the songs belongs to this playlist
function showSongs3(a)
{
 var listPlaylists= window.MUSIC_DATA.playlists[a];
 var listSongs=window.MUSIC_DATA.songs;
 var x = document.getElementById("search_inside");
 var d;
 var index=window.MUSIC_DATA.playlists[a].songs.length;
 var index2;
 var title;
 var button;
 var span;
 var img;
 var span1;
 var span2;
 var br;
 var artist;
 var span3;
 var span4;
 for(var c=0;c<index;++c)
 {
   index2=listPlaylists.songs[c];
   title=document.createTextNode(listSongs[index2].title);
   artist=document.createTextNode(listPlaylists.name);
   button=document.createElement("button");
   img=document.createElement("img");
   br=document.createElement("br");
   img.setAttribute('src','grey.jpg');
   img.setAttribute('alt','img');
   span1=document.createElement("span");
   span1.setAttribute('class','play');
   span2=document.createElement("span");
   span2.setAttribute('class','play1');
   span3=document.createElement("span");
   span3.setAttribute('class','glyphicon glyphicon-play');
   span4=document.createElement("span");
   span4.setAttribute('class','glyphicon glyphicon-plus-sign');
   span4.setAttribute("onclick","showModal("+c+");");
   search_inside.appendChild(button);
   button.appendChild(img);
   button.appendChild(span1);
   span1.appendChild(title);
   span1.appendChild(br);
   span1.appendChild(span2);
   span2.appendChild(artist);
   button.appendChild(span3);
   button.appendChild(span4);
  }
}

// when click the add playlists button in playlists_inside section, then it will show a modal and enter a new playlist name
function showModalForPlaylist()
{
  var modal = document.getElementById('myModalForPlaylist');
  var span = document.getElementsByClassName("close2")[0];
  var submit = document.getElementById('submit');
  modal.style.display = "block";
  var v = document.getElementById("modalList");
  while (v.hasChildNodes())
  {
	  v.removeChild(v.firstChild);
  }
  span.onclick = function()
  {
    modal.style.display = "none";
  }
  submit.onclick = function()
  {
    modal.style.display = "none";
    addPlaylist();
  }
  window.onclick = function(event)
  {
    if (event.target == modal)
    {
      modal.style.display = "none";
    }
  }
}

//add playlists and post to the server
function addPlaylist()
{
  var playlistName = document.getElementById('submitValue').value;
  var request = new XMLHttpRequest();
  var newPlaylist ={id:window.MUSIC_DATA.playlists.length,name:playlistName,songs:[]};
  //window.MUSIC_DATA.playlists.push(newPlaylist);
  var index = window.MUSIC_DATA.playlists.length-1;
  request.open("POST","./api/playlists",true);

  request.send(JSON.stringify(window.MUSIC_DATA.playlists[index]));
  console.log(window.MUSIC_DATA.playlists);
  //window.location.reload();
}

// when click the + in songs_inside section, then it will show a modal and lists all the playlists
function showModal(z)
{
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  var v = document.getElementById("modalList");
  while (v.hasChildNodes())
  {
	  v.removeChild(v.firstChild);
  }

  var button;
  var list;
  var a;
  var b;
  var p;
  var text= document.createTextNode("Choose playlists");
  p=document.createElement("p");
  p.setAttribute('class','modalText');
  b=window.MUSIC_DATA.playlists.length-1;
  modalList.appendChild(p);
  p.appendChild(text);
  for(a=0;a<=b;a++)
  {
	  list=document.createTextNode(window.MUSIC_DATA.playlists[a].name);
	  button=document.createElement("button");
	  button.setAttribute("onclick","addList("+z+","+a+");");
	  modalList.appendChild(button);
	  button.appendChild(list);
  }
  span.onclick = function()
  {
    modal.style.display = "none";
  }
  window.onclick = function(event)
  {
    if (event.target == modal)
    {
      modal.style.display = "none";
    }
  }
}

//add the song to the playlists
function addList(z,a)
{
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
  var title= songs_inside.getElementsByClassName('play')[z].textContent;
  var artist= songs_inside.getElementsByClassName('play1')[z].textContent;
  var title2= title.split(artist)[0];
  lengthOfSongs=window.MUSIC_DATA.songs.length;
  for(var b=0; b< lengthOfSongs; b++)
  {
 		if(MUSIC_DATA.songs[b].title==title2)
 		{
			var id = MUSIC_DATA.songs[b].id;
    }
  }
 window.MUSIC_DATA.playlists[a].songs.push(id);
}
