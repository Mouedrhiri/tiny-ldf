package com.tiny.ldf.controller;
import com.tiny.ldf.entity.Quad;
import com.tiny.ldf.service.QuadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ldf")
@CrossOrigin(origins = "https://storage.googleapis.com")
public class QuadController {

    @Autowired
    private QuadService quadService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertQuad(@RequestBody Quad quad) {
        Quad savedQuad = quadService.insertQuad(quad);
        return ResponseEntity.ok(savedQuad);
    }

    @GetMapping("/query")
    public ResponseEntity<?> queryQuads(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String predicate,
            @RequestParam(required = false) String object,
            @RequestParam(required = false) String graph,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        // Perform query using service layer
        Page<Quad> results = quadService.queryQuads(subject, predicate, object, graph, PageRequest.of(page, size));

        return ResponseEntity.ok(results);
    }
}
