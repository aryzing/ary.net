function liveReload(last) {
  fetch('/live-reload', {
    method: 'get'
  }).then(function(response) {
    return response.json();
  }).then(function(j) {
    if (last < j.last) {
      document.location.reload();
    } else {
      document.getElementsByClassName('last-reload')[0].textContent = j.last;
      setTimeout(() => liveReload(j.last), 1000);
    }
  }).catch(function(err) {
    setTimeout(() => liveReload(last), 1000);
  });
}

liveReload();
