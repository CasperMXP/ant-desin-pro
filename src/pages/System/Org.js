import React, {PureComponent} from 'react';
import { Tree, Icon } from 'antd';



export default
class Org extends PureComponent{

  state = {
    treeData: [
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true },
    ],
  }

  componentDidMount() {

  }

  render(){
    const {TreeNode} = Tree;

    return (
      <div>
        <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={['0-0-0']}
        >
          <TreeNode icon={<Icon type="team" />} title="新网银行" key="0-0">
            <TreeNode icon={<Icon type="team" />} title="信息科技部" key="0-0-0" />
            <TreeNode
              icon={({ selected }) => (
                <Icon type={selected ? 'frown' : 'frown-o'} />
              )}
              title="leaf"
              key="0-0-1"
            />
          </TreeNode>
        </Tree>
      </div>
    );
  }
}
