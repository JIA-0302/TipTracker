DROP DATABASE if exists tiptracker;

CREATE DATABASE tiptracker;

use tiptracker;

-- The following command turns off the Safe Update checks so that your
-- UPDATE and DELETE queries will work without restrictions.  You don't
-- have to replicate this command anywhere else in your code.
SET
  SQL_SAFE_UPDATES = 0;

Drop table if exists `users`;

Drop table if exists `accounts`;

Drop table if exists `sessions`;

Drop table if exists `verification_requests`;

Drop table if exists `employers`;

Drop table if exists `non_hourly_shift_details`;

Drop table if exists `hourly_shift_details`;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` VARCHAR(255),
  `password_hash` varchar(255) NOT NULL,
  `timezone` varchar(255),
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `email_verified` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE `accounts` (
  id INT NOT NULL AUTO_INCREMENT,
  compound_id VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  provider_type VARCHAR(255) NOT NULL,
  provider_id VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  access_token_expires TIMESTAMP(6),
  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
);

CREATE TABLE `sessions` (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  expires TIMESTAMP(6) NOT NULL,
  session_token VARCHAR(255) NOT NULL,
  access_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
);

CREATE TABLE `verification_requests` (
  id INT NOT NULL AUTO_INCREMENT,
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMP(6) NOT NULL,
  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
);

CREATE TABLE `employers` (
  `employer_id` int AUTO_INCREMENT NOT NULL,
  `employer_name` varchar(255) NOT NULL,
  `industry` varchar(255) NOT NULL,
  PRIMARY KEY (`employer_id`, `employer_name`)
);

CREATE TABLE `non_hourly_shift_details` (
  `shift_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `user_id` int NOT NULL,
  `employer_id` int NOT NULL,
  `shift_date` DATE NOT NULL,
  `total_base_earning` DECIMAL(9, 2) DEFAULT 0.00,
  `credit_card_tips` DECIMAL(9, 2) DEFAULT 0.00,
  `cash_tips` DECIMAL(9, 2) DEFAULT 0.00,
  `created_at` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);

CREATE TABLE `hourly_shift_details` (
  `shift_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `user_id` int NOT NULL,
  `employer_id` int NOT NULL,
  `shift_date` DATE NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `hourly_wage` DECIMAL(9, 2) NOT NULL,
  `credit_card_tips` DECIMAL(9, 2) DEFAULT 0.00,
  `cash_tips` DECIMAL(9, 2) DEFAULT 0.00,
  `created_at` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);

ALTER TABLE
  `non_hourly_shift_details`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE
  `non_hourly_shift_details`
ADD
  FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`);

ALTER TABLE
  `hourly_shift_details`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE
  `hourly_shift_details`
ADD
  FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`);

CREATE UNIQUE INDEX `unique_shift_data` ON `non_hourly_shift_details` (`user_id`, `employer_id`, `shift_date`);

CREATE UNIQUE INDEX `unique_shift_data` ON `hourly_shift_details` (`user_id`, `employer_id`, `shift_date`);

CREATE UNIQUE INDEX compound_id ON accounts(compound_id);

CREATE INDEX provider_account_id ON accounts(provider_account_id);

CREATE INDEX provider_id ON accounts(provider_id);

CREATE INDEX user_id ON accounts(user_id);

CREATE UNIQUE INDEX session_token ON sessions(session_token);

CREATE UNIQUE INDEX access_token ON sessions(access_token);

CREATE UNIQUE INDEX email ON users(email);

CREATE UNIQUE INDEX token ON verification_requests(token);

INSERT INTO
  `users`(
    `name`,
    `email`,
    `password_hash`
  )
VALUES
  (
    "George Burdell",
    "gbb1908@gatech.edu",
    "1234567890"
  ),
  (
    "John Doe",
    "jd1765@gatech.edu",
    "0987654321"
  );

INSERT INTO
  `employers`(`employer_id`, `employer_name`, `industry`)
VALUES
  (0, "Starbucks", "Restaurant"),
  (0, "Dominos", "Restaurant");

INSERT INTO
  `non_hourly_shift_details`(
    `shift_id`,
    `user_id`,
    `employer_id`,
    `shift_date`,
    `total_base_earning`,
    `credit_card_tips`,
    `cash_tips`
  )
VALUES
  (0, 1, 1, "2020-01-01", 40000, 126, 39);

INSERT INTO
  `hourly_shift_details`(
    `shift_id`,
    `user_id`,
    `employer_id`,
    `shift_date`,
    `start_time`,
    `end_time`,
    `hourly_wage`,
    `credit_card_tips`,
    `cash_tips`
  )
VALUES
  (
    0,
    2,
    2,
    "2020-02-01",
    "2020-02-01 11:10:10",
    "2020-02-01 20:10:10",
    8,
    93,
    47
  );