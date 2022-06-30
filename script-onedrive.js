$(function () {

    var _generate_download_link = function () {
        var _link = $("#source").val();

        var _output = $("#output");

        // ----------------------------
        // 取得ID
        // ----------------------------
        var link_type = 'iframe'
        var _preview_link, _edit_link, _download_link

        if (_link.indexOf("https://onedrive.live.com/embed?cid=") > 0) {
          // 先找到/d/的位置
          var _startPos = _link.indexOf("https://onedrive.live.com/embed?cid=");
          if (_startPos === -1) {
              _output.html("This is not OneDrive embedded code.");
              return;
          }

          var _endPos = _link.indexOf('" width="', _startPos);

          _link = _link.slice(_startPos, _endPos)
          
          _preview_link = _link
          _edit_link = _link.replace('/embed?cid=', '/edit.aspx?cid=');
          _download_link = _link.replace('/embed?cid=', '/download?cid=');
        }
        else if (_link.indexOf('?width=') > 0 && _link.indexOf('&height=') > 0) {
          // https://4rk0pa.dm.files.1drv.com/y4ms_ADLxxqPWIyrS1kTKVHtprFyGBNqQ9jhAF2RGrvLYlAh82HgbGaPX5JURmk98GJFJo3MH07zy3X1e9Uuj3VkTrw1yWy9QNcV3OfCVAHsgKPYT6Tmb6fajHNrjrCLOEGG1nORMX2qIoRucgoX5O1N4QmlOdjKTUrqDuzyQx3kV_SrpRqOtmg_W757w0hR2jx?width=55&height=55&cropmode=none
          // 
          link_type = 'image'
        }
        else {
          _output.html("This is not OneDrive embedded code.");
          return;
        }
        //else {
        //  _link = _link.replace('https://onedrive.live.com/edit.aspx?cid=', 'https://onedrive.live.com/embed?cid=')
        //}
        
        //console.log(_link);
        //console.log(_type);
        //console.log(_id);

        var _create_link = function (_link, _format, _image) {
            if (_image !== undefined) {
                //_image = '<i class="fa ' + _image + '" aria-hidden="true"></i>';
                // <i class="external alternate icon"></i>
                _image = '<i class="' + _image + ' icon"></i>'
            }
            
            //var _msg = '下載' + _format + '格式';
            var _msg = _format;
            
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
    OPEN
  </a>
</div>
<input type="text" class="display-link" value="` + _link + `" onfocus="this.select()" />
</div>`)
          
          // <a class="ui button" href="https://u.nu/api.php?action=shorturl&format=simple&url=` + encodeURIComponent( _link ) + `" target="_blank">SHORTEN LINK</a>
           
            _output.append(_ele)
            
            _ele.find(".copy").click(function () {
                var _val = $(this).parents('.field:first').find('.main-link').attr('href');
                //console.log(_val);
                //PULI_UTIL.clipboard.copy(_val);
                ClipboardUtils.copyPlainString(_val)
            });
            
            let requestHeaders = {
              "Content-Type": "application/json",
              "apikey": "9b9210f35e9149a8ab698d3414824f8a",
              "workspace": "a558a5903496421999ab6005ca11f7d1"
            }
            
            /**
             * @author Pulipuli Chen 20220630-1020 
             * 因為rebrandly無法使用，我們要更換了
             */
            /*
            _ele.find('.shorten-url').click(function () {
              let $this = $(this)
              
              if ($this.hasClass('shortened')) {
                return false
              }
              //let linkRequest = 
              
              let linkRequest = {
                destination: $this.parents('.field:first').find('.main-link').attr('href'),
                domain: { fullName: "rebrand.ly" }
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
            */

            _ele.find('.shorten-url').click(async function (event) {
              let $this = $(this)
          
              if ($this.hasClass('shortened')) {
                return false
              }
          
              let linkRequest = $this.parents('.field:first').find('.main-link').attr('href')
              let shortUrl = await TinyURLAPI(linkRequest)
              $this.attr('target', '_blank')
                      .attr('href', shortUrl)
                      .find('span').text('SHORT LINK')
          
              ClipboardUtils.copyPlainString(shortUrl)
          
              $this.addClass('shortened')
              $this.parents(".link-row:first").find('input.display-link:first').val(shortUrl)

              event.preventDefault()
              event.stopPropagation()
            })
            
            
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
        
        if (link_type === 'iframe') {
          _create_link(_download_link, "Download", "file alternate outline")
          _create_link(_preview_link, "Preview", "eye")
          _create_link(_edit_link, "Edit", "edit outline")
        }
        else if (link_type === 'image') {
          _create_link(_link, "Download", "file alternate outline")
        }
    };

    //$("#source").change(_generate_download_link);
    $("#source").keyup(_generate_download_link);
    
  //$("#source").val(`<iframe src="https://onedrive.live.com/embed?cid=6BA2FBE8DE6717A9&resid=6BA2FBE8DE6717A9%214820&authkey=AE1IF5SimCEAofI&em=2" width="476" height="288" frameborder="0" scrolling="no"></iframe>`)
  //$("#source").val(`<iframe src="https://onedrive.live.com/embed?cid=6BA2FBE8DE6717A9&resid=6BA2FBE8DE6717A9%214766&authkey=AOG3xNHa_V53zNY&em=2" width="476" height="288" frameborder="0" scrolling="no"></iframe>`)
  //$('#source').val('https://onedrive.live.com/edit.aspx?cid=6ba2fbe8de6717a9&page=view&resid=6BA2FBE8DE6717A9!4816&parId=6BA2FBE8DE6717A9!4701&app=Word')
  //$('#source').val(`<iframe src="https://onedrive.live.com/embed?cid=6BA2FBE8DE6717A9&resid=6BA2FBE8DE6717A9%214868&authkey=AFCoXg0lFBkIE-g&em=2" width="476" height="288" frameborder="0" scrolling="no"></iframe>`)
  //_generate_download_link();
});