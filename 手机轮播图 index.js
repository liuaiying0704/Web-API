window.addEventListener('load', function () {
  var num = 0;
  var focus = document.querySelector('.focus');
  var ul = focus.children[0];
  var ol = focus.children[1];
  var w = focus.offsetWidth;

  //  1、定时器：图片自动滚动
  var timer = setInterval(function (e) {
    num++;
    var translatex = -num * w;
    ul.style.transition = 'all .3s';
    ul.style.transform = 'translateX(' + translatex + 'px)';
  }, 2000);

  //  2、无缝轮播，transitionend检测过渡完成之后再去判断。最后一张图索引是3
  ul.addEventListener('transitionend', function (e) {
    if (num >= 3) {
      num = 0;
      ul.style.transition = 'none';
      var translatex = -num * w;
      ul.style.transform = 'translateX(' + translatex + 'px)';
    } else if (num < 0) {
      num = 2;
      ul.style.transition = 'none';
      var translatex = -num * w;
      ul.style.transform = 'translateX(' + translatex + 'px)';
    }

    // 3、小圆点跟着图片，classList，排他
    // 找到有current类名的去除
    ol.querySelector('.current').classList.remove('current');
    // num可以表示当前播放的图片对应的小圆点的索引。
    ol.children[num].classList.add('current');
  });

  //   4、拖动图片
  //
  var startX = 0;
  var moveX = 0;
  var flag = false;
  ul.addEventListener('touchstart', function (e) {
    startX = e.targetTouches[0].pageX;
    clearInterval(timer);
  });
  ul.addEventListener('touchmove', function (e) {
    //   移动的距离
    moveX = e.targetTouches[0].pageX - startX;
    var translatex = -num * w + moveX;
    ul.style.transition = 'none';
    ul.style.transform = 'translateX(' + translatex + 'px)';
    flag = true;
    e.preventDefault();
  });

  ul.addEventListener('touchend', function (e) {
    if (flag) {
      if (Math.abs(moveX) > 50) {
        if (moveX > 0) {
          num--;
        } else {
          num++;
        }
        var translatex = -num * w;
        ul.style.transition = 'all 0.3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
      } else {
        var translatex = -num * w;
        ul.style.transition = 'all 0.1s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
      }
    }
    clearInterval(timer);
    timer = setInterval(function (e) {
      num++;
      var translatex = -num * w;
      ul.style.transition = 'all 0.3s';
      ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
  });
  var nav = document.querySelector('nav');
  var navTop = nav.offsetTop;
  var goBack = document.querySelector('.goBack');
  window.addEventListener('scroll', function (e) {
    if (window.pageYOffset >= navTop) {
      goBack.style.display = 'block';
    } else {
      goBack.style.display = 'none';
    }
  });
  goBack.addEventListener('click', function () {
    window.scroll(0, 0);
// 让滚动和缓
//     css   html{ scroll-behavior:smooth }
    
  });
});
