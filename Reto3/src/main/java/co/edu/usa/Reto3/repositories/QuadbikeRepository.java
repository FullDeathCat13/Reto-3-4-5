/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.Reto3.repositories;

import co.edu.usa.Reto3.models.Quadbike;
import co.edu.usa.Reto3.repositories.crud.QuadbikeCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Alexander Arango
 */
@Repository
public class QuadbikeRepository {
    
    @Autowired
    private QuadbikeCrudRepository repo;
    
    public List<Quadbike> getAll() {
        return (List<Quadbike>) repo.findAll();
    }
    
    public Quadbike save(Quadbike quadbike) {
        return repo.save(quadbike);
    }
    
    public Optional<Quadbike> getById(int id) {
        return repo.findById(id);
    }
    
    public String deleteById(int id){
        repo.deleteById(id);
        return "Registro con id " + id + " ha sido eliminado"; 
    }
    
    public void delete(Quadbike quadbike){
        repo.delete(quadbike);
    }
}
