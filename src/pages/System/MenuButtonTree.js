import { PureComponent } from 'react';
import { Tree } from 'antd';
import isEqual from 'lodash/isEqual';

const { TreeNode } = Tree;

class MenuButtonTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: props.value,
      expandedKeys: [],
      autoExpandParent: true,
      menuButtonTree: props.menuButtonTree,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      checkedKeys: nextProps.value,
    };
  }

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({
      checkedKeys,
    });

    /**
     * https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options)
     * 经过 getFieldDecorator 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性）
     * onChange（或 trigger 指定的其他属性）
     * 关键点：需要同时改变组件的状态
     */
    const { onChange } = this.props;
    onChange(checkedKeys);
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const { expandedKeys, autoExpandParent, checkedKeys, menuButtonTree } = this.state;

    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={checkedKeys}
      >
        {this.renderTreeNodes(menuButtonTree)}
      </Tree>
    );
  }
}

export default MenuButtonTree;
