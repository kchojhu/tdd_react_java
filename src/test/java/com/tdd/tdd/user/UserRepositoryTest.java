package com.tdd.tdd.user;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser() {
        User user = new User();
        user.setDisplayName("test-display");
        user.setPassword("test-password");
        user.setUsername("test-user");

        testEntityManager.persist(user);
        User inDb = userRepository.findByUsername(user.getUsername());
        assertThat(inDb).isNotNull();
    }
}
