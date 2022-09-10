# El Proyecte Grande

## Naspolke

This is our final team project at Codecool in which we tried to implement a tool for
managing documentation of Ltd. companies. It is based on Spring frameworks (in
particular SpringBoot, Spring MVC and Spring Security). Moreover, we used React for the
front-end and PostgreSQL as our database system


## Run Locally

Clone the project

```bash
  git clone https://github.com/michal-bed/el-proyecte-grande-naspolke.git
```

Create `application.properties` file in the `resources` folder and set the below options:

```bash
spring.datasource.url=${dbUrl}
spring.datasource.username=${dbUser}
spring.datasource.password=${dbPassword}
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
spring.security.user.roles=USER
spring.sql.init.data-locations=classpath:data/roles.sql
spring.sql.init.mode=ALWAYS
spring.mail.protocol=smtp
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${emailAddress}
spring.mail.password=${emailPassword}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.defer-datasource-initialization=true
#spring.jpa.hibernate.ddl-auto=update
spring.jpa.hibernate.ddl-auto=create
```

Create `.env` file in React `na-spolke-client` folder and set your own `REACT_APP_AES_KEY`.

```bash
REACT_APP_AES_KEY=here_type_your_own_value_that_should_be_secret
```

You will need to run React and SpringBoot apps independently. You can use built-in IDE configurations to achieve this. But it is also possible to run the app from command line. Here I will only describe how to install necessary dependencies from package.json and run the React app. For more info about running SpringBoot app from the IDE consult for instance [this article](https://www.geeksforgeeks.org/how-to-run-spring-boot-application/).


Open terminal from `na-spolke-client` directory and run
```bash
  npm install --legacy-per-deps
```

When the dependencies installation is finished you can run the app typing in the console:
```bash
  npm start
```
Besides, you can also use a built-in IDE functionality to start the app.




## Environment Variables

To run this project, you will need to set the following environment variables:

`dbUser` - database user

`dbPassword` - database user password

`dbUrl` - database connection url

`emailAddress` - email address that will be used to contact the app users

`emailPassword` - email password for the email above

`ACCESS_TOKEN_SECRET` - secret key that will be used to sign JWT token


