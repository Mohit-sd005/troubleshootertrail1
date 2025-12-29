package com.troubleshooters.demo.controller;

import com.troubleshooters.demo.model.Ad;
import com.troubleshooters.demo.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ads")
@CrossOrigin(origins = "*")
public class AdController {

    @Autowired
    private AdService adService;

    // Create new ad (CLIENT)
    @PostMapping("/create")
    public Ad createAd(@RequestBody Ad ad) {
        return adService.createAd(ad);
    }
    @GetMapping("/search")
    public List<Ad> searchActive(@RequestParam(required=false) String q,
                                 @RequestParam(required=false) Integer minCost,
                                 @RequestParam(required=false) Integer maxCost) {
        return adService.searchActive(q, minCost, maxCost);
    }


    // Get all ads of client
    @GetMapping("/client/{clientId}")
    public List<Ad> getClientAds(@PathVariable Long clientId) {
        return adService.getClientAds(clientId);
    }

    // Get all active ads (DEVELOPER)
    @GetMapping("/active")
    public List<Ad> getAllActiveAds() {
        return adService.getAllActiveAds();
    }

    // Get ad by ID
    @GetMapping("/{id}")
    public Ad getAdById(@PathVariable Long id) {
        return adService.getAdById(id);
    }

    // Update ad
    @PutMapping("/update/{id}")
    public Ad updateAd(@PathVariable Long id, @RequestBody Ad ad) {
        return adService.updateAd(id, ad);
    }

    // Delete ad (Client manual deletion)
    @DeleteMapping("/delete/{id}")
    public String deleteAd(@PathVariable Long id) {
        boolean result = adService.deleteAd(id);
        if (result) {
            return "Ad deleted successfully";
        } else {
            return "Ad not found";
        }
    }
}