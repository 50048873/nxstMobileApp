(function(doc, win) {
    var isPC = function() {
        if("ontouchend" in document && window.innerWidth < 768) return false;
        var ua = navigator.userAgent.toLowerCase();
        var agents = ["android", "iphone",
            "symbianos", "windows phone",
            "ipad", "ipod"];
        var flag = true;
        for (var v in agents) {
            if (ua.indexOf(agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    win.isPC = isPC() ? true : false;
    doc.documentElement.className = win.isPC ? 'pc' : 'mobile';
})(document, window);