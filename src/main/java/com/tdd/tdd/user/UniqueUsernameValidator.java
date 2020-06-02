package com.tdd.tdd.user;

import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public boolean isValid(String userName, ConstraintValidatorContext constraintValidatorContext) {
        User inDb = userRepository.findByUsername(userName);
        
        return inDb == null;
    }
}
