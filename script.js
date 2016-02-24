(function(){

  var styles = []

  function girlify(){
    var sheetList = Array.prototype.filter.call(document.styleSheets, function(s){
      return s.href && s.href.match(/github/);
    });

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
    var replacement1 = '#EE4266';

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
    var replacement2 = '#FFDBE1';

    var pattern3 = [
      /rgb\(245, 249, 252\)/g
    ];
    var replacement3 = 'rgba(255, 219, 225, 0.33)';

    var rules, line, result;

    for(s in sheetList){
      if( sheetList.hasOwnProperty(s) && s!='length' && s!='item' && sheetList[s]['href']
        && (sheetList[s]['href'].match(document.domain) || sheetList[s]['href'].match(document.domain.split('.')[0]) || sheetList[s]['href'].match(document.domain.split('.')[1]))) {
        rules = sheetList[s]['cssRules'];

        for(rule in rules){
          if(rules[rule]['cssText']) {

            line = rules[rule]['cssText'];

            result = line;

            for(var i=0; i<pattern1.length; i++)
              if(line.match(pattern1[i]))
                result = result.replace(pattern1[i], replacement1);

            for(i=0; i<pattern2.length; i++)
              if(line.match(pattern2[i]))
                result = result.replace(pattern2[i], replacement2);

            for(i=0; i<pattern3.length; i++)
              if(line.match(pattern3[i]))
                result = result.replace(pattern3[i], replacement3);

            styles.push(result);
          }
        }
      }
    }
  }

  function appendStyle(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) css.styleSheet.cssText = styles.join(' ');
    else css.appendChild(document.createTextNode(styles.join(' ')));

    document.getElementsByTagName("head")[0].appendChild(css);
  }

  window.onload = function() { girlify(); appendStyle(styles); };
}());