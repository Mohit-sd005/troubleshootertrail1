package com.troubleshooters.demo.repository;

import com.troubleshooters.demo.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {

    List<Ad> findByStatus(String status);

    List<Ad> findByClientId(Long clientId);
    @Query("""
SELECT a FROM Ad a
WHERE a.status='ACTIVE'
  AND (:q IS NULL OR LOWER(a.fullDescription) LIKE LOWER(CONCAT('%',:q,'%'))
                   OR LOWER(a.requirements)  LIKE LOWER(CONCAT('%',:q,'%')))
  AND (:minCost IS NULL OR a.cost >= :minCost)
  AND (:maxCost IS NULL OR a.cost <= :maxCost)
""")
    List<Ad> searchActive(@Param("q") String q,
                          @Param("minCost") Integer minCost,
                          @Param("maxCost") Integer maxCost);
}