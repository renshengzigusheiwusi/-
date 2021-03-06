var str1="人生自古都无死";
var str2='你好 人生自古谁无死';
function 文本比对(s,t){
  var actions=[
    {
      actions:[],
      str:s,
      index:0
    }
  ];
  let temp=[];
  while(true){
    for(var i=0;i<actions.length;++i){
      var act=actions[i];
      if(act.str==t){
        return act;
      }
      let choice=getAction(act.str,t,act.index);
      for(var c=0;c<choice.length;++c){
        let newact=JSON.parse(JSON.stringify(act));
        if(choice.indexOf(0)!=-1){
          newact.actions.push(0);
          newact.index+=1;
          temp.push(newact);
          break;
        }
        else{
          if(choice[c]==1){
            newact.actions.push(1);
            newact.str=newact.str.slice(0,newact.index)+t[newact.index]+newact.str.slice(newact.index);
            newact.index+=1;
          }
          else{
            newact.actions.push(-1);
            newact.str=newact.str.slice(0,newact.index)+newact.str.slice(newact.index+1);
          }
        }

        temp.push(newact);
      }
    }
    var newarr=剪枝(temp,t);
    actions=newarr.slice(0,3);
    temp=newarr.slice(3);
  }
}
function 剪枝(arr,t){
  var result=[];
  let good=null;
  let goodstep=null;
  for(var i=0;i<arr.length;++i){
    if(arr[i].str==t){
      return [arr[i]];
    }
    let step=0;
    for(var h=0;h<arr[i].actions.length;++h){
      if(arr[i].actions[h]!=0){
        ++step
      }
    }
    arr[i].step=step;
    let index=arr[i].index;
    let length=arr[i].str.length;
    if(good===null){
      good=step-index;
      goodstep=step;
      result.unshift(arr[i]);
      arr.splice(i,1);
      --i;
    }
    else{
      if(step-index<=good){
        if(step-index<good){
          result.unshift(arr[i]);
          good=step-index;
          arr.splice(i,1);
          --i;
        }
        else if(step>goodstep){
          result.unshift(arr[i]);
          good=step-index;
          arr.splice(i,1);
          --i;
        }
      }
    }
  }
  result=result.concat(arr);
  return result;
}
function getAction(s,t,index){
  if(s[index]==t[index]){
    return [0,1,-1];
  }
  else{
    if(index==t.length){
      return [-1];
    }
    return [1,-1];
  }
}
var result=文本比对(str1,str2);
console.log(result);
console.log(result.actions.length);
