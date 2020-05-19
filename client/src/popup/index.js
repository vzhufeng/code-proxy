import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Table, Input, Checkbox } from "antd";
import "./index.less";

function parse() {
  return JSON.parse(localStorage.rules || '[]') || [];
}

function stringify(val) {
  localStorage.rules = JSON.stringify(val);
}

function getdata(index) {
  const arr = parse();
  return arr[index];
}

function setdata(index, val) {
  const arr = parse();
  arr[index] = val;
  stringify(arr);
}

function pushdata(val) {
  const arr = parse();
  arr.push(val);
  stringify(arr);
}

class App extends Component {
  state = {
    renderer: 1,
    showTip: false,
  };

  columns = [
    {
      title: "启用/禁用",
      dataIndex: "origin",
      render: (t, item, key) => {
        return (
          <Checkbox checked={item.active} onChange={(e) => {
            setdata(key, {...item, active: !item.active});
            this.doRender();
          }}></Checkbox>
        );
      },
    },
    {
      title: "原地址",
      dataIndex: "origin",
      render: (t, item, key) => {
        return (
          <Input
            value={item.origin}
            onChange={(e) => {
              setdata(key, {...item, origin: e.target.value});
              this.doRender();
            }}
          />
        );
      },
    },
    {
      title: "代理地址",
      dataIndex: "target",
      render: (t, item, key) => {
        return (
          <Input
            value={item.target}
            onChange={(e) => {
              setdata(key, {...item, target: e.target.value});
              this.doRender();
            }}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "oprate",
      render: (t, item, key) => {
        return (
          <Button onClick={() => {
            const arr = parse();
            stringify(arr.filter((v,k)=>k !== key));
            this.doRender();
          }}>删除</Button>
        );
      },
    },
  ];

  doRender = () => this.setState({ renderer: !this.state.renderer });

  render() {
    const {showTip} = this.state;

    return (
      <div className="page-container">
        <div>
          <Button
            onClick={() => {
              pushdata({ origin: "", target: "", active: true });
              this.doRender();
            }}
            type="primary"
            style={{margin: '10px'}}
          >
            增加规则
          </Button>
          <Button
            onClick={() => {
              this.setState({showTip: !showTip});
            }}
            type="primary"
            style={{margin: '10px'}}
          >
            {showTip ? '隐藏示例' : '显示示例'}
          </Button>
        </div>
        <div style={{display: showTip ? 'block' : 'none', marginLeft: '10px' }}>
          <p>例如现在想将 https://www.hunliji.com/js/vendors~app.57e2383a.chunk.js 代理到 http://localhost:3000/js/vendors.57e2383a.js</p>
          <p>原地址：https://www.hunliji.com/js/vendors~app.(\d+\w+).chunk.js</p>
          <p>代理地址：http://localhost:3000/js/vendors.$1.js</p>
          <p>$1、$2...代表捕获组的捕获结果</p>
        </div>
        <div>
          <Table bordered dataSource={parse()} columns={this.columns} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
