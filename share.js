var clicks = {
  fb: false,
  twitter: false,
  ks: false
};

var KS_URL = 'https://www.kickstarter.com/projects/blackholes/black-holes-0';

function openURL(url) {
  var w = 580, h = 300,
      left = (screen.width/2)-(w/2),
      top = (screen.height/2)-(h/2);

  window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h)
}

function updateClick(website) {
  if (clicks[website])
    return;

  clicks[website] = true;
  
  var progress = document.querySelector('.progress-bar')
  var percentage = Number(progress.style.width.replace('%', '')) || 0;
  percentage = Math.min(100, percentage + (100 / 3)).toFixed(0);
  var indicator = document.querySelector('.percentage');
  
  if (percentage == 99) {
    percentage = 100;
    indicator.className += ' -full';
  }

  progress.style.width = indicator.innerHTML = percentage + '%';  
}

function openSocial(e, website) {
  switch (website) {
    case 'fb':
      e.preventDefault();
      e.stopPropagation();
      openURL('https://www.facebook.com/share.php?u=' + KS_URL);
      break;
    
    case 'twitter':
      e.preventDefault();
      e.stopPropagation();
      var title = 'Watch Sundance selected animated short Black Holes & help fund Season 1 @sundancefest';
      title = encodeURIComponent(title);
      openURL('http://twitter.com/share?text=' + title + '&related=blackholesfilm&url=' + encodeURIComponent(KS_URL));
      break;
    
    case 'ks':
      break;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('a.button');
  
  [].forEach.call(buttons, function (el) {
    el.addEventListener('click', function (e) {
      var website = el.getAttribute('data-site');
      console.log(website);
      openSocial(e, website);
      updateClick(website);
    });
  });  
})