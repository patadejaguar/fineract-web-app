(function(window) {
  window["env"] = window["env"] || {};

  // BackEnd Environment variables fineract.kernelcorebanking.com
  //window["env"]["fineractApiUrls"] = 'https://localhost:8443';
  //window["env"]["fineractApiUrl"]  = 'https://localhost:8443';
  //window["env"]["fineractApiUrls"] = 'https://fineract.kernelcorebanking.com';
  //window["env"]["fineractApiUrl"]  = 'https://fineract.kernelcorebanking.com';
  // BackEnd Environment variables
  window["env"]["fineractApiUrls"] = '';
  window["env"]["fineractApiUrl"]  = '';

  window["env"]["apiProvider"] = '/fineract-provider/api';
  window["env"]["apiVersion"]  = '/v1';

  window["env"]["fineractPlatformTenantId"]  = '';
  window["env"]["fineractPlatformTenantIds"]  = '';

  // Language Environment variables
  window["env"]["defaultLanguage"] = '';
  window["env"]["supportedLanguages"] = '';

  window['env']['preloadClients'] = '';
})(this);
