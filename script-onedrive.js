$(function () {

    var _generate_download_link = function () {
        var _link = $("#source").val();

        var _output = $("#output");

        // ----------------------------
        // 取得ID
        // ----------------------------


        // 先找到/d/的位置
        var _startPos = _link.indexOf("https://onedrive.live.com/embed?cid=");
        if (_startPos === -1) {
            _output.html("This is not OneDrive embedded code.");
            return;
        }

        var _endPos = _link.indexOf('" width="', _startPos);

        _link = _link.slice(_startPos, _endPos).replace('/embed?cid=', '/download?cid=');

        //console.log(_link);
        //console.log(_type);
        //console.log(_id);

        var _create_link = function (_link, _format, _image) {
            if (_image !== undefined) {
                //_image = '<i class="fa ' + _image + '" aria-hidden="true"></i>';
                // <i class="external alternate icon"></i>
                _image = '<i class="' + _image + ' icon"></i>'
            }
            
            var _msg = '下載' + _format + '格式';
            
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
  <a class="ui button" href="http://tinyurl.com/create.php?url=` + encodeURIComponent( _link ) + `" target="_blank">
    <i class="compress icon"></i>
    SHORTEN LINK
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
            
            _ele.find(".copy").click(function () {
                var _val = $(this).parents('.field:first').find('.main-link').attr('href');
                console.log(_val);
                PULI_UTIL.clipboard.copy(_val);
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
        };  // _create_link()

        _output.empty();
        _output.append('<hr />')
        _create_link(_link, "File Download Link", "file alternate outline")
    };

    $("#source").change(_generate_download_link);
    $("#source").keyup(_generate_download_link);
    
  $("#source").val(`<iframe src="https://onedrive.live.com/embed?cid=6BA2FBE8DE6717A9&resid=6BA2FBE8DE6717A9%214820&authkey=AE1IF5SimCEAofI&em=2" width="476" height="288" frameborder="0" scrolling="no"></iframe>`)
  _generate_download_link();
    
    
});