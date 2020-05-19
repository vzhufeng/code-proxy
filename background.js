chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url = details.url;
    const rules = JSON.parse(localStorage.rules || "[]");
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].active) {
        const reg = new RegExp(rules[i].origin);
        if (reg.test(url)) {
          return { redirectUrl: url.replace(reg, rules[i].target) };
        }
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({
    url: "chrome-extension://" + chrome.runtime.id + "/tab.html"
    // url: "/tab.html",
  });
});
