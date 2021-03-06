
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
  var interval =setInterval(function(){
    $.get(`http://oa.sangerbox.com/dlscihub?tag=${event.data.dio}`,function(res){
      if(res.status==0 && res.url==''){
        $("#download").html('<span>try start downloading</span>')
      }else if(res.status==0 && res.url!=''){
        $("#download").html('<span>点击下载</span>')
        window.open(`${res.url}`,'_blank')
        clearInterval(interval);
      }else if(res.status==1 && res.url.slice(0,5)=='http:'){
        $("#download").html('<span>点击下载</span>')
        window.open(`${res.url}`,'_blank')
        clearInterval(interval);
      }else{
        $("#download").html('<span>下载失败</span>')
        window.open(`${res.url}`,'_blank')
        clearInterval(interval);
      }
    })
  },1500)
  
}
function Search(){
  if($('#input').val().indexOf('10.')==0 || $('#input').val().indexOf('https://doi.org/10')==0){
    $.get(`https://api.crossref.org/works/${$('#input').val()}/transform/application/vnd.citationstyles.csl+json`,function(data,status){
      console.log(status)
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
                  <button id='download' ${JSON.parse(res).DOI==undefined?'disabled="true"':''} style="${JSON.parse(res).DOI==undefined?'cursor:not-allowed':''}" class="btn-sm btn-success">点击下载</button>
                </td>
              </tr>
            </tbody>
          </table>
        `)
        $('#download').bind("click",{dio:$('#input').val()},download)
        $('#wei').hide()
        $('#searchT').show()
        if(JSON.parse(res).DOI!=undefined){
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
          for(var i=0;i<5;i++){
            $("#tongdao").append(`
              <a id="tong${i}" class="btn-sm btn-success" disabled="true" style="cursor:not-allowed" target="_blank">点击下载${i+1}</a>
            `)
          }
        }
      }else if(res=='Resource not found.'){
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
                <button id='download'  ${res[0][1]==null?'disabled="true"':''} style="${res[0][1]==null?'cursor:not-allowed':''}" class="btn-sm btn-success">点击下载</button></td>
              </tr>
            </tbody>
          </table>
        `)
        $('#wei').hide()
        $('#download').bind("click",{dio:res[0][1]},download)
        $('#searchT').show()
        if(res[0][1]!=null){
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
          for(var i=0;i<5;i++){
            $("#tongdao").append(`
              <a id="tong${i}" class="btn-sm btn-success" disabled="true" style="cursor:not-allowed" target="_blank">点击下载${i+1}</a>
            `)
          }
        }
        
        
      }else{
        $('#wei').show()
        $('#searchT').hide()
      }
    })
  }else{
    var params={
      queryStringQuery:$('#input').val(),
      page:1
    }
    $.post(`http://calculate.mysci.online:9000/pubmed/searchPubmedArticle/`,params,function(res){
      if(JSON.parse(res).res.articleList!=undefined){
        $('#searchT').empty()
        $('#searchT').append(`
          <table class="table">
            <tbody>
              <tr>
                <td>标题：</td>
                <td>${JSON.parse(res).res.articleList.searchData[0].title}</td>
              </tr>
              <tr>
                <td>DOI：</td>
                <td>${JSON.parse(res).res.articleList.searchData[0].doi}</td>
              </tr>
              <tr>
                <td>Journal：</td>
                <td>${JSON.parse(res).res.articleList.searchData[0].journal.subName}</td>
              </tr>
              <tr>
                <td>下载通道1：</td>
                <td id="tongdao"></td>
              </tr>
              <tr>
                <td>下载通道2：</td>
                <td id="tongdao2">
                  <button id='download' ${JSON.parse(res).res.articleList.searchData[0].doi==undefined?'disabled="true"':''} style="${JSON.parse(res).res.articleList.searchData[0].doi==undefined?'cursor:not-allowed':''}" class="btn-sm btn-success">点击下载</button>
                </td>
              </tr>
            </tbody>
          </table>
        `)
        $('#download').bind("click",{dio:JSON.parse(res).res.articleList.searchData[0].doi},download)
        $('#wei').hide()
        $('#searchT').show()
        if(JSON.parse(res).res.articleList.searchData[0].doi==undefined){
          for(var i=0;i<5;i++){
            $("#tongdao").append(`
              <a id="tong${i}" class="btn-sm btn-success" disabled="true" style="cursor:not-allowed" target="_blank">点击下载${i+1}</a>
            `)
          }
        }else{
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
        }
      }else{
        $('#searchT').hide()
        $('#wei').show()
      }
    })
  }
  

  
  
  
}