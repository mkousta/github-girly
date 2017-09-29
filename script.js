(function(){

  function getColorPalette(){
    var pattern1 = [
      'rgb(64, 120, 192)',
      'rgb(51, 100, 121)',
      'rgb(34, 68, 102)',
      'rgb(81, 167, 232)',
      'rgba(81, 167, 232, 0.5)',
      'rgb(89, 138, 159)',
      'rgb(3, 102, 214)',
      'rgb(0, 110, 237)',
      'rgb(39, 68, 102)',
      'rgba(3, 47, 98, 0.498039)',
      'rgba(3, 47, 98, 0.54902)',
      'rgb(4, 66, 137)',
      'rgb(33, 136, 255)',
      'rgb(119, 182, 255)',
      'rgba(119, 182, 255, 0.701961)',
      'rgb(74, 144, 217)',
      'rgb(74, 158, 255)',
      'rgb(3, 114, 239)',
      'rgb(0, 92, 197)'
    ];

    var pattern2 = [
      'rgb(230, 241, 246)',
      'rgb(232, 240, 248)',
      'rgb(232, 241, 246)',
      'rgb(122, 161, 211)',
      'rgb(193, 220, 233)',
      'rgb(186, 198, 211)',
      'rgb(197, 213, 221)',
      'rgb(209, 226, 235)',
      'rgb(206, 222, 229)',
      'rgb(83, 134, 198)',
      'rgb(225, 234, 245)',
      'rgb(128, 166, 205)',
      'rgb(226, 238, 249)',
      'rgb(201, 230, 242)',
      'rgb(242, 249, 252)',
      'rgba(209, 227, 237, 0.498039)',
      'rgba(81, 167, 232, 0.498039)',
      'rgb(84, 163, 255)',
      'rgb(234, 245, 255)',
      'rgb(239, 247, 255)',
      'rgb(241, 248, 255)',
      'rgb(200, 225, 255)',
      'rgba(3, 47, 98, 0.5)',
      'rgba(3, 47, 98, 0.55)',
      'rgb(219, 237, 255)'
    ];

    var pattern3 = [
      'rgb(245, 249, 252)',
      'rgb(246, 251, 255)',
      'rgba(3, 102, 214, 0.298039)',
      'rgba(3, 102, 214, 0.3)'
    ];

    return [
      { patterns: pattern1.map(convertToRegExp), replacement: '#ee4266' },
      { patterns: pattern2.map(convertToRegExp), replacement: '#ffdbe1' },
      { patterns: pattern3.map(convertToRegExp), replacement: 'rgba(255, 219, 225, 0.33)' }
    ];
  }

  function convertToRegExp(colorString) {
    if(colorString[0]==='r'){
      colorString = colorString.replace(/\(/, '\\(');
      colorString = colorString.replace(/\)/, '\\)');
      colorString = colorString.replace(/\./, '\\.');
    }
    return new RegExp(colorString, 'g');
  }

  function girlify(palette, styleSheet){
    var styles = [];
    var rules, result;

    var paletteLength = palette.length;

    rules = styleSheet.cssRules;

    for(var rule in rules){
      if(rules[rule].cssText) {
        result = rules[rule].cssText;

        for(var i = 0; i < paletteLength; i++)
          result = replaceColors(result, palette[i].patterns, palette[i].replacement);

        styles.push(result);
      }
    }
    return styles;
  }

  function replaceColors(text, patternsList, replacement){
    var result = text;
    var size = patternsList.length;

    for(var i = 0; i < size; i++){
      if(result.match(patternsList[i]))
        result = result.replace(patternsList[i], replacement);
    }
    return result;
  }

  function getDomainStyleSheets(regexp){
    return Array.prototype.filter.call(document.styleSheets,
      function(s){ return s.href && s.href.match(regexp); }
    );
  }

  function appendStyle(styles){
    var css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(styles.join(' ')));

    document.getElementsByTagName('head')[0].appendChild(css);
  }


  var palette = getColorPalette();

  window.onload = function(){
    var styles = [];
    var sheetList = getDomainStyleSheets(/github/);

    for(var sheet in sheetList){
      if(sheetList.hasOwnProperty(sheet)) {
        styles = styles.concat(girlify(palette, sheetList[sheet]));
      }
    }
    appendStyle(styles);
  };

}());
