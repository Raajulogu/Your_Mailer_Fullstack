import nodemailer from 'nodemailer';


export async function MailSender(data){
    //delay setting up
    //Creating transport
    let num=data.delay<0 ? -1*data.delay : data.delay
    let DELAY=Number(num)*1000;
    let sender=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"rajeshkumarlogu145@gmail.com",
            pass:"txxtnrsbuqlqwvly"
        }
    });
    let reciever=data.email.length>0?data.email:"";
    let subject=data.subject;
    let message=data.message;
    let cc=data.cc.length>0?data.cc:"";
    let bcc=data.bcc.length>0?data.bcc:"";
    let from={
        name:"Your Mailer",
        address:"rajeshkumarlogu145@gmail.com"
    }
    //mail content
    let recieve={
        from:from,
        to:reciever,
        subject:subject,
        text:message,
        cc:cc,
        bcc:bcc
    };
    let flag=true;
    setTimeout(()=>{
        sender.sendMail(recieve,function(error,info){
            if(error){
                console.log("error",error);
            }
            else {
                console.log('Email sent: ' + info.response);
              }
        });},DELAY
      );
    
    return flag;
    
}