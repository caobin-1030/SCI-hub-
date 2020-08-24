
$(
  $('#searchT').hide()
)
var urlList=[]
var ping=1
function autotest(i){
  // $(`#tong${i}`)[0].href=urlList[i]
  console.log($(`#tong${1}`)[0].href)
}
function Search(){
  $.get('http://oa.sangerbox.com/scihub',function(res){
    urlList=res
    setInterval(ping++,100);
    for(var i=0;i<urlList.length;i++){
        $("#list").find('p').eq(i).append("<img src="+urlList[i]+"/"+Math.random()+" width='1' height='1' onerror='autotest("+i+")' style='display:none'>");
    }
  })
  
  
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
          <td><a id="tong1" href="https://sci-hub.im/10.1016/j.carbon.2007.02.034" class="btn-sm btn-success" target="_blank">点击下载1</a>(点击进入后，请点击页面左边的“SAVE”进行下载)</td>
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