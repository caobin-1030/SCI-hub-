
$(
  $('#searchT').hide(),
  $('#wei').hide()
)
var urlList=[]
var ping=1
var pai=[]
function autotest(i){
  pai.push(i)
}
$('#input').bind('keydown',function(event){
  if(event.keyCode == "13") {
    Search()
  }
}); 
function download(event){
  console.log($("#tongdao2"))
  var interval =setInterval(function(){
    $.get(`http://oa.sangerbox.com/dlscihub?tag=${event.data.doi}`,function(res){
      if(res.status==0 && res.url==''){
        $('#tongdao2').empty()
        $("#tongdao2").append(`
          <span>try start downloading</span><i class="loading spin"></i>
        `)
      }else if(res.status==0 && res.url!=''){
        $('#tongdao2').empty()
        $("#tongdao2").append(`
          <a href="${res.url}" class="btn-sm btn-success" target="_blank">点击下载</a>
        `)
        clearInterval(interval);
      }else if(res.status==1 && res.url.slice(0,5)=='http:'){
        $('#tongdao2').empty()
        $("#tongdao2").append(`
          <a href="${res.url}" class="btn-sm btn-success" target="_blank">点击下载</a>
        `)
        clearInterval(interval);
      }else{
        $('#tongdao2').empty()
        $("#tongdao2").append(`
          <span>失败</span>
        `)
        clearInterval(interval);
      }
    })
  },1500)
}
function Search(){
  if($('#input').val().indexOf('10.')==0 || $('#input').val().indexOf('https://doi.org/10')==0){
    $.get(`https://api.crossref.org/works/${$('#input').val()}/transform/application/vnd.citationstyles.csl+json`,function(res){
      if(JSON.parse(res)){
        $('#searchT').empty()
        $('#searchT').append(`
          <table class="table">
            <tbody>
              <tr>
                <td>标题：</td>
                <td>${JSON.parse(res).title}</td>
              </tr>
              <tr>
                <td>DOI：</td>
                <td>${JSON.parse(res).DOI}</td>
              </tr>
              <tr>
                <td>Journal：</td>
                <td>${JSON.parse(res).publisher}</td>
              </tr>
              <tr>
                <td>下载通道1：</td>
                <td id="tongdao"></td>
              </tr>
              <tr>
                <td>下载通道2：</td>
                <td id="tongdao2">
                  <button id='download' class="btn-sm btn-success">点击下载</button>
                </td>
              </tr>
            </tbody>
          </table>
        `)
        $('#downLoad').bind("click",{dio:$('#input').val()},function(){
          console.log(1)
        })
        $('#wei').hide()
        $('#searchT').show()
        $.get('http://oa.sangerbox.com/scihub',function(res){
          urlList=res
          setInterval(ping++,100);
          for(var i=0;i<urlList.length;i++){
              $("#list").find('p').eq(i).append("<img src="+urlList[i]+"/"+Math.random()+" width='1' height='1' onerror='autotest("+i+")' style='display:none'>");
              $("#tongdao").append(`
                <a id="tong${i}" href="" class="btn-sm btn-success" target="_blank">点击下载${i+1}</a>
              `)
          }
        })
        
        setTimeout(function(){
          for(var a=0;a<pai.length;a++){
            $(`#tong${a}`)[0].href=urlList[pai[a]].url+`/${$('#input').val()}`
          }
        },1000)
      }else{
        $('#searchT').hide()
        $('#wei').show()
      }
    })
  }else if($('#input').val()%1==0){
    var params={
      tag:$('#input').val()
    }
    $.get('http://oa.sangerbox.com/tag2paperinfo',params,function(res){
      if(res.length>0){
        $('#searchT').empty()
        $('#searchT').append(`
          <table class="table">
            <tbody>
              <tr>
                <td>标题：</td>
                <td>${res[0][2]}</td>
              </tr>
              <tr>
                <td>DOI：</td>
                <td>${res[0][1]}</td>
              </tr>
              <tr>
                <td>Journal：</td>
                <td></td>
              </tr>
              <tr>
                <td>下载通道1：</td>
                <td id="tongdao"></td>
              </tr>
              <tr>
                <td>下载通道2：</td>
                <td id="tongdao2">
                <button id='download' class="btn-sm btn-success">点击下载</button></td>
              </tr>
            </tbody>
          </table>
        `)
        $('#wei').hide()
        $('#downLoad').bind("click",{dio:res[0][1]},download)
        $('#searchT').show()
        $.get('http://oa.sangerbox.com/scihub',function(res){
          urlList=res
          setInterval(ping++,100);
          for(var i=0;i<urlList.length;i++){
              $("#list").find('p').eq(i).append("<img src="+urlList[i]+"/"+Math.random()+" width='1' height='1' onerror='autotest("+i+")' style='display:none'>");
              $("#tongdao").append(`
                <a id="tong${i}" href="" class="btn-sm btn-success" target="_blank">点击下载${i+1}</a>
              `)
          }
        })
        setTimeout(function(){
          for(var a=0;a<pai.length;a++){
            console.log($(`#tong${a}`)[0])
            $(`#tong${a}`)[0].href=urlList[pai[a]].url+`/${$('#input').val()}`
          }
        },1000)
      }else{
        $('#wei').show()
        $('#searchT').hide()
      }
    })
  }
  

  
  
  
}