import config, { ConfigType } from '../config'
import Menus from '../menu'

import './index.scss'

class Editor {
  public config: ConfigType
  public el: HTMLElement
  public toolbarEl: HTMLElement
  public textContainerEl: HTMLElement
  
  constructor (selector: string) {
    this.el = document.querySelector(selector);
    if ( !this.el ) {
      throw new Error('需要传入正确的选择器')
      return;
    }
    this.config = JSON.parse(JSON.stringify(config));
  }

  create (): void {
    this.initDom();
  }

  initDom (): void {
    this.initMenus();
    this.initEditArea();
  }

  initMenus (): void {
    this.toolbarEl = document.createElement('div');
    this.toolbarEl.className = 'toolbar';
    this.el.appendChild(this.toolbarEl)
    const menus = new Menus(this);
    // console.log(menus)
    menus.addMenus()
  }

  initEditArea () {
    this.textContainerEl = document.createElement('div');
    this.textContainerEl.className = 'text-container';
    this.textContainerEl.style.height = this.config.height + 'px';
    this.textContainerEl.setAttribute('contenteditable', "true");
    this.el.appendChild(this.textContainerEl);
  }
}

export default Editor;