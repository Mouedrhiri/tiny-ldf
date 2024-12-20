package com.tiny.ldf.service;
import com.tiny.ldf.entity.Quad;
import com.tiny.ldf.exceptions.QuadInsertionException;
import com.tiny.ldf.exceptions.QuadQueryException;
import com.tiny.ldf.repository.QuadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuadService {

    @Autowired
    private QuadRepository quadRepository;

    // Method to insert a Quad with exception handling
    public Quad insertQuad(Quad quad) {
        try {
            return quadRepository.save(quad);
        } catch (Exception e) {
            throw new QuadInsertionException("Failed to insert Quad. Reason: " + e.getMessage(), e);
        }
    }

    // Method to query Quads with exception handling
    public Page<Quad> queryQuads(String subject, String predicate, String object, String graph, Pageable pageable) {
        try {
            return quadRepository.findByFilters(subject, predicate, object, graph, pageable);
        } catch (Exception e) {
            throw new QuadQueryException("Failed to query Quads. Reason: " + e.getMessage(), e);
        }
    }
}
