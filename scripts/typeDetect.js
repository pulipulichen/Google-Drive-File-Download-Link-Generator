function typeDetect(_link) {
  var type = "file";
  var edit = true
  
  if (_link.startsWith("https://docs.google.com/document/d/") === true) {
    type = "document";
    if (_link.endsWith('/preview')
            || _link.endsWith('/copy')
            || _link.endsWith('/export?format=pdf')
            || _link.endsWith('/export?format=doc')
            || _link.endsWith('/export?format=odt')
            || _link.endsWith('/export?format=rtf')
            || _link.endsWith('/export?format=txt')
            || _link.endsWith('/export?format=html')
            || _link.endsWith('/export?format=epub')
            || _link.endsWith('&sz=w1600-h1600')) {
      edit = false
    }
  } else if (_link.startsWith("https://docs.google.com/spreadsheets/d/") === true) {
    type = "spreadsheets";
    if (_link.endsWith('/preview')
            || _link.endsWith('/copy')
            || _link.endsWith('/export?format=pdf')
            || _link.endsWith('/export?format=xlsx')
            || _link.endsWith('/export?format=ods')
            || _link.endsWith('/export?format=csv')
            || _link.endsWith('/export?format=tsv')
            || _link.endsWith('&sz=w1600-h1600')) {
      edit = false
    }
  } else if (_link.startsWith("https://docs.google.com/presentation/d/") === true) {
    type = "presentation";
    if (_link.endsWith('/preview')
            || _link.endsWith('/copy')
            || _link.endsWith('/present')
            || _link.endsWith('/export/pdf')
            || _link.endsWith('/export/pptx')
            || _link.endsWith('/export/odp')
            || _link.endsWith('/export/txt')
            || _link.endsWith('/export/jpeg')
            || _link.endsWith('/export/png')
            || _link.endsWith('/export/svg')
            || _link.endsWith('&sz=w1600-h1600')) {
      edit = false
    }
  }
  else if (_link.startsWith('https://drive.google.com/uc?export=download&id=')) {
    edit = false
  }
  else if (_link.startsWith('https://drive.google.com/thumbnail?id=')) {
    if (_link.endsWith('&sz=w1600-h1600')) {
      edit = false
    }
  }
  
  return {
    type,
    edit
  }
}