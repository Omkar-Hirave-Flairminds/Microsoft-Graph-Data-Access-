require('isomorphic-fetch');
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

async function initializeGraphForUserAuth(settings, deviceCodePrompt) {
  if (!settings) {
      throw new Error('Settings cannot be undefined');
    }
    const _settings = settings;
    const _deviceCodeCredential = new azure.DeviceCodeCredential({
      clientId: settings.clientId,
      tenantId: settings.tenantId,
      userPromptCallback: deviceCodePrompt
    });
  
    const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
      _deviceCodeCredential, {
        scopes: settings.graphUserScopes
      });
  
    const _userClient = graph.Client.initWithMiddleware({
      authProvider: authProvider
    });
    return{
      _settings,
      _userClient,
      _deviceCodeCredential
    }
}

module.exports = { initializeGraphForUserAuth }