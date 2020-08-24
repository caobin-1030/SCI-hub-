
$(
  $('#searchT').hide()
)
var urlList=[]
var ping=1
var pai=[]
function autotest(i){
  pai.push(i)
}

function Search(){
  if($('#input').val().indexOf('10.')==0 || $('#input').val().indexOf('https://doi.org/10')==0){
    var parmas={
      queryStringQuery:`doi:"${$('#input').val()}"`,
      page:1
    }
    $.post('http://calculate.mysci.online:9000/pubmed/searchPubmedArticle/',parmas,function(res){
      console.log(res)
    })
  }
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
      $(`#tong${a}`)[0].href=urlList[pai[a]].url
    }
  },1000)

  
  $('#searchT').append(`
    <table class="table">
      <tbody>
        <tr>
          <td>标题：</td>
          <td>Synthesis of graphene-based nanosheets via chemical reduction of exfoliated graphite oxide</td>
        </tr>
        <tr>
          <td>DOI：</td>
          <td>10.1016/j.carbon.2007.02.034</td>
        </tr>
        <tr>
          <td>Journal：</td>
          <td>Carbonvolume 45, issue 7 (2007)</td>
        </tr>
        <tr>
          <td>下载通道1：</td>
          <td id="tongdao"></td>
        </tr>
        <tr>
          <td>下载通道2：</td>
          <td>(点击进入后，请点击页面左边的“SAVE”进行下载)</td>
        </tr>
        <tr>
          <td>深度下载：</td>
          <td>(点击进入后，请点击页面左边的“SAVE”进行下载)</td>
        </tr>
      </tbody>
    </table>
  `)
  $('#searchT').show()
  
}