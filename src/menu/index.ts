import Editor from "../editor/Editor";

const subMenuDict = {
  'head': [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ],
  'color': [
    'red',
    'green',
    'blue'
  ]
}
export default class Menus {
  public editor: Editor
  constructor (editor: Editor) {
    this.editor = editor;
  }

  addMenus (): void {
    const {menus} = this.editor.config;
    // console.log(menus);
    menus.forEach(type => {
      this.addMenu(type)
    })
  }

  addMenu (type: string): void{
    const toolEl = document.createElement('div');
    toolEl.className = 'editor-menu';
    toolEl.innerHTML = type;
    /**
     * 子菜单处理
     */
    if(['head', 'color'].includes(type)) {
      /**
       * head 有子菜单 h1-h6
       * color 有子菜单，可以选择颜色
       */
      const subMenu = document.createElement('div');
      subMenu.className = 'editor-sub-menu';
      console.log(subMenuDict)
      toolEl.appendChild(subMenu);
    }
    this.editor.toolbarEl.appendChild(toolEl);
    this.addEvent(toolEl, type);
  }

  addEvent (el: HTMLElement, type: string): void {
    if(['head', 'color'].includes(type)) {
      const subMenuEl = el.querySelector('.editor-sub-menu') as HTMLElement;
      el.addEventListener('mouseover', () => {
        subMenuEl.style.display = 'block';
      })
      el.addEventListener('mouseout', () => {
        subMenuEl.style.display = 'none';
      })
    } else {
      el.addEventListener('click', () => {
        console.log('加粗效果')
      })
    }
  }
}