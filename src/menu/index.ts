import Editor from "../editor/Editor";

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
    console.log(type);
    const toolEl = document.createElement('div');
    toolEl.className = 'editor-menu';
    /**
     * 以下操作处理子菜单
     */
    switch (type) {
      case 'bold':
        toolEl.innerHTML = type;
        break;
      case 'head':
        break;
      case 'color':
        break;    
    }
    this.editor.toolbarEl.appendChild(toolEl);
  }
}