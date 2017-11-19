import React from 'react';
import data from './mock/data'


class App extends React.Component {
  render() {
    return (
      <div className="filter-wrap">
          <FilterWrap />
      </div>
    );
  }
}
//筛选列表组件
class FilterWrap extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }
  //点击选择某一个或修改某一个
  select(id,sort,item) {
    let inSelect = this.state.selected.some(vo=>vo.id == id)

    if(inSelect){
      this.state.selected.map((vo) => {
        if(vo.id == id){
          vo.name = item.name,
          vo.fid = item.id
        }
      })
    }else{
      this.state.selected.push({
        id,name:item.name,sort,fid:item.id
      })
    }
    console.log(this.state.selected);
    this.setState({
                                  //升序排序
      selected:this.state.selected.sort((a,b)=> a.sort - b.sort)
    });
  }

  //移除选中的
  delSelect(id) {
    this.state.selected.map((item,i) => {
      if(item.id == id){
        this.state.selected.splice(i,1)
      }
    })
    this.setState({selected:this.state.selected});
  }
  render() {
    return (
      <div className="filter-box">
        <div className="filter-result">
          <h4>筛选结果:</h4>
          {this.state.selected.map((item)=>(
            <p key={item.id}>
              {item.name}
              <a href="javascript:;" onClick={()=>this.delSelect(item.id)}>X</a>
            </p>
          ))}
        </div>
        <ul className="filter-attr-list">
          {
            data.map((el)=>{
              let {id,name,list,sort} = el
              return (
                <li key={id}>
                  <h4>{name}：</h4>
                  <p>
                    {
                      list.map((item)=>
                        <a
                          onClick={()=>this.select(id,sort,item)}
                          key={item.id}
                          className={this.state.selected.some((vo)=>vo.fid === item.id)?`active`:``}
                          href="javascript:;">
                          {item.name}
                        </a>
                      )
                    }
                  </p>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default App
