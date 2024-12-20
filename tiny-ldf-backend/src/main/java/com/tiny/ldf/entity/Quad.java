package com.tiny.ldf.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name = "quads")
public class Quad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Subject must not be null")
    private String subject;

    @NotNull(message = "Predicate must not be null")
    private String predicate;

    @NotNull(message = "Object must not be null")
    private String object;

    @NotNull(message = "Graph must not be null")
    private String graph;

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getPredicate() {
        return predicate;
    }

    public void setPredicate(String predicate) {
        this.predicate = predicate;
    }

    public String getGraph() {
        return graph;
    }

    public void setGraph(String graph) {
        this.graph = graph;
    }





    public Quad(Long id, String subject, String predicate, String object, String graph) {
        this.id = id;
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.graph = graph;
    }
    public Quad() {
    }
    @Override
    public String toString() {
        return "Quad{" +
                "id=" + id +
                ", subject='" + subject + '\'' +
                ", predicate='" + predicate + '\'' +
                ", object='" + object + '\'' +
                ", graph='" + graph + '\'' +
                '}';
    }

}


