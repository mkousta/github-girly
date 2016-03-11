(function(){

  function getColorPalette(){
    var pattern1 = [
      /rgb\(64, 120, 192\)/g,
      /#4078c0/g,
      /#336479/g,
      /rgb\(51, 100, 121\)/g,
      /rgb\(34, 68, 102\)/g,
      /#51a7e8/g,
      /rgb\(81, 167, 232\)/g,
      /rgba\(81, 167, 232, 0\.5\)/g
    ];

    var pattern2 = [
      /#e6f1f6/g,
      /rgb\(230, 241, 246\)/g,
      /#e8f0f8/g,
      /rgb\(232, 240, 248\)/g,
      /#e8f1f6/g,
      /rgb\(232, 241, 246\)/g,
      /#7aa1d3/g,
      /rgb\(122, 161, 211\)/g,
      /#c1dce9/g,
      /rgb\(193, 220, 233\)/g,
      /#bac6d3/g,
      /rgb\(186, 198, 211\)/g,
      /#c5d5dd/g,
      /rgb\(197, 213, 221\)/g,
      /#d1e2eb/g,
      /rgb\(209, 226, 235\)/g,
      /#cedee5/g,
      /rgb\(206, 222, 229\)/g,
      /rgb\(83, 134, 198\)/g,
      /rgb\(225, 234, 245\)/g,
      /rgb\(128, 166, 205\)/g,
      /#e2eef9/g,
      /rgb\(226, 238, 249\)/g,
      /rgb\(201, 230, 242\)/g,
      /rgb\(242, 249, 252\)/g,
      /rgba\(209, 227, 237, 0.498039\)/g
    ];

    var pattern3 = [
      /rgb\(245, 249, 252\)/g
    ];

    return [
      { patterns: pattern1, replacement: '#ee4266' },
      { patterns: pattern2, replacement: '#ffdbe1' },
      { patterns: pattern3, replacement: 'rgba(255, 219, 225, 0.33)' }
    ];
  }

  function girlify(palette){
    var styles = [];
    var rules, result;
    var sheetList = getDomainStyleSheets(/github/);

    var paletteLength = palette.length;

    for(var s in sheetList){
      if(sheetList.hasOwnProperty(s)) {
        rules = sheetList[s].cssRules;

        for(var rule in rules){
          if(rules[rule].cssText) {
            result = rules[rule].cssText;

            for(var i = 0; i < paletteLength; i++)
              result = replaceColors(result, palette[i].patterns, palette[i].replacement);

            styles.push(result);
          }
        }
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

  window.onload = function(){
    var palette = getColorPalette();
    var styles = girlify(palette);
    appendStyle(styles);
  };

}());
