import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Demo1 from './pages/demo1'
import Demo2 from './pages/demo2'
import '@/assets/default.scss'

// 当 项目 内部发生变更时可以告诉 webpack 接受更新的模块，
// 如果不添加，当更改文件内容是，浏览器中页面 全部刷新；添加后 页面不刷新
if (module.hot) {
  module.hot.accept(); 
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app">
        <Demo1></Demo1>
        <Demo2></Demo2>
      </div>
    );
  }
}

export default App;

ReactDom.render(<App />, document.getElementById('root'));