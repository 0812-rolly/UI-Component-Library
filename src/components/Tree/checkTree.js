let jsonObj = {
    "nodes": {
    "1": {
      "flag": false,
      "name": "Documents",
      "value": "Documents",
      "nodes": {
        "2":{
          "flag": false,
          "name": "Practice.docs",
          "value": "Practice.docs"
        },
        "3":{
          "flag": false,
          "name": "Tasks.txt",
          "value": "Tasks.txt"
        }
     }
    },
    "4":{
      "flag": false,
      "name": "Pictures",
      "value": "Pictures",
      "nodes": {
        "5":{
          "flag": false,
          "name": "My_photo.jpg",
          "value": "My_photo.jpg"
        },
        "6":{
          "flag": false,
          "name": "Cities",
          "value": "Cities",
          "nodes": {
            "7":{
                "flag": false,
                "name": "barcelona.png",
                "value": "barcelona.png"
              },
            "8":{
                "flag": false,
                "name": "italy.png",
                "value": "italy.png"
              }
          }
        }
      }
    },
    "9":{
        "flag": false,
        "name": "Movies",
        "value": "Movies",
        "nodes": {
          "10":{
            "flag": false,
            "name": "The Green Mile",
            "value": "The Green Mile"
          },
          "11":{
            "flag": false,
            "name": "Titanic",
            "value": "Titanic",
          }
        }
    }
    }
};

  var checkTree = {
      mounting: function(currentElement, nodes){
      var ul, li, checkbox, label, span;
      ul = document.createElement("ul");  
      for(let p in nodes){
        li = document.createElement("li");  
  
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = nodes[p]["flag"];
        checkbox.name = nodes[p]["value"];
        checkbox.id = checkbox.name;
        checkbox.setAttribute('id','scale');
        checkbox.addEventListener("click",function(){        
          //Найти ближайший li
          var li = this.parentNode;
          
          //Внутри li найти ul и его checkbox
          var ul = li.getElementsByTagName("ul")[0];
          var boxes = ul.getElementsByTagName("input");
          
          //Взависимости от его checked выставить им такой же
          for(let i = 0; i < boxes.length; i++){
            if( boxes[i]["type"] == "checkbox" )
               boxes[i]["checked"] = this.checked;
          }
          
        });
        
  
        
        li.appendChild(checkbox);
  
        label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.innerHTML = nodes[p]["name"];
  
        li.appendChild(label);
  
        if(nodes[p]["nodes"]){
          span = document.createElement("span");
          span.className = "checkTree-open";
          span.onclick = function(){
            let triangle = this.className.indexOf("checkTree-open")+1;   
            this.className = triangle ? "checkTree-close":"checkTree-open";
            let ul = this.parentNode.getElementsByTagName("ul")[0];
            ul.style.display = triangle ? "none" : "block";
          }
          li.insertBefore(span, li.firstChild);
          this.mounting(li ,nodes[p]["nodes"])
        }
        
        ul.appendChild(li);
      }
  
      currentElement.appendChild(ul);
      },
      init: function(id, jsonObj){
        var t = document.getElementById(id);
        this.mounting(t, jsonObj.nodes);    
      }
  };
  
  checkTree.init("checkTree",jsonObj);