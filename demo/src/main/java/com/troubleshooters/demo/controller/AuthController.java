package com.troubleshooters.demo.controller;

import com.troubleshooters.demo.model.User;
import com.troubleshooters.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // REGISTER
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists!";
        }

        if (user.getRole() == null || user.getRole().isEmpty()) {
            return "Role must be CLIENT or DEVELOPER!";
        }

        if (user.getRole().equalsIgnoreCase("DEVELOPER") &&
                (user.getLinkedinUrl() == null || user.getLinkedinUrl().isEmpty())) {
            return "LinkedIn URL required for developers!";
        }

        userRepository.save(user);
        return "Registration successful!";
    }

    // LOGIN
    @PostMapping("/login")
    public Object loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return "User not found!";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }

        return existingUser; // send full user object to frontend
    }
}
