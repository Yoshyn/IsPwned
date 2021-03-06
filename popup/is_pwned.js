function fetchBreacheAccount(account) {
  const requestURL = `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`
  const requestHeaders = new Headers();
  requestHeaders.append('accept', "application/vnd.haveibeenpwned.v2+json");
  requestHeaders.append('Access-Control-Allow-Origin', '*');
  const driveRequest = new Request(requestURL, {
    method: "GET",
    headers: requestHeaders
  });

  return fetch(driveRequest).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw response.status;
    }
  });
}

document.getElementById("logoLink").addEventListener("click", (event) => {
  window.close();
});


var searchPwnage = document.getElementById("searchPwnage");

searchPwnage.addEventListener("click", (event) => {
  event.preventDefault();
  var account = document.getElementById("Account").value;

  searchPwnage.disabled = true;
  setTimeout(function(){ searchPwnage.disabled = false; }, 2000);

  if (account) {
    fetchBreacheAccount(account).then(results => {
      var innerHTML="<table class=\"table table-responsive table-bordered table-hover\"><thead><tr class=\"danger\"><th>Domain</th><th>BreachDate</th><th>Description</th><th>DataClasses</th></tr></thead><tbody>"
      results.forEach(item => {
        innerHTML+="<tr class=\"warning\">"
        innerHTML+=`<th>${item.Domain}</th>`
        innerHTML+=`<th>${item.BreachDate}</th>`
        innerHTML+=`<th>${item.Description}</th>`
        innerHTML+=`<th class="dataClasses"><ul><li>${item.DataClasses.join('</li><li>')}</li></ul></th>`
        innerHTML+="</tr>"
      })
      innerHTML+="</tbody></table>"
      document.getElementById("breachesResults").innerHTML = innerHTML;
    },
    function(error) {
      var innerHTML = ""
      if (error == 404)
        innerHTML = "<div class=\"alert alert-success\">No Breaches found for this account !</div>"
      else
        innerHTML = `<div class=\"alert alert-danger\">${error} : An error occur...</div>`
      document.getElementById("breachesResults").innerHTML = innerHTML;
    })
  }
});
