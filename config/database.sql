CREATE TABLE developers(
developerId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
firstName VARCHAR(100),
lastName VARCHAR(100),
nic VARCHAR(15) NOT NULL UNIQUE,
gender VARCHAR(10),
email VARCHAR(100) NOT NULL ,
dob DATE,
per_address VARCHAR(255), 
phone_no INT NOT NULL,
user_type VARCHAR(100),
profile_pic VARCHAR(255), 
devDesc VARCHAR(145),
projectId INT,
FOREIGN KEY (projectId) REFERENCES projects(projectId)
);

CREATE TABLE clients (
client_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
client_email VARCHAR(100) NOT NULL UNIQUE,
firstName VARCHAR(100),
lastName VARCHAR(100),
phone_no INT NOT NULL,
pro_pic VARCHAR(255),
project_id INT,
client_Desc VARCHAR(255),
FOREIGN KEY (projectId) REFERENCES projects(projectId)
);


CREATE TABLE projects (
projectId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
developerId INT NOT NULL,
project_title VARCHAR(255) NOT NULL,
budget INT NOT NULL,
client_id INT NOT NULL,
client_email VARCHAR(255) NOT NULL,
start_date DATETIME,
deadline DATETIME,
finished_date DATETIME,
logo VARCHAR(255),
documents VARCHAR(255),
project_agreements VARCHAR(255),
pr_logo VARCHAR(255),
project_status VARCHAR(255) NOT NULL,
project_desc VARCHAR(255),

FOREIGN KEY (developerId) REFERENCES developers(developerId),
FOREIGN KEY (client_id) REFERENCES clients(client_id)
);


