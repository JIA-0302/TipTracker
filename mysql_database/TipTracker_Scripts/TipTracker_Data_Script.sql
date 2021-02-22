use tiptracker;

-- The following command turns off the Safe Update checks so that your
-- UPDATE and DELETE queries will work without restrictions.  You don't
-- have to replicate this command anywhere else in your code.
SET
  SQL_SAFE_UPDATES = 0;

INSERT INTO
  `users`(
    `name`,
    `email`,
    `password_hash`
  )
VALUES
  ("George Burdell", "gbb1908@gatech.edu", "1234567890"),
  ( "John Doe", "jd1765@gatech.edu", "0987654321");

INSERT INTO
  `employers`(
	`employer_id`, 
    `employer_name`, 
    `industry`
	)
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
  (0, 1, 1, "2020-01-01 10:10:10", 40000, 126, 39);

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
  (0, 2, 2, "2020-02-01 11:10:10", "2020-02-01 11:10:10", "2020-02-01 20:10:10", 8, 93, 47);
  
  INSERT INTO
  `work_schedule_details`(
    `schedule_id`,
    `user_id`,
    `employer_id`,
    `shift_date`,
    `start_time`,
    `end_time`
  )
VALUES
  (0, 1, 1, "2020-02-01 11:10:10", "2020-02-01 11:10:10", "2020-02-01 20:10:10");