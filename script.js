/* global PULI_UTIL, ClipboardUtils */

var _generate_download_link = function () {
  var _link = $("#google_drive_share_link_20160926").val();
  var _type = "file";

  let {type, edit} = typeDetect(_link)
  _type = type

  var _output = $("#google_drive_download_link_20160926");
  //console.log(_type, edit)
  if (edit === false) {
    _output.empty();
    _output.append('<hr />')
    return createEditLink(_link, _type, _output)
  }

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

  
  _output.empty();
  _output.append('<hr />')
  switch (_type) {
    case "document":
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=odt", "OpenDocument Text", "file alternate", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=pdf", "PDF", "file pdf outline", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/preview", "Preview", "play circle", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/copy", "Copy", "copy", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=doc", "Word", "file word outline", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=rtf", "Rich Text Format", "file alternate", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=txt", "Text", "file alternate outline", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=html", "HTML", "html5", _output);
      _create_link("https://docs.google.com/document/d/" + _id + "/export?format=epub", "EPUB", "book", _output);
      _create_link("https://drive.google.com/thumbnail?id=" + _id + '&sz=w1600-h1600', "預覽", "image", _output);
      break;
    case "spreadsheets":
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=ods", "OpenDocument Spreadsheet", "file alternate", _output);
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/preview", "Preview", "play circle", _output);
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/copy", "Copy", "copy", _output);
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=pdf", "PDF", "file pdf outline", _output);
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=xlsx", "Excel", "file excel outline", _output);
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=csv", "CSV", "file alternate outline", _output);
      _create_link("https://docs.google.com/spreadsheets/d/" + _id + "/export?format=tsv", "TSV", "file alternate outline", _output);
      _create_link("https://drive.google.com/thumbnail?id=" + _id + '&sz=w1600-h1600', "預覽", "image");
      break;
    case "presentation":
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/pdf", "PDF", "file pdf outline", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/pptx", "Power Point", "file powerpoint outline", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/preview", "Preview", "play circle", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/present", "Present", "play circle", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/copy", "Copy", "copy", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/odp", "OpenDocument Presentation", "file alternate", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/txt", "Text", "file alternate outline", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/jpeg", "JPEG", "file image outline", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/png", "PNG", "file image outline", _output);
      _create_link("https://docs.google.com/presentation/d/" + _id + "/export/svg", "SVG", "file image outline", _output);
      _create_link("https://drive.google.com/thumbnail?id=" + _id + '&sz=w1600-h1600', "預覽", "image", _output);
      break;
    default:
      _create_link("https://drive.google.com/uc?export=download&id=" + _id, "原始", "file alternate outline", _output);
      _create_link("https://drive.google.com/thumbnail?id=" + _id + '&sz=w1600-h1600', "預覽", "image", _output);
  }

  // console.trace('產生完了')
};



//$("#google_drive_share_link_20160926").val('https://docs.google.com/spreadsheets/d/1dOFyNqpjL5K7k-26K-C5wfArAruiYoXcyuXYCkTpbbc/edit?usp=sharing')
//_generate_download_link();

let init = () => {
  $(() => {
    //$("#google_drive_share_link_20160926").change(_generate_download_link);
    $("#google_drive_share_link_20160926").keyup(_generate_download_link);
  })
}

init()