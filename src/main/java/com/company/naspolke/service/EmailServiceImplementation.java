package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.nio.charset.Charset;
import java.util.Properties;

@Service
public class EmailServiceImplementation implements EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImplementation(@Lazy JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("naspolke.organizacja@gmail.com");
        mailSender.setPassword("tlwpqmlwyqvgnvzh");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

    public String fileFormatterAndReader(String text) throws IOException {

        File fileDirectory = new File(text);
        FileInputStream fileInputStream = new FileInputStream(fileDirectory);
        Charset inputCharset = Charset.forName("ISO-8859-1");
        BufferedReader in = new BufferedReader(new InputStreamReader(fileInputStream, inputCharset));

        String line;
        StringBuilder emailBody = new StringBuilder();

        while ((line = in.readLine()) != null) {
            emailBody.append(line);
        }
        return emailBody.toString();
    }

    @Override
    public void sendEmail(String user, String text, String topic) throws MailException, IOException, MessagingException {

        String emailBody = fileFormatterAndReader(text);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("naspolke.organizacja@gmail.com", "Na spółkę");
        helper.setTo(user);
        helper.setSubject(topic);
        helper.setText(emailBody.toString(), true);

        javaMailSender.send(message);
    }

    @Override
    public void sendVerificationEmail(AppUser appUser) throws MessagingException, IOException {

        String textRoute = ".\\src\\main\\resources\\email\\verify-email.txt";
        String content = fileFormatterAndReader(textRoute);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("naspolke.organizacja@gmail.com", "Na spółkę");
        helper.setTo(appUser.getUserEmail());
        helper.setSubject("Użytkowniku, zweryfikuj swoją rejestrację");
        content = content.replace("[[name]]", appUser.getUserName() + " " + appUser.getUserSurname());
        String verifyURL = "http://localhost:3000/verify?code=" + appUser.getVerificationCode();
        content = content.replace("[[URL]]", verifyURL);
        helper.setText(content, true);

        javaMailSender.send(message);
    }
}
