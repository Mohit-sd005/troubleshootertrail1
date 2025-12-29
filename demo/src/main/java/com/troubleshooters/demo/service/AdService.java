package com.troubleshooters.demo.service;
import com.troubleshooters.demo.model.Ad;
import com.troubleshooters.demo.repository.AdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdService {

    @Autowired
    private AdRepository adRepository;

    // Create new ad
    public Ad createAd(Ad ad) {
        ad.setStatus("ACTIVE");
        return adRepository.save(ad);
    }
    
    //
    public List<Ad> searchActive(String q, Integer minCost, Integer maxCost) {
        return adRepository.searchActive(q == null || q.isBlank() ? null : q,
                minCost, maxCost);
    }


    // Get ads of a specific client
    public List<Ad> getClientAds(Long clientId) {
        return adRepository.findByClientId(clientId);
    }

    // All active ads for developers
    public List<Ad> getAllActiveAds() {
        return adRepository.findByStatus("ACTIVE");
    }

    // Get a single ad
    public Ad getAdById(Long id) {
        return adRepository.findById(id).orElse(null);
    }

    // Update ad
//    public Ad updateAd(Long id, Ad updatedAd) {
//        Ad existing = adRepository.findById(id).orElse(null);
//        if (existing == null) return null;
//
//        existing.setFullDescription(updatedAd.getFullDescription());
//        existing.setGithubLinks(updatedAd.getGithubLinks());
//        existing.setRequirements(updatedAd.getRequirements());
//        existing.setCost(updatedAd.getCost());
//
//        return adRepository.save(existing);
//    }
    public Ad updateAd(Long id, Ad updatedAd) {
        Ad existing = adRepository.findById(id).orElse(null);
        if (existing == null) return null;
        if ("DELETED".equals(existing.getStatus())) return existing; // noop

        existing.setFullDescription(updatedAd.getFullDescription());
        existing.setGithubLinks(updatedAd.getGithubLinks());
        existing.setRequirements(updatedAd.getRequirements());
        existing.setCost(updatedAd.getCost());
        return adRepository.save(existing);
    }

    // Delete ad
    public boolean deleteAd(Long id) {
        Ad existing = adRepository.findById(id).orElse(null);
        if (existing == null) return false;

        existing.setStatus("DELETED");   // soft delete
        adRepository.save(existing);
        return true;
    }
}

