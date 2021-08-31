//Content spoofer. spoof.js
//-------------------------
//Supported Websites:
//*************************
// 1. Amazon Canada
///////////////////////////

var spoof = new Object;
window.spoof = spoof;

//Works on Amazon.ca if on a product view

let Amazonca = class {
  constructor() {
    //Properties
    this.alt_images = getthumbs;
    this.fullsize_i_path ="/P/";
    this.key = ".01._SX_SCRMZZZZZZZ_V";
    this.pathname = window.location.pathname;
    this.product_id = (pathname).substring(pathname.indexOf("product/") + 8).split("/")[0];
    this.title = document.title.split(":")[0]
    this.description = getMeta("description").split(":")[0]
    
    //Methods
    this.getthumbs = getthumbs;
  };

  //Returns an Array of Strings of URLs to fullsize images from alternative thumbs
  getthumbs = function() {
    var t_list = new Array();
    var t_container = document.getElementById("altImages").getElementsByClassName("a-button-text");

    for (let t_index = 0; t_index < t_container.length; t_index++) {
      images_list = t_container[t_index].getElementsByTagName("img")
      if (t_index >= 1 && images_list.length >= 1) {
        t_url = images_list[0].src.split("/");
        fullsize_url = t_url[0] + "//" + t_url[2] + "/" + t_url[3] + fullsize_i_path + product_id + key + t_url[5];
        t_list.push(fullsize_url);
      }
    }

    return t_list;
  };
}

spoof.amazonca = new Amazonca;
