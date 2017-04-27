(function(){
  window.Application || (window.Application = {});

  Application.AutoCompletable = function(element){
    var ref = uuid.v4();

    var build = function() {
      var container = document.createElement("div");
      container.setAttribute("data-ref", ref);
      container.className = "autocompletable-container";
      container.style.visibility = "hidden";

      var list = document.createElement("div");
      list.className = "autocompletable-list";

      for(var si = 0; si < 10; si++) {
        var suggestion = document.createElement("a");
        suggestion.className = "autocompletable-suggestion";
        suggestion.innerText = "Suggestion " + si;
        list.appendChild(suggestion);
      }

      container.appendChild(list);
      document.body.appendChild(container);
    }

    var getOffset = function(elem) {
      var _x = 0;
      var _y = 0;
      var e = elem;

      while(e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
        _x += e.offsetLeft - e.scrollLeft;
        _y += e.offsetTop - e.scrollTop;
        e = e.offsetParent;
      }

      return {
        top: _y,
        left: _x,
        height: elem.offsetHeight,
        width: elem.offsetWidth
      };
    }

    var show = function() {
      var offset = getOffset(element);
      var container = document.querySelector("[data-ref='" + ref + "']");
      var list = container.firstElementChild;
      var suggestion = list.firstElementChild;
      var listHeight = 0;

      if (suggestion) {
        listHeight = list.children.length * suggestion.offsetHeight;

        container.style.position = "absolute";
        container.style.top = (offset.top + offset.height) + "px";
        container.style.left = offset.left + "px";

        list.style.width = offset.width + "px";
        list.style.height = Math.min(listHeight, 200) + "px";

        container.style.visibility = "visible";
      }
    }

    var hide = function() {
      container = document.querySelector("[data-ref='" + ref + "']");
      container.style.visibility = "hidden";
    }

    build();

    element.setAttribute("data-completable-ref", ref);
    element.addEventListener("input", function() {
      if (this.value.length % 2 === 0) {
        show();
      } else {
        hide();
      }
    });
  };
}());
