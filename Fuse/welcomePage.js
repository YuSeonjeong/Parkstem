   var Observable = require("FuseJS/Observable");

   var FadeOut = Observable(false);
   function IntroPage() {
      FadeOut.value = true;
   }
   setTimeout(IntroPage, 2000);


   function GoMain(){
   	router.goto("lookaroundPage");
   }

   function GoLogin(){
     router.goto("loginPage");
   }

   function GoSignUp(){
      router.goto("signupPage");
   }

   module.exports = {
      FadeOut: FadeOut,
      GoMain : GoMain,
      GoLogin : GoLogin,
      GoSignUp : GoSignUp
   };
