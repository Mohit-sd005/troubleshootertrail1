package com.troubleshooters.demo.repository;

import com.troubleshooters.demo.model.Acceptance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcceptanceRepository extends JpaRepository<Acceptance, Long> {

    List<Acceptance> findByAdId(Long adId);
}
