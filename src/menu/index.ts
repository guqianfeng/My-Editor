import Editor from "../editor";
import myCommand, {commandDict} from '../command'

// console.log(myCommand, commandDict)

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
    const subMenuArr = subMenuDict[type];
    if(subMenuArr && subMenuArr.length) {
      /**
       * head 有子菜单 h1-h6
       * color 有子菜单，可以选择颜色
       */
      const subMenu = document.createElement('div');
      subMenu.className = 'editor-sub-menu';
      // 处理submenu菜单
      let subMenuStr = "";
      for (let i = 0; i < subMenuArr.length; i++) {
        if (type === 'color') {
          subMenuStr += `<div class="sub-menu-item" style="color: ${subMenuArr[i]} !important">${subMenuArr[i]}</div>`
        } else {
          subMenuStr += `<div class="sub-menu-item">${subMenuArr[i]}</div>`
        }
      }
      subMenu.innerHTML = subMenuStr;
      toolEl.appendChild(subMenu);
    }
    this.editor.toolbarEl.appendChild(toolEl);
    this.addEvent(toolEl, type);
  }

  addEvent (el: HTMLElement, type: string): void {
    let selection = null;
    let range = null;
    const subMenuArr = subMenuDict[type];
    if(subMenuArr && subMenuArr.length) {
      const subMenuEl = el.querySelector('.editor-sub-menu') as HTMLElement;
      el.addEventListener('mouseover', () => {
        subMenuEl.style.display = 'block';
        selection = window.getSelection()
        if (!range) {
          range = selection && selection.getRangeAt(0);
        }
      })
      el.addEventListener('mouseout', () => {
        subMenuEl.style.display = 'none';
      })
      subMenuEl.addEventListener('click', function(e) {
        const target = e.target as HTMLElement;
        this.style.display = 'none';
        selection.removeAllRanges()
        selection.addRange(range);
        console.log(type, target.innerHTML);
        let value = target.innerHTML;
        if (commandDict[type] === 'insertHTML') {
          value = `<${value}>${selection.toString()}</${value}>`
        }
        myCommand(commandDict[type], value)
      })
    } else {
      el.addEventListener('mouseover', () => {
        selection = window.getSelection()
        if (!range) {
          range = selection && selection.getRangeAt(0);
        }
      })
      el.addEventListener('click', () => {
        selection.removeAllRanges()
        selection.addRange(range);
        console.log(type)
        myCommand(commandDict[type])
      })
    }

    this.editor.textContainerEl.addEventListener('blur', () => {
      // console.log('blur')
      range = document.getSelection().getRangeAt(0).cloneRange();
    })
  }
}