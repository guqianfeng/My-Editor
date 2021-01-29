/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
 * @param type 一个 DOMString ，命令的名称。可用命令列表请参阅 命令 。
 * @param value 一些命令（例如insertImage）需要额外的参数（insertImage需要提供插入image的url），默认为null。
 */
export default function myCommand (type: string, value?: any): boolean {
  // 第二个参数是否展示用户界面，一般为 false。Mozilla 没有实现。
  // console.log(type, value)
  return document.execCommand(type, false, value);
}

/**
 * 根据菜单key找到对应的commandName
 */
export const commandDict =  {
  'bold': 'bold',
  'head': 'insertHTML',
  'color': 'foreColor'
}
