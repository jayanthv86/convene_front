import router from '../router' //router: required to redirect users
import OktaAuth from '@okta/okta-auth-js' //okta authjs: required login in Okta
import SignIn from '@okta/okta-signin-widget'; // okta signin widget: required login in Okta

//constants
const OKTA_ORG = 'https://jay.okta.com';
const AUTHZ_SERVER = 'https://jay.okta.com/oauth2/aus4fkma8RksuPc5o2p6';
const AUTHZ_URL = AUTHZ_SERVER+'/v1/authorize';
const CLIENT_ID = '0oa4etriw1PASRKAy2p6';
const REDIRECT_URL = 'http://localhost:8080/redirect';
const SCOPES = ['openid', 'profile', 'email', 'promos:read'];
const TOKENS = ['token', 'id_token'];
const OKTA_AUTH_JS = new OktaAuth({
  url: OKTA_ORG,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URL,
  issuer: AUTHZ_SERVER,
  authorizeUrl: AUTHZ_URL,
});
const SIGNOUT_OKTA = true;
const signIn = new SignIn({
      baseUrl: OKTA_ORG,
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URL,
      authParams: {
        issuer: AUTHZ_SERVER,
        responseType: TOKENS,
        scopes: SCOPES,
      },
      idps: [
        { //FACEBOOK AS IDP
          type: 'FACEBOOK',
          id: '0oa1kqdmtGxvIQb7Z2p6'
        },
        { //GOOGLE AS IDP
          type: 'GOOGLE',
          id: '0oa1xovoc1OnwYc2T2p6'
        },
        //{ //org2org okta SAML
        //    type: 'MICROSOFT',
        //    id: '0oa22vkdfc4a0IFIT2p6'
        //},
        { // same as above, but custom application instead
            type: 'MICROSOFT',
            id: '0oa22vofbC3n0VAWI2p6'
        },
        {
            type: 'LINKEDIN',
            id: '0oa27dovsbM9kzVpm2p6'
        },

      ],
      i18n: {
        en: {
          'primaryauth.title': 'Use john/Asdf1234 for the mock Okta server',
        },
      },
      helpLinks: {
        help: 'https://acme.com/help'
    }
  });

export function loginWithOkta(){
  return signIn;
};

/**
 * loginOkta
 * Starts the OAuth login process with redirect using the Okta Auth JS
 * @access public
 */
export function loginOkta(){
  OKTA_AUTH_JS.token.getWithPopup({
    responseType: TOKENS,
    scopes: SCOPES
  }).then(function(tokenArray) {
         //save the id_token and the access_token in the tokenManager
         OKTA_AUTH_JS.tokenManager.add('access_token', tokenArray[0]);
         OKTA_AUTH_JS.tokenManager.add('id_token', tokenArray[1]);
         router.push('/profile')
       }).catch(function(err) {
         //Errors during the login are returned as OAuthError
         alert('error: '+err.errorCode+'\n'+'message: '+err.message);
         router.push('/error')});

  //OKTA_AUTH_JS.token.getWithPopup({
  //  responseType: TOKENS,
    scopes: SCOPES
  //});
}

export function loginWithFB(){
  OKTA_AUTH_JS.token.getWithRedirect({
    responseType: TOKENS,
    scopes: SCOPES,
    idp: '0oa1kqdmtGxvIQb7Z2p6'
  });
}

/**
 * loginWithForm
 * log into Okta using the AuthJS.
 * After a successful login, request an OIDC token using the sessionToken
 * @param String login - user login
 * @param String password - user password
 */
 export function loginWithForm(login, password){
   OKTA_AUTH_JS.signIn({
     username: login,
     password: password
   })
   .then(function(transaction) {
     if (transaction.status === 'SUCCESS') {
       OKTA_AUTH_JS.token.getWithoutPrompt({
         responseType: TOKENS,
         scopes: SCOPES,
         sessionToken: transaction.sessionToken
       })
       .then(function(tokenArray) {
         //save the id_token and the access_token in the tokenManager
         OKTA_AUTH_JS.tokenManager.add('access_token', tokenArray[0]);
         OKTA_AUTH_JS.tokenManager.add('id_token', tokenArray[1]);
         router.push('/profile')
       }).catch(function(err) {
         //Errors during the login are returned as OAuthError
         alert('error: '+err.errorCode+'\n'+'message: '+err.message);
         router.push('/error')
       });
     } else {
       alert('We cannot handle the ' + transaction.status + ' status');
     }
   })
   .fail(function(err) {
     console.error(err);
   });
 }

/**
 * redirect
 * Called by Okta after the OIDC Login.
 * Extract and validate tokens from the redirect and save token info in Token Manager
 * The parseFromUrl perfoms the token validation
 * @access public
 */
export function redirect() {
   OKTA_AUTH_JS.token.parseFromUrl().then(function(tokenArray) {
    //get token from the url
    //save the id_token and the access_token in the tokenManager
    OKTA_AUTH_JS.tokenManager.add('access_token', tokenArray[0]);
    OKTA_AUTH_JS.tokenManager.add('id_token', tokenArray[1]);
    router.push('/profile')
  }).catch(function(err) {
    //Errors during the login are returned as OAuthError
    alert('error: '+err.errorCode+'\n'+'message: '+err.message);
    router.push('/error')
  })
}

/**
 * logout
 * Clear the id_token and access_token from tokenManager and redirects user to /home
 * @access public
 */
export function logout() {
  //Sign out from the app
  oktaSignIn.tokenManager.clear();
  OKTA_AUTH_JS.tokenManager.clear();
  if(!SIGNOUT_OKTA){
    router.push('/home');
  }else{
    OKTA_AUTH_JS.signOut()
    .then(function(){
      router.push('/home');
    })
    .fail(function(err){
      console.error(err);
      router.push('/error');
    })
  }
}

/**
 * getIdToken
 * Get idToken from tokenManager
 * @access public
 * @return Object idToken
 */
export function getIdToken() {
  return OKTA_AUTH_JS.tokenManager.get('id_token');
}

/**
 * getAccessToken
 * Get access from tokenManager
 * @access public
 * @return Object accessToken
 */
export function getAccessToken() {
  return OKTA_AUTH_JS.tokenManager.get('access_token');
}


/**
 * getAuthHeader
 * get Authorization header for REST requests with OAuth
 * @access public
 * @return Object headers
 */
export function getAuthHeader() {
  var at = getAccessToken();
  return {
    headers:{
      'Authorization': 'Bearer '+at.accessToken
    }
  }
}

/**
 * getUserInfo
 * get user name for REST requests with Admin
 * @access public
 * @return Object headers
 */
export function getUserInfo() {
  var at = getAccessToken();
  OKTA_AUTH_JS.token.getUserInfo(at).then(function(user){
  return user;})
}

/**
 * validateAccess
 * validates if a user can access protected pages.
 * @param Object to - info about request destination
 * @param Object from - info about request origin
 * @param Object next - for triggering the next step in the Vue lifecycle
 */
export function validateAccess(to, from, next) {
  if(!isLoggedIn()){
    router.push('/loginform');
  }else if(!isLoggedInOkta()){
    router.push('/loginform');
  }
  else{
    next();
  }
}

/**
 * isLoggedIn
 * Checks whether the user is logged in. If not, clears the tokenManager
 * @return boolean true when the user is logged in with a valid session
 */
export function isLoggedIn() {
  var userLogged = false;
  //check if the id token exists and is not expired
  const idToken = OKTA_AUTH_JS.tokenManager.get('id_token');
  if(idToken != null && !isTokenExpired(idToken)){
    //check if the access token exists and is not expired
    const accessToken = OKTA_AUTH_JS.tokenManager.get('access_token');
    if(accessToken != null && !isTokenExpired(accessToken)){
      userLogged = true;
    }
  }
  if(!userLogged){
    OKTA_AUTH_JS.tokenManager.clear();
  }
  return userLogged;
}

/**
 * isLoggedIn
 * Checks whether the user is logged in. If not, clears the tokenManager
 * @return boolean true when the user is logged in with a valid session
 */
export function isLoggedInOkta() {
  var userLogged = false;
  //check if the id token exists and is not expired
  const idToken = oktaSignIn.tokenManager.get('id_token');
  if(idToken != null && !isTokenExpired(idToken)){
    //check if the access token exists and is not expired
    const accessToken = oktaSignIn.tokenManager.get('access_token');
    if(accessToken != null && !isTokenExpired(accessToken)){
      userLogged = true;
    }
  }
  if(!userLogged){
    OKTA_AUTH_JS.tokenManager.clear();
  }
  return userLogged;
}

/**
 * isTokenExpired
 * check if a token is expired
 * @param Object token - id_token or access_token for validation
 * @return boolean true when the token is expired
 */
function isTokenExpired(token) {
  var tokenExpired = getTokenExpiration(token) < Date.now();
  if(tokenExpired){
    alert(
      'The token expiration date is due: '+
      '\nToken expiration: '+getTokenExpiration(token)+
      '\nCurrent time: '+Date()+'.'+
      '\nClick OK to start a new session.');
  }
  return tokenExpired;
}

/**
 * getTokenExpiration
 * get the token expiration date (expiresAt field)
 * @param Object token - id_token or access_token for validation
 * @return Date token expiration date and time
 */
function getTokenExpiration(token){
  if(!token.expiresAt) { return null; }
  const date = new Date(0);
  date.setUTCSeconds(token.expiresAt);
  return date;
}
