USE sql5388964;

-- The following command turns off the Safe Update checks so that your
-- UPDATE and DELETE queries will work without restrictions.  You don't
-- have to replicate this command anywhere else in your code.
SET SQL_SAFE_UPDATES = 0;

Drop table if exists `non_hourly_shift_details`;

Drop table if exists `hourly_shift_details`;

Drop table if exists `users`;

Drop table if exists `employers`;
 
CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `timezone` varchar(255),
  `created_at` timestamp
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
  `shift_date` timestamp COMMENT 'can be stored as varchar MM-DD-YY',
  `total_base_earning` int,
  `credit_card_tips` int,
  `cash_tips` int
);

CREATE TABLE `hourly_shift_details` (
  `shift_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `user_id` int NOT NULL,
  `employer_id` int NOT NULL,
  `shift_date` timestamp COMMENT 'can be stored as varchar MM-DD-YY',
  `start_time` timestamp,
  `end_time` timestamp,
  `hourly_wage` int,
  `credit_card_tips` int,
  `cash_tips` int
);

ALTER TABLE `non_hourly_shift_details` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `non_hourly_shift_details` ADD FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`);

ALTER TABLE `hourly_shift_details` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `hourly_shift_details` ADD FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`);

CREATE INDEX `unique_shift_data` ON `non_hourly_shift_details` (`user_id`, `employer_id`, `shift_date`);

CREATE INDEX `unique_shift_data` ON `hourly_shift_details` (`user_id`, `employer_id`, `shift_date`);

INSERT INTO `users`(`user_id`,`first_name`,`last_name`,`email`,`password_hash`,`timezone`, `created_at`) VALUES (0, "George", "Burdell", "gbb1908@gatech.edu", "1234567890", null, null), (0, "John", "Doe", "jd1765@gatech.edu", "0987654321", null, null);

INSERT INTO `employers`(`employer_id`, `employer_name`, `industry`) VALUES (0, "Starbucks", "Restaurant"), (0, "Dominos", "Restaurant");

INSERT INTO `non_hourly_shift_details`(`shift_id`,`user_id`,`employer_id`, `shift_date`,`total_base_earning`,`credit_card_tips`,`cash_tips`) VALUES (0, 1, 1, "2020-01-01 10:10:10", 40000, 126, 39);

INSERT INTO `hourly_shift_details`(`shift_id`,`user_id`,`employer_id`, `shift_date`,`start_time`, `end_time`, `hourly_wage`,`credit_card_tips`,`cash_tips`) VALUES (0, 2, 2, "2020-02-01 11:10:10", "2020-02-01 11:10:10", "2020-02-01 20:10:10", 8, 93, 47);