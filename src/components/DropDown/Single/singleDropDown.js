(function createSingleDropDown() {
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
    };
    
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
    };
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
    };
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
    };
    _changeValue(option) { // при изменении выбранной опции
      if (option.classList.contains(CLASS_NAME_SELECTED)) {
        return;
      }
      this._update(option);
      this.hide();
    };
    show() { //показывает выпадающий список с опциями
      document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
        select.classList.remove(CLASS_NAME_ACTIVE);
      });
      this._elRoot.classList.add(CLASS_NAME_ACTIVE);
    };
    hide() { //скрывает dropdown меню
      this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
    };
    toggle() { //переключает видимость выпадающего меню
      if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
        this.hide();
      } else {
        this.show();
      }
    };
    dispose() { //удаляет обработчики событий, связанные с этим селектом
      this._elRoot.removeEventListener('click', this._onClick);
    };
    get value() { 
      return this._elToggle.value; //позволяет как получить выбранную опцию...
    };
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
    };
    get selectedIndex() {
      return this._elToggle.dataset['index'];
    };
    set selectedIndex(index) {
      const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`); 
      if (option) {
        return this._update(option);
      }
      return this._reset();
    };
  };
  
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
  });
}());