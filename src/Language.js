// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

const strings = new LocalizedStrings({
    "en":{
        email:"Email Address",
        password:"Password",
        login:"Log in",
        loggingYouIn:"Logging you in...",
        or:"or",
        forgotPassword:"Forgot password?",
        dontHaveAnAccount:"Don’t have an account?",
        signUp:"Sign up",
        confirmation:"Password confirmation",
        signingYouUp:"Signing you up...",
        signUpAlready:"Already have an account?",
        answerLogin:"Log in",
        parametersFemale:"Female",
        parametersMale:"Male",
        submit:"Submit",
        voucher:"Voucher",
        settings:"Settings",
        home:"Home",
        congratulations:"Congratulations!",
        end:"That's it for today. See you tomorrow for another swipe session!",
        firstHello:"Hello!",
        secondHello:"Hello again!",
        titleSwipe:"Title Swipe"

 },
 "fr": {
        email:"Adresse Mail",
        password:"Mot de passe",
        login:"Connexion",
        loggingYouIn:"Connexion en cours...",
        or:"ou",
        forgotPassword:"Avez-vous oublié votre mot de passe ?",
        dontHaveAnAccount:"Vous n’avez pas de compte ?",
        signUp:"Inscription",
        confirmation:"Confirmez votre mot de passe",
        signingYouUp:"Inscription en cours...",
        signUpAlready:"Vous avez déjà un compte ?",
        answerLogin:"Connexion",
        parametersFemale:"Femme",
        parametersMale:"Homme",
        submit:"Envoyer",
        voucher:"Vos cadeaux",
        settings:"Paramètres",
        home:"Accueil",
        congratulations:"Félicitations !",
        end:"C'est tout pour aujourd'hui, on se dit à demain !",
        firstHello:"Coucou !",
        secondHello:"Re-coucou !",
        titleSwipe:"Title Swipe"
 }
    });

    export default strings;

