(function createFilteredDropDown(){
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
  };

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
  };

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
  };

  // Закрываем dropdown если кликаем а его пределами
	function closeIfClickedOutside(menu, e) {
		if(e.target.closest('.dropdown') === null && e.target !== this && menu.offsetParent !== null) {
		menu.style.display = 'none';
		}
  }
};
}());