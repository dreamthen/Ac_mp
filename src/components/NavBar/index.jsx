import Taro, {Component} from '@tarojs/taro';
import PropTypes from 'prop-types';
import Ldanm from '../utils';
import {
  Block,
  Image,
  View
} from '@tarojs/components';
import {
  AtIcon
} from '../../common/icon';
import cns from 'classnames';

import './index.less';

/**
 * 抽象顶部自定义导航组件
 * @尹文楷
 */
class NavBar extends Component {
  static options = {
    addGlobalClass: true
  };

  static propTypes = {
    //顶部导航栏的标题
    title: PropTypes.string.isRequired,
    //顶部导航栏的外部传入样式
    className: PropTypes.string,
    //链接文字跟图标颜色，不包括标题
    color: PropTypes.string,
    //className 前缀，用于第三方字体图标库
    leftIconPrefixClass: PropTypes.string,
    //左边图标类型
    leftIconType: PropTypes.string,
    //左边第一个图标类型点击事件
    onClickLeftIcon: PropTypes.func,
    //是否传入的是图片，而不是icon，如果为图片就使用图片，否则使用icon
    imgs: PropTypes.any,
    //处理滑动获取顶部导航高度的事件
    refs: PropTypes.func
  };

  state = {
    //fix底部的填充部分的高度
    height: 0,
    //是否存在
    hasHeight: false
  };

  static getDerivedStateFromProps(props, state) {
  }

  componentDidMount() {
    const {
      refs = () => {
      }
    } = this.props;
    Taro.createSelectorQuery().in(this.$scope).select('#navBar').fields({
      size: true
    }, (res = {}) => {
      const {height = 0} = res;
      this.setState({
        height,
        hasHeight: true
      });
      refs({
        height
      });
    }).exec()
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    const {title, className = '', color, leftIconPrefixClass, leftIconType, onClickLeftIcon, imgs = ''} = this.props;
    const {height = 0, hasHeight = false} = this.state;
    const {statusBarClassName = '', statusPadding = 0} = Ldanm.adaptationNavBar() || {};
    return (
      <Block>
        <View
          id='navBar'
          className={cns(
            'ldm-navBar',
            statusBarClassName,
            className
          )}
          style={{height: hasHeight ? `${height - statusPadding}PX` : 'auto'}}
        >
          <View className={cns('at-row',
            'at-row--no-wrap',
            'nav-bar'
          )}>
            <View
              className={cns('at-col',
                'at-col-3',
                'nav-bar-leftIcon'
              )}
              onClick={onClickLeftIcon}
            >
              {
                imgs ? <Image
                  src={imgs}
                  mode='widthFix'
                  className='nav-bar-image'
                /> : <AtIcon
                  prefixClass={leftIconPrefixClass ? leftIconPrefixClass : 'at-icon'}
                  value={leftIconType}
                  color={color}
                  size={20}
                />
              }
            </View>
            <View className={cns('at-col',
              'at-col-6',
              'nav-bar-title'
            )}>{title}</View>
            <View className={cns('at-col',
              'at-col-3'
            )}> </View>
          </View>
        </View>
        <View style={{height: `${height}PX`}}>
        </View>
      </Block>
    )
  }
}

export default NavBar;
