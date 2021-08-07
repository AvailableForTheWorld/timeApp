import Countdown from './Countdown'
import Todo2 from './Todo2'
import Progress from './progress'
import React from 'react';
import TimeLine from './TimeLine'
import FinishedTask2 from './FinishedTask2';
import Goals2 from './Goals2'
import  "./App.css"

class App extends React.Component {
  constructor(){
    super()
    this.state={
      taskQue:[],
      t:0,
      nowTrans:0,
      finishFlag:false,
      taskItem:""
    }
  }
  handleQue=(item)=>{
    let que = this.state.taskQue
    que.push(item[0])
    // console.log(item[0])
    this.setState({
      taskQue:que,
      t:item[0].spending*60,
      taskItem:item[0].item,
      nowTrans:0
    })
  }
  handleCurTime=(trans)=>{
    this.setState({
      nowTrans:trans
    })
    // console.log("the origin trans:   "+trans)
  }
  isFinished = (flag)=> {
    this.setState({
      finishFlag: flag
    })
  }
  handleWork=(item,trans)=>{
    this.setState({
      taskItem:item,
      t:trans*60
    })
    
  }
  render(){
    const styleMiddle = {
      position:'absolute',
      
      bottom:0,
      
    }
    return (
        <div className="App">
          <div className="title">
          <TimeLine />
          </div>
          
          <div style={{display:'flex',margin:50,justifyContent:'space-around'}}>          
            <Goals2 getGoalsTask={this.handleWork.bind(this)}/> 
            <Todo2 getItem={this.handleQue.bind(this)} ></Todo2>
          </div>

          <div style={{position:'fixed',bottom:'30%'}}>
            <FinishedTask2 flag={this.state.finishFlag} trans={this.state.nowTrans} controlFlag={this.isFinished} taskItem={this.state.taskItem}/>
 
          </div>
          
            
           <div style={{...styleMiddle,width:'100%'}} >
           <div >
            <Countdown s={this.state.t} taskName={this.state.taskItem} 
                getCurTime={this.handleCurTime} judgeFinished={this.isFinished}/>
            </div>
           <Progress nums={this.state.t} index={this.state.nowTrans} Color1={'#00CCFF'} Color2={'#AEDD81'} width={'100%'} backColor={'rgb(253, 204, 204)'}/>
           </div>
             

  
        </div>
      
    )
  }
  
}

export default App;
