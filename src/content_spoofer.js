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
    this.fullsize_i_path ="/P/";
    this.key = ".01._SX_SCRMZZZZZZZ_V";
    this.pathname = window.location.pathname;
    this.product_id = (this.pathname).substring(this.pathname.indexOf("product/") + 8).split("/")[0];
    this.title = document.title.split(":")[0]
  };

  description = function() {
    return getmeta("description").split(":")[0];
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
        get_html_fs_alt_pics = get_html_fs_alt_pics + get_html_fs_alt_pics(fullsize_url);
      }
    }

    return t_list;
  };

  //Parameters
  // * name: String - Mandatory (Name of the meta element)*
  //Returns value of meta
  getmeta = function(name) {
    var metas = document.getElementsByTagName("meta");

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === name) {
        return metas[i].getAttribute("content");
      }
    }
    return "";
  };

  //Parameters
  // * image_url: String - Mandatory *
  //Returns html of an alternavice picture
  get_html_fs_alt_pics = function(image_url) {
    html_t = "<hr><img src='" + image_url + "'>"
    return html_t;
  };

  //Returns the code of an html document with title, description, id and alternative fullsize pictures
  spoof_to_html = function() {
    content = new this;
    content.getthumbs;
    content_html = "<html><head><title>" + title + "</title></head><body><h1>" + + "</h1><br /><h2>" + + "</h2><br /><h3>" + + "</h3>" + get_html_fs_alt_pics + "</body>" + "</html>";
    return content_html;
  };
};

spoof.amazownca = new Amazonca;

