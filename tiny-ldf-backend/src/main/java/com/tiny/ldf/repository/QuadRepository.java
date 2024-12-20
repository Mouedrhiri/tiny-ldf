package com.tiny.ldf.repository;

import com.tiny.ldf.entity.Quad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface QuadRepository extends JpaRepository<Quad, Long>, JpaSpecificationExecutor<Quad> {

    default Page<Quad> findByFilters(String subject, String predicate, String object, String graph, Pageable pageable) {
        Specification<Quad> spec = Specification.where(null);

        if (subject != null && !subject.trim().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(criteriaBuilder.trim(root.get("subject"))),
                            "%" + subject.trim().toLowerCase() + "%"
                    ));
        }

        if (predicate != null && !predicate.trim().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(criteriaBuilder.trim(root.get("predicate"))),
                            "%" + predicate.trim().toLowerCase() + "%"
                    ));
        }

        if (object != null && !object.trim().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(criteriaBuilder.trim(root.get("object"))),
                            "%" + object.trim().toLowerCase() + "%"
                    ));
        }

        if (graph != null && !graph.trim().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(criteriaBuilder.trim(root.get("graph"))),
                            "%" + graph.trim().toLowerCase() + "%"
                    ));
        }

        return findAll(spec, pageable);
    }
}