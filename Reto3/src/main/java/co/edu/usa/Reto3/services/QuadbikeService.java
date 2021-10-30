/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.Reto3.services;

import co.edu.usa.Reto3.models.Quadbike;
import co.edu.usa.Reto3.repositories.QuadbikeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 *
 * @author hp
 */
@Service
public class QuadbikeService {

    @Autowired
    private QuadbikeRepository reposQuadbike;

    // CRUD Create, Read, Update, Delete
    // Create
    public Quadbike saveQuadbike(Quadbike quadbike) {
        Quadbike quadbikeNew = reposQuadbike.save(quadbike);
        return getQuadbikeById(quadbikeNew.getId());
    }

    //Read
    public List<Quadbike> getAll() {
        return reposQuadbike.getAll();
    }

    //Update
    public Quadbike updateQuadbike(Quadbike quadbike) {        
        if (quadbike.getId() != null){
            Optional<Quadbike> quadbikeConsultada = reposQuadbike.getById(quadbike.getId());
            if (quadbikeConsultada.isPresent()){
                
                quadbikeConsultada.get().setBrand(quadbike.getBrand());
                quadbikeConsultada.get().setCategory(quadbike.getCategory());
                quadbikeConsultada.get().setDescription(quadbike.getDescription());
                quadbikeConsultada.get().setName(quadbike.getName());
                quadbikeConsultada.get().setYear(quadbike.getYear());
                
                return reposQuadbike.save(quadbikeConsultada.get());
            }
        }
        return quadbike;
    }

    //Delete
    public boolean deleteQuadbike(int id) {
        boolean del = reposQuadbike.getById(id).map(quadbike -> {
            reposQuadbike.delete(quadbike);
            return true;
        }).orElse(false);
        return del;
    }

    //Filtro por ID
    public Quadbike getQuadbikeById(int id) {
        Optional<Quadbike> quadbike = reposQuadbike.getById(id);
        return quadbike.orElse(new Quadbike());
    }
}
