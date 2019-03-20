# NotyBar

### Installation  
1.  Add the notybar.css file to the head of your html.
2.  Add the notybar.jquery.js file before closing body tag.
3.  Add this code after the notybar.jquery.js script tag to initialize the plugin.

    	var  op = {
       		blur:  true,
        	logs:  true,
          overlay:  false
        };
        var  notyBar = new  $.NotyBar($(".mycta"), op);
        notyBar.InitEvents();





## Demo Screenshots
![enter image description here](https://github.com/oluwaseye/NotyBar/blob/master/screenshot.JPG?raw=true)

# Contribute
If you think you know something i dont, please tell me i'd appreciate any help/feed back.

# License (MIT)
You are free to use and/or modify the content of this library for personal or commercial use and free of charge. However it comes with absolutly no warranty.
