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
                _image = '<i class="fa ' + _image + '" aria-hidden="true"></i>';
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
            
            _output.append('<span>' 
                    + '<a href="' + _link + '" target="_blank">' + _image + _msg +  '</a>' 
                    + '<button type="button" class="ui button copy">COPY</button>'
                    + '<a class="shorten-link" href="https://u.nu/?url=' + encodeURIComponent( _link ) + '" target="_blank"><button type="button" class="ui button shorten">SHORTEN</button></a>'
                    + '</span>');
            _output.append('<input type="text" style="width: 100%;" value="' + _link + '" onfocus="this.select()" />');
            
            _output.find("button.copy").click(function () {
                var _val = $(this).parent().next().val().trim();
                //console.log(_val);
                PULI_UTIL.clipboard.copy(_val);
            });
            
            _output.find("button.shorten").click(function () {
                var _val = $(this).parent().next().val().trim();
                //console.log(_val);
                //PULI_UTIL.clipboard.copy(_val);
            });
        };

        _output.empty();
        _output.append('<hr />')
        switch (_type) {
            case "document":
                _create_link("https://docs.google.com/document/d/" + _id + "/preview", "Preview", " fa-play-circle");
                _create_link("https://docs.google.com/document/d/" + _id + "/copy", "Copy", "fa-clone");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=pdf", "PDF", "fa-file-pdf-o");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=doc", "Word", "fa-file-word-o");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=odt", "OpenDocument Text", "fa-file-text-o");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=rtf", "Rich Text Format", "fa-file-text-o");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=txt", "Text", "fa-file-text-o");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=html", "HTML", "fa-html5");
                _create_link("https://docs.google.com/document/d/" + _id + "/export?format=epub", "EPUB", "fa-book");
                break;
            case "spreadsheets":
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/preview", "Preview", " fa-play-circle");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/copy", "Copy", "fa-clone");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=pdf", "PDF", "fa-file-pdf-o");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=xlsx", "Excel", "fa-file-excel-o");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=ods", "OpenDocument Spreadsheet", "fa-file-o");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=csv", "CSV", "fa-file-text-o");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=csv", "TSV", "fa-file-text-o");
                break;
            case "presentation":
                _create_link("https://docs.google.com/presentation/d/" + _id + "/preview", "Preview", " fa-play-circle");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/copy", "Copy", "fa-clone");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/present", "Present", "fa-play-circle-o");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/pdf", "PDF", "fa-file-pdf-o");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/pptx", "Power Point", "fa-file-powerpoint-o");
                _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export/odp", "OpenDocument Presentation", "fa-file-o");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/txt", "Text", "fa-file-text-o");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/jpeg", "JPEG", "fa-picture-o");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/png", "PNG", "fa-picture-o");
                _create_link("https://docs.google.com/presentation/d/" + _id + "/export/svg", "SVG", "fa-picture-o");
                break;
            default:
                _create_link("https://drive.google.com/uc?export=download&id=" + _id, "原始", "fa-file-o");
        }
    };

    $("#google_drive_share_link_20160926").change(_generate_download_link);
    $("#google_drive_share_link_20160926").keyup(_generate_download_link);
    
  $("#google_drive_share_link_20160926").val('https://docs.google.com/spreadsheets/d/1dOFyNqpjL5K7k-26K-C5wfArAruiYoXcyuXYCkTpbbc/edit?usp=sharing')
  _generate_download_link();
    
    
});