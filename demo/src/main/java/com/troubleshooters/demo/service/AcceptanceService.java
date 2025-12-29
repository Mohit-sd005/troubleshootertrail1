package com.troubleshooters.demo.service;

import com.troubleshooters.demo.model.Acceptance;
import com.troubleshooters.demo.model.Ad;
import com.troubleshooters.demo.model.User;
import com.troubleshooters.demo.repository.AcceptanceRepository;
import com.troubleshooters.demo.repository.AdRepository;
import com.troubleshooters.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AcceptanceService {

    @Autowired
    private AcceptanceRepository acceptanceRepository;

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Developer accepts ad -> store + send email to Client
    public String acceptAd(Long adId, Long developerId) {

        Ad ad = adRepository.findById(adId).orElse(null);
        if (ad == null || ad.getStatus().equals("DELETED")) {
            return "Ad Not Found!";
        }

        User dev = userRepository.findById(developerId).orElse(null);
        User client = userRepository.findById(ad.getClientId()).orElse(null);

        Acceptance acc = new Acceptance();
        acc.setAdId(adId);
        acc.setDeveloperId(developerId);
        acc.setTimestamp(LocalDateTime.now().toString());
        acceptanceRepository.save(acc);

        // Email to client
        String body =
                "Hello " + client.getName() + ",\n\n" +
                        "A developer has accepted your ad.\n\n" +
                        "Developer Name: " + dev.getName() + "\n" +
                        "Email: " + dev.getEmail() + "\n" +
                        "LinkedIn: " + dev.getLinkedinUrl() + "\n\n" +
                        "Ad Description:\n" + ad.getFullDescription();

        emailService.sendEmail(client.getEmail(), "New Applicant for Your Ad", body);

        return "Accepted Successfully!";
    }

    // Get all acceptors for client to see
    public List<Acceptance> getAcceptors(Long adId) {
        return acceptanceRepository.findByAdId(adId);
    }

    // Client selects a developer -> send email to developer
    public String selectDeveloper(Long adId, Long developerId) {

        Ad ad = adRepository.findById(adId).orElse(null);
        User dev = userRepository.findById(developerId).orElse(null);
        User client = userRepository.findById(ad.getClientId()).orElse(null);

        String body =
                "Hello " + dev.getName() + ",\n\n" +
                        "You have been selected for this job!\n\n" +
                        "Client Name: " + client.getName() + "\n" +
                        "Client Email: " + client.getEmail() + "\n\n" +
                        "Ad Details:\n" +
                        ad.getFullDescription() + "\n\n" +
                        "Cost: " + ad.getCost();

        // Email to selected developer
        emailService.sendEmail(dev.getEmail(), "You Have Been Selected!", body);

        return "Developer Selected!";
    }
}
