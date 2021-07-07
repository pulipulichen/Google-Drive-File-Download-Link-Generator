
/* global ClipboardUtils */

// -----------

function _create_link(_link, _format, _image, _output) {
  if (_image !== undefined) {
    //_image = '<i class="fa ' + _image + '" aria-hidden="true"></i>';
    // <i class="external alternate icon"></i>
    _image = '<i class="' + _image + ' icon"></i>'
  }

  var _msg = '下載' + _format + '格式';
  if (_format === "Copy") {
    _msg = "建立副本";
  } else if (_format === "Present") {
    _msg = "簡報播放模式";
  } else if (_format === "Preview") {
    _msg = "預覽播放";
  }

  /*
   _output.append('<span>' 
   + '<a href="' + _link + '" target="_blank">' + _image + _msg +  '</a>' 
   + '<button type="button" class="ui button copy">COPY</button>'
   + '<a class="shorten-link" href="https://u.nu/?url=' + encodeURIComponent( _link ) + '" target="_blank"><button type="button" class="ui button shorten">SHORTEN</button></a>'
   + '</span>');
   _output.append('<input type="text" style="width: 100%;" value="' + _link + '" onfocus="this.select()" />');
   */
  var _ele = $(`
            <div class="field link-row">
            <label><a class="main-link" href="` + _link + `" target="_blank">` + _image + _msg + `</a></label>
<div class="three ui basic labeled icon  buttons">
  <a class="ui blue button copy">
    <i class="copy icon"></i>
    COPY LINK
  </a>
  <a class="ui button shorten-url">
    <i class="compress icon"></i>
    <span>BUILD SHORTEN LINK</span>
  </a>
  <a class="ui button" href="` + _link + `" target="_blank">
    <i class="external alternate icon"></i>
    OPEN ` + _format + `
  </a>
</div>
<input type="text" class="display-link" value="` + _link + `" onfocus="this.select()" />
</div>`)

  // <a class="ui button" href="https://u.nu/api.php?action=shorturl&format=simple&url=` + encodeURIComponent( _link ) + `" target="_blank">SHORTEN LINK</a>

  _output.append(_ele)


  let requestHeaders = {
    "Content-Type": "application/json",
    "apikey": "9b9210f35e9149a8ab698d3414824f8a",
    "workspace": "a558a5903496421999ab6005ca11f7d1"
  }


  _ele.find('.shorten-url').click(function () {
    let $this = $(this)

    if ($this.hasClass('shortened')) {
      return false
    }
    //let linkRequest = 

    let linkRequest = {
      destination: $this.parents('.field:first').find('.main-link').attr('href'),
      domain: {fullName: "rebrand.ly"}
      //, slashtag: "A_NEW_SLASHTAG"
      //, title: "Rebrandly YouTube channel"
    }


    $.ajax({
      url: "https://api.rebrandly.com/v1/links",
      type: "post",
      data: JSON.stringify(linkRequest),
      headers: requestHeaders,
      dataType: "json",
      success: (link) => {
        //console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);

        $this.attr('target', '_blank')
                .attr('href', 'https://' + link.shortUrl)
                .find('span').text('SHORT LINK')

        ClipboardUtils.copyPlainString('https://' + link.shortUrl)

        $this.addClass('shortened')
      }
    });
  })

  _ele.find(".copy").click(function () {
    var _val = $(this).parents('.field:first').find('.main-link').attr('href');
    //console.log(_val);
    //PULI_UTIL.clipboard.copy(_val);
    ClipboardUtils.copyPlainString(_val)
  });

  /*
   _ele.find(".shorten").click(function () {
   var _link_row = $(this).parents('.field:first')
   var _val = _link_row.find('.main-link').attr('href');
   var _display_shorten_link = _link_row.find('.display-link-shorten-link')
   var _url = 'https://u.nu/api.php?action=shorturl&format=simple&url=' + encodeURIComponent( _link )
   
   $.get(_url, function (_short_url) {
   _display_shorten_link.val(_short_url)
   _link_row.addClass('show-shorten-link')
   })
   //_display_shorten_link.val(_url)
   //_link_row.addClass('show-shorten-link')
   
   //console.log(_val);
   //PULI_UTIL.clipboard.copy(_val);
   });
   */
}


// -----------