package com.troubleshooters.demo.controller;

import com.troubleshooters.demo.model.Acceptance;
import com.troubleshooters.demo.service.AcceptanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accept")
@CrossOrigin(origins = "*")
public class AcceptanceController {

    @Autowired
    private AcceptanceService acceptanceService;

    // Developer accepts ad
    @PostMapping("/apply")
    public String acceptAd(@RequestParam Long adId, @RequestParam Long developerId) {
        return acceptanceService.acceptAd(adId, developerId);
    }

    // Client checks list of acceptors
    @GetMapping("/list/{adId}")
    public List<Acceptance> listAcceptors(@PathVariable Long adId) {
        return acceptanceService.getAcceptors(adId);
    }

    // Client selects one developer
    @PostMapping("/select")
    public String selectDeveloper(@RequestParam Long adId,
                                  @RequestParam Long developerId) {
        return acceptanceService.selectDeveloper(adId, developerId);
    }
}
