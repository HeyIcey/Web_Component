/*柱图表组件对象*/
var H5ComponentBar_v = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    $.each(cfg.data,function(idx,item){
        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">');
        var height = item[1]*100+'%';
        // var width = item[1]*100+'%';
        console.log(height)
        var bgStyle = '';
        if(item[2]){
            bgStyle = 'style="background-color:'+item[2]+'"';
        }
        rate.html('<div class="bg" '+bgStyle+'></div>');
        // rate.css('width',width);
        rate.css('height',height);
        name.text(item[0]);
        per.text(height);
        line.append(name).append(rate).append(per);
        component.append(line);
    })
    return component;
}
