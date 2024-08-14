// custom.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        // Add your custom environment variables here
        FIREBASE_SERVICE_ACCOUNT_KEY: string;
        SENDGRID_API_KEY: string ;
        OTP_SEND_METHOD: string ; // Can be email (testing) or phone
        PORT: string  ;
        NODE_ENV : string ;
        EMAIL : string ;
        PASSWORD_MAIL : string ;
        JWT_TOKEN_KEY : string ;

        
        // # TWILOO 

        PHONE_NUMBER : string ;

        SID  : string ;
        AUTH_TOKEN : string ;
        TWILIO_ENV : string ;
        MESSAGING_SERVICE_SID : string ;


        // #AWS  CREDENTIALS

        AWS_S3_ACCESS_KEY : string ;
        AWS_S3_SECRET_KEY : string ;
        AWS_S3_BUCKET : string ;
        AWS_REGION  : string ;

        // # ONE SIGNAL CREDENTIALS

        APP_ID : string ;
        REST_API_KEY : string ;

        // #STREAM CHAT CREDENTIALS

        STREAM_API_KEY : string ;
        STREAM_API_SECRET  : string ;


        VERIFICATION_URL : string ;
                
        
        // ...
    }
}