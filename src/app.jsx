import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'

import Index from './pages/index';
import Login from './pages/login';
import UserInfo from './pages/userInfo';
import NavBar from "./pages/NavBar";
import TabBar from "./pages/tabBar";
import Upload from './pages/upload';

import store from './store';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/login/index',
      'pages/userInfo/index',
      'pages/navBar/index',
      'pages/tabBar/index',
      'pages/userInfo/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
        <Login/>
        <UserInfo/>
        <NavBar/>
        <TabBar/>
        <Upload/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
