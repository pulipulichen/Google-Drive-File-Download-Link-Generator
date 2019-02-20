$(function () {

    var _generate_download_link = function () {
        var _link = $("#google_drive_share_link_20160926").val();
        var _type = "file";
        if (_link.startsWith("https://docs.google.com/document/d/") === true) {
            _type = "document";
        } else if (_link.startsWith("https://docs.google.com/spreadsheets/d/") === true) {
            _type = "spreadsheets";
        } else if (_link.startsWith("https://docs.google.com/presentation/d/") === true) {
            _type = "presentation";
        }

        var _output = $("#google_drive_download_link_20160926");

        // ----------------------------
        // 取得ID
        // ----------------------------


        // 先找到/d/的位置
        var _startPos = _link.indexOf("/d/");
        if (_startPos === -1) {
            _output.html("這不是Google雲端硬碟的分享網址，請重新檢查");
            return;
        } else {
            _startPos = _startPos + 3;
        }

        var _endPos = _link.indexOf("/", _startPos);

        var _id = _link.substr(_startPos, (_endPos - _startPos));

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
            if (_format === "Copy") {
                _msg = "建立副本";
            }
            else if (_format === "Present") {
                _msg = "簡報播放模式";
            }
            else if (_format === "Preview") {
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
  <a class="ui button" href="https://u.nu/api.php?action=shorturl&format=simple&url=` + encodeURIComponent( _link ) + `" target="_blank">
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
        };

        _output.empty();
        _output.append('<hr />')
        switch (_type) {
            case "document":
                _create_link("https://docs.google.com/document/d/" + _id + "/preview", "Preview", "play circle");
                _create_link("https://docs.google.com/document/d/" + _id + "/copy", "Copy", "copy");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=pdf", "PDF", "file pdf outline");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=doc", "Word", "file word outline");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=odt", "OpenDocument Text", "file alternate");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=rtf", "Rich Text Format", "file alternate");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=txt", "Text", "file alternate outline");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=html", "HTML", "html5");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=epub", "EPUB", "book");
                break;
            case "spreadsheets":
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/preview", "Preview", "play circle");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/copy", "Copy", "copy");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=pdf", "PDF", "file pdf outline");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=xlsx", "Excel", "file excel outline");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=ods", "OpenDocument Spreadsheet", "file alternate");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=csv", "CSV", "file alternate outline");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=csv", "TSV", "file alternate outline");
                break;
            case "presentation":
                _create_link("https://docs.google.com/presentation/d/" + _id + "/preview", "Preview", "play circle");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/present", "Present", "play circle");    
                _create_link("https://docs.google.com/presentation/d/" + _id + "/copy", "Copy", "copy");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/pdf", "PDF", "file pdf outline");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/pptx", "Power Point", "file powerpoint outline");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export/odp", "OpenDocument Presentation", "file alternate");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/txt", "Text", "file alternate outline");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/jpeg", "JPEG", "file image outline");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/png", "PNG", "file image outline");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/svg", "SVG", "file image outline");
                break;
            default:
                _create_link("https://drive.google.com/uc?export=download&id=" + _id, "原始", "file alternate outline");
        }
    };

    $("#google_drive_share_link_20160926").change(_generate_download_link);
    $("#google_drive_share_link_20160926").keyup(_generate_download_link);
    
  //$("#google_drive_share_link_20160926").val('https://docs.google.com/spreadsheets/d/1dOFyNqpjL5K7k-26K-C5wfArAruiYoXcyuXYCkTpbbc/edit?usp=sharing')
  //_generate_download_link();
    
    
});