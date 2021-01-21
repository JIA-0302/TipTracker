package com.jia0302.developer.tiptracker;

import com.jia0302.developer.tiptracker.model.User;
import com.jia0302.developer.tiptracker.model.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepository repository;

    public Initializer(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        repository.save(new User("John", "Doe", "johndoe@gmail.com"));
        repository.save(new User("George", "Burdell", "gburdell3@gatech.edu"));
        repository.findAll().forEach(System.out::println);
    }
}