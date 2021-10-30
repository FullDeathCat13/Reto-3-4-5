/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.Reto3.repositories;

import co.edu.usa.Reto3.models.Score;
import co.edu.usa.Reto3.repositories.crud.ScoreCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Alexander Arango
 */
@Repository
public class ScoreRepository {
    
    @Autowired
    private ScoreCrudRepository repo;
    
    public List<Score> getAll() {
        return (List<Score>) repo.findAll();
    }
    
    public Score save(Score score) {
        return repo.save(score);
    }
    
    public Optional<Score> getById(int id) {
        return repo.findById(id);
    }
    
    public String deleteById(int id){
        repo.deleteById(id);
        return "Registro con id " + id + " ha sido eliminado"; 
    }
    
    public void delete(Score score){
        repo.delete(score);
    }
}
