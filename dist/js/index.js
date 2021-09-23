
const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'OK',
            cancelText: 'Cancel',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content"><i class="fas fa-exclamation-triangle"></i>  ${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;


        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#btnConfDialog').addEventListener('click', () => {
    Confirm.open({
      title: 'Rectalgle background color change',
      message: 'Are you sure you want to do this?',
      onok: () => {
        // Enter your code
      }
    })
  })
})

const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
//добавить проверку на существование такого класса
const input = document.querySelector(".tel");

const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

input.addEventListener("input", (e) => {
  const value = input.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (input.value.includes("+8") || input.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }

  input.value = result;
})
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
function imageUpload(){
    function Init() {
  
      console.log("Upload Initialised");
  
      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag'),
          submitButton  = document.getElementById('submit-button');
  
      fileSelect.addEventListener('change', fileSelectHandler, false);
  
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {

        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
      }
    }
  
    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
  
      e.stopPropagation();
      e.preventDefault();
  
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }
  
    function fileSelectHandler(e) {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;
  
      // Cancel event and hover styling
      fileDragHover(e);
  
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
        uploadFile(f);
      }
    }
  
    function output(msg) {
      var m = document.getElementById('messages');
      m.innerHTML = msg;
      var uploaded = document.getElementById('uploaded');
      uploaded.innerHTML = "<span class='fade-in-bottom'>✔ File selected</span>";
    }
  
    function parseFile(file) {
  
      console.log(file.name);
      output(
        '<strong>' + encodeURI(file.name) + '</strong>'
      );
      
      var imageName = file.name;
  
      var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");

        document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
      }
      else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById("file-upload-form").reset();
      }
    }
  
    function uploadFile(file) {
  
      var xhr = new XMLHttpRequest(),
        fileInput = document.getElementById('class-roster-file'),
        fileSizeLimit = 1024; // In MB
      if (xhr.upload) {

        if (file.size <= fileSizeLimit * 1024 * 1024) {
  
          // Start upload
          xhr.open('POST', document.getElementById('file-upload-form').action, true);
          xhr.setRequestHeader('X-File-Name', file.name);
          xhr.setRequestHeader('X-File-Size', file.size);
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          xhr.send(file);
        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
        }
      }
    }
  
    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
imageUpload();
  
  document.querySelector('#file-upload-form')
      .addEventListener('submit', event => {
          event.preventDefault();  
            // your logic
          document.location.reload();
  })
// Получаем dropdowns
const dropdowns = document.querySelectorAll('[data-dropdown]');

// Проверяем существует ли dropdowns на странице
if(dropdowns.length > 0) {
	// Создаем кастомный dropdown для каждого элемента выбора
	dropdowns.forEach(dropdown => {
	  createCustomDropdown(dropdown);
	});
  }

  // Функия создания кастомного dropdown
function createCustomDropdown(dropdown) {
	// Получаем все опции и создаем из них массив
	const options = dropdown.querySelectorAll('option');
	const optionsArr = Array.prototype.slice.call(options);

	// Создаем dropdown и добавляем к нему раскрывающийся список опций
	// Вставляем его в DOM после поля выбора
	const customDropdown = document.createElement('div');
	customDropdown.classList.add('dropdown');
	dropdown.insertAdjacentElement('afterend', customDropdown);

	// Создаем переменную для выбранной опции
	// Добавляем к нему класс, текст в поле выбора и раскрывающийся список
	const selected = document.createElement('div');
	selected.classList.add('dropdown__selected');
	selected.textContent = optionsArr[0].textContent;
	customDropdown.appendChild(selected);

	// Создаем переменную для dropdown, добавляем к нему класс и добавляем его в кастомный dropdown
	// Добавить событие щелчка к выбранному элементу для переключения dropdown
	const menu = document.createElement('div');
	menu.classList.add('dropdown__menu');
	customDropdown.appendChild(menu);
	selected.addEventListener('click', toggleDropdown.bind(menu));

	// Создаем переменную для поля поиска
	// Добавляем класс, тип и плейсхолдер и затем добавляем его в элемент меню.
	const search = document.createElement('input');
	search.placeholder = 'Search...';
	search.type = 'text';
	search.classList.add('dropdown__menu_search');
	menu.appendChild(search);

	// Создаем оболочку для пунктов меню, добавляем к ней класс и добавляем к элементу меню
	const menuItemsWrapper = document.createElement('div');
	menuItemsWrapper.classList.add('dropdown__menu_items');
	menu.appendChild(menuItemsWrapper);

	// Перебираем все опции и создаем кастомную опцию для каждой, добавляем ее к оболочке
    // Добавляем событие клика для каждую кастомную опцию, чтобы установить ее как выбранную
    optionsArr.forEach(option => {
		const item = document.createElement('div');
		item.classList.add('dropdown__menu_item');
		item.dataset.value = option.value;
		item.textContent = option.textContent;
		menuItemsWrapper.appendChild(item);
    item.addEventListener('click', setSelected.bind(item, selected, dropdown, menu));
  });

    // Добавить класс selected в первую кастомную опцию
	menuItemsWrapper.querySelector('div').classList.add('selected');

	// Добавить событие ввода для поиска и фильтрации элементов
	// Добавить событие клика к элементу документа, чтобы закрыть кастомный dropdown, если щелкнуть за его пределами
	// Скрываем исходный dropdown
	search.addEventListener('input', filterItems.bind(search, optionsArr, menu));
	document.addEventListener('click', closeIfClickedOutside.bind(customDropdown, menu));
	dropdown.style.display = 'none';

	// Переключение dropdown
	function toggleDropdown() {
	// Проверяем, открыт ли dropdown, и если он закрыт, открываем его и ставим фокус на поиск
		if(this.offsetParent !== null) {
		this.style.display = 'none';
		selected.classList.remove("active");
		} else {
		this.style.display = 'block';
		this.querySelector('input').focus();
		selected.classList.add('active');
	}
  }

  // Устанавливаем выбранную опцию
	function setSelected(selected, dropdown, menu) {
	// Получаем значение и лейбл из выбранной кастомной опции
	const value = this.dataset.value;
	const label = this.textContent;
  
	// Изменяем текст и значение на поле выбора
	selected.textContent = label;
	dropdown.value = value;
  
	// Закрываем меню
	// Сбрасываем значение поиска
	// Удаляем класс selected из ранее выбранной опции и показываем все div if они были отфильтрованы
	// Устанавливаем класс selected на выбранную опцию
	menu.style.display = 'none';
	menu.querySelector('input').value = '';
	menu.querySelectorAll('div').forEach(div => {
	  if(div.classList.contains('selected')) {
		div.classList.remove('selected');
	  }
	  if(div.offsetParent === null) {
		div.style.display = 'block';
	  }
	});
	this.classList.add('selected');
  }

// Фильтрация элементов
function filterItems(itemsArr, menu) {
	// Получаем все кастомные опции
	// Получить значение ввода и преобразовать его в нжний регистр
	// Получить отфильтрованные опции
	// Получить индексы отфильтрованных опций
	const customOptions = menu.querySelectorAll('.dropdown__menu_items div');
	const value = this.value.toLowerCase();
	const filteredItems = itemsArr.filter(item => item.value.toLowerCase().includes(value));
	const indexesArr = filteredItems.map(item => itemsArr.indexOf(item));
  
	// Проверяем, не находится ли опция внутри массива индексов, если да, скрываем ее, а если она внутри массива индексов и скрыта, показываем
	itemsArr.forEach(option => {
	  if(!indexesArr.includes(itemsArr.indexOf(option))) {
		customOptions[itemsArr.indexOf(option)].style.display = 'none';
	  }else {
		if(customOptions[itemsArr.indexOf(option)].offsetParent === null) {
		  customOptions[itemsArr.indexOf(option)].style.display = 'block';
		}
	  }
	});
  }

  // Закрываем dropdown если кликаем а его пределами
	function closeIfClickedOutside(menu, e) {
		if(e.target.closest('.dropdown') === null && e.target !== this && menu.offsetParent !== null) {
		menu.style.display = 'none';
		}
  }
}

// Initialize function, create initial tokens with itens that are already selected by the user
function init(element) {
    // Create div that wroaps all the elements inside (select, elements selected, search div) to put select inside
    const wrapper = document.createElement("div");
    wrapper.addEventListener("click", clickOnWrapper);
    wrapper.classList.add("multi-select");

    // Create elements of search
    const search_div = document.createElement("div");
    search_div.classList.add("search-container");
    const input = document.createElement("input");
    input.classList.add("selected-input");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("tabindex", "0");
    input.addEventListener("keyup", inputChange);
    input.addEventListener("keydown", deletePressed);
    input.addEventListener("click", openOptions);

    const dropdown_icon = document.createElement("a");
    dropdown_icon.setAttribute("href", "#");
    dropdown_icon.setAttribute("onClick", "return false");
    dropdown_icon.classList.add("dropdown-icon");

    dropdown_icon.addEventListener("click", clickDropdown);
    const autocomplete_list = document.createElement("ul");
    autocomplete_list.classList.add("autocomplete-list")
    search_div.appendChild(input);
    search_div.appendChild(autocomplete_list);
    search_div.appendChild(dropdown_icon);

    // set the wrapper as child (instead of the element)
    element.parentNode.replaceChild(wrapper, element);
    // set element as child of wrapper
    wrapper.appendChild(element);
    wrapper.appendChild(search_div);

    createInitialTokens(element);
    addPlaceholder(wrapper);
}

function removePlaceholder(wrapper) {
    const input_search = wrapper.querySelector(".selected-input");
    input_search.removeAttribute("placeholder");
}

function addPlaceholder(wrapper) {
    const input_search = wrapper.querySelector(".selected-input");
    const tokens = wrapper.querySelectorAll(".selected-wrapper");
    if (!tokens.length && !(document.activeElement === input_search))
        input_search.setAttribute("placeholder", "Select language");
}

// Function that create the initial set of tokens with the options selected by the users
function createInitialTokens(select) {
    let {
        options_selected
    } = getOptions(select);
    const wrapper = select.parentNode;
    for (let i = 0; i < options_selected.length; i++) {
        createToken(wrapper, options_selected[i]);
    }
}


// Listener of user search
function inputChange(e) {
    const wrapper = e.target.parentNode.parentNode;
    const select = wrapper.querySelector("select");
    const dropdown = wrapper.querySelector(".dropdown-icon");

    const input_val = e.target.value;

    if (input_val) {
        dropdown.classList.add("active");
        populateAutocompleteList(select, input_val.trim());
    } else {
        dropdown.classList.remove("active");
        const event = new Event('click');
        dropdown.dispatchEvent(event);
    }
}


// Listen for clicks on the wrapper, if click happens focus on the input
function clickOnWrapper(e) {
    const wrapper = e.target;
    if (wrapper.tagName == "DIV") {
        const input_search = wrapper.querySelector(".selected-input");
        const dropdown = wrapper.querySelector(".dropdown-icon");
        if (!dropdown.classList.contains("active")) {
            const event = new Event('click');
            dropdown.dispatchEvent(event);
        }
        input_search.focus();
        removePlaceholder(wrapper);
    }

}

function openOptions(e) {
    const input_search = e.target;
    const wrapper = input_search.parentElement.parentElement;
    const dropdown = wrapper.querySelector(".dropdown-icon");
    if (!dropdown.classList.contains("active")) {
        const event = new Event('click');
        dropdown.dispatchEvent(event);
    }
    e.stopPropagation();

}

// Function that create a token inside of a wrapper with the given value
function createToken(wrapper, value) {
    const search = wrapper.querySelector(".search-container");
    // Create token wrapper
    const token = document.createElement("div");
    token.classList.add("selected-wrapper");
    const token_span = document.createElement("span");
    token_span.classList.add("selected-label");
    token_span.innerText = value;
    const close = document.createElement("a");
    close.classList.add("selected-close");
    close.setAttribute("tabindex", "-1");
    close.setAttribute("data-option", value);
    close.setAttribute("data-hits", 0);
    close.setAttribute("href", "#");
    close.setAttribute("onClick", "return false");
    close.innerText = "x";
    close.addEventListener("click", removeToken)
    token.appendChild(token_span);
    token.appendChild(close);
    wrapper.insertBefore(token, search);
}


// Listen for clicks in the dropdown option
function clickDropdown(e) {

    const dropdown = e.target;
    const wrapper = dropdown.parentNode.parentNode;
    const input_search = wrapper.querySelector(".selected-input");
    const select = wrapper.querySelector("select"); 
    dropdown.classList.toggle("active");

    if (dropdown.classList.contains("active")) {
        removePlaceholder(wrapper);
        input_search.focus();
        if (!input_search.value) {
            populateAutocompleteList(select, "", true);
        } else {
            populateAutocompleteList(select, input_search.value);

        }
    } else {
        clearAutocompleteList(select);
        addPlaceholder(wrapper);
    }
}


// Clears the results of the autocomplete list
function clearAutocompleteList(select) {
    const wrapper = select.parentNode;

    const autocomplete_list = wrapper.querySelector(".autocomplete-list");
    autocomplete_list.innerHTML = "";
}

// Populate the autocomplete list following a given query from the user
function populateAutocompleteList(select, query, dropdown = false) {
    const {
        autocomplete_options
    } = getOptions(select);


    let options_to_show;

    if (dropdown)
        options_to_show = autocomplete_options;
    else
        options_to_show = autocomplete(query, autocomplete_options);

    const wrapper = select.parentNode;
    const input_search = wrapper.querySelector(".search-container");
    const autocomplete_list = wrapper.querySelector(".autocomplete-list");
    autocomplete_list.innerHTML = "";
    const result_size = options_to_show.length;
    // const autcompleteList = document.querySelector(".autocomplete-list");
    // autcompleteList.style.borderTop = '';
    // autcompleteList.style.borderBottom = '';

    if (result_size == 1) {

        const li = document.createElement("li");
        li.innerText = options_to_show[0];
        li.setAttribute('data-value', options_to_show[0]);
        li.addEventListener("click", selectOption);
        autocomplete_list.appendChild(li);
        if (query.length == options_to_show[0].length) {
            const event = new Event('click');
            li.dispatchEvent(event);

        }
    } else if (result_size > 1) {

        for (let i = 0; i < result_size; i++) {
            const li = document.createElement("li");
            li.innerText = options_to_show[i];
            li.setAttribute('data-value', options_to_show[i]);
            li.addEventListener("click", selectOption);
            autocomplete_list.appendChild(li);
        }
    } else {
        const li = document.createElement("li");
        li.classList.add("not-cursor");
        li.innerText = "No options found";
        autocomplete_list.appendChild(li);
    }
}


// Listener to autocomplete results when clicked set the selected property in the select option 
function selectOption(e) {
    const wrapper = e.target.parentNode.parentNode.parentNode;
    const input_search = wrapper.querySelector(".selected-input");
    const option = wrapper.querySelector(`select option[value="${e.target.dataset.value}"]`);

    option.setAttribute("selected", "");
    createToken(wrapper, e.target.dataset.value);
    if (input_search.value) {
        input_search.value = "";
    }

    input_search.focus();

    e.target.remove();
    const autocomplete_list = wrapper.querySelector(".autocomplete-list");


    if (!autocomplete_list.children.length) {
        const li = document.createElement("li");
        li.classList.add("not-cursor");
        li.innerText = "No options found";
        autocomplete_list.appendChild(li);
    }

    const event = new Event('keyup');
    input_search.dispatchEvent(event);
    e.stopPropagation();
}


// function that returns a list with the autcomplete list of matches
function autocomplete(query, options) {
    // No query passed, just return entire list
    if (!query) {
        return options;
    }
    let options_return = [];

    for (let i = 0; i < options.length; i++) {
        if (query.toLowerCase() === options[i].slice(0, query.length).toLowerCase()) {
            options_return.push(options[i]);
        }
    }
    return options_return;
}


// Returns the options that are selected by the user and the ones that are not
function getOptions(select) {
    // Select all the options available
    const all_options = Array.from(
        select.querySelectorAll("option")
    ).map(el => el.value);

    // Get the options that are selected from the user
    const options_selected = Array.from(
        select.querySelectorAll("option:checked")
    ).map(el => el.value);

    // Create an autocomplete options array with the options that are not selected by the user
    const autocomplete_options = [];
    all_options.forEach(option => {
        if (!options_selected.includes(option)) {
            autocomplete_options.push(option);
        }
    });

    autocomplete_options.sort();

    return {
        options_selected,
        autocomplete_options
    };

}

// Listener for when the user wants to remove a given token.
function removeToken(e) {
    // Get the value to remove
    const value_to_remove = e.target.dataset.option;
    const wrapper = e.target.parentNode.parentNode;
    const input_search = wrapper.querySelector(".selected-input");
    const dropdown = wrapper.querySelector(".dropdown-icon");
    // Get the options in the select to be unselected
    const option_to_unselect = wrapper.querySelector(`select option[value="${value_to_remove}"]`);
    option_to_unselect.removeAttribute("selected");
    // Remove token attribute
    e.target.parentNode.remove();
    input_search.focus();
    dropdown.classList.remove("active");
    const event = new Event('click');
    dropdown.dispatchEvent(event);
    e.stopPropagation();
}

// Listen for 2 sequence of hits on the delete key, if this happens delete the last token if exist
function deletePressed(e) {
    const wrapper = e.target.parentNode.parentNode;
    const input_search = e.target;
    const key = e.keyCode || e.charCode;
    const tokens = wrapper.querySelectorAll(".selected-wrapper");

    if (tokens.length) {
        const last_token_x = tokens[tokens.length - 1].querySelector("a");
        let hits = +last_token_x.dataset.hits;

        if (key == 8 || key == 46) {
            if (!input_search.value) {

                if (hits > 1) {
                    // Trigger delete event
                    const event = new Event('click');
                    last_token_x.dispatchEvent(event);
                } else {
                    last_token_x.dataset.hits = 2;
                }
            }
        } else {
            last_token_x.dataset.hits = 0;
        }
    }
    return true;
}

// You can call this function if you want to add new options to the select plugin
// Target needs to be a unique identifier from the select you want to append new option for example #multi-select-plugin
// Example of usage addOption("#multi-select-plugin", "tesla", "Tesla")
function addOption(target, val, text) {
    const select = document.querySelector(target);
    let opt = document.createElement('option');
    opt.value = val;
    opt.innerHTML = text;
    select.appendChild(opt);
}

document.addEventListener("DOMContentLoaded", () => {

    // get select that has the options available
    const select = document.querySelectorAll("[data-multi-select-plugin]");
    select.forEach(select => {

        init(select);
    });

    // Dismiss on outside click
    document.addEventListener('click', () => {
        // get select that has the options available
        const select = document.querySelectorAll("[data-multi-select-plugin]");
        for (let i = 0; i < select.length; i++) {
            if (event) {
                var isClickInside = select[i].parentElement.parentElement.contains(event.target);

                if (!isClickInside) {
                    const wrapper = select[i].parentElement.parentElement;
                    const dropdown = wrapper.querySelector(".dropdown-icon");
                    const autocomplete_list = wrapper.querySelector(".autocomplete-list");
                    //the click was outside the specifiedElement, do something
                    dropdown.classList.remove("active");
                    autocomplete_list.innerHTML = "";
                    addPlaceholder(wrapper);
                }
            }
        }
    });

});



/* define constants for adding classes */
  const CLASS_NAME_SELECT = 'select';
  const CLASS_NAME_ACTIVE = 'select_show';
  const CLASS_NAME_SELECTED = 'select__option_selected';
  const SELECTOR_ACTIVE = '.select_show';
  const SELECTOR_DATA = '[data-select]';
  const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
  const SELECTOR_OPTION_SELECTED = '.select__option_selected';
  
  /* create a component CustomSelect */
  
  class CustomSelect {
    constructor(target, params) {
      this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
      this._params = params || {};
      if (this._params['options']) {
        this._elRoot.classList.add(CLASS_NAME_SELECT); // Элемент с классом select определяет этот компонент
        this._elRoot.innerHTML = CustomSelect.template(this._params);
      }
      this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);
      this._elRoot.addEventListener('click', this._onClick.bind(this));
    }
    
    // классы select__toggle и атрибуты data-select="toggle", data-index предназначены для отображения выбранного значения и открытия при нажатии на него выдающего списка с опциями
    
    _onClick(e) { // обработчик события click
      const target = e.target;
      const type = target.closest(SELECTOR_DATA).dataset.select;
      switch (type) {
        case 'toggle':
          this.toggle();
          break;
        case 'option':
          this._changeValue(target);
          break;
      }
    }
    _update(option) { // обновляет значения атрибутов в зависимости от выбранной опции, генерирует событие 'select.change'
      const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
      if (selected) {
        selected.classList.remove(CLASS_NAME_SELECTED);
      }
      option.classList.add(CLASS_NAME_SELECTED);
      this._elToggle.textContent = option.textContent;
      this._elToggle.value = option.dataset['value'];
      this._elToggle.dataset.index = option.dataset['index'];
      this._elRoot.dispatchEvent(new CustomEvent('select.change'));
      this._params.onSelected ? this._params.onSelected(this, option) : null;
      return option.dataset['value'];
    }
    _reset() { // сбрасывает состояние, генерирует событие 'select.change'
      const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
      if (selected) {
        selected.classList.remove(CLASS_NAME_SELECTED);
      }
      this._elToggle.textContent = 'Select language';
      this._elToggle.value = '';
      this._elToggle.dataset.index = -1;
      this._elRoot.dispatchEvent(new CustomEvent('select.change'));
      this._params.onSelected ? this._params.onSelected(this, null) : null;
      return '';
    }
    _changeValue(option) { // при изменении выбранной опции
      if (option.classList.contains(CLASS_NAME_SELECTED)) {
        return;
      }
      this._update(option);
      this.hide();
    }
    show() { //показывает выпадающий список с опциями
      document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
        select.classList.remove(CLASS_NAME_ACTIVE);
      });
      this._elRoot.classList.add(CLASS_NAME_ACTIVE);
    }
    hide() { //скрывает dropdown меню
      this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
    }
    toggle() { //переключает видимость выпадающего меню
      if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
        this.hide();
      } else {
        this.show();
      }
    }
    dispose() { //удаляет обработчики событий, связанные с этим селектом
      this._elRoot.removeEventListener('click', this._onClick);
    }
    get value() { 
      return this._elToggle.value; //позволяет как получить выбранную опцию...
    }
    set value(value) { // ...так и установить её
      let isExists = false;
      this._elRoot.querySelectorAll('.select__option').forEach((option) => {
        if (option.dataset['value'] === value) {
          isExists = true;
          return this._update(option);
        }
      });
      if (!isExists) {
        return this._reset();
      }
    }
    get selectedIndex() {
      return this._elToggle.dataset['index'];
    }
    set selectedIndex(index) {
      const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`); 
      if (option) {
        return this._update(option);
      }
      return this._reset();
    }
  }
  
  CustomSelect.template = params => { // функция для генерации HTML-кода селекта в зависимости от переданных аргументов
    const name = params['name'];
    const options = params['options'];
    const targetValue = params['targetValue'];
    let items = [];
    let selectedIndex = -1;
    let selectedValue = '';
    let selectedContent = 'Select language';
    options.forEach((option, index) => {
      let selectedClass = '';
      if (option[0] === targetValue) {
        selectedClass = ' select__option_selected'; //Выбранный элемент
        selectedIndex = index;
        selectedValue = option[0];
        selectedContent = option[1];
      }
      items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
    });
    return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
    <div class="select__dropdown">
      <ul class="select__options">${items.join('')}</ul>
    </div>`;
  }; // class="select__dropdown" - выпадающее меню, data-select, data-index, data-value - пользоватеьские атрибуты данных
  
  document.addEventListener('click', (e) => { // для закрытия открытого селекта при клике вне его
    if (!e.target.closest('.select')) {
      document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
        select.classList.remove(CLASS_NAME_ACTIVE);
      });
    }
  });

   /* INITIALIZE THE INSTANCE CustomSelect FOR #select1 */
  
   document.addEventListener('DOMContentLoaded', () => {
    new CustomSelect('#select1', {
      name: 'language',
      options: [
        ['javascript', 'JavaScript'],
        ['java', 'Java'],
        ['c#', 'C#'],
      ],
    });
  })
  